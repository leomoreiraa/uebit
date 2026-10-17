export function createPreviewDocument(code, token, editing = false) {
  const document = new DOMParser().parseFromString(code.html, 'text/html')
  document.querySelectorAll('link[href="style.css"], script[src="script.js"]').forEach((node) => node.remove())
  const style = document.createElement('style')
  style.setAttribute('data-uebit-style', '')
  style.textContent = code.css
  document.head.append(style)
  if (editing) {
    const editorStyle = document.createElement('style')
    editorStyle.setAttribute('data-uebit-editor-style', '')
    editorStyle.textContent = `
      [data-uebit-editable] { cursor: text; }
      [data-uebit-editable]:focus { outline: 2px dashed #7c3aed !important; outline-offset: 2px !important; }
    `
    document.head.append(editorStyle)
  }
  const bridge = document.createElement('script')
  bridge.setAttribute('data-uebit-bridge', '')
  bridge.textContent = `(() => {
    const token = ${JSON.stringify(token)};
    const editing = ${JSON.stringify(editing)};
    let lastHtml = ${JSON.stringify(code.html).replace(/</g, '\\u003c')};
    const send = (type, data) => parent.postMessage({ source: 'uebit-preview', token, type, ...data }, '*');
    const isContainerTag = tag => ['DIV','SECTION','ARTICLE','HEADER','FOOTER','NAV','ASIDE','MAIN','FORM'].includes(tag);
    const isInternal = n => ['SCRIPT','STYLE','LINK','META','TITLE','BASE'].includes(n.tagName) || n.id === 'uebit-message-toast';
    const root = () => document.querySelector('[data-site-root], .site') || document.body;
    const nodes = () => {
      const collect = parent => [...parent.children].filter(n => !isInternal(n)).flatMap(n => [n, ...(isContainerTag(n.tagName) ? collect(n) : [])]);
      return collect(root());
    };
    const id = (node, index) => node.getAttribute('data-block-id') || node.id || 'import-' + (index + 1);
    const TEXT_TAGS = new Set(['H1','H2','H3','H4','H5','H6','P','BUTTON','A','BLOCKQUOTE','STRONG','B','EM','I','CODE','PRE','SPAN']);
    const IGNORED_ATTRS = new Set(['contenteditable', 'spellcheck', 'data-uebit-editable']);
    function markEditable(el) {
      if (!el || el.getAttribute('data-uebit-editable') === 'true') return;
      el.contentEditable = 'true';
      el.spellcheck = false;
      el.setAttribute('data-uebit-editable', 'true');
    }
    function setupEditable() {
      if (!editing) return;
      for (const node of nodes()) {
        if (TEXT_TAGS.has(node.tagName)) {
          markEditable(node);
        } else if (node.tagName === 'UL' || node.tagName === 'OL') {
          node.querySelectorAll('li').forEach(markEditable);
        } else if (node.tagName === 'TABLE') {
          node.querySelectorAll('th, td').forEach(markEditable);
        } else if (node.tagName === 'LABEL') {
          const span = node.querySelector('span');
          if (span) markEditable(span);
        }
      }
    }
    function extractBlockText(node) {
      if (node.tagName === 'UL' || node.tagName === 'OL') {
        return [...node.querySelectorAll('li')].map(li => li.textContent ?? '').join('\\n');
      }
      if (node.tagName === 'TABLE') {
        return [...node.querySelectorAll('tr')].map(tr =>
          [...tr.querySelectorAll('th, td')].map(cell => (cell.textContent ?? '').replace(/,/g, ' ')).join(', ')
        ).join('\\n');
      }
      if (node.tagName === 'LABEL') {
        return node.querySelector('span')?.textContent ?? '';
      }
      return node.textContent ?? '';
    }
    let queued = false;
    function report() {
      queued = false;
      const host = root(); const rect = host.getBoundingClientRect();
      send('layout', {
        height: Math.max(480, rect.bottom + scrollY),
        blocks: nodes().map((node, index) => {
          const r = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          const parentStyle = getComputedStyle(node.parentElement);
          const cssWidth = parseFloat(style.width), cssHeight = parseFloat(style.height);
          return { id: id(node,index), x:r.x+scrollX, y:r.y+scrollY, width:r.width, height:r.height,
            cssWidth: Number.isFinite(cssWidth) ? cssWidth : r.width, cssHeight: Number.isFinite(cssHeight) ? cssHeight : r.height,
            maxWidth: Math.max(24, node.parentElement.clientWidth - (parseFloat(parentStyle.paddingLeft) || 0) - (parseFloat(parentStyle.paddingRight) || 0)) };
        })
      });
    }
    function schedule() { if (!queued) { queued=true; requestAnimationFrame(report); } }
    let resizing = null;
    function restoreResize() {
      if (!resizing) return;
      if (resizing.style === null) resizing.node.removeAttribute('style');
      else resizing.node.setAttribute('style', resizing.style);
      resizing = null;
    }
    function syncAttributes(liveEl, nextEl) {
      for (const attr of [...liveEl.attributes]) {
        if (!IGNORED_ATTRS.has(attr.name) && !nextEl.hasAttribute(attr.name)) {
          liveEl.removeAttribute(attr.name);
        }
      }
      for (const attr of nextEl.attributes) {
        if (attr.name === 'style' && resizing && resizing.node === liveEl) {
          resizing.style = attr.value;
          continue;
        }
        if (liveEl.getAttribute(attr.name) !== attr.value) {
          liveEl.setAttribute(attr.name, attr.value);
        }
      }
      if (liveEl.tagName === 'INPUT' && liveEl !== document.activeElement) {
        if (liveEl.type === 'checkbox') liveEl.checked = nextEl.hasAttribute('checked');
        else liveEl.value = nextEl.getAttribute('value') ?? '';
      }
      if (liveEl.tagName === 'TEXTAREA' && liveEl !== document.activeElement) {
        liveEl.value = nextEl.textContent ?? '';
      }
    }
    const keyOf = el => el.getAttribute?.('data-block-id') || el.id || '';
    function syncChildren(liveParent, nextParent) {
      const nextChildren = [...nextParent.children].filter(n => !isInternal(n));
      const keyedLive = new Map();
      for (const child of [...liveParent.children]) {
        if (isInternal(child)) continue;
        const k = keyOf(child);
        if (k) keyedLive.set(k, child);
      }
      for (let i = 0; i < nextChildren.length; i++) {
        const nextChild = nextChildren[i];
        const k = keyOf(nextChild);
        let liveChild = k ? keyedLive.get(k) : null;
        if (!liveChild) {
          const candidate = liveParent.children[i];
          if (candidate && !isInternal(candidate) && !keyOf(candidate) && candidate.tagName === nextChild.tagName) {
            liveChild = candidate;
          }
        }
        if (liveChild && liveChild.tagName === nextChild.tagName) {
          const refNode = liveParent.children[i];
          if (refNode !== liveChild) liveParent.insertBefore(liveChild, refNode || null);
          syncAttributes(liveChild, nextChild);
          const active = document.activeElement;
          const isActivelyEditingLeaf = editing && active && active !== document.body && (liveChild === active || (!isContainerTag(liveChild.tagName) && liveChild.contains(active)));
          if (!isActivelyEditingLeaf) {
            if (isContainerTag(liveChild.tagName)) {
              syncChildren(liveChild, nextChild);
            } else if (nextChild.children.length > 0 || liveChild.children.length > 0) {
              if (liveChild.innerHTML !== nextChild.innerHTML) liveChild.innerHTML = nextChild.innerHTML;
            } else if (liveChild.textContent !== nextChild.textContent) {
              liveChild.textContent = nextChild.textContent;
            }
          }
        } else {
          const clone = document.importNode(nextChild, true);
          if (liveChild) liveChild.replaceWith(clone);
          else liveParent.insertBefore(clone, liveParent.children[i] || null);
        }
      }
      let seenNonInternal = 0;
      for (const child of [...liveParent.children]) {
        if (isInternal(child)) continue;
        seenNonInternal++;
        if (seenNonInternal > nextChildren.length) child.remove();
      }
    }
    addEventListener('message', event => {
      if (event.source !== parent || event.data?.source !== 'uebit-editor' || event.data.token !== token) return;
      if (event.data.type === 'update') {
        const styleEl = document.querySelector('style[data-uebit-style]');
        if (styleEl && typeof event.data.css === 'string' && styleEl.textContent !== event.data.css) {
          styleEl.textContent = event.data.css;
        }
        if (typeof event.data.html === 'string' && event.data.html !== lastHtml) {
          lastHtml = event.data.html;
          const parsed = new DOMParser().parseFromString(event.data.html, 'text/html');
          parsed.querySelectorAll('link[href="style.css"], script[src="script.js"]').forEach(n => n.remove());
          syncAttributes(document.body, parsed.body);
          const liveRoot = root();
          const nextRoot = parsed.querySelector('[data-site-root], .site') || parsed.body;
          if (liveRoot !== document.body && nextRoot !== parsed.body) syncAttributes(liveRoot, nextRoot);
          syncChildren(liveRoot, nextRoot);
          setupEditable();
        }
        schedule();
        return;
      }
      if (!editing || event.data.type !== 'resize') return;
      const preview = event.data.preview;
      if (!preview) { restoreResize(); schedule(); return; }
      if (!resizing || resizing.id !== preview.id) {
        restoreResize();
        const node = nodes().find((node, index) => id(node, index) === preview.id);
        if (!node) return;
        resizing = { node, id: preview.id, style: node.getAttribute('style') };
      }
      for (const property of ['width', 'height', 'minHeight', 'maxHeight', 'flexShrink']) {
        if (typeof preview.changes?.[property] === 'string') resizing.node.style[property] = preview.changes[property];
      }
      schedule();
    });
    new ResizeObserver(schedule).observe(document.body);
    new MutationObserver(schedule).observe(document.body, {subtree:true,childList:true,attributes:true,characterData:true});
    addEventListener('resize', schedule);
    document.addEventListener('load', schedule, true);
    window.addEventListener('click', event => {
      const list = nodes(); const node = list.findLast(n => n.contains(event.target));
      if (editing && node) {
        const editable = event.target.closest?.('[data-uebit-editable]');
        if (event.target.closest?.('a, button, input, select, textarea, label') || !editable) {
          event.preventDefault();
        }
        event.stopImmediatePropagation();
        send('select', {id:id(node,list.indexOf(node))});
        if (editable && document.activeElement !== editable) {
          editable.focus({ preventScroll: true });
        }
      }
    }, true);
    document.addEventListener('input', event => {
      if (!editing) return;
      const editable = event.target?.closest?.('[data-uebit-editable]');
      if (!editable) return;
      const list = nodes();
      const node = list.findLast(n => n.contains(editable));
      if (!node) return;
      send('edit-text', { id: id(node, list.indexOf(node)), text: extractBlockText(node) });
      schedule();
    }, true);
    document.addEventListener('keydown', event => {
      if (!editing) return;
      const editable = event.target?.closest?.('[data-uebit-editable]');
      if (!editable) return;
      event.stopPropagation();
      if (event.key === 'Escape') {
        editable.blur();
        return;
      }
      if (event.key === 'Enter') {
        if (editable.tagName === 'LI') {
          event.preventDefault();
          const nextLi = document.createElement('li');
          markEditable(nextLi);
          editable.after(nextLi);
          nextLi.focus();
          const list = nodes();
          const node = list.findLast(n => n.contains(editable));
          if (node) send('edit-text', { id: id(node, list.indexOf(node)), text: extractBlockText(node) });
          schedule();
          return;
        }
        if (!event.shiftKey) {
          event.preventDefault();
          editable.blur();
        }
      }
      if (event.key === 'Backspace' && editable.tagName === 'LI' && !editable.textContent) {
        const parentList = editable.parentElement;
        if (parentList && parentList.querySelectorAll('li').length > 1) {
          event.preventDefault();
          const prev = editable.previousElementSibling || editable.nextElementSibling;
          editable.remove();
          if (prev) prev.focus();
          const list = nodes();
          const node = list.findLast(n => n.contains(parentList));
          if (node) send('edit-text', { id: id(node, list.indexOf(node)), text: extractBlockText(node) });
          schedule();
        }
      }
    }, true);
    addEventListener('error', event => send('error', {message:event.message || 'Não foi possível carregar um recurso.'}));
    addEventListener('unhandledrejection', event => send('error', {message:String(event.reason)}));
    const script=document.createElement('script');
    script.setAttribute('data-uebit-user-script', '');
    script.textContent=${JSON.stringify(code.js).replace(/</g, '\\u003c')};
    document.body.append(script);
    setupEditable();
    send('ready', {});
    schedule();
  })();`
  document.body.append(bridge)
  return '<!doctype html>\n' + document.documentElement.outerHTML
}

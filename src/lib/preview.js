export function createPreviewDocument(code, token, editing = false) {
  const document = new DOMParser().parseFromString(code.html, 'text/html')
  document.querySelectorAll('link[href="style.css"], script[src="script.js"]').forEach((node) => node.remove())
  const style = document.createElement('style')
  style.textContent = code.css
  document.head.append(style)
  const bridge = document.createElement('script')
  bridge.textContent = `(() => {
    const token = ${JSON.stringify(token)};
    const send = (type, data) => parent.postMessage({ source: 'uebit-preview', token, type, ...data }, '*');
    const root = () => document.querySelector('[data-site-root], .site') || document.body;
    const nodes = () => {
      const collect = parent => [...parent.children].filter(n => !['SCRIPT','STYLE','LINK','META','TITLE','BASE'].includes(n.tagName)).flatMap(n => [n, ...(['DIV','SECTION','ARTICLE','HEADER','FOOTER','NAV','ASIDE','MAIN'].includes(n.tagName) ? collect(n) : [])]);
      return collect(root());
    };
    const id = (node, index) => node.getAttribute('data-block-id') || node.id || 'import-' + (index + 1);
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
    addEventListener('message', event => {
      if (!${JSON.stringify(editing)} || event.source !== parent || event.data?.source !== 'uebit-editor' || event.data.token !== token || event.data.type !== 'resize') return;
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
      if (${JSON.stringify(editing)} && node) {
        event.preventDefault();
        event.stopImmediatePropagation();
        send('select', {id:id(node,list.indexOf(node))});
      }
    }, true);
    addEventListener('error', event => send('error', {message:event.message || 'Não foi possível carregar um recurso.'}));
    addEventListener('unhandledrejection', event => send('error', {message:String(event.reason)}));
    const script=document.createElement('script');
    script.textContent=${JSON.stringify(code.js).replace(/</g, '\\u003c')};
    document.body.append(script);
    send('ready', {});
    schedule();
  })();`
  document.body.append(bridge)
  return '<!doctype html>\n' + document.documentElement.outerHTML
}

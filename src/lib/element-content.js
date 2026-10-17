import { BOX_PROPERTIES } from './styles.js'

export function readContent(node) {
  const isList = (node.tagName === 'UL' || node.tagName === 'OL') && typeof node.querySelectorAll === 'function'
  const isSelect = node.tagName === 'SELECT' && typeof node.querySelectorAll === 'function'
  const isTable = node.tagName === 'TABLE' && typeof node.querySelectorAll === 'function'
  const isCheckbox = node.tagName === 'LABEL' && typeof node.querySelector === 'function' && Boolean(node.querySelector('input[type="checkbox"]'))

  let listItems = null
  if (isList) {
    listItems = Array.from(node.querySelectorAll('li')).map((li) => li.textContent ?? '').join('\n')
  } else if (isSelect) {
    listItems = Array.from(node.querySelectorAll('option')).map((opt) => opt.textContent ?? '').join('\n')
  } else if (isTable) {
    const rows = Array.from(node.querySelectorAll('tr')).map((tr) =>
      Array.from(tr.querySelectorAll('th, td')).map((cell) => cell.textContent ?? '').join(', ')
    )
    listItems = rows.join('\n')
  } else if (isCheckbox) {
    listItems = node.querySelector('span')?.textContent ?? node.textContent ?? ''
  }

  const text = listItems !== null
    ? listItems
    : node.tagName === 'INPUT'
      ? (typeof node.getAttribute === 'function' ? (node.getAttribute('value') ?? '') : '')
      : node.tagName === 'TEXTAREA'
        ? (node.value ?? node.textContent ?? '')
        : (node.textContent ?? '')

  const hasAttr = (attr) => (
    typeof node.hasAttribute === 'function'
      ? node.hasAttribute(attr)
      : Boolean(typeof node.getAttribute === 'function' && node.getAttribute(attr) !== null)
  )
  const isMedia = node.tagName === 'VIDEO' || node.tagName === 'AUDIO'

  return {
    tagName: node.tagName?.toLowerCase() ?? 'div',
    name: (typeof node.getAttribute === 'function' ? node.getAttribute('data-name') : null) ?? '',
    htmlId: node.id ?? '',
    text,
    headingLevel: /^H[1-6]$/.test(node.tagName) ? node.tagName.toLowerCase() : 'h1',
    src: (typeof node.getAttribute === 'function' ? node.getAttribute('src') : null) ?? '',
    poster: (typeof node.getAttribute === 'function' ? node.getAttribute('poster') : null) ?? '',
    controls: isMedia ? hasAttr('controls') : true,
    autoplay: isMedia ? hasAttr('autoplay') : false,
    loop: isMedia ? hasAttr('loop') : false,
    muted: isMedia ? hasAttr('muted') : false,
    playsInline: node.tagName === 'VIDEO' ? hasAttr('playsinline') : true,
    hidden: Boolean(hasAttr('hidden') || node.style?.display === 'none'),
    alt: (typeof node.getAttribute === 'function' ? node.getAttribute('alt') : null) ?? '',
    placeholder: (typeof node.getAttribute === 'function' ? node.getAttribute('placeholder') : null) ?? '',
    href: (typeof node.getAttribute === 'function' ? node.getAttribute('href') : null) ?? '',
    checked: isCheckbox ? Boolean(node.querySelector('input[type="checkbox"]')?.hasAttribute?.('checked') || node.querySelector('input[type="checkbox"]')?.checked) : false,
    fit: node.style?.objectFit || (node.tagName === 'VIDEO' ? 'contain' : 'cover'),
    appearance: {
      color: node.style?.color,
      backgroundColor: node.style?.backgroundColor,
      backgroundImage: node.style?.backgroundImage,
      backgroundSize: node.style?.backgroundSize,
      backgroundPosition: node.style?.backgroundPosition,
      backgroundRepeat: node.style?.backgroundRepeat,
      position: node.style?.position,
      top: node.style?.top,
      bottom: node.style?.bottom,
      left: node.style?.left,
      right: node.style?.right,
      zIndex: node.style?.zIndex,
      display: node.style?.display,
      opacity: node.style?.opacity,
      fontSize: node.style?.fontSize,
      ...Object.fromEntries(BOX_PROPERTIES.filter((property) => node.style?.[property]).map((property) => [property, node.style[property]])),
    },
    action: (typeof node.getAttribute === 'function' ? node.getAttribute('data-site-action') : null) ?? (node.tagName === 'A' ? 'link' : 'none'),
    actionValue: (typeof node.getAttribute === 'function' ? (node.getAttribute('data-site-value') ?? node.getAttribute('href')) : null) ?? '',
    newTab: (typeof node.getAttribute === 'function' ? (node.getAttribute('data-site-new-tab') === 'true' || node.getAttribute('target') === '_blank') : false),
  }
}

function urlProtocol(value) {
  try { return new URL(value.trim(), 'https://site.local/').protocol }
  catch { throw new Error('Informe um endereço válido.') }
}

export function validateContent(type, content) {
  const customId = (content.htmlId !== undefined ? content.htmlId : content.id)?.trim()
  if (customId && !/^[a-zA-Z][\w-]*$/.test(customId)) {
    throw new Error('O ID deve começar com uma letra e conter apenas letras, números, hifens ou sublinhados.')
  }
  if (type === 'image') {
    if (!content.src.trim()) throw new Error('Escolha uma imagem ou informe seu endereço.')
    const source = content.src.trim()
    const protocol = urlProtocol(source)
    if (!['http:', 'https:'].includes(protocol) && !/^data:image\/(png|jpe?g|gif|webp|avif|svg\+xml)[;,]/i.test(source)) {
      throw new Error('Use uma imagem enviada do computador ou um endereço http/https.')
    }
  }
  if (type === 'video') {
    if (!content.src || !content.src.trim()) throw new Error('Informe o endereço do arquivo ou página.')
    const source = content.src.trim()
    const protocol = urlProtocol(source)
    if (!['http:', 'https:'].includes(protocol) && !/^data:video\/(mp4|webm|ogg|quicktime)[;,]/i.test(source)) {
      throw new Error('Use um vídeo enviado do computador (.mp4, .webm, .ogg) ou um endereço http/https.')
    }
    if (content.poster && content.poster.trim()) {
      const poster = content.poster.trim()
      const posterProtocol = urlProtocol(poster)
      if (!['http:', 'https:'].includes(posterProtocol) && !/^data:image\/(png|jpe?g|gif|webp|avif|svg\+xml)[;,]/i.test(poster)) {
        throw new Error('Use uma imagem de capa válida (http/https ou enviada do computador).')
      }
    }
  }
  if (type === 'audio') {
    if (!content.src || !content.src.trim()) throw new Error('Informe o endereço do arquivo ou página.')
    const source = content.src.trim()
    const protocol = urlProtocol(source)
    if (!['http:', 'https:'].includes(protocol) && !/^data:audio\/(mpeg|mp3|wav|x-wav|ogg|webm|aac|mp4|flac)[;,]/i.test(source)) {
      throw new Error('Use um áudio enviado do computador (.mp3, .wav, .ogg) ou um endereço http/https.')
    }
  }
  if (type === 'iframe') {
    if (!content.src || !content.src.trim()) throw new Error('Informe o endereço do arquivo ou página.')
  }
  if (type === 'link') {
    if (content.href && !['http:', 'https:', 'mailto:', 'tel:', '#'].some((prefix) => content.href.trim().startsWith(prefix))) {
      throw new Error('Use um endereço http/https, mailto:, tel: ou #seção.')
    }
  }
  if (type !== 'button' || content.action === 'none') return
  if (!content.actionValue.trim()) throw new Error('Preencha o destino ou a mensagem do botão.')
  if (content.action === 'link' && !['http:', 'https:', 'mailto:', 'tel:'].includes(urlProtocol(content.actionValue))) {
    throw new Error('Use um endereço http/https, mailto:, tel: ou um caminho da página.')
  }
  if (content.action === 'scroll' && !content.actionValue.startsWith('#')) throw new Error('Escolha uma seção da página para o botão.')
}

const START = '// UEBIT-ACTIONS:START'
const END = '// UEBIT-ACTIONS:END'

export const ACTION_SCRIPT = `${START}
// Ações configuradas no editor visual. Seu código pode ficar acima ou abaixo.
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-site-action]');
  if (!button) return;
  const action = button.dataset.siteAction;
  const value = button.dataset.siteValue || '';
  if (action === 'link') {
    event.preventDefault();
    if (button.dataset.siteNewTab === 'true') window.open(value, '_blank', 'noopener,noreferrer');
    else window.location.href = value;
  }
  if (action === 'scroll') {
    event.preventDefault();
    const id = value.slice(1);
    const target = document.getElementById(id) || [...document.querySelectorAll('[data-block-id]')].find(node => node.dataset.blockId === id);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (action === 'message') {
    event.preventDefault();
    let notice = document.getElementById('site-message');
    if (!notice) {
      notice = document.createElement('output');
      notice.id = 'site-message';
      notice.setAttribute('role', 'status');
      Object.assign(notice.style, { position:'fixed', bottom:'24px', left:'50%', transform:'translateX(-50%)', maxWidth:'90vw', padding:'16px 24px', background:'#1e293b', color:'#fff', borderRadius:'12px', zIndex:'9999', fontFamily:'system-ui, sans-serif' });
      document.body.append(notice);
    }
    notice.textContent = value;
  }
});
${END}`

export function syncActionScript(js, document) {
  const start = js.indexOf(START)
  const end = js.indexOf(END, start)
  const hasActions = Boolean(document.querySelector('[data-site-action]'))
  if (start >= 0 && end >= start) {
    // The runtime reads HTML attributes, so content changes need no JS rewrite.
    // Preserve any manual edits made inside this section as well.
    if (hasActions || js.slice(start, end + END.length) !== ACTION_SCRIPT) return js
    return js.slice(0, start) + js.slice(end + END.length)
  }
  return hasActions ? `${js.trimEnd()}\n\n${ACTION_SCRIPT}\n` : js
}

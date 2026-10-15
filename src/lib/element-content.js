import { BOX_PROPERTIES } from './styles.js'

export function readContent(node) {
  const isList = node.tagName === 'UL' || node.tagName === 'OL'
  const listItems = isList
    ? Array.from(node.querySelectorAll('li')).map((li) => li.textContent ?? '').join('\n')
    : null

  return {
    name: node.getAttribute('data-name') ?? '',
    htmlId: node.id ?? '',
    text: listItems !== null ? listItems : node.tagName === 'INPUT' ? (node.getAttribute('value') ?? '') : (node.textContent ?? ''),
    headingLevel: /^H[1-6]$/.test(node.tagName) ? node.tagName.toLowerCase() : 'h1',
    src: node.getAttribute('src') ?? '',
    alt: node.getAttribute('alt') ?? '',
    placeholder: node.getAttribute('placeholder') ?? '',
    fit: node.style.objectFit || 'cover',
    appearance: { color: node.style.color, backgroundColor: node.style.backgroundColor, fontSize: node.style.fontSize,
      ...Object.fromEntries(BOX_PROPERTIES.filter((property) => node.style[property]).map((property) => [property, node.style[property]])) },
    action: node.getAttribute('data-site-action') ?? (node.tagName === 'A' ? 'link' : 'none'),
    actionValue: node.getAttribute('data-site-value') ?? node.getAttribute('href') ?? '',
    newTab: node.getAttribute('data-site-new-tab') === 'true' || node.getAttribute('target') === '_blank',
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
  if (['video', 'audio'].includes(type)) {
    if (!content.src || !content.src.trim()) throw new Error('Informe o endereço do arquivo de mídia.')
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

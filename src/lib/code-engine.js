import postcss from 'postcss'
import { cssProperty, STYLE_PROPERTIES, validateStyle } from './styles.js'
import { readContent, syncActionScript, validateContent } from './element-content.js'
import { DEFAULT_LAYOUT, findNode, flattenTree, mobileLayout } from './tree.js'

export const BASE_CSS = `/* Os elementos fluem em Flexbox; containers podem conter outros blocos. */
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; color: #1e293b; background: #fff; }
.site { display: flex; flex-direction: column; gap: 16px; padding: 24px; min-height: 480px; }
.site-block { min-width: 0; max-width: 100%; margin: 0; overflow-wrap: anywhere; }
`

export const COMPONENT_CSS_RULES = {
  heading: [['.heading', { padding: '12px', 'font-size': '36px', 'line-height': '1.25' }]],
  paragraph: [['.paragraph', { padding: '12px', 'font-size': '16px', 'line-height': '1.7' }]],
  quote: [['.quote', { padding: '16px 20px', 'border-left': '4px solid #6366f1', background: '#f8fafc', 'font-style': 'italic', 'font-size': '18px', 'line-height': '1.6' }]],
  list: [
    ['.list', { padding: '12px 28px', 'line-height': '1.7', 'font-size': '16px', margin: '0', 'list-style-type': 'disc' }],
    ['.list li', { 'margin-bottom': '6px' }],
  ],
  'ordered-list': [
    ['.ordered-list', { padding: '12px 28px', 'line-height': '1.7', 'font-size': '16px', margin: '0', 'list-style-type': 'decimal' }],
    ['.ordered-list li', { 'margin-bottom': '6px' }],
  ],
  break: [['.break', { display: 'block', width: '100%', height: '16px', margin: '2px 0', border: 'none' }]],
  link: [
    ['.link', { color: '#4f46e5', 'text-decoration': 'underline', 'font-size': '16px', padding: '4px 8px', 'font-weight': '600', cursor: 'pointer' }],
    ['.link:hover', { color: '#3730a3' }],
  ],
  strong: [['.strong', { 'font-weight': '800', 'font-size': '16px', padding: '4px 8px' }]],
  em: [['.em', { 'font-style': 'italic', 'font-size': '16px', padding: '4px 8px' }]],
  code: [['.code', { 'font-family': 'ui-monospace, monospace', background: '#f1f5f9', color: '#0f172a', padding: '4px 8px', 'font-size': '14px' }]],
  span: [['.span', { 'font-size': '16px', padding: '4px 8px' }]],
  image: [['.image', { width: '100%', height: 'auto', 'max-height': '400px', 'object-fit': 'cover' }]],
  video: [['.video', { width: '100%', 'max-height': '380px', 'object-fit': 'contain', background: '#0f172a' }]],
  audio: [['.audio', { width: '100%' }]],
  iframe: [['.iframe', { width: '100%', 'min-height': '320px', border: '1px solid #cbd5e1' }]],
  button: [['.button', { border: '0', padding: '12px 16px', background: '#4f46e5', color: 'white', font: 'inherit', cursor: 'pointer' }]],
  input: [['.input', { width: '100%', padding: '12px 16px', border: '1px solid #cbd5e1', 'font-size': '16px', 'font-family': 'inherit', background: '#fff' }]],
  textarea: [['.textarea', { width: '100%', 'min-height': '100px', padding: '12px 16px', border: '1px solid #cbd5e1', 'font-size': '16px', 'font-family': 'inherit', background: '#fff', resize: 'vertical' }]],
  select: [['.select', { width: '100%', padding: '12px 16px', border: '1px solid #cbd5e1', 'font-size': '16px', 'font-family': 'inherit', background: '#fff', cursor: 'pointer' }]],
  checkbox: [
    ['.checkbox', { display: 'inline-flex', 'align-items': 'center', gap: '8px', 'font-size': '16px', cursor: 'pointer', padding: '8px' }],
    ['.checkbox input[type="checkbox"]', { width: '18px', height: '18px', cursor: 'pointer' }],
  ],
  container: [['.container', { display: 'flex', 'flex-direction': 'column', 'flex-wrap': 'wrap', gap: '16px', padding: '24px', 'min-height': '120px', border: '1px solid #e2e8f0', background: 'transparent' }]],
  table: [
    ['.table', { width: '100%', 'border-collapse': 'collapse', 'font-size': '15px', margin: '8px 0' }],
    ['.table th, .table td', { border: '1px solid #cbd5e1', padding: '10px 14px', 'text-align': 'left' }],
    ['.table th', { background: '#f8fafc', 'font-weight': 'bold' }],
    ['.table tr:nth-child(even)', { background: '#f8fafc' }],
  ],
  divider: [['.divider', { width: '100%', border: '0', 'border-top': '2px solid #e2e8f0', margin: '12px 0' }]],
}

export const COMPONENT_MOBILE_RULES = {
  heading: [['.heading', { 'font-size': '28px' }]],
  container: [['.container', { 'flex-direction': 'column' }]],
}

export function defaultLayoutForType(type) {
  switch (type) {
    case 'container':
      return { ...DEFAULT_LAYOUT, gap: '16px', minHeight: '120px' }
    case 'image':
      return { ...DEFAULT_LAYOUT, width: '100%', maxHeight: '400px' }
    case 'video':
      return { ...DEFAULT_LAYOUT, width: '100%', maxHeight: '380px' }
    case 'iframe':
      return { ...DEFAULT_LAYOUT, width: '100%', minHeight: '320px' }
    case 'textarea':
      return { ...DEFAULT_LAYOUT, width: '100%', minHeight: '100px' }
    case 'audio':
    case 'input':
    case 'select':
    case 'table':
    case 'divider':
      return { ...DEFAULT_LAYOUT, width: '100%' }
    case 'break':
      return { ...DEFAULT_LAYOUT, width: '100%', height: '16px' }
    case 'checkbox':
      return { ...DEFAULT_LAYOUT, align: 'center', gap: '8px' }
    default:
      return { ...DEFAULT_LAYOUT }
  }
}

export function buildCssForHtml(html = '', extraCss = '') {
  const classes = new Set()
  for (const match of html.matchAll(/class="([^"]+)"/g)) {
    for (const token of match[1].split(/\s+/)) classes.add(token)
  }
  const rules = []
  const mobileRules = []
  for (const [type, list] of Object.entries(COMPONENT_CSS_RULES)) {
    if (classes.has(type)) {
      for (const [sel, decls] of list) {
        const body = Object.entries(decls).map(([k, v]) => `${k}: ${v};`).join(' ')
        rules.push(`${sel} { ${body} }`)
      }
    }
  }
  for (const [type, list] of Object.entries(COMPONENT_MOBILE_RULES)) {
    if (classes.has(type)) {
      for (const [sel, decls] of list) {
        const body = Object.entries(decls).map(([k, v]) => `${k}: ${v};`).join(' ')
        mobileRules.push(`  ${sel} { ${body} }`)
      }
    }
  }
  let out = BASE_CSS.trimEnd()
  if (rules.length) out += '\n' + rules.join('\n')
  if (mobileRules.length) out += `\n@media (max-width: 767px) {\n${mobileRules.join('\n')}\n}`
  if (extraCss) out += '\n' + extraCss.trim()
  return out + '\n'
}

export function createInitialCode() {
  return {
    html: `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Meu primeiro site</title><link rel="stylesheet" href="style.css"><script src="script.js" defer></script></head>
<body><main class="site" data-site-root></main></body></html>`,
    css: BASE_CSS,
    js: '// JavaScript dá vida à sua página. Escreva suas ações aqui.\n',
  }
}

const excluded = ['SCRIPT', 'STYLE', 'LINK', 'META', 'TITLE', 'BASE']
export const isContainer = (node) => ['DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER', 'NAV', 'ASIDE', 'MAIN', 'FORM'].includes(node.tagName)
const childrenOf = (node) => [...node.children].filter((child) => !excluded.includes(child.tagName))

export function parseHTML(html) {
  const document = new DOMParser().parseFromString(html, 'text/html')
  const root = document.querySelector('[data-site-root], .site') ?? document.body
  const collect = (parent) => childrenOf(parent).flatMap((node) => [node, ...(isContainer(node) ? collect(node) : [])])
  return { document, root, nodes: collect(root) }
}

export function blockId(node, index) {
  return node.getAttribute('data-block-id') || node.id || `import-${index + 1}`
}

// Add stable identities without touching layout or manually authored content.
export function identifyCodeElements(code) {
  const { document, nodes } = parseHTML(code.html)
  for (const [index, node] of nodes.entries()) node.setAttribute('data-block-id', blockId(node, index))
  return { ...code, html: '<!doctype html>\n' + document.documentElement.outerHTML }
}

function appliesAt(rule, width) {
  for (let parent = rule.parent; parent; parent = parent.parent) {
    if (parent.type !== 'atrule') continue
    if (parent.name.endsWith('keyframes')) return false
    if (parent.name === 'media') {
      const conditions = [...parent.params.matchAll(/(min|max)-width\s*:\s*([\d.]+)px/gi)]
      if (conditions.some(([, limit, size]) => limit === 'max' ? width > Number(size) : width < Number(size))) return false
    }
  }
  return true
}

function layoutFor(node, css, width) {
  const values = new Map()
  css.walkRules((rule) => {
    if (!appliesAt(rule, width)) return
    try { if (node.matches(rule.selector)) rule.walkDecls((decl) => values.set(decl.prop, decl.value)) } catch { /* Preserve incomplete selectors. */ }
  })
  for (const property of node.style) values.set(property, node.style.getPropertyValue(property))
  return {
    direction: values.get('flex-direction') ?? DEFAULT_LAYOUT.direction,
    justify: values.get('justify-content') ?? DEFAULT_LAYOUT.justify,
    align: values.get('align-items') ?? DEFAULT_LAYOUT.align,
    gap: values.get('gap') ?? DEFAULT_LAYOUT.gap,
    width: values.get('width') ?? DEFAULT_LAYOUT.width,
    height: values.get('height') ?? DEFAULT_LAYOUT.height,
    maxHeight: values.get('max-height') ?? DEFAULT_LAYOUT.maxHeight,
    flexShrink: values.get('flex-shrink') ?? DEFAULT_LAYOUT.flexShrink,
    minHeight: values.get('min-height') ?? (isContainer(node) ? '120px' : DEFAULT_LAYOUT.minHeight),
  }
}

export function readCode(code) {
  const css = postcss.parse(code.css, { from: 'style.css' })
  const { root, nodes } = parseHTML(code.html)
  const ids = new Map(nodes.map((node, index) => [node, blockId(node, index)]))
  const seen = new Set()
  const read = (parent) => childrenOf(parent).map((node) => {
    const id = ids.get(node)
    if (seen.has(id)) throw new Error(`HTML: o identificador "${id}" está repetido. Use um identificador diferente em cada bloco.`)
    seen.add(id)
    const type = isContainer(node) ? 'container' : ({
      H1: 'heading', H2: 'heading', H3: 'heading', H4: 'heading', H5: 'heading', H6: 'heading',
      P: 'paragraph',
      IMG: 'image',
      BUTTON: 'button',
      A: node.getAttribute('data-site-action') ? 'button' : 'link',
      BLOCKQUOTE: 'quote',
      UL: 'list',
      OL: 'ordered-list',
      VIDEO: 'video',
      AUDIO: 'audio',
      INPUT: node.getAttribute('type') === 'checkbox' ? 'checkbox' : 'input',
      LABEL: node.querySelector?.('input[type="checkbox"]') ? 'checkbox' : 'custom',
      HR: 'divider',
      BR: 'break',
      STRONG: 'strong',
      B: 'strong',
      EM: 'em',
      I: 'em',
      CODE: 'code',
      PRE: 'code',
      SPAN: 'span',
      TEXTAREA: 'textarea',
      SELECT: 'select',
      TABLE: 'table',
      IFRAME: 'iframe',
    }[node.tagName] ?? 'custom')
    const layout = layoutFor(node, css, 1280)
    const mobile = layoutFor(node, css, 390)
    const custom = node.getAttribute('data-mobile-custom')
    return { id, type, ...readContent(node), layout, mobileLayout: mobile, mobileCustomized: custom === 'true' || (custom === null && JSON.stringify(mobile) !== JSON.stringify(layout)), children: type === 'container' ? read(node) : [] }
  })
  return read(root)
}

function createNode(document, element) {
  const containerTags = ['section', 'article', 'header', 'footer', 'nav', 'aside', 'main', 'form']
  const tag = (element.tagName && containerTags.includes(element.tagName.toLowerCase()))
    ? element.tagName.toLowerCase()
    : ({
        heading: element.headingLevel || 'h1',
        paragraph: 'p',
        image: 'img',
        button: 'button',
        container: 'div',
        quote: 'blockquote',
        list: 'ul',
        'ordered-list': 'ol',
        video: 'video',
        audio: 'audio',
        input: 'input',
        textarea: 'textarea',
        select: 'select',
        checkbox: 'label',
        table: 'table',
        iframe: 'iframe',
        break: 'br',
        link: 'a',
        strong: 'strong',
        em: 'em',
        code: 'code',
        span: 'span',
        divider: 'hr',
      }[element.type] ?? 'div')
  const node = document.createElement(tag)
  node.className = `site-block ${element.type}`
  if (element.type === 'image') {
    node.setAttribute('src', element.src || '')
    node.setAttribute('alt', element.alt || '')
  } else if (element.type === 'video') {
    node.setAttribute('src', element.src || '')
    if (element.controls !== false) node.setAttribute('controls', '')
    if (element.autoplay) node.setAttribute('autoplay', '')
    if (element.loop) node.setAttribute('loop', '')
    if (element.muted) node.setAttribute('muted', '')
    if (element.playsInline !== false) node.setAttribute('playsinline', '')
    if (element.poster) node.setAttribute('poster', element.poster)
    if (element.fit) node.style.objectFit = element.fit === 'contain' ? 'contain' : 'cover'
  } else if (element.type === 'audio') {
    node.setAttribute('src', element.src || '')
    if (element.controls !== false) node.setAttribute('controls', '')
    if (element.autoplay) node.setAttribute('autoplay', '')
    if (element.loop) node.setAttribute('loop', '')
    if (element.muted) node.setAttribute('muted', '')
  } else if (element.type === 'iframe') {
    node.setAttribute('src', element.src || 'https://example.com')
    node.setAttribute('loading', 'lazy')
  } else if (element.type === 'input') {
    node.setAttribute('type', 'text')
    node.setAttribute('placeholder', element.placeholder || 'Digite aqui...')
    if (element.text) node.setAttribute('value', element.text)
  } else if (element.type === 'textarea') {
    node.setAttribute('placeholder', element.placeholder || 'Digite aqui...')
    if (element.text) node.textContent = element.text
  } else if (element.type === 'select') {
    const rawOptions = (element.text || 'Opção 1\nOpção 2\nOpção 3').split('\n').filter(Boolean)
    for (const opt of rawOptions) {
      const option = document.createElement('option')
      option.textContent = opt
      option.value = opt
      node.append(option)
    }
  } else if (element.type === 'checkbox') {
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    if (element.checked) input.setAttribute('checked', '')
    const span = document.createElement('span')
    span.textContent = element.text || 'Concordo com os termos'
    node.append(input, span)
  } else if (element.type === 'link') {
    node.setAttribute('href', element.href || element.actionValue || 'https://')
    if (element.newTab) {
      node.setAttribute('target', '_blank')
      node.setAttribute('rel', 'noopener noreferrer')
    }
    node.textContent = element.text || 'Link'
  } else if (['list', 'ordered-list'].includes(element.type)) {
    const defaultList = element.type === 'ordered-list' ? 'Passo 1\nPasso 2\nPasso 3' : 'Item 1\nItem 2\nItem 3'
    const rawItems = (element.text || defaultList).split('\n').filter(Boolean)
    for (const item of rawItems) {
      const li = document.createElement('li')
      li.textContent = item
      node.append(li)
    }
  } else if (element.type === 'table') {
    const lines = (element.text || 'Nome, Função, Nível\nBit, Mascote, Mestre\nDev, Criador, Júnior').split('\n').filter(Boolean)
    if (lines.length > 0) {
      const thead = document.createElement('thead')
      const tr = document.createElement('tr')
      for (const col of lines[0].split(',').map((s) => s.trim())) {
        const th = document.createElement('th')
        th.textContent = col
        tr.append(th)
      }
      thead.append(tr)
      node.append(thead)
    }
    if (lines.length > 1) {
      const tbody = document.createElement('tbody')
      for (const line of lines.slice(1)) {
        const tr = document.createElement('tr')
        for (const col of line.split(',').map((s) => s.trim())) {
          const td = document.createElement('td')
          td.textContent = col
          tr.append(td)
        }
        tbody.append(tr)
      }
      node.append(tbody)
    }
  } else if (!['container', 'divider', 'break'].includes(element.type)) {
    node.textContent = element.text ?? ''
  }
  if (element.type === 'button') node.setAttribute('type', 'button')
  if (element.name) node.setAttribute('data-name', element.name)
  if (element.htmlId) node.id = element.htmlId
  return node
}

const properties = { direction: 'flex-direction', justify: 'justify-content', align: 'align-items', gap: 'gap', width: 'width', height: 'height', minHeight: 'min-height', maxHeight: 'max-height', flexShrink: 'flex-shrink' }
const managedLayoutProps = new Set([...Object.values(properties), 'min-width', 'max-width', 'flex-wrap'])

function syncLayoutRule(parent, selector, declarations) {
  let rule = parent.nodes?.find((node) => node.type === 'rule' && node.selector === selector)
  if (rule) {
    rule.walkDecls((decl) => {
      if (managedLayoutProps.has(decl.prop) || (decl.prop === 'display' && decl.value === 'flex')) {
        decl.remove()
      }
    })
  }
  const entries = Object.entries(declarations)
  if (entries.length > 0) {
    if (!rule) {
      rule = postcss.rule({ selector })
      parent.append(rule)
    }
    for (const [prop, value] of entries) {
      rule.walkDecls(prop, (decl) => decl.remove())
      rule.append({ prop, value })
    }
  } else if (rule && rule.nodes.length === 0) {
    rule.remove()
  }
}

// Reparent existing DOM nodes rather than rebuilding their content or custom attributes.
export function writeVisualCode(code, elements) {
  const { document, root: originalRoot, nodes } = parseHTML(code.html)
  let root = originalRoot
  if (root === document.body) {
    root = document.createElement('main'); root.className = 'site'; root.setAttribute('data-site-root', '')
    document.body.prepend(root)
  }
  root.setAttribute('data-site-root', '')
  const existing = new Map(nodes.map((node, index) => [blockId(node, index), node]))
  const css = postcss.parse(code.css || BASE_CSS, { from: 'style.css' })
  const all = flattenTree(elements)
  const usedTypes = new Set(all.map((element) => element.type))
  const retained = new Set(all.map((element) => element.id))
  const removedSelectors = new Set()
  for (const [id, node] of existing) if (!retained.has(id)) {
    removedSelectors.add(`[data-block-id="${CSS.escape(id)}"]`)
    if (node.id) removedSelectors.add(`#${CSS.escape(node.id)}`)
    node.remove()
  }
  css.walkRules((rule) => { if (removedSelectors.has(rule.selector)) rule.remove() })
  const legacyGrid = css.toString().includes('grid-template-columns')
  // Migrate managed grid positioning, including old generated responsive rules.
  const managed = [root, ...nodes]
  css.walkRules((rule) => {
    let matches = false
    try { matches = managed.some((node) => node.matches(rule.selector)) } catch { /* Keep custom selectors. */ }
    if (matches) rule.walkDecls((decl) => { if (decl.prop.startsWith('grid-') || (decl.prop === 'display' && decl.value === 'grid')) decl.remove() })
    if (legacyGrid && rule.selector === '.image') rule.walkDecls((decl) => {
      if (decl.prop === 'contain' && decl.value === 'size') decl.remove()
      if (decl.prop === 'height' && decl.value === '100%') decl.value = 'auto'
    })
  })
  let media = css.nodes.findLast((node) => node.type === 'atrule' && node.name === 'media' && node.params === '(max-width: 767px)')
  if (!media) { media = postcss.atRule({ name: 'media', params: '(max-width: 767px)' }); css.append(media) }

  // Prune unused component rules and inject used component rules on demand
  const unusedClassSelectors = new Set()
  for (const [type, list] of Object.entries(COMPONENT_CSS_RULES)) {
    if (!usedTypes.has(type)) {
      for (const [sel] of list) unusedClassSelectors.add(sel)
    }
  }
  const unusedMobileSelectors = new Set(['.site-block'])
  for (const [type, list] of Object.entries(COMPONENT_MOBILE_RULES)) {
    if (!usedTypes.has(type)) {
      for (const [sel] of list) unusedMobileSelectors.add(sel)
    }
  }
  css.nodes?.forEach((node) => {
    if (node.type === 'rule' && (unusedClassSelectors.has(node.selector) || (node.selector === '[data-site-root]' && root.classList.contains('site')))) {
      node.remove()
    }
  })
  media.nodes?.forEach((node) => {
    if (node.type === 'rule' && unusedMobileSelectors.has(node.selector)) {
      node.remove()
    }
  })

  const anchorNode = css.nodes?.find((node) =>
    (node.type === 'rule' && (node.selector.startsWith('#') || node.selector.startsWith('[data-block-id'))) ||
    (node.type === 'atrule' && node.name === 'media') ||
    (node.type === 'comment' && node.text.startsWith('UEBIT-GLOBAL:'))
  )
  for (const [type, list] of Object.entries(COMPONENT_CSS_RULES)) {
    if (!usedTypes.has(type)) continue
    for (const [sel, decls] of list) {
      const exists = css.nodes?.some((node) => node.type === 'rule' && node.selector === sel)
      if (!exists) {
        const rule = postcss.rule({ selector: sel })
        for (const [prop, value] of Object.entries(decls)) rule.append({ prop, value })
        if (anchorNode && anchorNode.parent === css) css.insertBefore(anchorNode, rule)
        else css.append(rule)
      }
    }
  }
  for (const [type, list] of Object.entries(COMPONENT_MOBILE_RULES)) {
    if (!usedTypes.has(type)) continue
    for (const [sel, decls] of list) {
      const exists = media.nodes?.some((node) => node.type === 'rule' && node.selector === sel)
      if (!exists) {
        const rule = postcss.rule({ selector: sel })
        for (const [prop, value] of Object.entries(decls)) rule.append({ prop, value })
        media.prepend(rule)
      }
    }
  }

  for (const property of [...root.style]) if (property.startsWith('grid-') || property === 'display') root.style.removeProperty(property)
  if (!root.classList.contains('site')) {
    syncLayoutRule(css, '[data-site-root]', { display: 'flex', 'flex-direction': 'column', gap: '16px', 'min-height': '480px' })
  }
  const place = (siblings, parent) => {
    for (const element of siblings) {
      const node = existing.get(element.id) ?? createNode(document, element)
      node.setAttribute('data-block-id', element.id)
      if (element.name) node.setAttribute('data-name', element.name)
      else node.removeAttribute('data-name')
      if (element.htmlId) node.id = element.htmlId
      node.setAttribute('data-mobile-custom', String(Boolean(element.mobileCustomized)))
      parent.append(node)
      const selector = node.id ? `#${CSS.escape(node.id)}` : `[data-block-id="${CSS.escape(element.id)}"]`
      if (node.id) {
        const blockSelector = `[data-block-id="${CSS.escape(element.id)}"]`
        css.walkRules((rule) => { if (rule.selector === blockSelector) rule.remove() })
      }
      for (const prop of [...node.style]) if (prop.startsWith('grid-') || Object.values(properties).includes(prop) || (element.type === 'container' && prop === 'display' && node.style.display !== 'none')) node.style.removeProperty(prop)
      const baseLayout = defaultLayoutForType(element.type)
      const desktopDecls = {}
      for (const [key, prop] of Object.entries(properties)) {
        const val = element.layout?.[key] ?? baseLayout[key]
        if (val !== baseLayout[key]) desktopDecls[prop] = val
      }
      syncLayoutRule(css, selector, desktopDecls)

      const mob = mobileLayout(element)
      const mobileDecls = {}
      for (const [key, prop] of Object.entries(properties)) {
        const mobVal = mob[key] ?? baseLayout[key]
        const inherited = element.type === 'container' && key === 'direction' && !desktopDecls[prop]
          ? 'column'
          : (element.layout?.[key] ?? baseLayout[key])
        if (mobVal !== inherited) mobileDecls[prop] = mobVal
      }
      syncLayoutRule(media, selector, mobileDecls)
      if (element.type === 'container') place(element.children, node)
    }
  }
  place(elements, root)
  media.remove()
  if (media.nodes && media.nodes.length > 0) css.append(media)
  return { html: '<!doctype html>\n' + document.documentElement.outerHTML, css: css.toString(), js: syncActionScript(code.js, document) }
}

export function updateElementContent(code, id, patch) {
  const { document, nodes } = parseHTML(code.html)
  let node = nodes.find((candidate, index) => blockId(candidate, index) === id)
  if (!node) throw new Error('Selecione um elemento da página para editar.')
  const element = findNode(readCode(code), id)
  const content = { ...element, ...patch }
  validateContent(element.type, content)

  if (patch.name !== undefined) {
    const trimmedName = (patch.name || '').trim()
    if (trimmedName) node.setAttribute('data-name', trimmedName)
    else node.removeAttribute('data-name')
  }

  let cssText = code.css
  const requestedId = (patch.htmlId !== undefined ? patch.htmlId : patch.id)?.trim()
  if (requestedId !== undefined) {
    const oldNodeId = node.id || ''
    const oldBlockId = node.getAttribute('data-block-id') || id
    if (requestedId && requestedId !== oldNodeId && requestedId !== oldBlockId) {
      const conflict = nodes.find((candidate, index) => candidate !== node && (candidate.id === requestedId || blockId(candidate, index) === requestedId))
      if (conflict) throw new Error(`Já existe um elemento com o ID "${requestedId}". Escolha um identificador diferente.`)
    }

    if (requestedId) {
      node.id = requestedId
      node.setAttribute('data-block-id', requestedId)
    } else {
      node.removeAttribute('id')
    }

    const nextEffectiveId = requestedId || node.getAttribute('data-block-id') || id
    if (nextEffectiveId !== id || (requestedId && requestedId !== oldNodeId)) {
      const css = postcss.parse(cssText || BASE_CSS, { from: 'style.css' })
      const oldSelectors = new Set([
        `[data-block-id="${CSS.escape(id)}"]`,
        `[data-block-id="${CSS.escape(oldBlockId)}"]`,
        ...(oldNodeId ? [`#${CSS.escape(oldNodeId)}`] : []),
      ])
      const newSelector = requestedId ? `#${CSS.escape(requestedId)}` : `[data-block-id="${CSS.escape(nextEffectiveId)}"]`

      css.walkRules((rule) => {
        if (oldSelectors.has(rule.selector)) rule.selector = newSelector
      })
      cssText = css.toString()

      const oldTargets = [id, oldBlockId, oldNodeId].filter(Boolean)
      for (const targetId of oldTargets) {
        document.querySelectorAll(`[data-site-value="#${CSS.escape(targetId)}"]`).forEach((btn) => {
          btn.setAttribute('data-site-value', `#${nextEffectiveId}`)
          if (btn.tagName === 'A') btn.setAttribute('href', `#${nextEffectiveId}`)
        })
      }
    }
  }

  if (element.type === 'heading' && /^h[1-6]$/.test(content.headingLevel) && node.tagName.toLowerCase() !== content.headingLevel) {
    const replacement = document.createElement(content.headingLevel)
    for (const attribute of node.attributes) replacement.setAttribute(attribute.name, attribute.value)
    replacement.append(...node.childNodes); node.replaceWith(replacement); node = replacement
  }
  if (element.type === 'container' && content.tagName && content.tagName.toLowerCase() !== node.tagName.toLowerCase()) {
    const replacement = document.createElement(content.tagName.toLowerCase())
    for (const attribute of node.attributes) replacement.setAttribute(attribute.name, attribute.value)
    replacement.append(...node.childNodes); node.replaceWith(replacement); node = replacement
  }
  if (['heading', 'paragraph', 'button', 'quote', 'strong', 'em', 'code', 'span', 'link'].includes(element.type) && content.text !== undefined && content.text !== element.text) {
    node.textContent = content.text
    if (content.text.includes('\n')) node.style.whiteSpace = 'pre-wrap'
  }
  if (element.type === 'link') {
    if (content.href !== undefined) node.setAttribute('href', content.href.trim())
    if (content.newTab !== undefined) {
      if (content.newTab) {
        node.setAttribute('target', '_blank')
        node.setAttribute('rel', 'noopener noreferrer')
      } else {
        node.removeAttribute('target')
        node.removeAttribute('rel')
      }
    }
  }
  if (['list', 'ordered-list'].includes(element.type) && content.text !== undefined && content.text !== element.text) {
    node.replaceChildren()
    const items = content.text.split('\n').filter(Boolean)
    for (const item of items) {
      const li = document.createElement('li')
      li.textContent = item
      node.append(li)
    }
  }
  if (element.type === 'input') {
    if (content.placeholder !== undefined) node.setAttribute('placeholder', content.placeholder)
    if (content.text !== undefined) node.setAttribute('value', content.text)
  }
  if (element.type === 'textarea') {
    if (content.placeholder !== undefined) node.setAttribute('placeholder', content.placeholder)
    if (content.text !== undefined) node.textContent = content.text
  }
  if (element.type === 'select' && content.text !== undefined && content.text !== element.text) {
    node.replaceChildren()
    const options = content.text.split('\n').filter(Boolean)
    for (const opt of options) {
      const option = document.createElement('option')
      option.textContent = opt
      option.value = opt
      node.append(option)
    }
  }
  if (element.type === 'checkbox') {
    const input = node.querySelector?.('input[type="checkbox"]') || (node.tagName === 'INPUT' ? node : null)
    if (input && content.checked !== undefined) {
      if (content.checked) input.setAttribute('checked', '')
      else input.removeAttribute('checked')
    }
    const span = node.querySelector?.('span')
    if (span && content.text !== undefined) span.textContent = content.text
  }
  if (element.type === 'table' && content.text !== undefined && content.text !== element.text) {
    node.replaceChildren()
    const lines = content.text.split('\n').filter(Boolean)
    if (lines.length > 0) {
      const thead = document.createElement('thead')
      const tr = document.createElement('tr')
      for (const col of lines[0].split(',').map((s) => s.trim())) {
        const th = document.createElement('th')
        th.textContent = col
        tr.append(th)
      }
      thead.append(tr)
      node.append(thead)
    }
    if (lines.length > 1) {
      const tbody = document.createElement('tbody')
      for (const line of lines.slice(1)) {
        const tr = document.createElement('tr')
        for (const col of line.split(',').map((s) => s.trim())) {
          const td = document.createElement('td')
          td.textContent = col
          tr.append(td)
        }
        tbody.append(tr)
      }
      node.append(tbody)
    }
  }
  if (content.hidden !== undefined) {
    if (content.hidden) {
      node.style.display = 'none'
    } else {
      if (node.style.display === 'none') node.style.removeProperty('display')
      node.removeAttribute('hidden')
    }
  }
  if (['video', 'audio', 'iframe'].includes(element.type)) {
    if (content.src !== undefined) node.setAttribute('src', content.src.trim())
  }
  if (['video', 'audio'].includes(element.type)) {
    for (const [key, attr] of [['controls', 'controls'], ['autoplay', 'autoplay'], ['loop', 'loop'], ['muted', 'muted']]) {
      if (content[key] !== undefined) {
        if (content[key]) node.setAttribute(attr, '')
        else node.removeAttribute(attr)
      }
    }
  }
  if (element.type === 'video') {
    if (content.playsInline !== undefined) {
      if (content.playsInline) node.setAttribute('playsinline', '')
      else node.removeAttribute('playsinline')
    }
    if (content.poster !== undefined) {
      const poster = content.poster.trim()
      if (poster) node.setAttribute('poster', poster)
      else node.removeAttribute('poster')
    }
    if (content.fit !== undefined) {
      node.style.objectFit = content.fit === 'contain' ? 'contain' : 'cover'
    }
  }
  if (element.type === 'image') {
    if (content.src !== undefined) node.setAttribute('src', content.src.trim())
    if (content.alt !== undefined) node.setAttribute('alt', content.alt)
    node.removeAttribute('srcset'); node.removeAttribute('sizes')
    node.style.objectFit = content.fit === 'contain' ? 'contain' : 'cover'
  }
  if (element.type === 'button') {
    for (const attribute of ['data-site-action', 'data-site-value', 'data-site-new-tab']) node.removeAttribute(attribute)
    if (['link', 'scroll', 'message'].includes(content.action)) {
      node.setAttribute('data-site-action', content.action); node.setAttribute('data-site-value', content.actionValue.trim())
      if (content.action === 'link' && content.newTab) node.setAttribute('data-site-new-tab', 'true')
    }
    if (node.tagName === 'A') {
      if (['link', 'scroll'].includes(content.action)) node.setAttribute('href', content.actionValue.trim())
      else node.removeAttribute('href')
      if (content.newTab && content.action === 'link') { node.setAttribute('target', '_blank'); node.setAttribute('rel', 'noopener noreferrer') }
      else node.removeAttribute('target')
    }
  }
  return { ...code, html: '<!doctype html>\n' + document.documentElement.outerHTML, css: cssText, js: syncActionScript(code.js, document) }
}

export function updateElementAppearance(code, id, property, value) {
  const entries = typeof property === 'object' && property !== null ? Object.entries(property) : [[property, value]]
  for (const [prop, val] of entries) validateStyle(prop, val)
  const { document, nodes } = parseHTML(code.html)
  const node = nodes.find((candidate, index) => blockId(candidate, index) === id)
  if (!node) throw new Error('Selecione um elemento para personalizar.')
  for (const [prop, val] of entries) {
    node.style[prop] = val
  }
  return { ...code, html: '<!doctype html>\n' + document.documentElement.outerHTML }
}

export function readGlobalStyles(code, selector) {
  const css = postcss.parse(code.css)
  const style = document.createElement('div').style
  css.walkRules((rule) => {
    if (rule.parent === css && rule.selector === selector) {
      rule.walkDecls((decl) => style.setProperty(decl.prop, decl.value, decl.important ? 'important' : ''))
    }
  })
  return Object.fromEntries(STYLE_PROPERTIES.map((property) => [property, style[property] || '']))
}

export function updateGlobalStyle(code, selector, property, value) {
  if (!['body', '*'].includes(selector)) throw new Error('Seletor global inválido.')
  const entries = typeof property === 'object' && property !== null ? Object.entries(property) : [[property, value]]
  for (const [prop, val] of entries) validateStyle(prop, val)
  const css = postcss.parse(code.css)
  const marker = `UEBIT-GLOBAL:${selector}`
  let rule = css.nodes.find((node) => node.type === 'rule' && node.selector === selector && node.prev()?.text === marker)
  const hasAnyValue = entries.some(([, val]) => Boolean(val))
  if (!rule && hasAnyValue) {
    css.append(postcss.comment({ text: marker }))
    rule = postcss.rule({ selector })
    css.append(rule)
  }
  if (rule) {
    for (const [prop, val] of entries) {
      rule.walkDecls(cssProperty(prop), (decl) => decl.remove())
      if (val) rule.append({ prop: cssProperty(prop), value: val })
    }
    if (!rule.nodes.length) { rule.prev().remove(); rule.remove() }
  }
  return { ...code, css: css.toString() }
}

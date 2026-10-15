import postcss from 'postcss'
import { cssProperty, STYLE_PROPERTIES, validateStyle } from './styles.js'
import { readContent, syncActionScript, validateContent } from './element-content.js'
import { DEFAULT_LAYOUT, findNode, flattenTree, mobileLayout } from './tree.js'

export const BASE_CSS = `/* Os elementos fluem em Flexbox; containers podem conter outros blocos. */
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; color: #1e293b; background: #fff; }
.site { display: flex; flex-direction: column; gap: 16px; padding: 24px; min-height: 480px; }
.site-block { min-width: 0; max-width: 100%; margin: 0; overflow-wrap: anywhere; border-radius: 12px; }
.heading { padding: 12px; font-size: 36px; line-height: 1.25; }
.paragraph { padding: 12px; font-size: 16px; line-height: 1.7; }
.quote { padding: 16px 20px; border-left: 4px solid #6366f1; background: #f8fafc; font-style: italic; font-size: 18px; line-height: 1.6; }
.list { padding: 12px 28px; line-height: 1.7; font-size: 16px; margin: 0; list-style-type: disc; }
.list li { margin-bottom: 6px; }
.image { width: 100%; height: auto; max-height: 400px; object-fit: cover; }
.video { width: 100%; max-height: 380px; object-fit: contain; border-radius: 12px; background: #0f172a; }
.audio { width: 100%; border-radius: 12px; }
.button { border: 0; padding: 12px 16px; background: #4f46e5; color: white; font: inherit; cursor: pointer; }
.input { width: 100%; padding: 12px 16px; border: 2px solid #cbd5e1; border-radius: 10px; font-size: 16px; font-family: inherit; background: #fff; }
.container { display: flex; flex-direction: column; flex-wrap: wrap; gap: 16px; padding: 24px; min-height: 120px; border: 2px dashed #86b89c; background: #f0fdf4; }
.divider { width: 100%; border: 0; border-top: 2px solid #e2e8f0; margin: 12px 0; }
@media (max-width: 767px) {
  .heading { font-size: 28px; }
  .container { flex-direction: column; }
  .site-block { max-width: 100%; }
}
`

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
export const isContainer = (node) => ['DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER', 'NAV', 'ASIDE', 'MAIN'].includes(node.tagName)
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
      A: 'button',
      BLOCKQUOTE: 'quote',
      UL: 'list',
      OL: 'list',
      VIDEO: 'video',
      AUDIO: 'audio',
      INPUT: 'input',
      HR: 'divider',
    }[node.tagName] ?? 'custom')
    const layout = layoutFor(node, css, 1280)
    const mobile = layoutFor(node, css, 390)
    const custom = node.getAttribute('data-mobile-custom')
    return { id, type, ...readContent(node), layout, mobileLayout: mobile, mobileCustomized: custom === 'true' || (custom === null && JSON.stringify(mobile) !== JSON.stringify(layout)), children: type === 'container' ? read(node) : [] }
  })
  return read(root)
}

function createNode(document, element) {
  const tag = {
    heading: 'h1',
    paragraph: 'p',
    image: 'img',
    button: 'button',
    container: 'div',
    quote: 'blockquote',
    list: 'ul',
    video: 'video',
    audio: 'audio',
    input: 'input',
    divider: 'hr',
  }[element.type] ?? 'div'
  const node = document.createElement(element.tagName === 'section' ? 'section' : tag)
  node.className = `site-block ${element.type}`
  if (element.type === 'image') {
    node.setAttribute('src', element.src || '')
    node.setAttribute('alt', element.alt || '')
  } else if (element.type === 'video') {
    node.setAttribute('src', element.src || '')
    node.setAttribute('controls', '')
  } else if (element.type === 'audio') {
    node.setAttribute('src', element.src || '')
    node.setAttribute('controls', '')
  } else if (element.type === 'input') {
    node.setAttribute('type', 'text')
    node.setAttribute('placeholder', element.placeholder || 'Digite aqui...')
    if (element.text) node.setAttribute('value', element.text)
  } else if (element.type === 'list') {
    const rawItems = (element.text || 'Item 1\nItem 2\nItem 3').split('\n').filter(Boolean)
    for (const item of rawItems) {
      const li = document.createElement('li')
      li.textContent = item
      node.append(li)
    }
  } else if (element.type !== 'container' && element.type !== 'divider') {
    node.textContent = element.text ?? ''
  }
  if (element.type === 'button') node.setAttribute('type', 'button')
  if (element.name) node.setAttribute('data-name', element.name)
  if (element.htmlId) node.id = element.htmlId
  return node
}

const properties = { direction: 'flex-direction', justify: 'justify-content', align: 'align-items', gap: 'gap', width: 'width', height: 'height', minHeight: 'min-height', maxHeight: 'max-height', flexShrink: 'flex-shrink' }
function updateRule(parent, selector, declarations) {
  let rule = parent.nodes?.find((node) => node.type === 'rule' && node.selector === selector)
  if (!rule) { rule = postcss.rule({ selector }); parent.append(rule) }
  for (const [prop, value] of Object.entries(declarations)) {
    rule.walkDecls(prop, (decl) => decl.remove())
    rule.append({ prop, value })
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
  for (const property of [...root.style]) if (property.startsWith('grid-') || property === 'display') root.style.removeProperty(property)
  updateRule(css, '[data-site-root]', { display: 'flex', 'flex-direction': 'column', gap: '16px', 'min-height': '480px' })
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
      for (const prop of [...node.style]) if (prop.startsWith('grid-') || Object.values(properties).includes(prop) || (element.type === 'container' && prop === 'display')) node.style.removeProperty(prop)
      const declarations = (layout) => Object.fromEntries(Object.entries(properties).map(([key, prop]) => [prop, layout[key] ?? DEFAULT_LAYOUT[key]]))
      updateRule(css, selector, { ...declarations(element.layout), 'min-width': '0', 'max-width': '100%', ...(element.type === 'container' ? { display: 'flex', 'flex-wrap': 'wrap' } : {}) })
      updateRule(media, selector, declarations(mobileLayout(element)))
      if (element.type === 'container') place(element.children, node)
    }
  }
  place(elements, root)
  media.remove(); css.append(media)
  return { html: '<!doctype html>\n' + document.documentElement.outerHTML, css: css.toString(), js: syncActionScript(code.js, document) }
}

export function updateElementContent(code, id, content) {
  const { document, nodes } = parseHTML(code.html)
  let node = nodes.find((candidate, index) => blockId(candidate, index) === id)
  if (!node) throw new Error('Selecione um elemento da página para editar.')
  const element = findNode(readCode(code), id)
  validateContent(element.type, content)

  if (content.name !== undefined) {
    const trimmedName = (content.name || '').trim()
    if (trimmedName) node.setAttribute('data-name', trimmedName)
    else node.removeAttribute('data-name')
  }

  let cssText = code.css
  const requestedId = (content.htmlId !== undefined ? content.htmlId : content.id)?.trim()
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
  if (['heading', 'paragraph', 'button', 'quote'].includes(element.type) && content.text !== undefined && content.text !== element.text) {
    node.textContent = content.text
    if (content.text.includes('\n')) node.style.whiteSpace = 'pre-wrap'
  }
  if (element.type === 'list' && content.text !== undefined && content.text !== element.text) {
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
  if (['video', 'audio'].includes(element.type)) {
    if (content.src !== undefined) node.setAttribute('src', content.src.trim())
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
  validateStyle(property, value)
  const { document, nodes } = parseHTML(code.html)
  const node = nodes.find((candidate, index) => blockId(candidate, index) === id)
  if (!node) throw new Error('Selecione um elemento para personalizar.')
  node.style[property] = value
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
  validateStyle(property, value)
  const css = postcss.parse(code.css)
  const marker = `UEBIT-GLOBAL:${selector}`
  let rule = css.nodes.find((node) => node.type === 'rule' && node.selector === selector && node.prev()?.text === marker)
  if (!rule && value) {
    css.append(postcss.comment({ text: marker }))
    rule = postcss.rule({ selector })
    css.append(rule)
  }
  if (rule) {
    rule.walkDecls(cssProperty(property), (decl) => decl.remove())
    if (value) rule.append({ prop: cssProperty(property), value })
    if (!rule.nodes.length) { rule.prev().remove(); rule.remove() }
  }
  return { ...code, css: css.toString() }
}

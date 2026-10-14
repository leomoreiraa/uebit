import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function blobDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Não foi possível incluir uma imagem no site.'))
    reader.readAsDataURL(blob)
  })
}

export async function buildExportFiles(code) {
  const document = new DOMParser().parseFromString(code.html, 'text/html')
  const cache = new Map()
  async function embedLocalAsset(source) {
    if (!source || /^(data:|#)/i.test(source)) return source
    const url = new URL(source, window.location.href)
    // Images hosted elsewhere keep the URL chosen by the author.
    if (url.origin !== window.location.origin && url.protocol !== 'blob:') return source
    if (!cache.has(url.href)) {
      cache.set(url.href, (async () => {
        const response = await fetch(url.href)
        if (!response.ok) throw new Error(`Não foi possível incluir o arquivo: ${source}`)
        const blob = await response.blob()
        if (blob.type.includes('text/html')) throw new Error(`Arquivo não encontrado: ${source}. Envie a imagem pelo editor antes de exportar.`)
        return blobDataURL(blob)
      })())
    }
    return cache.get(url.href)
  }

  async function embedCSS(css) {
    const matches = [...css.matchAll(/url\(\s*(?:(["'])(.*?)\1|([^)]*?))\s*\)/gi)]
    let result = css
    for (const match of matches.reverse()) {
      const source = (match[2] ?? match[3]).trim()
      const value = await embedLocalAsset(source)
      if (value !== source) result = result.slice(0, match.index) + `url("${value}")` + result.slice(match.index + match[0].length)
    }
    return result
  }

  await Promise.all([...document.querySelectorAll('img[src]')].map(async (image) => {
    image.setAttribute('src', await embedLocalAsset(image.getAttribute('src')))
  }))
  for (const style of document.querySelectorAll('style')) style.textContent = await embedCSS(style.textContent)
  for (const node of document.querySelectorAll('[style]')) node.setAttribute('style', await embedCSS(node.getAttribute('style')))

  const styles = [...document.querySelectorAll('link[rel="stylesheet"]')].filter((node) => /^\.?\/?style\.css$/.test(node.getAttribute('href') ?? ''))
  const stylesheet = styles.shift() ?? document.createElement('link')
  stylesheet.setAttribute('rel', 'stylesheet')
  stylesheet.setAttribute('href', 'style.css')
  if (!stylesheet.parentNode) document.head.append(stylesheet)
  styles.forEach((node) => node.remove())

  const scripts = [...document.querySelectorAll('script[src]')].filter((node) => /^\.?\/?script\.js$/.test(node.getAttribute('src') ?? ''))
  const script = scripts.shift() ?? document.createElement('script')
  script.setAttribute('src', 'script.js')
  script.setAttribute('defer', '')
  if (!script.parentNode) document.head.append(script)
  scripts.forEach((node) => node.remove())

  if (!document.querySelector('meta[charset]')) {
    const charset = document.createElement('meta')
    charset.setAttribute('charset', 'UTF-8')
    document.head.prepend(charset)
  }
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta')
    viewport.name = 'viewport'
    viewport.content = 'width=device-width, initial-scale=1.0'
    document.head.append(viewport)
  }
  document.querySelectorAll('[data-mobile-custom]').forEach((node) => node.removeAttribute('data-mobile-custom'))

  return {
    'index.html': '<!doctype html>\n' + document.documentElement.outerHTML,
    'style.css': await embedCSS(code.css),
    'script.js': code.js,
  }
}

export async function createSiteZip(code) {
  const files = await buildExportFiles(code)
  const zip = new JSZip()
  for (const [name, content] of Object.entries(files)) zip.file(name, content)
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
}

export async function downloadSite(code) {
  const blob = await createSiteZip(code)
  saveAs(blob, 'meu-site.zip')
}

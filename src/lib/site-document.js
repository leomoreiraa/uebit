// Shared document preparation for the generated-code view and the exported site.
export function createSiteDocument(html) {
  const document = new DOMParser().parseFromString(html, 'text/html')
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
  return document
}

export const serializeSiteDocument = (document) => '<!doctype html>\n' + document.documentElement.outerHTML

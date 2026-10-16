const siteBase = new URL(import.meta.env.DEV ? '../../' : '../', import.meta.url)
export const brandAsset = (file) => new URL(`brand/${file}`, siteBase).href

export const BRAND_ASSETS = [
  ['uebit-logo.svg', 'Logotipo principal'], ['uebit-logo-mono.svg', 'Logotipo monocromático'],
  ['uebit-logo-negative.svg', 'Logotipo para fundo escuro'], ['uebit-symbol.svg', 'Símbolo'],
  ['uebit-mascot.svg', 'Mascote Bit'], ['uebit-pattern.svg', 'Padrão gráfico'], ['uebit-cover.svg', 'Capa'],
  ['icons.svg', 'Sprite de ícones'], ['tokens.css', 'Tokens de estilo'], ['guia.md', 'Guia da marca'],
]

export const BRAND_ICONS = [
  ['frog', 'Sapinho'], ['web', 'Web'], ['bits', 'Bits'], ['design', 'Design'], ['code', 'Código'], ['blocks', 'Programação'],
  ['save', 'Salvar'], ['import', 'Importar'], ['export', 'Exportar'], ['play', 'Executar'], ['stop', 'Parar'], ['spark', 'Ideia'],
  ['heading', 'Título'], ['paragraph', 'Texto'], ['quote', 'Citação'], ['list', 'Lista'], ['image', 'Imagem'], ['video', 'Vídeo'],
  ['audio', 'Áudio'], ['button', 'Botão'], ['input', 'Campo'], ['container', 'Container'], ['section', 'Seção'], ['divider', 'Divisor'],
  ['rocket', 'Salto'], ['game', 'Jogo'], ['palette', 'Cores'], ['arrow', 'Avançar'], ['check', 'Concluído'], ['pointer', 'Interagir'],
]

async function fetchAsset(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Não foi possível baixar um arquivo da marca. Tente novamente.')
  return response.text()
}

export function standaloneIcon(sprite, name) {
  const label = BRAND_ICONS.find(([id]) => id === name)?.[1]
  if (!label) throw new Error('Ícone desconhecido.')
  const source = new DOMParser().parseFromString(sprite, 'image/svg+xml')
  const symbol = source.getElementById(name)
  if (!symbol || source.querySelector('parsererror')) throw new Error('Arquivo de ícones inválido.')
  const svg = source.createElementNS('http://www.w3.org/2000/svg', 'svg')
  for (const [key, value] of Object.entries({ viewBox: '0 0 24 24', width: '24', height: '24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', role: 'img', 'aria-label': label })) svg.setAttribute(key, value)
  for (const child of symbol.childNodes) svg.append(child.cloneNode(true))
  return new XMLSerializer().serializeToString(svg)
}

export async function downloadBrandIcon(name) {
  const svg = standaloneIcon(await fetchAsset(brandAsset('icons.svg')), name)
  saveAs(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `uebit-${name}.svg`)
}

export async function downloadBrandKit() {
  const [{ default: JSZip }, assets, favicon] = await Promise.all([
    import('jszip'),
    Promise.all(BRAND_ASSETS.map(async ([file]) => [file, await fetchAsset(brandAsset(file))])),
    fetchAsset(new URL('favicon.svg', siteBase).href),
  ])
  const zip = new JSZip()
  for (const [file, content] of assets) zip.file(file, content)
  zip.file('favicon.svg', favicon)
  const sprite = assets.find(([file]) => file === 'icons.svg')[1]
  for (const [name] of BRAND_ICONS) zip.file(`icons/${name}.svg`, standaloneIcon(sprite, name))
  saveAs(await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }), 'uebit-identidade-visual.zip')
}
import { saveAs } from 'file-saver'

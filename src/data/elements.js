import { DEFAULT_LAYOUT } from '../lib/tree'

export const elementTypes = [
  { type: 'heading', name: 'Cabeçalho', description: 'Dê um título à sua ideia', icon: 'H', tag: '<h1>' },
  { type: 'paragraph', name: 'Parágrafo', description: 'Conte a sua história', icon: '¶', tag: '<p>' },
  { type: 'image', name: 'Imagem', description: 'Mostre algo interessante', icon: '▧', tag: '<img>' },
  { type: 'button', name: 'Botão', description: 'Convide para uma ação', icon: '↗', tag: '<button>' },
  { type: 'container', name: 'Container', description: 'Agrupe e organize seus blocos', icon: '□', tag: '<div>' },
]

export function createElement(type) {
  const defaults = {
    heading: { text: 'Minha primeira página', headingLevel: 'h1' },
    paragraph: { text: 'Toda grande ideia começa com um primeiro passo. Este é o espaço para contar a sua história.' },
    image: { src: '/images/landscape.svg', alt: 'Ilustração de montanhas com um sol em um céu claro', fit: 'cover' },
    button: { text: 'Saiba mais', action: 'none', actionValue: '', newTab: false },
    container: {},
  }

  if (!Object.hasOwn(defaults, type)) return null

  return {
    id: crypto.randomUUID(),
    type,
    ...defaults[type],
    children: [],
    layout: { ...DEFAULT_LAYOUT, minHeight: type === 'container' ? '120px' : '0px' },
  }
}

import { DEFAULT_LAYOUT } from '../lib/tree'

export const elementTypes = [
  // Texto
  { type: 'heading', name: 'Cabeçalho', description: 'Dê um título à sua ideia', icon: 'H', tag: '<h1>' },
  { type: 'paragraph', name: 'Parágrafo', description: 'Conte a sua história', icon: '¶', tag: '<p>' },
  { type: 'quote', name: 'Citação', description: 'Destaque uma frase marcante', icon: '“', tag: '<blockquote>' },
  { type: 'list', name: 'Lista', description: 'Organize itens em tópicos', icon: '•', tag: '<ul>' },

  // Mídia
  { type: 'image', name: 'Imagem', description: 'Mostre algo interessante', icon: '▧', tag: '<img>' },
  { type: 'video', name: 'Vídeo', description: 'Adicione um vídeo com player', icon: '▶', tag: '<video>' },
  { type: 'audio', name: 'Áudio', description: 'Toque música ou efeito sonoro', icon: '♫', tag: '<audio>' },

  // Ações e Interação
  { type: 'button', name: 'Botão', description: 'Convide para uma ação', icon: '↗', tag: '<button>' },
  { type: 'input', name: 'Campo de texto', description: 'Espaço para o usuário digitar', icon: '⌨', tag: '<input>' },

  // Organização
  { type: 'container', name: 'Container', description: 'Agrupe e organize seus blocos', icon: '□', tag: '<div>' },
  { type: 'section', name: 'Seção', description: 'Crie uma área temática da página', icon: '□', tag: '<section>' },
  { type: 'divider', name: 'Linha divisória', description: 'Separe seções da página', icon: '—', tag: '<hr>' },
]

export function createElement(type) {
  const defaults = {
    heading: { text: 'Minha primeira página', headingLevel: 'h1' },
    paragraph: { text: 'Toda grande ideia começa com um primeiro passo. Este é o espaço para contar a sua história.' },
    quote: { text: 'A imaginação é o começo de toda grande criação.' },
    list: { text: 'Primeiro passo da ideia\nExplorar possibilidades\nConstruir e compartilhar' },
    image: { src: '/images/landscape.svg', alt: 'Ilustração de montanhas com um sol em um céu claro', fit: 'cover' },
    video: { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
    audio: { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' },
    button: { text: 'Saiba mais', action: 'none', actionValue: '', newTab: false },
    input: { placeholder: 'Digite aqui...', text: '' },
    container: {},
    section: { tagName: 'section', name: 'Seção' },
    divider: {},
  }

  if (!Object.hasOwn(defaults, type)) return null

  return {
    id: crypto.randomUUID(),
    type: type === 'section' ? 'container' : type,
    name: '',
    htmlId: '',
    ...defaults[type],
    children: [],
    layout: { ...DEFAULT_LAYOUT, minHeight: ['container', 'section'].includes(type) ? '120px' : '0px' },
  }
}

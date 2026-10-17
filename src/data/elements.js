import { defaultLayoutForType } from '../lib/code-engine'

export const elementTypes = [
  // Texto
  { type: 'heading', name: 'Cabeçalho', description: 'Dê um título à sua ideia', icon: 'H', tag: '<h1>' },
  { type: 'paragraph', name: 'Parágrafo', description: 'Conte a sua história', icon: '¶', tag: '<p>' },
  { type: 'break', name: 'Quebra de linha', description: 'Pula para a próxima linha', icon: '↵', tag: '<br>' },
  { type: 'link', name: 'Link', description: 'Navegação para outra página', icon: '↗', tag: '<a>' },
  { type: 'strong', name: 'Negrito', description: 'Texto destacado com ênfase forte', icon: 'B', tag: '<strong>' },
  { type: 'em', name: 'Itálico', description: 'Texto com ênfase sutil', icon: 'I', tag: '<em>' },
  { type: 'code', name: 'Código', description: 'Trecho em fonte monoespaçada', icon: '<>', tag: '<code>' },
  { type: 'span', name: 'Trecho de texto', description: 'Texto em linha para estilos', icon: 'T', tag: '<span>' },
  { type: 'quote', name: 'Citação', description: 'Destaque uma frase marcante', icon: '“', tag: '<blockquote>' },
  { type: 'list', name: 'Lista com marcadores', description: 'Organize itens com pontos', icon: '•', tag: '<ul>' },
  { type: 'ordered-list', name: 'Lista numerada', description: 'Passo a passo com 1, 2, 3...', icon: '1.', tag: '<ol>' },

  // Mídia
  { type: 'image', name: 'Imagem', description: 'Mostre fotos e ilustrações', icon: '▧', tag: '<img>' },
  { type: 'video', name: 'Vídeo', description: 'Adicione um vídeo com player', icon: '▶', tag: '<video>' },
  { type: 'audio', name: 'Áudio', description: 'Toque música ou efeito sonoro', icon: '♫', tag: '<audio>' },
  { type: 'iframe', name: 'Incorporar (iframe)', description: 'Mapas, páginas ou widgets externos', icon: '⧉', tag: '<iframe>' },

  // Interação e Formulários
  { type: 'button', name: 'Botão', description: 'Convide para uma ação ou clique', icon: '↗', tag: '<button>' },
  { type: 'input', name: 'Campo de texto', description: 'Espaço para o usuário digitar', icon: '⌨', tag: '<input>' },
  { type: 'textarea', name: 'Área de texto', description: 'Campo para mensagens longas', icon: '≡', tag: '<textarea>' },
  { type: 'select', name: 'Menu suspenso', description: 'Lista de opções para escolher', icon: '▼', tag: '<select>' },
  { type: 'checkbox', name: 'Caixa de seleção', description: 'Opção de marcar ou desmarcar', icon: '☑', tag: '<label>' },
  { type: 'form', name: 'Formulário', description: 'Agrupador de campos e envio', icon: '📋', tag: '<form>' },

  // Organização e Estrutura
  { type: 'container', name: 'Container (div)', description: 'Agrupe e organize seus blocos', icon: '□', tag: '<div>' },
  { type: 'section', name: 'Seção', description: 'Crie uma área temática da página', icon: '§', tag: '<section>' },
  { type: 'header', name: 'Cabeçalho semântico', description: 'Topo da página ou de seção', icon: '⊤', tag: '<header>' },
  { type: 'footer', name: 'Rodapé semântico', description: 'Final da página com créditos', icon: '⊥', tag: '<footer>' },
  { type: 'nav', name: 'Navegação', description: 'Menu com links da página', icon: '🧭', tag: '<nav>' },
  { type: 'article', name: 'Artigo', description: 'Conteúdo independente ou post', icon: '📄', tag: '<article>' },
  { type: 'aside', name: 'Barra lateral', description: 'Conteúdo complementar ou notas', icon: '◨', tag: '<aside>' },
  { type: 'table', name: 'Tabela', description: 'Dados organizados em linhas e colunas', icon: '▦', tag: '<table>' },
  { type: 'divider', name: 'Linha divisória', description: 'Separe seções da página', icon: '—', tag: '<hr>' },
]

export const SEMANTIC_CONTAINERS = ['section', 'header', 'footer', 'nav', 'article', 'aside', 'form']

export function createElement(type) {
  const defaults = {
    heading: { text: 'Minha primeira página', headingLevel: 'h1' },
    paragraph: { text: 'Toda grande ideia começa com um primeiro passo. Este é o espaço para contar a sua história.' },
    break: {},
    link: { text: 'Clique aqui para saber mais', href: 'https://exemplo.com', newTab: true },
    strong: { text: 'Texto com ênfase forte' },
    em: { text: 'Texto com ênfase sutil em itálico' },
    code: { text: "console.log('Olá, Uebit!');" },
    span: { text: 'Trecho de texto em linha' },
    quote: { text: 'A imaginação é o começo de toda grande criação.' },
    list: { text: 'Primeiro passo da ideia\nExplorar possibilidades\nConstruir e compartilhar' },
    'ordered-list': { text: 'Passo 1: Criar a ideia\nPasso 2: Arraste os blocos\nPasso 3: Publicar o site' },
    image: { src: '/images/landscape.svg', alt: 'Ilustração de montanhas com um sol em um céu claro', fit: 'cover' },
    video: {
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      poster: '',
      controls: true,
      autoplay: false,
      loop: false,
      muted: false,
      playsInline: true,
      fit: 'cover',
    },
    audio: {
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
      controls: true,
      autoplay: false,
      loop: false,
      muted: false,
    },
    iframe: { src: 'https://example.com' },
    button: { text: 'Saiba mais', action: 'none', actionValue: '', newTab: false },
    input: { placeholder: 'Digite aqui...', text: '' },
    textarea: { placeholder: 'Escreva sua mensagem completa aqui...', text: '' },
    select: { text: 'Primeira opção\nSegunda opção\nTerceira opção' },
    checkbox: { text: 'Concordo com os termos do site', checked: false },
    form: { tagName: 'form', name: 'Formulário' },
    container: {},
    section: { tagName: 'section', name: 'Seção' },
    header: { tagName: 'header', name: 'Cabeçalho' },
    footer: { tagName: 'footer', name: 'Rodapé' },
    nav: { tagName: 'nav', name: 'Navegação' },
    article: { tagName: 'article', name: 'Artigo' },
    aside: { tagName: 'aside', name: 'Barra lateral' },
    table: { text: 'Nome, Função, Nível\nBit, Mascote, Mestre\nDev, Criador, Júnior' },
    divider: {},
  }

  if (!Object.hasOwn(defaults, type)) return null

  const isContainerType = type === 'container' || SEMANTIC_CONTAINERS.includes(type)
  const resolvedType = isContainerType ? 'container' : type

  return {
    id: crypto.randomUUID(),
    type: resolvedType,
    name: defaults[type]?.name || '',
    htmlId: '',
    ...defaults[type],
    children: [],
    layout: defaultLayoutForType(resolvedType),
  }
}

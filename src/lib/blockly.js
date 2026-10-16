import * as Blockly from 'blockly/core'
import 'blockly/blocks'
import * as ptBR from 'blockly/msg/pt-br'
import { javascriptGenerator, Order } from 'blockly/javascript'

/* ---------- Tradução e Localização para Português (pt-BR) ---------- */
export const PT_BR_CUSTOM_MSG = {
  // Ações e menu de contexto
  UNDO: 'Desfazer',
  REDO: 'Refazer',
  CLEAN_UP: 'Organizar blocos',
  COLLAPSE_BLOCK: 'Recolher bloco',
  COLLAPSE_ALL: 'Recolher todos os blocos',
  EXPAND_BLOCK: 'Expandir bloco',
  EXPAND_ALL: 'Expandir todos os blocos',
  DISABLE_BLOCK: 'Desativar bloco',
  ENABLE_BLOCK: 'Ativar bloco',
  DELETE_BLOCK: 'Excluir bloco',
  DELETE_X_BLOCKS: 'Excluir %1 blocos',
  DELETE_ALL_BLOCKS: 'Limpar todos os %1 blocos?',
  DUPLICATE_BLOCK: 'Duplicar bloco',
  ADD_COMMENT: 'Adicionar comentário',
  REMOVE_COMMENT: 'Remover comentário',
  HELP: 'Ajuda',
  EXTERNAL_INPUTS: 'Entradas externas',
  INLINE_INPUTS: 'Entradas em linha',

  // Variáveis
  NEW_VARIABLE: 'Criar variável...',
  NEW_VARIABLE_TITLE: 'Nome da nova variável:',
  VARIABLE_ALREADY_EXISTS: 'Já existe uma variável chamada "%1".',
  VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE: 'Já existe uma variável chamada "%1" com outro tipo.',
  DELETE_VARIABLE: 'Excluir variável "%1"',
  DELETE_VARIABLE_CONFIRMATION: 'Excluir as %1 ocorrências da variável "%2"?',
  CANNOT_DELETE_VARIABLE_PROCEDURE: 'Não é possível excluir a variável "%1" porque ela é usada pela função "%2".',
  RENAME_VARIABLE: 'Renomear variável...',
  RENAME_VARIABLE_TITLE: 'Renomear todas as variáveis "%1" para:',
  VARIABLES_DEFAULT_NAME: 'item',
  VARIABLES_SET: 'definir %1 para %2',
  VARIABLES_GET_CREATE_SET: 'Criar "definir %1"',
  MATH_CHANGE_TITLE: 'alterar %1 por %2',
  MATH_CHANGE_TOOLTIP: 'Soma um número à variável "%1".',

  // Funções / Procedimentos
  PROCEDURES_DEFNORETURN_TITLE: 'para',
  PROCEDURES_DEFNORETURN_PROCEDURE: 'minha_função',
  PROCEDURES_DEFNORETURN_DO: 'faça',
  PROCEDURES_DEFNORETURN_TOOLTIP: 'Cria uma função que executa ações sem retornar valor.',
  PROCEDURES_DEFRETURN_TITLE: 'para',
  PROCEDURES_DEFRETURN_PROCEDURE: 'minha_função',
  PROCEDURES_DEFRETURN_DO: 'faça',
  PROCEDURES_DEFRETURN_RETURN: 'retornar',
  PROCEDURES_DEFRETURN_TOOLTIP: 'Cria uma função que retorna um resultado.',
  PROCEDURES_CALLNORETURN_TITLE: 'executar',
  PROCEDURES_CALLNORETURN_TOOLTIP: 'Executa a função criada.',
  PROCEDURES_CALLRETURN_TITLE: 'obter retorno de',
  PROCEDURES_CALLRETURN_TOOLTIP: 'Executa a função e obtém o valor retornado.',
  PROCEDURES_IFRETURN_TITLE: 'se',
  PROCEDURES_IFRETURN_RETURN: 'retornar',
  PROCEDURES_IFRETURN_TOOLTIP: 'Se a condição for verdadeira, sai da função retornando um valor.',
  PROCEDURES_CREATE_DO: 'Criar "executar %1"',
  PROCEDURES_MUTATORCONTAINER_TITLE: 'entradas',
  PROCEDURES_MUTATORCONTAINER_TOOLTIP: 'Adicione, remova ou reordene entradas para esta função.',
  PROCEDURES_MUTATORARG_TITLE: 'nome da entrada:',
  PROCEDURES_MUTATORARG_TOOLTIP: 'Adicione uma entrada para a função.',

  // Laços e repetições
  CONTROLS_REPEAT_TITLE: 'repetir %1 vezes',
  CONTROLS_REPEAT_INPUT_DO: 'faça',
  CONTROLS_WHILEUNTIL_OPERATOR_WHILE: 'enquanto',
  CONTROLS_WHILEUNTIL_OPERATOR_UNTIL: 'até que',
  CONTROLS_WHILEUNTIL_INPUT_DO: 'faça',
  CONTROLS_FOR_TITLE: 'contar com %1 de %2 até %3 a cada %4',
  CONTROLS_FOR_INPUT_DO: 'faça',
  CONTROLS_FOREACH_TITLE: 'para cada item %1 na lista %2',
  CONTROLS_FOREACH_INPUT_DO: 'faça',
  CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK: 'interromper repetição (parar)',
  CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE: 'pular para próxima repetição',
  CONTROLS_FLOW_STATEMENTS_WARNING: 'Atenção: Este bloco só pode ser usado dentro de uma repetição.',

  // Lógica
  CONTROLS_IF_MSG_IF: 'se',
  CONTROLS_IF_MSG_THEN: 'faça',
  CONTROLS_IF_MSG_ELSE: 'senão',
  CONTROLS_IF_MSG_ELSEIF: 'senão se',
  LOGIC_BOOLEAN_TRUE: 'verdadeiro',
  LOGIC_BOOLEAN_FALSE: 'falso',
  LOGIC_NEGATE_TITLE: 'não %1',
  LOGIC_NULL: 'nulo',
  LOGIC_TERNARY_CONDITION: 'teste',
  LOGIC_TERNARY_IF_TRUE: 'se verdadeiro',
  LOGIC_TERNARY_IF_FALSE: 'se falso',

  // Listas
  LISTS_CREATE_EMPTY_TITLE: 'criar lista vazia',
  LISTS_CREATE_WITH_INPUT_WITH: 'criar lista com',
  LISTS_REPEAT_TITLE: 'criar lista com item %1 repetido %2 vezes',
  LISTS_LENGTH_TITLE: 'tamanho da lista %1',
  LISTS_ISEMPTY_TITLE: '%1 está vazia?',
  LISTS_INLIST: 'na lista',
  LISTS_INDEX_OF_INPUT_IN_LIST: 'na lista %1',
  LISTS_GET_INDEX_GET: 'obter',
  LISTS_GET_INDEX_GET_REMOVE: 'obter e remover',
  LISTS_GET_INDEX_REMOVE: 'remover',
  LISTS_GET_INDEX_FROM_START: 'item nº',
  LISTS_GET_INDEX_FROM_END: 'item nº a partir do fim',
  LISTS_GET_INDEX_FIRST: 'primeiro item',
  LISTS_GET_INDEX_LAST: 'último item',
  LISTS_GET_INDEX_RANDOM: 'item aleatório',
  LISTS_SET_INDEX_SET: 'definir',
  LISTS_SET_INDEX_INSERT: 'inserir em',
  LISTS_SET_INDEX_INPUT_TO: 'como',
  LISTS_SPLIT_LIST_FROM_TEXT: 'criar lista a partir do texto',
  LISTS_SPLIT_TEXT_FROM_LIST: 'juntar lista em texto',
  LISTS_SPLIT_WITH_DELIMITER: 'com separador',

  // Texto
  TEXT_JOIN_TITLE_CREATEWITH: 'criar texto com',
  TEXT_LENGTH_TITLE: 'tamanho do texto %1',
  TEXT_ISEMPTY_TITLE: '%1 está vazio?',
  TEXT_INDEXOF_TITLE: 'no texto %1 encontrar %2 ocorrência de %3',
  TEXT_CHARAT_TITLE: 'no texto %1 obter %2',
  TEXT_GET_SUBSTRING_START_FROM_START: 'obter trecho a partir da letra nº',
  TEXT_GET_SUBSTRING_START_FROM_END: 'obter trecho a partir da letra nº do fim',
  TEXT_GET_SUBSTRING_START_FIRST: 'obter trecho a partir da primeira letra',
  TEXT_GET_SUBSTRING_END_FROM_START: 'até a letra nº',
  TEXT_GET_SUBSTRING_END_FROM_END: 'até a letra nº do fim',
  TEXT_GET_SUBSTRING_END_LAST: 'até a última letra',
  TEXT_GET_SUBSTRING_INPUT_IN_TEXT: 'no texto',
  TEXT_CHANGECASE_OPERATOR_UPPERCASE: 'para MAIÚSCULAS',
  TEXT_CHANGECASE_OPERATOR_LOWERCASE: 'para minúsculas',
  TEXT_CHANGECASE_OPERATOR_TITLECASE: 'para Primeira Letra Maiúscula',
  TEXT_TRIM_OPERATOR_BOTH: 'remover espaços dos dois lados de',
  TEXT_TRIM_OPERATOR_LEFT: 'remover espaços da esquerda de',
  TEXT_TRIM_OPERATOR_RIGHT: 'remover espaços da direita de',
  TEXT_PRINT_TITLE: 'alerta na tela %1',
  TEXT_PROMPT_TYPE_TEXT: 'perguntar com mensagem',
  TEXT_PROMPT_TYPE_NUMBER: 'perguntar número com mensagem',

  // Zoom e Interface
  ZOOM_IN: 'Aumentar zoom',
  ZOOM_OUT: 'Diminuir zoom',
  RESET_ZOOM: 'Redefinir zoom',
  ZOOM_TO_FIT_ARIA_LABEL: 'Ajustar zoom à tela',
  ICON_LABEL_MUTATOR_CLOSED: 'Configurar este bloco',
  ICON_LABEL_MUTATOR_OPEN: 'Fechar configuração do bloco',
  TOOLBOX_SEARCH_PLACEHOLDER: 'Pesquisar blocos...',
  WORKSPACE_SEARCH_PLACEHOLDER: 'Pesquisar no espaço de trabalho...',
}

Blockly.setLocale(ptBR)
Object.assign(Blockly.Msg, PT_BR_CUSTOM_MSG)

// Diálogos nativos em português
if (Blockly.dialog?.setPrompt) {
  Blockly.dialog.setPrompt((message, defaultValue, callback) => {
    const value = window.prompt(message, defaultValue ?? '')
    callback(value)
  })
}
if (Blockly.dialog?.setConfirm) {
  Blockly.dialog.setConfirm((message, callback) => {
    callback(window.confirm(message))
  })
}
if (Blockly.dialog?.setAlert) {
  Blockly.dialog.setAlert((message, callback) => {
    window.alert(message)
    if (callback) callback()
  })
}

/* ---------- Aparência MakeCode micro:bit ---------- */
export const MICROBIT_COLOURS = {
  events: '#D400D4', // Entrada / Eventos (Magenta)
  page: '#1E90FF', // Básico / Página (Azul)
  sound: '#9333EA', // Sons & Áudio (Violeta)
  time: '#EA580C', // Tempo & Espera (Laranja)
  logic: '#00A4A6', // Lógica (Teal)
  loops: '#00AA00', // Repetições (Verde)
  math: '#7C3AED', // Matemática (Roxo)
  text: '#B8860B', // Texto (Ocre)
  variables: '#DC143C', // Variáveis (Vermelho)
  arrays: '#E65722', // Listas (Coral)
  functions: '#3455DB', // Funções (Azul real)
  advanced: '#00272B', // Seletores CSS (Escuro)
}

function shade(hex, amount) {
  const value = parseInt(hex.slice(1), 16)
  const channels = [value >> 16, (value >> 8) & 255, value & 255]
    .map((channel) => Math.round(amount < 0 ? channel * (1 + amount) : channel + (255 - channel) * amount))
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}
const blockStyle = (colour) => ({ colourPrimary: colour, colourSecondary: shade(colour, 0.35), colourTertiary: shade(colour, -0.25) })
const C = MICROBIT_COLOURS

export const microbitTheme = Blockly.Theme.defineTheme('uebit-microbit', {
  base: Blockly.Themes.Classic,
  blockStyles: {
    logic_blocks: blockStyle(C.logic),
    loop_blocks: blockStyle(C.loops),
    math_blocks: blockStyle(C.math),
    text_blocks: blockStyle(C.text),
    variable_blocks: blockStyle(C.variables),
    variable_dynamic_blocks: blockStyle(C.variables),
    procedure_blocks: blockStyle(C.functions),
    list_blocks: blockStyle(C.arrays),
    uebit_events: blockStyle(C.events),
    uebit_page: blockStyle(C.page),
    uebit_sound: blockStyle(C.sound),
    uebit_time: blockStyle(C.time),
    uebit_advanced: blockStyle(C.advanced),
  },
  categoryStyles: {
    uebit_events: { colour: C.events },
    uebit_page: { colour: C.page },
    uebit_sound: { colour: C.sound },
    uebit_time: { colour: C.time },
    uebit_logic: { colour: C.logic },
    uebit_loops: { colour: C.loops },
    uebit_math: { colour: C.math },
    uebit_text: { colour: C.text },
    uebit_variables: { colour: C.variables },
    uebit_arrays: { colour: C.arrays },
    uebit_functions: { colour: C.functions },
    uebit_advanced: { colour: C.advanced },
  },
  componentStyles: {
    workspaceBackgroundColour: '#ecf0f1',
    toolboxBackgroundColour: '#f2f2f2',
    toolboxForegroundColour: '#323130',
    flyoutBackgroundColour: '#4b4949',
    flyoutForegroundColour: '#ffffff',
    flyoutOpacity: 1,
    scrollbarColour: '#b6bcbe',
    scrollbarOpacity: 0.8,
    insertionMarkerColour: '#000000',
    insertionMarkerOpacity: 0.2,
  },
  fontStyle: { family: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif', weight: '600', size: 12 },
  startHats: false,
})

// Blocos compactos e retangulares, com entradas arredondadas, como no MakeCode.
class MicrobitConstants extends Blockly.zelos.ConstantProvider {
  constructor() {
    super()
    this.MIN_BLOCK_HEIGHT = 10 * this.GRID_UNIT
    this.CORNER_RADIUS = this.GRID_UNIT
  }
}
class MicrobitRenderer extends Blockly.zelos.Renderer {
  makeConstants_() { return new MicrobitConstants() }
}
if (!Blockly.registry.hasItem(Blockly.registry.Type.RENDERER, 'uebit-microbit')) Blockly.blockRendering.register('uebit-microbit', MicrobitRenderer)

// Linhas da toolbox com faixa, ícone e texto na cor da categoria.
class MicrobitCategory extends Blockly.ToolboxCategory {
  addColourBorder_(colour) {
    super.addColourBorder_(colour)
    this.rowDiv_.style.setProperty('--uebit-category', colour)
  }
  createIconDom_() {
    const icon = document.createElement('span')
    icon.className = 'uebitCategoryIcon'
    icon.setAttribute('aria-hidden', 'true')
    icon.textContent = this.toolboxItemDef_.icon ?? '●'
    return icon
  }
}
Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, Blockly.ToolboxCategory.registrationName, MicrobitCategory, true)

const workspaceTargets = new WeakMap()
export function setWorkspaceTargets(workspace, targets) { workspaceTargets.set(workspace, targets) }

const heading = (text) => ({ kind: 'label', text, 'web-class': 'uebitFlyoutHeading' })
export function prepareWorkspace(workspace, targets) {
  setWorkspaceTargets(workspace, targets)
  workspace.registerButtonCallback('CREATE_VARIABLE', (button) => Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace()))
  workspace.registerToolboxCategoryCallback('UEBIT_VARIABLES', (target) => [heading('Variáveis'), ...Blockly.Variables.flyoutCategory(target)])
  if (Blockly.Procedures?.flyoutCategory) {
    workspace.registerToolboxCategoryCallback('UEBIT_FUNCTIONS', (target) => [heading('Funções'), ...Blockly.Procedures.flyoutCategory(target)])
  }
}

function targetsFor(field) {
  const workspace = field.getSourceBlock()?.workspace
  return workspaceTargets.get(workspace?.targetWorkspace ?? workspace) ?? []
}

class SiteTargetField extends Blockly.FieldDropdown {
  constructor(filterType = 'all') {
    super(function () {
      const allTargets = targetsFor(this)
      const filter = this.filterType ?? 'all'
      const targets = allTargets.filter((target) => {
        if (filter === 'text') return ['heading', 'paragraph', 'button', 'quote', 'list', 'ordered-list', 'input', 'textarea', 'link', 'strong', 'em', 'code', 'span'].includes(target.type)
        if (filter === 'input') return ['input', 'textarea', 'select', 'checkbox'].includes(target.type)
        return true
      })
      const options = [['Escolha um elemento…', ''], ...targets.map((target) => [target.label, target.id])]
      const selected = this.getValue()
      if (selected && !targets.some((target) => target.id === selected)) options.push(['Elemento indisponível — escolha outro', selected])
      return options
    })
    this.filterType = typeof filterType === 'boolean' ? (filterType ? 'text' : 'all') : filterType
  }
  // Mantém targets removidos visíveis para que a ação nunca seja redirecionada silenciosamente.
  doClassValidation_(value) { return typeof value === 'string' ? value : null }
  static fromJson(options) {
    const filter = options.filterType ?? (options.textOnly ? 'text' : 'all')
    return new SiteTargetField(filter)
  }
}
Blockly.fieldRegistry.register('field_site_target', SiteTargetField)

export const COLOR_OPTIONS = [
  ['roxo 🟣', '#9333ea'],
  ['azul 🔵', '#2563eb'],
  ['verde 🟢', '#16a34a'],
  ['amarelo 🟡', '#facc15'],
  ['vermelho 🔴', '#dc2626'],
  ['rosa 🌸', '#ec4899'],
  ['laranja 🟠', '#ea580c'],
  ['ciano 🌊', '#06b6d4'],
  ['esmeralda 🌿', '#10b981'],
  ['preto ⚫', '#0f172a'],
  ['branco ⚪', '#ffffff'],
  ['transparente 🔲', 'transparent'],
]

export const KEY_OPTIONS = [
  ['Espaço ␣', ' '],
  ['Enter ↵', 'Enter'],
  ['Seta para Cima ⬆️', 'ArrowUp'],
  ['Seta para Baixo ⬇️', 'ArrowDown'],
  ['Seta para Esquerda ⬅️', 'ArrowLeft'],
  ['Seta para Direita ➡️', 'ArrowRight'],
  ['Escape (Esc)', 'Escape'],
  ['Qualquer tecla ⌨️', 'ANY'],
]

export const NOTE_OPTIONS = [
  ['Dó (C4)', '261.63'],
  ['Ré (D4)', '293.66'],
  ['Mi (E4)', '329.63'],
  ['Fá (F4)', '349.23'],
  ['Sol (G4)', '392.00'],
  ['Lá (A4)', '440.00'],
  ['Si (B4)', '493.88'],
  ['Dó Agudo (C5)', '523.25'],
]

Blockly.defineBlocksWithJsonArray([
  // Eventos
  {
    type: 'site_on_start',
    message0: 'ao iniciar a página %1 %2',
    args0: [{ type: 'input_dummy' }, { type: 'input_statement', name: 'DO' }],
    style: 'uebit_events',
    tooltip: 'Executa os blocos de ação assim que a página é carregada.',
  },
  {
    type: 'site_click_element',
    message0: 'quando clicar em %1 faça %2',
    args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'input_statement', name: 'DO' }],
    style: 'uebit_events',
    tooltip: 'Executa as ações quando o elemento selecionado for clicado.',
  },
  {
    type: 'site_mouse_enter',
    message0: 'quando passar o mouse em %1 faça %2',
    args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'input_statement', name: 'DO' }],
    style: 'uebit_events',
    tooltip: 'Executa quando o cursor do mouse entrar no elemento.',
  },
  {
    type: 'site_mouse_leave',
    message0: 'quando tirar o mouse de %1 faça %2',
    args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'input_statement', name: 'DO' }],
    style: 'uebit_events',
    tooltip: 'Executa quando o cursor do mouse sair de cima do elemento.',
  },
  {
    type: 'site_input_change',
    message0: 'quando digitar no campo %1 faça %2',
    args0: [{ type: 'field_site_target', name: 'TARGET', filterType: 'input' }, { type: 'input_statement', name: 'DO' }],
    style: 'uebit_events',
    tooltip: 'Executa ações sempre que o texto deste campo for alterado.',
  },
  {
    type: 'site_key_press',
    message0: 'quando pressionar a tecla %1 faça %2',
    args0: [{ type: 'field_dropdown', name: 'KEY', options: KEY_OPTIONS }, { type: 'input_statement', name: 'DO' }],
    style: 'uebit_events',
    tooltip: 'Executa ações quando uma tecla específica do teclado for pressionada.',
  },

  // Minha página (DOM & Estilo)
  {
    type: 'site_text_element',
    message0: 'mudar texto de %1 para %2',
    args0: [{ type: 'field_site_target', name: 'TARGET', textOnly: true }, { type: 'input_value', name: 'TEXT', check: 'String' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Altera o conteúdo textual do elemento escolhido.',
  },
  {
    type: 'site_get_text_element',
    message0: 'texto de %1',
    args0: [{ type: 'field_site_target', name: 'TARGET', textOnly: true }],
    output: 'String',
    style: 'uebit_page',
    tooltip: 'Lê e retorna o texto atual do elemento escolhido.',
  },
  {
    type: 'site_background_element',
    message0: 'mudar fundo de %1 para a cor %2',
    args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'field_dropdown', name: 'COLOR', options: COLOR_OPTIONS }],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Altera a cor de fundo do elemento escolhido.',
  },
  {
    type: 'site_color_element',
    message0: 'mudar cor do texto de %1 para %2',
    args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'field_dropdown', name: 'COLOR', options: COLOR_OPTIONS }],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Altera a cor do texto do elemento escolhido.',
  },
  {
    type: 'site_image_element',
    message0: 'mudar imagem de %1 para URL %2',
    args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'input_value', name: 'SRC', check: 'String' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Altera a imagem (src ou imagem de fundo) do elemento selecionado.',
  },
  {
    type: 'site_input_set_value',
    message0: 'definir valor digitado em %1 para %2',
    args0: [{ type: 'field_site_target', name: 'TARGET', filterType: 'input' }, { type: 'input_value', name: 'VALUE' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Define o valor digitado dentro de um campo ou caixa de texto.',
  },
  {
    type: 'site_input_get_value',
    message0: 'valor digitado em %1',
    args0: [{ type: 'field_site_target', name: 'TARGET', filterType: 'input' }],
    output: 'String',
    style: 'uebit_page',
    tooltip: 'Lê o valor atual digitado pelo usuário em um campo de texto.',
  },
  {
    type: 'site_show_hide_element',
    message0: '%1 o elemento %2',
    args0: [
      { type: 'field_dropdown', name: 'ACTION', options: [['mostrar', 'show'], ['ocultar', 'hide'], ['alternar visibilidade de', 'toggle']] },
      { type: 'field_site_target', name: 'TARGET' },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Exibe, esconde ou alterna a visibilidade do elemento na tela.',
  },
  {
    type: 'site_add_remove_class',
    message0: '%1 a classe CSS %2 em %3',
    args0: [
      { type: 'field_dropdown', name: 'ACTION', options: [['adicionar', 'add'], ['remover', 'remove'], ['alternar', 'toggle']] },
      { type: 'input_value', name: 'CLASS', check: 'String' },
      { type: 'field_site_target', name: 'TARGET' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Adiciona, remove ou alterna uma classe de estilo CSS no elemento.',
  },
  {
    type: 'site_animate_element',
    message0: 'animar %1 com efeito %2',
    args0: [
      { type: 'field_site_target', name: 'TARGET' },
      { type: 'field_dropdown', name: 'EFFECT', options: [['pular 🦘', 'bounce'], ['tremer ⚡', 'shake'], ['piscar ✨', 'flash'], ['girar 🔄', 'spin'], ['pulsar 💓', 'pulse']] },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Executa uma animação suave e dinâmica no elemento selecionado.',
  },
  {
    type: 'site_scroll_to_element',
    message0: 'rolar suavemente até o elemento %1',
    args0: [{ type: 'field_site_target', name: 'TARGET' }],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Rola a tela suavemente até que o elemento fique visível.',
  },
  {
    type: 'site_open_url',
    message0: 'abrir página %1 em %2',
    args0: [
      { type: 'input_value', name: 'URL', check: 'String' },
      { type: 'field_dropdown', name: 'TARGET', options: [['nova aba ↗', '_blank'], ['mesma aba ↺', '_self']] },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Abre um link da web em uma nova aba ou na mesma página.',
  },
  {
    type: 'site_message',
    message0: 'mostrar aviso na tela %1',
    args0: [{ type: 'input_value', name: 'TEXT', check: 'String' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Exibe uma notificação flutuante elegante na tela do usuário.',
  },

  // Sons & Áudio
  {
    type: 'site_play_sound',
    message0: 'tocar efeito sonoro %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'SOUND',
        options: [
          ['vitória 🏆', 'vitoria'],
          ['moeda 💎', 'moeda'],
          ['clique 🖱️', 'clique'],
          ['pulo 🚀', 'pulo'],
          ['laser ⚡', 'laser'],
          ['alerta 🔔', 'alerta'],
          ['derrota 💔', 'derrota'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_sound',
    tooltip: 'Reproduz um efeito sonoro sintetizado nativamente pelo navegador.',
  },
  {
    type: 'site_play_tone',
    message0: 'tocar nota musical %1 por %2 seg',
    args0: [
      { type: 'field_dropdown', name: 'NOTE', options: NOTE_OPTIONS },
      { type: 'field_dropdown', name: 'DURATION', options: [['0.2', '0.2'], ['0.5', '0.5'], ['1.0', '1.0'], ['2.0', '2.0']] },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_sound',
    tooltip: 'Toca uma frequência musical limpa sintetizada em tempo real.',
  },

  // Tempo & Espera
  {
    type: 'site_wait_seconds',
    message0: 'esperar %1 segundos e depois %2',
    args0: [{ type: 'input_value', name: 'SECONDS', check: 'Number' }, { type: 'input_statement', name: 'DO' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_time',
    tooltip: 'Aguarda a quantidade de segundos definida antes de executar as ações.',
  },
  {
    type: 'site_repeat_every',
    message0: 'a cada %1 segundos fazer %2',
    args0: [{ type: 'input_value', name: 'SECONDS', check: 'Number' }, { type: 'input_statement', name: 'DO' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_time',
    tooltip: 'Repete as ações continuamente no intervalo de tempo especificado.',
  },

  // Avançado (Seletores CSS manuais)
  {
    type: 'site_click',
    message0: 'quando clicar no seletor CSS %1 faça %2',
    args0: [{ type: 'field_input', name: 'SELECTOR', text: '.button' }, { type: 'input_statement', name: 'DO' }],
    style: 'uebit_advanced',
    tooltip: 'Use um seletor CSS avançado como .button, #meu-id ou h1.',
  },
  {
    type: 'site_text',
    message0: 'mudar texto do seletor CSS %1 para %2',
    args0: [{ type: 'field_input', name: 'SELECTOR', text: 'h1' }, { type: 'input_value', name: 'TEXT', check: 'String' }],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_advanced',
  },
  {
    type: 'site_background',
    message0: 'mudar fundo do seletor CSS %1 para %2',
    args0: [{ type: 'field_input', name: 'SELECTOR', text: 'body' }, { type: 'field_dropdown', name: 'COLOR', options: COLOR_OPTIONS }],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_advanced',
  },
])

function targetSelector(block) {
  const id = block.getFieldValue('TARGET')
  const field = block.getField('TARGET')
  const target = targetsFor(field).find((item) => item.id === id)
  const isTextFilter = field?.textOnly || field?.filterType === 'text'
  if (!target || (isTextFilter && !['heading', 'paragraph', 'button', 'quote', 'list', 'ordered-list', 'input', 'textarea', 'link', 'strong', 'em', 'code', 'span'].includes(target.type))) {
    throw new Error('Escolha um elemento disponível nos blocos de página. Um destino está vazio ou foi removido.')
  }
  const escaped = (typeof window !== 'undefined' && window.CSS && CSS.escape) ? CSS.escape(id) : id.replace(/["\\]/g, '\\$&')
  return `[data-block-id="${escaped}"]`
}

/* ---------- Geradores JavaScript ---------- */
javascriptGenerator.forBlock.site_on_start = (block, generator) => {
  const body = generator.statementToCode(block, 'DO')
  return body.trim() ? `__uebitLoopBudget = 10000;\n${body}` : ''
}

javascriptGenerator.forBlock.site_click_element = (block, generator) =>
  `document.addEventListener('click', (event) => {\nif (event.target.closest(${JSON.stringify(targetSelector(block))})) {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}\n});\n`

javascriptGenerator.forBlock.site_mouse_enter = (block, generator) =>
  `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nnode.addEventListener('mouseenter', () => {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n});\n});\n`

javascriptGenerator.forBlock.site_mouse_leave = (block, generator) =>
  `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nnode.addEventListener('mouseleave', () => {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n});\n});\n`

javascriptGenerator.forBlock.site_input_change = (block, generator) =>
  `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nnode.addEventListener('input', () => {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n});\n});\n`

javascriptGenerator.forBlock.site_key_press = (block, generator) => {
  const key = block.getFieldValue('KEY')
  const condition = key === 'ANY' ? 'true' : `event.key === ${JSON.stringify(key)}`
  return `document.addEventListener('keydown', (event) => {\nif (${condition}) {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}\n});\n`
}

javascriptGenerator.forBlock.site_text_element = (block, generator) =>
  `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { node.textContent = ${generator.valueToCode(block, 'TEXT', Order.NONE) || "''"}; });\n`

javascriptGenerator.forBlock.site_get_text_element = (block) =>
  [`(document.querySelector(${JSON.stringify(targetSelector(block))})?.textContent || '')`, Order.MEMBER]

javascriptGenerator.forBlock.site_background_element = (block) =>
  `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { node.style.backgroundColor = ${JSON.stringify(block.getFieldValue('COLOR'))}; });\n`

javascriptGenerator.forBlock.site_color_element = (block) =>
  `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { node.style.color = ${JSON.stringify(block.getFieldValue('COLOR'))}; });\n`

javascriptGenerator.forBlock.site_image_element = (block, generator) => {
  const url = generator.valueToCode(block, 'SRC', Order.NONE) || "''"
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nif (node.tagName === 'IMG') node.src = ${url};\nelse node.style.backgroundImage = 'url(' + ${url} + ')';\n});\n`
}

javascriptGenerator.forBlock.site_input_set_value = (block, generator) => {
  const val = generator.valueToCode(block, 'VALUE', Order.NONE) || "''"
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { if ('value' in node) node.value = ${val}; });\n`
}

javascriptGenerator.forBlock.site_input_get_value = (block) =>
  [`(document.querySelector(${JSON.stringify(targetSelector(block))})?.value || '')`, Order.MEMBER]

javascriptGenerator.forBlock.site_show_hide_element = (block) => {
  const act = block.getFieldValue('ACTION')
  const sel = JSON.stringify(targetSelector(block))
  if (act === 'show') return `document.querySelectorAll(${sel}).forEach(node => { node.style.display = ''; });\n`
  if (act === 'hide') return `document.querySelectorAll(${sel}).forEach(node => { node.style.display = 'none'; });\n`
  return `document.querySelectorAll(${sel}).forEach(node => { node.style.display = (node.style.display === 'none' || getComputedStyle(node).display === 'none') ? '' : 'none'; });\n`
}

javascriptGenerator.forBlock.site_add_remove_class = (block, generator) => {
  const act = block.getFieldValue('ACTION')
  const cls = generator.valueToCode(block, 'CLASS', Order.NONE) || "''"
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { if (${cls}) node.classList.${act}(${cls}); });\n`
}

javascriptGenerator.forBlock.site_animate_element = (block) => {
  const effect = block.getFieldValue('EFFECT')
  const sel = JSON.stringify(targetSelector(block))
  const keyframes = {
    bounce: `[{ transform: 'translateY(0)' }, { transform: 'translateY(-24px)' }, { transform: 'translateY(0)' }]`,
    shake: `[{ transform: 'translateX(-12px)' }, { transform: 'translateX(12px)' }, { transform: 'translateX(-12px)' }, { transform: 'translateX(0)' }]`,
    flash: `[{ opacity: 1 }, { opacity: 0.1 }, { opacity: 1 }, { opacity: 0.1 }, { opacity: 1 }]`,
    spin: `[{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }]`,
    pulse: `[{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }]`,
  }[effect] || `[{ transform: 'scale(1)' }]`
  return `document.querySelectorAll(${sel}).forEach(node => { node.animate(${keyframes}, { duration: 450, iterations: 1, easing: 'ease-in-out' }); });\n`
}

javascriptGenerator.forBlock.site_scroll_to_element = (block) =>
  `document.querySelector(${JSON.stringify(targetSelector(block))})?.scrollIntoView({ behavior: 'smooth', block: 'center' });\n`

javascriptGenerator.forBlock.site_open_url = (block, generator) => {
  const url = generator.valueToCode(block, 'URL', Order.NONE) || "''"
  const target = JSON.stringify(block.getFieldValue('TARGET'))
  return `if (${url}) window.open(${url}, ${target});\n`
}

javascriptGenerator.forBlock.site_message = (block, generator) => {
  const msg = generator.valueToCode(block, 'TEXT', Order.NONE) || "''"
  return `{
let notice = document.getElementById('uebit-message-toast');
if (!notice) {
  notice = document.createElement('div');
  notice.id = 'uebit-message-toast';
  notice.setAttribute('role', 'status');
  Object.assign(notice.style, {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '90vw',
    padding: '14px 24px',
    borderRadius: '9999px',
    background: '#7c3aed',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '15px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    zIndex: '99999',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  });
  document.body.append(notice);
}
notice.textContent = ${msg};
notice.style.opacity = '1';
notice.style.display = 'block';
clearTimeout(window.__uebitToastTimer);
window.__uebitToastTimer = setTimeout(() => { notice.style.opacity = '0'; setTimeout(() => { notice.style.display = 'none'; }, 300); }, 3500);
}\n`
}

javascriptGenerator.forBlock.site_play_sound = (block) => {
  const sound = block.getFieldValue('SOUND')
  return `(() => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const playTone = (freq, start, dur, type = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(0.18, now + start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur);
    };
    switch (${JSON.stringify(sound)}) {
      case 'vitoria': [261.6, 329.6, 392.0, 523.3].forEach((f, i) => playTone(f, i * 0.09, 0.25, 'triangle')); break;
      case 'moeda': playTone(987.8, 0, 0.07, 'sine'); playTone(1318.5, 0.07, 0.25, 'sine'); break;
      case 'clique': playTone(900, 0, 0.03, 'square'); break;
      case 'pulo': {
        const osc = ctx.createOscillator(); const g = ctx.createGain();
        osc.frequency.setValueAtTime(160, now); osc.frequency.exponentialRampToValueAtTime(650, now + 0.16);
        g.gain.setValueAtTime(0.16, now); g.gain.linearRampToValueAtTime(0.01, now + 0.16);
        osc.connect(g); g.connect(ctx.destination); osc.start(now); osc.stop(now + 0.16); break;
      }
      case 'laser': {
        const osc = ctx.createOscillator(); const g = ctx.createGain();
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(950, now); osc.frequency.exponentialRampToValueAtTime(100, now + 0.18);
        g.gain.setValueAtTime(0.14, now); g.gain.linearRampToValueAtTime(0.01, now + 0.18);
        osc.connect(g); g.connect(ctx.destination); osc.start(now); osc.stop(now + 0.18); break;
      }
      case 'alerta': playTone(440, 0, 0.1, 'square'); playTone(880, 0.12, 0.22, 'square'); break;
      case 'derrota': [440, 370, 311, 261].forEach((f, i) => playTone(f, i * 0.11, 0.25, 'sawtooth')); break;
    }
  } catch {}
})();\n`
}

javascriptGenerator.forBlock.site_play_tone = (block) => {
  const freq = block.getFieldValue('NOTE')
  const dur = parseFloat(block.getFieldValue('DURATION')) || 0.3
  return `(() => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(${freq}, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + ${dur});
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + ${dur});
  } catch {}
})();\n`
}

javascriptGenerator.forBlock.site_wait_seconds = (block, generator) => {
  const sec = generator.valueToCode(block, 'SECONDS', Order.NONE) || '1'
  return `setTimeout(() => {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}, Math.max(0, Number(${sec}) * 1000));\n`
}

javascriptGenerator.forBlock.site_repeat_every = (block, generator) => {
  const sec = generator.valueToCode(block, 'SECONDS', Order.NONE) || '1'
  return `setInterval(() => {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}, Math.max(100, Number(${sec}) * 1000));\n`
}

javascriptGenerator.forBlock.site_click = (block, generator) =>
  `document.addEventListener('click', (event) => {\nif (event.target.closest(${JSON.stringify(block.getFieldValue('SELECTOR'))})) {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}\n});\n`

javascriptGenerator.forBlock.site_text = (block, generator) =>
  `document.querySelectorAll(${JSON.stringify(block.getFieldValue('SELECTOR'))}).forEach(node => { node.textContent = ${generator.valueToCode(block, 'TEXT', Order.NONE) || "''"}; });\n`

javascriptGenerator.forBlock.site_background = (block) =>
  `document.querySelectorAll(${JSON.stringify(block.getFieldValue('SELECTOR'))}).forEach(node => { node.style.backgroundColor = ${JSON.stringify(block.getFieldValue('COLOR'))}; });\n`

javascriptGenerator.INFINITE_LOOP_TRAP = 'if (--__uebitLoopBudget < 0) throw new Error("Muitas repetições. Diminua o número de passos dos blocos.");\n'

/* ---------- Configuração da Toolbox (Categorias MakeCode) ---------- */
const block = (type, extra = {}) => ({ kind: 'block', type, ...extra })
const textInput = (val = 'Olá, mundo!') => ({ TEXT: { shadow: { type: 'text', fields: { TEXT: val } } } })
const number = (value) => ({ shadow: { type: 'math_number', fields: { NUM: value } } })
const category = (name, style, icon, contents) => ({ kind: 'category', name, categorystyle: style, icon, contents: [heading(name), ...contents] })

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    category('Eventos', 'uebit_events', '◉', [
      block('site_on_start'),
      block('site_click_element'),
      block('site_mouse_enter'),
      block('site_mouse_leave'),
      block('site_input_change'),
      block('site_key_press'),
    ]),
    category('Minha página', 'uebit_page', '▦', [
      block('site_text_element', { inputs: textInput('Novo texto') }),
      block('site_get_text_element'),
      block('site_background_element'),
      block('site_color_element'),
      block('site_image_element', { inputs: { SRC: { shadow: { type: 'text', fields: { TEXT: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800' } } } } }),
      block('site_input_set_value', { inputs: textInput('Texto digitado') }),
      block('site_input_get_value'),
      block('site_show_hide_element'),
      block('site_add_remove_class', { inputs: { CLASS: { shadow: { type: 'text', fields: { TEXT: 'destaque' } } } } }),
      block('site_animate_element'),
      block('site_scroll_to_element'),
      block('site_open_url', { inputs: { URL: { shadow: { type: 'text', fields: { TEXT: 'https://google.com' } } } } }),
      block('site_message', { inputs: textInput('Parabéns! Você clicou no botão! 🎉') }),
    ]),
    category('Sons & Áudio', 'uebit_sound', '♫', [
      block('site_play_sound'),
      block('site_play_tone'),
    ]),
    category('Tempo & Espera', 'uebit_time', '⏱', [
      block('site_wait_seconds', { inputs: { SECONDS: number(1) } }),
      block('site_repeat_every', { inputs: { SECONDS: number(2) } }),
    ]),
    category('Lógica', 'uebit_logic', '⇄', [
      block('controls_if'),
      block('controls_if', { extraState: { hasElse: true } }),
      block('logic_compare', { inputs: { A: number(0), B: number(0) } }),
      block('logic_operation'),
      block('logic_negate'),
      block('logic_boolean'),
      block('logic_null'),
      block('logic_ternary'),
    ]),
    category('Repetições', 'uebit_loops', '↻', [
      block('controls_repeat_ext', { inputs: { TIMES: number(4) } }),
      block('controls_whileUntil'),
      block('controls_for', { inputs: { FROM: number(1), TO: number(10), BY: number(1) } }),
      block('controls_forEach'),
      block('controls_flow_statements'),
    ]),
    category('Matemática', 'uebit_math', '∑', [
      block('math_number'),
      block('math_arithmetic', { inputs: { A: number(0), B: number(0) } }),
      block('math_random_int', { inputs: { FROM: number(1), TO: number(10) } }),
      block('math_round', { inputs: { NUM: number(3.14) } }),
      block('math_single', { inputs: { NUM: number(9) } }),
      block('math_modulo', { inputs: { DIVIDEND: number(10), DIVISOR: number(3) } }),
      block('math_constrain', { inputs: { VALUE: number(50), LOW: number(1), HIGH: number(100) } }),
      block('math_number_property', { inputs: { NUMBER_TO_CHECK: number(4) } }),
    ]),
    category('Texto', 'uebit_text', 'Aa', [
      block('text'),
      block('text_join'),
      block('text_length', { inputs: { VALUE: { shadow: { type: 'text', fields: { TEXT: 'abc' } } } } }),
      block('text_isEmpty', { inputs: { VALUE: { shadow: { type: 'text', fields: { TEXT: '' } } } } }),
      block('text_indexOf', { inputs: { VALUE: { shadow: { type: 'text', fields: { TEXT: 'banana' } } }, FIND: { shadow: { type: 'text', fields: { TEXT: 'na' } } } } }),
      block('text_charAt', { inputs: { VALUE: { shadow: { type: 'text', fields: { TEXT: 'texto' } } } } }),
      block('text_getSubstring', { inputs: { STRING: { shadow: { type: 'text', fields: { TEXT: 'texto' } } } } }),
      block('text_changeCase', { inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'olá' } } } } }),
      block('text_trim', { inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: ' texto ' } } } } }),
      block('text_prompt_ext', { inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Qual é o seu nome?' } } } } }),
      block('text_print', { inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Atenção!' } } } } }),
    ]),
    { kind: 'category', name: 'Variáveis', categorystyle: 'uebit_variables', icon: '≡', custom: 'UEBIT_VARIABLES' },
    category('Listas', 'uebit_arrays', '☰', [
      block('lists_create_with'),
      block('lists_create_with', { extraState: { itemCount: 0 } }),
      block('lists_repeat', { inputs: { NUM: number(5) } }),
      block('lists_length'),
      block('lists_isEmpty'),
      block('lists_indexOf'),
      block('lists_getIndex'),
      block('lists_setIndex'),
      block('lists_split', { inputs: { DELIM: { shadow: { type: 'text', fields: { TEXT: ',' } } } } }),
    ]),
    { kind: 'category', name: 'Funções', categorystyle: 'uebit_functions', icon: 'ƒ', custom: 'UEBIT_FUNCTIONS' },
    category('Seletores CSS', 'uebit_advanced', '#', [
      block('site_text', { inputs: textInput('Texto') }),
      block('site_background'),
      block('site_click'),
    ]),
  ],
}

export const DEFAULT_WORKSPACE = {
  blocks: {
    languageVersion: 0,
    blocks: [{ type: 'site_on_start', x: 40, y: 40 }],
  },
}

export const workspaceConfiguration = {
  renderer: 'uebit-microbit',
  theme: microbitTheme,
  sounds: false,
  trashcan: false,
  move: { scrollbars: true, drag: true, wheel: true },
  zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 2, minScale: 0.4, scaleSpeed: 1.15 },
  grid: { spacing: 20, length: 1, colour: '#ecf0f1', snap: true },
}

export { Blockly, javascriptGenerator }

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
  games: '#10B981', // Jogos & Placar (Esmeralda)
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
    uebit_games: blockStyle(C.games),
    uebit_page: blockStyle(C.page),
    uebit_sound: blockStyle(C.sound),
    uebit_time: blockStyle(C.time),
    uebit_advanced: blockStyle(C.advanced),
  },
  categoryStyles: {
    uebit_events: { colour: C.events },
    uebit_games: { colour: C.games },
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
  createRowContainer_() {
    const row = super.createRowContainer_()
    row.id = this.getId()
    return row
  }
  createRowContentsContainer_() {
    const container = super.createRowContentsContainer_()
    container.style.pointerEvents = 'none'
    return container
  }
  addColourBorder_(colour) {
    super.addColourBorder_(colour)
    this.rowDiv_.style.setProperty('--uebit-category', colour)
  }
  createIconDom_() {
    const icon = document.createElement('span')
    icon.className = 'uebitCategoryIcon'
    icon.setAttribute('aria-hidden', 'true')
    icon.id = this.getId()
    icon.style.pointerEvents = 'none'
    icon.textContent = this.toolboxItemDef_.icon ?? '●'
    return icon
  }
  createLabelDom_(name) {
    const label = super.createLabelDom_(name)
    label.style.pointerEvents = 'none'
    return label
  }
}
Blockly.registry.register(Blockly.registry.Type.TOOLBOX_ITEM, Blockly.ToolboxCategory.registrationName, MicrobitCategory, true)

const workspaceTargets = new WeakMap()
export function setWorkspaceTargets(workspace, targets) { workspaceTargets.set(workspace, targets) }

const heading = (text) => ({ kind: 'label', text, 'web-class': 'uebitFlyoutHeading' })
export function prepareWorkspace(workspace, targets) {
  setWorkspaceTargets(workspace, targets)
  const targetWs = workspace.targetWorkspace ?? workspace
  const regVar = (ws) => {
    try {
      ws.registerButtonCallback('CREATE_VARIABLE', (button) => Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace()))
    } catch {}
    try {
      ws.registerToolboxCategoryCallback('UEBIT_VARIABLES', (target) => [heading('Variáveis'), ...Blockly.Variables.flyoutCategory(target)])
    } catch {}
  }
  regVar(workspace)
  if (targetWs !== workspace) {
    regVar(targetWs)
  }
}

function targetsFor(field) {
  const workspace = field.getSourceBlock()?.workspace
  return workspaceTargets.get(workspace?.targetWorkspace ?? workspace) ?? []
}

const TEXT_TARGET_TYPES = ['heading', 'paragraph', 'button', 'quote', 'list', 'ordered-list', 'input', 'textarea', 'link', 'strong', 'em', 'code', 'span']
const INPUT_TARGET_TYPES = ['input', 'textarea', 'select', 'checkbox']
function acceptsTarget(target, filter) {
  if (filter === 'text') return TEXT_TARGET_TYPES.includes(target.type)
  if (filter === 'input') return INPUT_TARGET_TYPES.includes(target.type)
  return true
}

class SiteTargetField extends Blockly.FieldDropdown {
  constructor(filterType = 'all') {
    super(function () {
      const allTargets = targetsFor(this)
      const filter = this.filterType ?? 'all'
      const targets = allTargets.filter((target) => acceptsTarget(target, filter))
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
  {
    type: 'site_on_scroll',
    message0: 'quando rolar a página %1 faça %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'DIRECTION',
        options: [
          ['para baixo ⬇️', 'down'],
          ['para cima ⬆️', 'up'],
          ['após descer 100px 📌', 'past100'],
          ['de volta ao topo 🏠', 'top'],
          ['em qualquer direção ↕️', 'any'],
        ],
      },
      { type: 'input_statement', name: 'DO' },
    ],
    style: 'uebit_events',
    tooltip: 'Executa ações quando o visitante rolar a página (ideal para fixar menus ou exibir botões).',
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
    type: 'site_is_visible',
    message0: 'o elemento %1 está visível?',
    args0: [{ type: 'field_site_target', name: 'TARGET' }],
    output: 'Boolean',
    style: 'uebit_page',
    tooltip: 'Verdadeiro quando o elemento e seus pais não estão ocultos. Encaixa no se/senão.',
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

  // Jogos & Placar
  {
    type: 'site_add_number_element',
    message0: 'somar %1 ao número em %2',
    args0: [
      { type: 'input_value', name: 'AMOUNT', check: 'Number' },
      { type: 'field_site_target', name: 'TARGET', textOnly: true },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_games',
    tooltip: 'Soma (ou subtrai, se negativo) ao número exibido no elemento, preservando o texto ao redor (ex: "Pontos: 0" vira "Pontos: 1").',
  },
  {
    type: 'site_set_number_element',
    message0: 'definir número em %1 como %2',
    args0: [
      { type: 'field_site_target', name: 'TARGET', textOnly: true },
      { type: 'input_value', name: 'VALUE', check: 'Number' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_games',
    tooltip: 'Define o número exibido no elemento, mantendo rótulos como "Pontos: " ou "Vidas: ".',
  },
  {
    type: 'site_get_number_element',
    message0: 'número em %1',
    args0: [{ type: 'field_site_target', name: 'TARGET' }],
    output: 'Number',
    style: 'uebit_games',
    tooltip: 'Lê o valor numérico atual dentro do elemento ou campo (ex: "Pontos: 15" retorna 15).',
  },
  {
    type: 'site_move_element',
    message0: 'mover %1 %2 por %3 pixels',
    args0: [
      { type: 'field_site_target', name: 'TARGET' },
      {
        type: 'field_dropdown',
        name: 'DIRECTION',
        options: [
          ['para direita ➡️', 'right'],
          ['para esquerda ⬅️', 'left'],
          ['para cima ⬆️', 'up'],
          ['para baixo ⬇️', 'down'],
        ],
      },
      { type: 'input_value', name: 'PIXELS', check: 'Number' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_games',
    tooltip: 'Move o elemento na direção escolhida (ótimo para controlar personagens ou objetos em jogos).',
  },
  {
    type: 'site_move_random',
    message0: 'mover %1 para posição aleatória 🎲',
    args0: [{ type: 'field_site_target', name: 'TARGET' }],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_games',
    tooltip: 'Move o elemento para um lugar sortido na tela (perfeito para jogos de clicar no alvo!).',
  },
  {
    type: 'site_scale_element',
    message0: 'mudar tamanho de %1 para %2 %',
    args0: [
      { type: 'field_site_target', name: 'TARGET' },
      { type: 'input_value', name: 'SCALE', check: 'Number' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_games',
    tooltip: 'Aumenta ou diminui o tamanho visual do elemento (100% é o tamanho original).',
  },
  {
    type: 'site_reset_transform',
    message0: 'voltar %1 ao normal (posição e tamanho) ↺',
    args0: [{ type: 'field_site_target', name: 'TARGET' }],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_games',
    tooltip: 'Restaura o elemento para sua posição inicial e tamanho 100%.',
  },
  {
    type: 'site_touching_elements',
    message0: '%1 está encostando em %2 ?',
    args0: [
      { type: 'field_site_target', name: 'TARGET_A' },
      { type: 'field_site_target', name: 'TARGET_B' },
    ],
    inputsInline: true,
    output: 'Boolean',
    style: 'uebit_games',
    tooltip: 'Verdadeiro quando os dois elementos se tocam ou se sobrepõem na tela (colisão para jogos!).',
  },
  {
    type: 'site_confetti',
    message0: 'lançar chuva de confetes 🎉',
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_games',
    tooltip: 'Solta uma explosão colorida de confetes na tela para comemorar vitórias!',
  },

  // Conteúdo & Memória extra
  {
    type: 'site_toggle_text_element',
    message0: 'alternar texto de %1 entre %2 e %3',
    args0: [
      { type: 'field_site_target', name: 'TARGET', textOnly: true },
      { type: 'input_value', name: 'TEXT_A', check: 'String' },
      { type: 'input_value', name: 'TEXT_B', check: 'String' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Troca o texto do elemento entre duas opções a cada clique (ex: "Ligar" e "Desligar").',
  },
  {
    type: 'site_append_element',
    message0: 'adicionar item %1 dentro de %2',
    args0: [
      { type: 'input_value', name: 'TEXT', check: 'String' },
      { type: 'field_site_target', name: 'TARGET' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Adiciona um novo item dentro de uma lista ou container (ideal para listas de tarefas, chat ou carrinho).',
  },
  {
    type: 'site_clear_element',
    message0: 'limpar itens de %1',
    args0: [{ type: 'field_site_target', name: 'TARGET' }],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Remove todos os itens adicionados dentro da lista ou container.',
  },
  {
    type: 'site_random_background_element',
    message0: 'mudar fundo de %1 para cor aleatória 🌈',
    args0: [{ type: 'field_site_target', name: 'TARGET' }],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Pinta o fundo do elemento com uma cor vibrante sorteada na hora.',
  },
  {
    type: 'site_enable_disable_element',
    message0: '%1 o elemento %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'ACTION',
        options: [
          ['ativar ✅', 'enable'],
          ['desativar 🚫', 'disable'],
        ],
      },
      { type: 'field_site_target', name: 'TARGET' },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Ativa ou desativa um botão ou campo para impedir ou liberar cliques.',
  },
  {
    type: 'site_bg_image_element',
    message0: 'mudar imagem de fundo de %1 para URL %2',
    args0: [
      { type: 'field_site_target', name: 'TARGET' },
      { type: 'input_value', name: 'URL', check: 'String' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Define uma imagem de fundo (background-image) preenchendo o bloco ou container.',
  },
  {
    type: 'site_pin_element',
    message0: 'fixar %1 %2',
    args0: [
      { type: 'field_site_target', name: 'TARGET' },
      {
        type: 'field_dropdown',
        name: 'POSITION',
        options: [
          ['no topo ao rolar (menu fixo) 📌', 'sticky-top'],
          ['flutuando no topo da tela ⬆️', 'fixed-top'],
          ['flutuando na base da tela ⬇️', 'fixed-bottom'],
          ['no canto inferior direito 💬', 'fixed-corner'],
          ['soltar na posição normal 🔓', 'static'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Fixa menus no topo durante a rolagem, cria barras flutuantes ou solta o elemento.',
  },
  {
    type: 'site_layer_order',
    message0: 'colocar camada de %1 %2',
    args0: [
      { type: 'field_site_target', name: 'TARGET' },
      {
        type: 'field_dropdown',
        name: 'LAYER',
        options: [
          ['na frente de tudo (topo) ⬆️', '999'],
          ['acima das outras 🔼', '50'],
          ['na posição normal ⏹️', ''],
          ['atrás das outras 🔽', '-1'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Controla qual camada fica por cima ou por baixo das outras (z-index).',
  },
  {
    type: 'site_opacity_element',
    message0: 'mudar opacidade de %1 para %2 %%',
    args0: [
      { type: 'field_site_target', name: 'TARGET' },
      { type: 'input_value', name: 'OPACITY', check: 'Number' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Ajusta a transparência da camada entre 0% (invisível) e 100% (totalmente visível).',
  },
  {
    type: 'site_media_control',
    message0: '%1 mídia (vídeo ou áudio) %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'ACTION',
        options: [
          ['reproduzir (play) ▶️', 'play'],
          ['pausar ⏸️', 'pause'],
          ['alternar play/pausa ⏯️', 'toggle'],
          ['reiniciar do começo ⏮️', 'restart'],
          ['silenciar (mudo) 🔇', 'mute'],
          ['ativar som 🔊', 'unmute'],
        ],
      },
      { type: 'field_site_target', name: 'TARGET' },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_sound',
    tooltip: 'Controla a reprodução de elementos de vídeo (<video>) ou áudio (<audio>) da página.',
  },
  {
    type: 'site_storage_save',
    message0: 'salvar %1 na memória como %2',
    args0: [
      { type: 'input_value', name: 'VALUE' },
      { type: 'input_value', name: 'KEY', check: 'String' },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_page',
    tooltip: 'Guarda um valor no navegador (ex: recorde de pontos ou nome) mesmo se recarregar a página.',
  },
  {
    type: 'site_storage_load',
    message0: 'ler %1 da memória',
    args0: [{ type: 'input_value', name: 'KEY', check: 'String' }],
    inputsInline: true,
    output: null,
    style: 'uebit_page',
    tooltip: 'Recupera um valor salvo anteriormente na memória do navegador.',
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
  {
    type: 'site_stop_timers',
    message0: 'parar todos os cronômetros ⏹️',
    previousStatement: null,
    nextStatement: null,
    style: 'uebit_time',
    tooltip: 'Interrompe todas as repetições de tempo ativas (útil para Fim de Jogo / Game Over).',
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
  if (!target || !acceptsTarget(target, field?.filterType ?? 'all')) {
    throw new Error('Escolha um elemento disponível nos blocos de página. Um destino está vazio, foi removido ou é incompatível.')
  }
  // Escape de string CSS, inclusive quebras de linha, sem depender de CSS.escape global.
  // eslint-disable-next-line no-control-regex -- controles precisam ser escapados em strings CSS.
  const escaped = id.replace(/[\0-\x1f\x7f"\\]/g, (char) => `\\${char.codePointAt(0).toString(16)} `)
  return `[data-block-id="${escaped}"]`
}

/* ---------- Geradores JavaScript ---------- */
javascriptGenerator.forBlock.site_on_start = (block, generator) => {
  const body = generator.statementToCode(block, 'DO')
  return body.trim() ? `__uebitLoopBudget = 10000;\n${body}` : ''
}

javascriptGenerator.forBlock.site_click_element = (block, generator) =>
  `document.addEventListener('click', (event) => {\nif (event.target?.closest?.(${JSON.stringify(targetSelector(block))})) {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}\n});\n`

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

javascriptGenerator.forBlock.site_on_scroll = (block, generator) => {
  const dir = block.getFieldValue('DIRECTION')
  const body = generator.statementToCode(block, 'DO')
  const cond = {
    down: 'currentY > lastY',
    up: 'currentY < lastY',
    past100: 'currentY > 100',
    top: 'currentY <= 10',
    any: 'true',
  }[dir] || 'true'
  return `(() => {\nlet lastY = window.scrollY || 0;\nwindow.addEventListener('scroll', () => {\nconst currentY = window.scrollY || document.documentElement.scrollTop || 0;\nif (${cond}) {\n__uebitLoopBudget = 10000;\n${body}}\nlastY = currentY;\n}, { passive: true });\n})();\n`
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

javascriptGenerator.forBlock.site_show_hide_element = (block, generator) => {
  const name = generator.provideFunction_('uebitSetVisible', `
function ${generator.FUNCTION_NAME_PLACEHOLDER_}(node, action) {
  const saved = ${generator.FUNCTION_NAME_PLACEHOLDER_}.displays ||= new WeakMap();
  const hidden = node.hidden || getComputedStyle(node).display === 'none';
  const show = action === 'show' || (action === 'toggle' && hidden);
  if (!show) {
    if (node.style.display !== 'none' && !saved.has(node)) {
      saved.set(node, [node.style.display, node.style.getPropertyPriority('display')]);
    }
    node.style.setProperty('display', 'none', 'important');
    return;
  }
  node.hidden = false;
  if (!hidden && !saved.has(node)) return;
  const previous = saved.get(node);
  node.style.removeProperty('display');
  if (previous && previous[0]) node.style.setProperty('display', previous[0], previous[1]);
  saved.delete(node);
  if (getComputedStyle(node).display === 'none') node.style.setProperty('display', 'block', 'important');
}
`)
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { ${name}(node, ${JSON.stringify(block.getFieldValue('ACTION'))}); });\n`
}

javascriptGenerator.forBlock.site_is_visible = (block, generator) => {
  const name = generator.provideFunction_('uebitIsVisible', `
function ${generator.FUNCTION_NAME_PLACEHOLDER_}(node) {
  if (!node) return false;
  const visibility = getComputedStyle(node).visibility;
  if (visibility === 'hidden' || visibility === 'collapse') return false;
  for (let current = node; current; current = current.parentElement) {
    if (current.hidden || getComputedStyle(current).display === 'none') return false;
  }
  return true;
}
`)
  return [`${name}(document.querySelector(${JSON.stringify(targetSelector(block))}))`, Order.FUNCTION_CALL]
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
  return `((window.__uebitTimeouts ||= []).push(setTimeout(() => {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}, Math.max(0, Number(${sec}) * 1000))));\n`
}

javascriptGenerator.forBlock.site_repeat_every = (block, generator) => {
  const sec = generator.valueToCode(block, 'SECONDS', Order.NONE) || '1'
  return `((window.__uebitIntervals ||= []).push(setInterval(() => {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}, Math.max(100, Number(${sec}) * 1000))));\n`
}

javascriptGenerator.forBlock.site_stop_timers = () =>
  `(window.__uebitIntervals || []).forEach(clearInterval); window.__uebitIntervals = []; (window.__uebitTimeouts || []).forEach(clearTimeout); window.__uebitTimeouts = [];\n`

function provideNumberHelpers(generator) {
  const readName = generator.provideFunction_('uebitReadNumber', `
function ${generator.FUNCTION_NAME_PLACEHOLDER_}(node) {
  if (!node) return 0;
  const raw = ('value' in node && node.tagName === 'INPUT') ? String(node.value || '') : String(node.textContent || '');
  const match = raw.match(/-?\\d+(?:[.,]\\d+)?/);
  return match ? Number(match[0].replace(',', '.')) : 0;
}
`)
  const writeName = generator.provideFunction_('uebitWriteNumber', `
function ${generator.FUNCTION_NAME_PLACEHOLDER_}(node, value) {
  if (!node) return;
  const num = Number(value);
  const clean = Number.isFinite(num) ? Math.round(num * 100) / 100 : 0;
  if ('value' in node && node.tagName === 'INPUT') {
    node.value = String(clean);
    return;
  }
  const current = String(node.textContent || '');
  if (/-?\\d+(?:[.,]\\d+)?/.test(current)) {
    node.textContent = current.replace(/-?\\d+(?:[.,]\\d+)?/, String(clean));
  } else {
    node.textContent = current ? current + ' ' + clean : String(clean);
  }
}
`)
  return { readName, writeName }
}

javascriptGenerator.forBlock.site_add_number_element = (block, generator) => {
  const { readName, writeName } = provideNumberHelpers(generator)
  const amount = generator.valueToCode(block, 'AMOUNT', Order.NONE) || '1'
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { ${writeName}(node, ${readName}(node) + (Number(${amount}) || 0)); });\n`
}

javascriptGenerator.forBlock.site_set_number_element = (block, generator) => {
  const { writeName } = provideNumberHelpers(generator)
  const val = generator.valueToCode(block, 'VALUE', Order.NONE) || '0'
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { ${writeName}(node, ${val}); });\n`
}

javascriptGenerator.forBlock.site_get_number_element = (block, generator) => {
  const { readName } = provideNumberHelpers(generator)
  return [`${readName}(document.querySelector(${JSON.stringify(targetSelector(block))}))`, Order.FUNCTION_CALL]
}

function provideTransformHelper(generator) {
  return generator.provideFunction_('uebitTransform', `
function ${generator.FUNCTION_NAME_PLACEHOLDER_}(node, patch) {
  if (!node) return;
  const ds = (node.dataset ||= {});
  const x = patch.x !== undefined ? patch.x : (Number(ds.uebitX) || 0) + (patch.dx || 0);
  const y = patch.y !== undefined ? patch.y : (Number(ds.uebitY) || 0) + (patch.dy || 0);
  const s = patch.scale !== undefined ? patch.scale : (Number(ds.uebitScale) || 100);
  ds.uebitX = String(x);
  ds.uebitY = String(y);
  ds.uebitScale = String(s);
  node.style.transition = 'transform 160ms ease-out';
  node.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + (s / 100) + ')';
}
`)
}

javascriptGenerator.forBlock.site_move_element = (block, generator) => {
  const fn = provideTransformHelper(generator)
  const dir = block.getFieldValue('DIRECTION')
  const px = generator.valueToCode(block, 'PIXELS', Order.NONE) || '20'
  const delta = {
    right: `{ dx: Number(${px}) || 0 }`,
    left: `{ dx: -(Number(${px}) || 0) }`,
    down: `{ dy: Number(${px}) || 0 }`,
    up: `{ dy: -(Number(${px}) || 0) }`,
  }[dir] || `{ dx: 0 }`
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { ${fn}(node, ${delta}); });\n`
}

javascriptGenerator.forBlock.site_move_random = (block, generator) => {
  const fn = provideTransformHelper(generator)
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { ${fn}(node, { x: Math.floor(Math.random() * 221) - 110, y: Math.floor(Math.random() * 141) - 70 }); });\n`
}

javascriptGenerator.forBlock.site_scale_element = (block, generator) => {
  const fn = provideTransformHelper(generator)
  const scale = generator.valueToCode(block, 'SCALE', Order.NONE) || '100'
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { ${fn}(node, { scale: Math.max(10, Math.min(400, Number(${scale}) || 100)) }); });\n`
}

javascriptGenerator.forBlock.site_reset_transform = (block, generator) => {
  const fn = provideTransformHelper(generator)
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { ${fn}(node, { x: 0, y: 0, scale: 100 }); });\n`
}

function targetSelectorByField(block, fieldName) {
  const id = block.getFieldValue(fieldName)
  const field = block.getField(fieldName)
  const target = targetsFor(field).find((item) => item.id === id)
  if (!target || !acceptsTarget(target, field?.filterType ?? 'all')) {
    throw new Error('Escolha um elemento disponível nos blocos de página. Um destino está vazio, foi removido ou é incompatível.')
  }
  // eslint-disable-next-line no-control-regex -- controles precisam ser escapados em strings CSS.
  const escaped = id.replace(/[\0-\x1f\x7f"\\]/g, (char) => `\\${char.codePointAt(0).toString(16)} `)
  return `[data-block-id="${escaped}"]`
}

javascriptGenerator.forBlock.site_touching_elements = (block, generator) => {
  const fn = generator.provideFunction_('uebitIsTouching', `
function ${generator.FUNCTION_NAME_PLACEHOLDER_}(a, b) {
  if (!a || !b || a === b || typeof a.getBoundingClientRect !== 'function' || typeof b.getBoundingClientRect !== 'function') return false;
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  if ((r1.width === 0 && r1.height === 0) || (r2.width === 0 && r2.height === 0)) return false;
  return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
}
`)
  const selA = JSON.stringify(targetSelectorByField(block, 'TARGET_A'))
  const selB = JSON.stringify(targetSelectorByField(block, 'TARGET_B'))
  return [`${fn}(document.querySelector(${selA}), document.querySelector(${selB}))`, Order.FUNCTION_CALL]
}

javascriptGenerator.forBlock.site_confetti = (_, generator) => {
  const fn = generator.provideFunction_('uebitConfetti', `
function ${generator.FUNCTION_NAME_PLACEHOLDER_}() {
  if (typeof document === 'undefined' || !document.body) return;
  const colors = ['#7c3aed', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#22c55e'];
  for (let i = 0; i < 28; i++) {
    const piece = document.createElement('div');
    Object.assign(piece.style, {
      position: 'fixed',
      left: Math.random() * 100 + 'vw',
      top: '-16px',
      width: '10px',
      height: '14px',
      backgroundColor: colors[i % colors.length],
      borderRadius: '3px',
      zIndex: '99998',
      pointerEvents: 'none',
    });
    document.body.append(piece);
    const drift = (Math.random() - 0.5) * 180;
    const anim = piece.animate?.([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: 'translate(' + drift + 'px, 92vh) rotate(' + (Math.random() * 720) + 'deg)', opacity: 0 },
    ], { duration: 1200 + Math.random() * 900, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' });
    if (anim) anim.onfinish = () => piece.remove();
    else setTimeout(() => piece.remove(), 1800);
  }
}
`)
  return `${fn}();\n`
}

javascriptGenerator.forBlock.site_toggle_text_element = (block, generator) => {
  const textA = generator.valueToCode(block, 'TEXT_A', Order.NONE) || "''"
  const textB = generator.valueToCode(block, 'TEXT_B', Order.NONE) || "''"
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { const a = String(${textA}); const b = String(${textB}); node.textContent = (node.textContent || '').trim() === a.trim() ? b : a; });\n`
}

javascriptGenerator.forBlock.site_append_element = (block, generator) => {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''"
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nconst val = String(${text}).trim();\nif (!val) return;\nconst item = document.createElement(node.tagName === 'UL' || node.tagName === 'OL' ? 'li' : 'div');\nitem.textContent = val;\nitem.setAttribute('data-uebit-dynamic-item', 'true');\nObject.assign(item.style, { padding: '8px 12px', marginTop: '6px', borderRadius: '10px', backgroundColor: 'rgba(124, 58, 237, 0.08)', fontWeight: '600' });\nnode.append(item);\n});\n`
}

javascriptGenerator.forBlock.site_clear_element = (block) =>
  `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nconst dynamic = node.querySelectorAll?.('[data-uebit-dynamic-item]');\nif (dynamic && dynamic.length) dynamic.forEach(el => el.remove());\nelse node.textContent = '';\n});\n`

javascriptGenerator.forBlock.site_random_background_element = (block) =>
  `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nconst palette = ['#2563eb', '#16a34a', '#f59e0b', '#e11d48', '#7c3aed', '#06b6d4', '#ec4899', '#84cc16'];\nnode.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];\n});\n`

javascriptGenerator.forBlock.site_enable_disable_element = (block) => {
  const disable = block.getFieldValue('ACTION') === 'disable'
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nnode.disabled = ${disable};\nnode.style.pointerEvents = ${disable ? "'none'" : "''"};\nnode.style.opacity = ${disable ? "'0.5'" : "''"};\n});\n`
}

javascriptGenerator.forBlock.site_bg_image_element = (block, generator) => {
  const url = generator.valueToCode(block, 'URL', Order.NONE) || "''"
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nconst u = String(${url}).trim();\nif (u) {\nnode.style.backgroundImage = 'url("' + u.replace(/"/g, '%22') + '")';\nnode.style.backgroundSize = node.style.backgroundSize || 'cover';\nnode.style.backgroundPosition = node.style.backgroundPosition || 'center';\nnode.style.backgroundRepeat = node.style.backgroundRepeat || 'no-repeat';\n} else {\nnode.style.backgroundImage = '';\n}\n});\n`
}

javascriptGenerator.forBlock.site_pin_element = (block) => {
  const pos = block.getFieldValue('POSITION')
  const styles = {
    'sticky-top': `{ position: 'sticky', top: '0px', bottom: '', left: '', right: '', zIndex: '50' }`,
    'fixed-top': `{ position: 'fixed', top: '0px', bottom: '', left: '0px', right: '0px', zIndex: '50' }`,
    'fixed-bottom': `{ position: 'fixed', bottom: '0px', top: '', left: '0px', right: '0px', zIndex: '50' }`,
    'fixed-corner': `{ position: 'fixed', bottom: '20px', right: '20px', top: '', left: '', zIndex: '60' }`,
    static: `{ position: '', top: '', bottom: '', left: '', right: '' }`,
  }[pos] || `{ position: '' }`
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { Object.assign(node.style, ${styles}); });\n`
}

javascriptGenerator.forBlock.site_layer_order = (block) => {
  const z = block.getFieldValue('LAYER')
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nnode.style.zIndex = ${JSON.stringify(z)};\nif (${JSON.stringify(z)} && (!node.style.position || node.style.position === 'static')) node.style.position = 'relative';\n});\n`
}

javascriptGenerator.forBlock.site_opacity_element = (block, generator) => {
  const val = generator.valueToCode(block, 'OPACITY', Order.NONE) || '100'
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { node.style.opacity = String(Math.max(0, Math.min(100, Number(${val}) || 0)) / 100); });\n`
}

javascriptGenerator.forBlock.site_media_control = (block) => {
  const action = block.getFieldValue('ACTION')
  return `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => {\nconst media = (node.tagName === 'VIDEO' || node.tagName === 'AUDIO') ? node : node.querySelector?.('video, audio');\nif (!media) return;\nswitch (${JSON.stringify(action)}) {\ncase 'play': media.play?.().catch?.(() => {}); break;\ncase 'pause': media.pause?.(); break;\ncase 'toggle': if (media.paused) media.play?.().catch?.(() => {}); else media.pause?.(); break;\ncase 'restart': media.currentTime = 0; media.play?.().catch?.(() => {}); break;\ncase 'mute': media.muted = true; break;\ncase 'unmute': media.muted = false; break;\n}\n});\n`
}

javascriptGenerator.forBlock.site_storage_save = (block, generator) => {
  const val = generator.valueToCode(block, 'VALUE', Order.NONE) || "''"
  const key = generator.valueToCode(block, 'KEY', Order.NONE) || "'recorde'"
  return `try { localStorage.setItem('uebit_' + String(${key}), String(${val})); } catch {}\n`
}

javascriptGenerator.forBlock.site_storage_load = (block, generator) => {
  const key = generator.valueToCode(block, 'KEY', Order.NONE) || "'recorde'"
  return [`((() => { try { return localStorage.getItem('uebit_' + String(${key})) ?? ''; } catch { return ''; } })())`, Order.FUNCTION_CALL]
}

javascriptGenerator.forBlock.site_click = (block, generator) =>
  `document.addEventListener('click', (event) => {\nif (event.target?.closest?.(${JSON.stringify(block.getFieldValue('SELECTOR'))})) {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}\n});\n`

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
      block('site_on_scroll'),
    ]),
    category('Jogos & Placar', 'uebit_games', '🎮', [
      block('site_add_number_element', { inputs: { AMOUNT: number(1) } }),
      block('site_set_number_element', { inputs: { VALUE: number(0) } }),
      block('site_get_number_element'),
      block('site_move_element', { inputs: { PIXELS: number(25) } }),
      block('site_move_random'),
      block('site_scale_element', { inputs: { SCALE: number(120) } }),
      block('site_reset_transform'),
      block('site_touching_elements'),
      block('site_confetti'),
    ]),
    category('Conteúdo', 'uebit_page', 'Aa', [
      block('site_text_element', { inputs: textInput('Novo texto') }),
      block('site_toggle_text_element', {
        inputs: {
          TEXT_A: { shadow: { type: 'text', fields: { TEXT: 'Ligado ✅' } } },
          TEXT_B: { shadow: { type: 'text', fields: { TEXT: 'Desligado 🌙' } } },
        },
      }),
      block('site_get_text_element'),
      block('site_append_element', { inputs: textInput('Novo item da lista') }),
      block('site_clear_element'),
      block('site_image_element', { inputs: { SRC: { shadow: { type: 'text', fields: { TEXT: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800' } } } } }),
      block('site_input_set_value', { inputs: { VALUE: { shadow: { type: 'text', fields: { TEXT: 'Texto digitado' } } } } }),
      block('site_input_get_value'),
      block('site_storage_save', {
        inputs: {
          VALUE: { shadow: { type: 'text', fields: { TEXT: '100' } } },
          KEY: { shadow: { type: 'text', fields: { TEXT: 'recorde' } } },
        },
      }),
      block('site_storage_load', {
        inputs: {
          KEY: { shadow: { type: 'text', fields: { TEXT: 'recorde' } } },
        },
      }),
    ]),
    category('Aparência', 'uebit_page', '▦', [
      block('site_background_element'),
      block('site_bg_image_element', { inputs: { URL: { shadow: { type: 'text', fields: { TEXT: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200' } } } } }),
      block('site_random_background_element'),
      block('site_color_element'),
      block('site_show_hide_element'),
      block('site_is_visible'),
      block('site_pin_element'),
      block('site_layer_order'),
      block('site_opacity_element', { inputs: { OPACITY: number(100) } }),
      block('site_enable_disable_element'),
      block('site_animate_element'),
      block('site_add_remove_class', { inputs: { CLASS: { shadow: { type: 'text', fields: { TEXT: 'destaque' } } } } }),
      block('site_scroll_to_element'),
      block('site_open_url', { inputs: { URL: { shadow: { type: 'text', fields: { TEXT: 'https://google.com' } } } } }),
      block('site_message', { inputs: textInput('Parabéns! Você clicou no botão! 🎉') }),
    ]),
    category('Sons & Áudio', 'uebit_sound', '♫', [
      block('site_media_control'),
      block('site_play_sound'),
      block('site_play_tone'),
    ]),
    category('Tempo & Espera', 'uebit_time', '⏱', [
      block('site_wait_seconds', { inputs: { SECONDS: number(1) } }),
      block('site_repeat_every', { inputs: { SECONDS: number(1) } }),
      block('site_stop_timers'),
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
    category('Funções', 'uebit_functions', 'ƒ', [
      block('procedures_defnoreturn'),
      block('procedures_defreturn'),
      block('procedures_ifreturn'),
    ]),
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

export const MAGIC_RECIPES = [
  {
    id: 'click_score',
    label: '🎮 Jogo de Clicar (+1 Ponto)',
    description: 'Cada clique no botão soma 1 ponto no placar, toca som de moeda e faz pular!',
  },
  {
    id: 'fleeing_target',
    label: '🎯 Alvo Fujão (Pega-Pega)',
    description: 'Quando clicar no alvo, ele foge para uma posição aleatória e soma 1 ponto!',
  },
  {
    id: 'keyboard_move',
    label: '🕹️ Controle pelas Setas',
    description: 'Use as setas Direita e Esquerda do teclado para mover um personagem ou elemento.',
  },
  {
    id: 'secret_reveal',
    label: '✨ Mostrar / Esconder Secreto',
    description: 'Transforma um botão em interruptor que mostra ou esconde outro bloco da página.',
  },
  {
    id: 'todo_adder',
    label: '📝 Adicionar Item da Caixa',
    description: 'Ao clicar no botão, pega o que foi digitado no campo e adiciona na lista.',
  },
]

export function insertMagicRecipe(workspace, recipeId) {
  if (!workspace) return false
  const targets = workspaceTargets.get(workspace?.targetWorkspace ?? workspace) ?? []
  const buttonTarget = targets.find((t) => t.type === 'button')?.id || targets[0]?.id || ''
  const textTarget =
    targets.find((t) => ['badge', 'heading', 'paragraph'].includes(t.type))?.id ||
    targets.find((t) => acceptsTarget(t, 'text'))?.id ||
    buttonTarget
  const boxTarget =
    targets.find((t) => ['section', 'container', 'card', 'list'].includes(t.type))?.id ||
    targets[targets.length - 1]?.id ||
    textTarget
  const inputTarget = targets.find((t) => t.type === 'input')?.id || ''
  const spriteTarget =
    targets.find((t) => ['image', 'video', 'button', 'badge'].includes(t.type))?.id ||
    buttonTarget

  const topBlocks = workspace.getTopBlocks(false)
  let nextY = 40
  for (const b of topBlocks) {
    const pos = b.getRelativeToSurfaceXY()
    const height = b.getHeightWidth?.()?.height || 90
    if (pos.y + height + 36 > nextY) nextY = pos.y + height + 36
  }

  const numBlock = (val) => ({ block: { type: 'math_number', fields: { NUM: val } } })
  let definitions = []

  if (recipeId === 'click_score') {
    definitions = [
      {
        type: 'site_click_element',
        x: 40,
        y: nextY,
        fields: { TARGET: buttonTarget },
        inputs: {
          DO: {
            block: {
              type: 'site_add_number_element',
              fields: { TARGET: textTarget },
              inputs: { AMOUNT: numBlock(1) },
              next: {
                block: {
                  type: 'site_play_sound',
                  fields: { SOUND: 'moeda' },
                  next: {
                    block: {
                      type: 'site_animate_element',
                      fields: { EFFECT: 'bounce', TARGET: buttonTarget },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]
  } else if (recipeId === 'fleeing_target') {
    definitions = [
      {
        type: 'site_click_element',
        x: 40,
        y: nextY,
        fields: { TARGET: spriteTarget },
        inputs: {
          DO: {
            block: {
              type: 'site_add_number_element',
              fields: { TARGET: textTarget },
              inputs: { AMOUNT: numBlock(1) },
              next: {
                block: {
                  type: 'site_move_random',
                  fields: { TARGET: spriteTarget },
                  next: {
                    block: {
                      type: 'site_play_sound',
                      fields: { SOUND: 'pulo' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]
  } else if (recipeId === 'keyboard_move') {
    definitions = [
      {
        type: 'site_key_press',
        x: 40,
        y: nextY,
        fields: { KEY: 'ArrowRight' },
        inputs: {
          DO: {
            block: {
              type: 'site_move_element',
              fields: { TARGET: spriteTarget, DIRECTION: 'right' },
              inputs: { PIXELS: numBlock(25) },
            },
          },
        },
      },
      {
        type: 'site_key_press',
        x: 40,
        y: nextY + 130,
        fields: { KEY: 'ArrowLeft' },
        inputs: {
          DO: {
            block: {
              type: 'site_move_element',
              fields: { TARGET: spriteTarget, DIRECTION: 'left' },
              inputs: { PIXELS: numBlock(25) },
            },
          },
        },
      },
    ]
  } else if (recipeId === 'secret_reveal') {
    definitions = [
      {
        type: 'site_click_element',
        x: 40,
        y: nextY,
        fields: { TARGET: buttonTarget },
        inputs: {
          DO: {
            block: {
              type: 'site_show_hide_element',
              fields: { ACTION: 'toggle', TARGET: boxTarget },
              next: {
                block: {
                  type: 'site_play_sound',
                  fields: { SOUND: 'clique' },
                },
              },
            },
          },
        },
      },
    ]
  } else if (recipeId === 'todo_adder') {
    const valueInput = inputTarget
      ? { block: { type: 'site_input_get_value', fields: { TARGET: inputTarget } } }
      : { block: { type: 'text', fields: { TEXT: 'Novo item ✨' } } }
    definitions = [
      {
        type: 'site_click_element',
        x: 40,
        y: nextY,
        fields: { TARGET: buttonTarget },
        inputs: {
          DO: {
            block: {
              type: 'site_append_element',
              fields: { TARGET: boxTarget },
              inputs: { TEXT: valueInput },
              next: inputTarget
                ? {
                    block: {
                      type: 'site_input_set_value',
                      fields: { TARGET: inputTarget },
                      inputs: { VALUE: { block: { type: 'text', fields: { TEXT: '' } } } },
                    },
                  }
                : undefined,
            },
          },
        },
      },
    ]
  }

  for (const def of definitions) {
    Blockly.serialization.blocks.append(def, workspace)
  }
  return definitions.length > 0
}

export { Blockly, javascriptGenerator }

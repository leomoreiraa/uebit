import * as Blockly from 'blockly/core'
import 'blockly/blocks'
import * as ptBR from 'blockly/msg/pt-br'
import { javascriptGenerator, Order } from 'blockly/javascript'

Blockly.setLocale(ptBR)

/* ---------- Aparência MakeCode micro:bit ---------- */
// Cores oficiais do editor micro:bit (pxt-microbit/pxtarget.json e namespaces).
export const MICROBIT_COLOURS = {
  events: '#D400D4', // Entrada
  page: '#1E90FF', // Básico
  logic: '#00A4A6',
  loops: '#00AA00',
  math: '#9400D3',
  text: '#B8860B',
  variables: '#DC143C',
  functions: '#3455DB',
  arrays: '#E65722',
  advanced: '#00272B',
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
    logic_blocks: blockStyle(C.logic), loop_blocks: blockStyle(C.loops), math_blocks: blockStyle(C.math), text_blocks: blockStyle(C.text),
    variable_blocks: blockStyle(C.variables), variable_dynamic_blocks: blockStyle(C.variables), procedure_blocks: blockStyle(C.functions), list_blocks: blockStyle(C.arrays),
    uebit_events: blockStyle(C.events), uebit_page: blockStyle(C.page), uebit_advanced: blockStyle(C.advanced),
  },
  categoryStyles: {
    uebit_events: { colour: C.events }, uebit_page: { colour: C.page }, uebit_logic: { colour: C.logic }, uebit_loops: { colour: C.loops },
    uebit_math: { colour: C.math }, uebit_text: { colour: C.text }, uebit_variables: { colour: C.variables }, uebit_advanced: { colour: C.advanced },
  },
  componentStyles: {
    workspaceBackgroundColour: '#ecf0f1', toolboxBackgroundColour: '#f2f2f2', toolboxForegroundColour: '#323130',
    flyoutBackgroundColour: '#4b4949', flyoutForegroundColour: '#ffffff', flyoutOpacity: 1,
    scrollbarColour: '#b6bcbe', scrollbarOpacity: 0.8, insertionMarkerColour: '#000000', insertionMarkerOpacity: 0.2,
  },
  fontStyle: { family: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif', weight: '600', size: 12 },
  startHats: false,
})

// Blocos compactos e retangulares, com entradas brancas arredondadas, como no MakeCode.
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
}

function targetsFor(field) {
  const workspace = field.getSourceBlock()?.workspace
  return workspaceTargets.get(workspace?.targetWorkspace ?? workspace) ?? []
}

class SiteTargetField extends Blockly.FieldDropdown {
  constructor(textOnly = false) {
    super(function () {
      const targets = targetsFor(this).filter((target) => !this.textOnly || ['heading', 'paragraph', 'button', 'quote', 'list', 'input'].includes(target.type))
      const options = [['Escolha um elemento…', ''], ...targets.map((target) => [target.label, target.id])]
      const selected = this.getValue()
      if (selected && !targets.some((target) => target.id === selected)) options.push(['Elemento indisponível — escolha outro', selected])
      return options
    })
    this.textOnly = textOnly
  }
  // Keep removed targets intact so an action is never silently redirected.
  doClassValidation_(value) { return typeof value === 'string' ? value : null }
  static fromJson(options) { return new SiteTargetField(options.textOnly === true) }
}
Blockly.fieldRegistry.register('field_site_target', SiteTargetField)

const COLOR_OPTIONS = [['roxo', '#9333ea'], ['azul', '#2563eb'], ['verde', '#15803d'], ['amarelo', '#facc15'], ['branco', '#ffffff']]
Blockly.defineBlocksWithJsonArray([
  { type: 'site_on_start', message0: 'ao iniciar %1 %2', args0: [{ type: 'input_dummy' }, { type: 'input_statement', name: 'DO' }], style: 'uebit_page', tooltip: 'Executa os blocos assim que a página abre.' },
  { type: 'site_click_element', message0: 'quando clicar em %1 faça %2', args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'input_statement', name: 'DO' }], style: 'uebit_events', tooltip: 'Escolha um elemento pelo caminho na sua página.' },
  { type: 'site_text_element', message0: 'mudar texto de %1 para %2', args0: [{ type: 'field_site_target', name: 'TARGET', textOnly: true }, { type: 'input_value', name: 'TEXT', check: 'String' }], inputsInline: true, previousStatement: null, nextStatement: null, style: 'uebit_page' },
  { type: 'site_background_element', message0: 'mudar fundo de %1 para %2', args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'field_dropdown', name: 'COLOR', options: COLOR_OPTIONS }], previousStatement: null, nextStatement: null, style: 'uebit_page' },
  { type: 'site_click', message0: 'quando clicar em %1 faça %2', args0: [{ type: 'field_input', name: 'SELECTOR', text: '.button' }, { type: 'input_statement', name: 'DO' }], style: 'uebit_advanced', tooltip: 'Use um seletor CSS: .button, h1 ou #meu-id.' },
  { type: 'site_text', message0: 'mudar texto de %1 para %2', args0: [{ type: 'field_input', name: 'SELECTOR', text: 'h1' }, { type: 'input_value', name: 'TEXT', check: 'String' }], inputsInline: true, previousStatement: null, nextStatement: null, style: 'uebit_advanced' },
  { type: 'site_background', message0: 'mudar fundo de %1 para %2', args0: [{ type: 'field_input', name: 'SELECTOR', text: 'body' }, { type: 'field_dropdown', name: 'COLOR', options: COLOR_OPTIONS }], previousStatement: null, nextStatement: null, style: 'uebit_advanced' },
  { type: 'site_message', message0: 'mostrar mensagem %1', args0: [{ type: 'input_value', name: 'TEXT', check: 'String' }], inputsInline: true, previousStatement: null, nextStatement: null, style: 'uebit_page' },
])

function targetSelector(block) {
  const id = block.getFieldValue('TARGET')
  const field = block.getField('TARGET')
  const target = targetsFor(field).find((item) => item.id === id)
  if (!target || (field.textOnly && !['heading', 'paragraph', 'button'].includes(target.type))) {
    throw new Error('Escolha um elemento disponível nos blocos de página. Um destino está vazio ou foi removido.')
  }
  return `[data-block-id="${CSS.escape(id)}"]`
}
javascriptGenerator.forBlock.site_click_element = (block, generator) => `document.addEventListener('click', (event) => {\nif (event.target.closest(${JSON.stringify(targetSelector(block))})) {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}\n});\n`
javascriptGenerator.forBlock.site_text_element = (block, generator) => `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { node.textContent = ${generator.valueToCode(block, 'TEXT', Order.NONE) || "''"}; });\n`
javascriptGenerator.forBlock.site_background_element = (block) => `document.querySelectorAll(${JSON.stringify(targetSelector(block))}).forEach(node => { node.style.backgroundColor = ${JSON.stringify(block.getFieldValue('COLOR'))}; });\n`
javascriptGenerator.forBlock.site_click = (block, generator) => `document.addEventListener('click', (event) => {\nif (event.target.closest(${JSON.stringify(block.getFieldValue('SELECTOR'))})) {\n__uebitLoopBudget = 10000;\n${generator.statementToCode(block, 'DO')}\n}\n});\n`
javascriptGenerator.forBlock.site_text = (block, generator) => `document.querySelectorAll(${JSON.stringify(block.getFieldValue('SELECTOR'))}).forEach(node => { node.textContent = ${generator.valueToCode(block, 'TEXT', Order.NONE) || "''"}; });\n`
javascriptGenerator.forBlock.site_background = (block) => `document.querySelectorAll(${JSON.stringify(block.getFieldValue('SELECTOR'))}).forEach(node => { node.style.backgroundColor = ${JSON.stringify(block.getFieldValue('COLOR'))}; });\n`
javascriptGenerator.forBlock.site_message = (block, generator) => `{
let notice = document.getElementById('blockly-message');
if (!notice) {
  notice = document.createElement('output');
  notice.id = 'blockly-message';
  notice.setAttribute('role', 'status');
  Object.assign(notice.style, { position: 'fixed', bottom: '24px', left: '24px', maxWidth: '90vw', padding: '16px', borderRadius: '16px', background: '#4c1d95', color: 'white', zIndex: '9999' });
  document.body.append(notice);
}
notice.textContent = ${generator.valueToCode(block, 'TEXT', Order.NONE) || "''"};
}\n`
javascriptGenerator.INFINITE_LOOP_TRAP = 'if (--__uebitLoopBudget < 0) throw new Error("Muitas repetições. Diminua o número de passos dos blocos.");\n'
javascriptGenerator.forBlock.site_on_start = (block, generator) => {
  const body = generator.statementToCode(block, 'DO')
  return body.trim() ? `__uebitLoopBudget = 10000;\n${body}` : ''
}

const block = (type, extra = {}) => ({ kind: 'block', type, ...extra })
const textInput = { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Olá, mundo!' } } } }
const number = (value) => ({ shadow: { type: 'math_number', fields: { NUM: value } } })
const category = (name, style, icon, contents) => ({ kind: 'category', name, categorystyle: style, icon, contents: [heading(name), ...contents] })
export const toolbox = { kind: 'categoryToolbox', contents: [
  category('Eventos', 'uebit_events', '◉', [block('site_click_element')]),
  category('Minha página', 'uebit_page', '▦', [block('site_on_start'), block('site_text_element', { inputs: textInput }), block('site_background_element'), block('site_message', { inputs: textInput })]),
  category('Repetições', 'uebit_loops', '↻', [block('controls_repeat_ext', { inputs: { TIMES: number(4) } }), block('controls_whileUntil')]),
  category('Lógica', 'uebit_logic', '⇄', [block('controls_if'), block('controls_if', { extraState: { hasElse: true } }), block('logic_compare', { inputs: { A: number(0), B: number(0) } }), block('logic_operation'), block('logic_boolean')]),
  { kind: 'category', name: 'Variáveis', categorystyle: 'uebit_variables', icon: '≡', custom: 'UEBIT_VARIABLES' },
  category('Matemática', 'uebit_math', '∑', [block('math_number'), block('math_arithmetic', { inputs: { A: number(0), B: number(0) } }), block('math_random_int', { inputs: { FROM: number(0), TO: number(10) } })]),
  category('Texto', 'uebit_text', 'Aa', [block('text'), block('text_join'), block('text_length', { inputs: { VALUE: { shadow: { type: 'text', fields: { TEXT: 'abc' } } } } })]),
  category('Seletores CSS', 'uebit_advanced', '#', [block('site_text', { inputs: textInput }), block('site_click'), block('site_background')]),
] }

export const DEFAULT_WORKSPACE = { blocks: { languageVersion: 0, blocks: [{ type: 'site_on_start', x: 40, y: 40 }] } }

export const workspaceConfiguration = {
  renderer: 'uebit-microbit', theme: microbitTheme, sounds: false, trashcan: false,
  move: { scrollbars: true, drag: true, wheel: true },
  zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 2, minScale: 0.4, scaleSpeed: 1.15 },
  grid: { spacing: 20, length: 1, colour: '#ecf0f1', snap: true },
}
export { Blockly, javascriptGenerator }

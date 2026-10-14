import * as Blockly from 'blockly/core'
import 'blockly/blocks'
import * as ptBR from 'blockly/msg/pt-br'
import { javascriptGenerator, Order } from 'blockly/javascript'

Blockly.setLocale(ptBR)

const workspaceTargets = new WeakMap()
export function setWorkspaceTargets(workspace, targets) { workspaceTargets.set(workspace, targets) }

function targetsFor(field) {
  const workspace = field.getSourceBlock()?.workspace
  return workspaceTargets.get(workspace?.targetWorkspace ?? workspace) ?? []
}

class SiteTargetField extends Blockly.FieldDropdown {
  constructor(textOnly = false) {
    super(function () {
      const targets = targetsFor(this).filter((target) => !this.textOnly || ['heading', 'paragraph', 'button'].includes(target.type))
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

Blockly.defineBlocksWithJsonArray([
  { type: 'site_click_element', message0: 'quando clicar em %1 faça %2', args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'input_statement', name: 'DO' }], colour: 30, tooltip: 'Escolha um elemento pelo caminho na sua página.' },
  { type: 'site_text_element', message0: 'mudar texto de %1 para %2', args0: [{ type: 'field_site_target', name: 'TARGET', textOnly: true }, { type: 'input_value', name: 'TEXT', check: 'String' }], previousStatement: null, nextStatement: null, colour: 210 },
  { type: 'site_background_element', message0: 'mudar fundo de %1 para %2', args0: [{ type: 'field_site_target', name: 'TARGET' }, { type: 'field_dropdown', name: 'COLOR', options: [['roxo', '#9333ea'], ['azul', '#2563eb'], ['verde', '#15803d'], ['amarelo', '#facc15'], ['branco', '#ffffff']] }], previousStatement: null, nextStatement: null, colour: 280 },
  { type: 'site_click', message0: 'quando clicar em %1 faça %2', args0: [{ type: 'field_input', name: 'SELECTOR', text: '.button' }, { type: 'input_statement', name: 'DO' }], colour: 30, tooltip: 'Use um seletor CSS: .button, h1 ou #meu-id.' },
  { type: 'site_text', message0: 'mudar texto de %1 para %2', args0: [{ type: 'field_input', name: 'SELECTOR', text: 'h1' }, { type: 'input_value', name: 'TEXT', check: 'String' }], previousStatement: null, nextStatement: null, colour: 210 },
  { type: 'site_background', message0: 'mudar fundo de %1 para %2', args0: [{ type: 'field_input', name: 'SELECTOR', text: 'body' }, { type: 'field_dropdown', name: 'COLOR', options: [['roxo', '#9333ea'], ['azul', '#2563eb'], ['verde', '#15803d'], ['amarelo', '#facc15'], ['branco', '#ffffff']] }], previousStatement: null, nextStatement: null, colour: 280 },
  { type: 'site_message', message0: 'mostrar mensagem %1', args0: [{ type: 'input_value', name: 'TEXT', check: 'String' }], previousStatement: null, nextStatement: null, colour: 160 },
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

const block = (type, extra = {}) => ({ kind: 'block', type, ...extra })
const textInput = { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Olá, mundo!' } } } }
export const toolbox = { kind: 'categoryToolbox', contents: [
  { kind: 'category', name: 'Eventos', colour: '30', contents: [block('site_click_element')] },
  { kind: 'category', name: 'Minha página', colour: '210', contents: [block('site_text_element', { inputs: textInput }), block('site_background_element'), block('site_message', { inputs: textInput })] },
  { kind: 'category', name: 'Lógica', colour: '210', contents: ['controls_if', 'logic_compare', 'logic_operation', 'logic_boolean'].map((type) => block(type)) },
  { kind: 'category', name: 'Repetições', colour: '120', contents: [block('controls_repeat_ext', { inputs: { TIMES: { shadow: { type: 'math_number', fields: { NUM: 5 } } } } }), block('controls_whileUntil')] },
  { kind: 'category', name: 'Matemática', colour: '230', contents: ['math_number', 'math_arithmetic', 'math_random_int'].map((type) => block(type)) },
  { kind: 'category', name: 'Texto', colour: '160', contents: ['text', 'text_join', 'text_length'].map((type) => block(type)) },
  { kind: 'category', name: 'Variáveis', colour: '330', custom: 'VARIABLE' },
  { kind: 'category', name: 'Seletores CSS', colour: '260', contents: [block('site_text', { inputs: textInput }), block('site_click'), block('site_background')] },
] }

export const workspaceConfiguration = { renderer: 'zelos', sounds: false, trashcan: false, move: { scrollbars: true, drag: true, wheel: true }, zoom: { controls: false, wheel: true, startScale: 0.85 }, grid: { spacing: 24, length: 3, colour: '#ddd6fe', snap: true } }
export { Blockly, javascriptGenerator }

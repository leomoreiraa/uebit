import test from 'node:test'
import assert from 'node:assert/strict'
import { registerHooks } from 'node:module'
import vm from 'node:vm'
import { applyBlockCode } from './block-code.js'
import { TEMPLATES } from '../data/templates.js'

// Blockly's Node entry requires optional jsdom. Its browser entry supports
// headless workspaces without installing or mocking the Blockly implementation.
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'blockly/core') {
      return { url: new URL('./blockly.mjs', import.meta.resolve('blockly')).href, shortCircuit: true }
    }
    return nextResolve(specifier, context)
  },
})
const { Blockly, insertMagicRecipe, javascriptGenerator, setWorkspaceTargets, toolbox } = await import('./blockly.js')
hooks.deregister()

const targets = [
  { id: 'button-id', type: 'button', label: 'Botão (#executar)' },
  { id: 'panel-id', type: 'paragraph', label: 'Texto (#resultado)' },
  { id: 'input-id', type: 'input', label: 'Campo (#nome)' },
]
function workspace(t, list = targets) {
  const ws = new Blockly.Workspace()
  setWorkspaceTargets(ws, list)
  t.after(() => ws.dispose())
  return ws
}
function block(ws, type, fields = {}) {
  const result = ws.newBlock(type)
  for (const [key, value] of Object.entries(fields)) result.setFieldValue(value, key)
  return result
}
function text(ws, value) { return block(ws, 'text', { TEXT: value }) }
function connect(parent, input, child) {
  parent.getInput(input).connection.connect(child.outputConnection ?? child.previousConnection)
}
function generated(ws) { return applyBlockCode('', javascriptGenerator.workspaceToCode(ws), '').js }

// A small DOM contract harness: generated JS executes unchanged against event,
// query and style APIs. This is not a browser/layout engine.
function dom() {
  const nodes = new Map()
  const listeners = new Map()
  function node(id, display = '') {
    const priority = new Map()
    const style = {
      display,
      getPropertyPriority(name) { return priority.get(name) ?? '' },
      setProperty(name, value, importance = '') { this[name] = value; priority.set(name, importance) },
      removeProperty(name) { this[name] = ''; priority.delete(name) },
    }
    const result = { style, textContent: '', hidden: false, parentElement: null, cssDisplay: 'block' }
    nodes.set(`[data-block-id="${id}"]`, result)
    return result
  }
  const context = vm.createContext({
    document: {
      querySelector: (selector) => nodes.get(selector) ?? null,
      querySelectorAll: (selector) => nodes.has(selector) ? [nodes.get(selector)] : [],
      addEventListener(type, listener) { listeners.set(type, [...(listeners.get(type) ?? []), listener]) },
    },
    getComputedStyle: (element) => ({ display: element.style.display || element.cssDisplay, visibility: element.visibility ?? 'visible' }),
  })
  return {
    node, context,
    click(id) { for (const listener of listeners.get('click') ?? []) listener({ target: { closest: (selector) => selector === `[data-block-id="${id}"]` } }) },
    documentClick() { for (const listener of listeners.get('click') ?? []) listener({ target: context.document }) },
  }
}

test('toolbox entries deserialize, including if/else and input value defaults', (t) => {
  const ws = workspace(t)
  // Shadow XML serialization needs a full DOM; use equivalent ordinary child
  // blocks to check toolbox input names and default values headlessly.
  function withoutShadows(value) {
    if (!value || typeof value !== 'object') return value
    if (Array.isArray(value)) return value.map(withoutShadows)
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key === 'shadow' ? 'block' : key, withoutShadows(child)]))
  }
  for (const category of toolbox.contents) {
    for (const definition of category.contents ?? []) {
      if (definition.kind !== 'block' || (!definition.type.startsWith('site_') && definition.type !== 'controls_if')) continue
      const entry = Blockly.serialization.blocks.append(withoutShadows(definition), ws)
      if (definition.type === 'controls_if' && definition.extraState?.hasElse) assert.ok(entry.getInput('ELSE'))
      if (definition.type === 'site_input_set_value') assert.equal(entry.getInputTargetBlock('VALUE').getFieldValue('TEXT'), 'Texto digitado')
      entry.dispose()
    }
  }
  assert.ok(toolbox.contents.some((category) => category.name === 'Conteúdo'))
  assert.ok(toolbox.contents.some((category) => category.name === 'Aparência'))
})

test('click + if/else reads screen visibility and updates text, colors and display in plain JS', (t) => {
  const ws = workspace(t)
  const click = block(ws, 'site_click_element', { TARGET: 'button-id' })
  const branch = block(ws, 'controls_if')
  branch.loadExtraState({ hasElse: true })
  connect(click, 'DO', branch)
  connect(branch, 'IF0', block(ws, 'site_is_visible', { TARGET: 'panel-id' }))
  const hide = block(ws, 'site_show_hide_element', { TARGET: 'panel-id', ACTION: 'hide' })
  const show = block(ws, 'site_show_hide_element', { TARGET: 'panel-id', ACTION: 'show' })
  connect(branch, 'DO0', hide)
  connect(branch, 'ELSE', show)
  const update = block(ws, 'site_text_element', { TARGET: 'panel-id' })
  connect(update, 'TEXT', text(ws, '<b>Texto seguro</b>'))
  show.nextConnection.connect(update.previousConnection)
  const background = block(ws, 'site_background_element', { TARGET: 'panel-id', COLOR: '#2563eb' })
  update.nextConnection.connect(background.previousConnection)
  const color = block(ws, 'site_color_element', { TARGET: 'panel-id', COLOR: '#ffffff' })
  background.nextConnection.connect(color.previousConnection)
  const env = dom()
  const panel = env.node('panel-id', 'flex')
  vm.runInContext(generated(ws), env.context)
  env.documentClick() // A click dispatched on document must not throw.
  env.click('unrelated-id')
  assert.equal(panel.style.display, 'flex')
  env.click('button-id')
  assert.equal(panel.style.display, 'none')
  env.click('button-id')
  assert.equal(panel.style.display, 'flex')
  assert.equal(panel.textContent, '<b>Texto seguro</b>')
  assert.equal(panel.style.backgroundColor, '#2563eb')
  assert.equal(panel.style.color, '#ffffff')
})

test('show overrides stylesheet-hidden elements; hide/show preserves important grid', (t) => {
  const ws = workspace(t)
  const click = block(ws, 'site_click_element', { TARGET: 'button-id' })
  connect(click, 'DO', block(ws, 'site_show_hide_element', { TARGET: 'panel-id', ACTION: 'toggle' }))
  const env = dom()
  const panel = env.node('panel-id')
  panel.cssDisplay = 'none'
  panel.hidden = true
  vm.runInContext(generated(ws), env.context)
  env.click('button-id')
  assert.equal(panel.hidden, false)
  assert.equal(panel.style.display, 'block')
  panel.style.setProperty('display', 'grid', 'important')
  env.click('button-id')
  env.click('button-id')
  assert.equal(panel.style.display, 'grid')
  assert.equal(panel.style.getPropertyPriority('display'), 'important')
})

test('show is idempotent on an already visible flex element', (t) => {
  const ws = workspace(t)
  block(ws, 'site_show_hide_element', { TARGET: 'panel-id', ACTION: 'show' })
  const env = dom()
  const panel = env.node('panel-id', 'flex')
  vm.runInContext(generated(ws), env.context)
  assert.equal(panel.style.display, 'flex')
})

test('visibility predicate handles missing targets and hidden ancestors', (t) => {
  const ws = workspace(t)
  const predicate = block(ws, 'site_is_visible', { TARGET: 'panel-id' })
  javascriptGenerator.init(ws)
  const [expression] = javascriptGenerator.blockToCode(predicate)
  const code = javascriptGenerator.finish(`globalThis.result = ${expression};`)
  const env = dom()
  vm.runInContext(code, env.context)
  assert.equal(env.context.result, false)
  const panel = env.node('panel-id')
  panel.parentElement = env.node('parent', 'none')
  vm.runInContext(code, env.context)
  assert.equal(env.context.result, false)
  panel.parentElement.style.display = 'grid'
  vm.runInContext(code, env.context)
  assert.equal(env.context.result, true)
  panel.visibility = 'hidden'
  vm.runInContext(code, env.context)
  assert.equal(env.context.result, false)
})

test('text and input getters connect to standard comparisons inside if/else', (t) => {
  const ws = workspace(t)
  const branch = block(ws, 'controls_if')
  const comparison = block(ws, 'logic_compare', { OP: 'EQ' })
  connect(branch, 'IF0', comparison)
  connect(comparison, 'A', block(ws, 'site_get_text_element', { TARGET: 'panel-id' }))
  connect(comparison, 'B', block(ws, 'site_input_get_value', { TARGET: 'input-id' }))
  connect(branch, 'DO0', block(ws, 'site_color_element', { TARGET: 'panel-id', COLOR: '#16a34a' }))
  const env = dom()
  const panel = env.node('panel-id')
  panel.textContent = 'igual'
  env.node('input-id').value = 'igual'
  vm.runInContext(generated(ws), env.context)
  assert.equal(panel.style.color, '#16a34a')
})

test('targets survive serialization and relabeling but removed/incompatible targets fail explicitly', (t) => {
  const ws = workspace(t)
  block(ws, 'site_input_get_value', { TARGET: 'input-id' })
  const saved = Blockly.serialization.workspaces.save(ws)
  ws.clear()
  Blockly.serialization.workspaces.load(saved, ws)
  setWorkspaceTargets(ws, targets.map((target) => ({ ...target, label: 'Novo nome e ID HTML' })))
  assert.match(generated(ws), /input-id/)
  setWorkspaceTargets(ws, [{ id: 'input-id', type: 'image', label: 'Imagem' }])
  assert.throws(() => generated(ws), /incompatível/)
  setWorkspaceTargets(ws, [])
  assert.throws(() => generated(ws), /removido/)
})

test('CSS attribute targets escape quotes, slashes and line breaks without globals', (t) => {
  const id = 'a"\\\n] #id'
  const ws = workspace(t, [{ id, type: 'paragraph', label: 'Especial' }])
  block(ws, 'site_background_element', { TARGET: id })
  const selectors = []
  vm.runInNewContext(generated(ws), { document: { querySelectorAll(selector) { selectors.push(selector); return [] } } })
  assert.equal(selectors[0], '[data-block-id="a\\22 \\5c \\a ] #id"]')
})

test('score blocks read, add and set numbers while preserving label text', (t) => {
  const ws = workspace(t)
  const click = block(ws, 'site_click_element', { TARGET: 'button-id' })
  const add = block(ws, 'site_add_number_element', { TARGET: 'panel-id' })
  connect(add, 'AMOUNT', block(ws, 'math_number', { NUM: 5 }))
  connect(click, 'DO', add)
  const branch = block(ws, 'controls_if')
  add.nextConnection.connect(branch.previousConnection)
  const cmp = block(ws, 'logic_compare', { OP: 'GTE' })
  connect(cmp, 'A', block(ws, 'site_get_number_element', { TARGET: 'panel-id' }))
  connect(cmp, 'B', block(ws, 'math_number', { NUM: 10 }))
  connect(branch, 'IF0', cmp)
  const reset = block(ws, 'site_set_number_element', { TARGET: 'panel-id' })
  connect(reset, 'VALUE', block(ws, 'math_number', { NUM: 99 }))
  connect(branch, 'DO0', reset)

  const env = dom()
  const score = env.node('panel-id')
  score.textContent = '💎 Pontos: 0'
  vm.runInContext(generated(ws), env.context)
  env.click('button-id')
  assert.equal(score.textContent, '💎 Pontos: 5')
  env.click('button-id')
  assert.equal(score.textContent, '💎 Pontos: 99')
})

test('movement, scale, reset transform and collision detection blocks work for games', (t) => {
  const ws = workspace(t)
  const move = block(ws, 'site_move_element', { TARGET: 'button-id', DIRECTION: 'right' })
  connect(move, 'PIXELS', block(ws, 'math_number', { NUM: 30 }))
  const scale = block(ws, 'site_scale_element', { TARGET: 'button-id' })
  connect(scale, 'SCALE', block(ws, 'math_number', { NUM: 150 }))
  move.nextConnection.connect(scale.previousConnection)

  const branch = block(ws, 'controls_if')
  scale.nextConnection.connect(branch.previousConnection)
  connect(branch, 'IF0', block(ws, 'site_touching_elements', { TARGET_A: 'button-id', TARGET_B: 'panel-id' }))
  connect(branch, 'DO0', block(ws, 'site_reset_transform', { TARGET: 'button-id' }))

  const env = dom()
  const hero = env.node('button-id')
  const wall = env.node('panel-id')
  hero.getBoundingClientRect = () => ({ left: 100, right: 150, top: 0, bottom: 50, width: 50, height: 50 })
  wall.getBoundingClientRect = () => ({ left: 200, right: 250, top: 0, bottom: 50, width: 50, height: 50 })

  vm.runInContext(generated(ws), env.context)
  assert.equal(hero.style.transform, 'translate(30px, 0px) scale(1.5)')

  // Now simulate overlapping rects -> should trigger reset_transform
  hero.getBoundingClientRect = () => ({ left: 210, right: 260, top: 0, bottom: 50, width: 50, height: 50 })
  vm.runInContext(generated(ws), env.context)
  assert.equal(hero.style.transform, 'translate(0px, 0px) scale(1)')
})

test('toggle text, enable/disable and magic recipes generate valid executable code', (t) => {
  const ws = workspace(t)
  const toggle = block(ws, 'site_toggle_text_element', { TARGET: 'panel-id' })
  connect(toggle, 'TEXT_A', text(ws, 'Ligado'))
  connect(toggle, 'TEXT_B', text(ws, 'Desligado'))
  const disable = block(ws, 'site_enable_disable_element', { TARGET: 'button-id', ACTION: 'disable' })
  toggle.nextConnection.connect(disable.previousConnection)

  const env = dom()
  const panel = env.node('panel-id')
  const btn = env.node('button-id')
  panel.textContent = 'Ligado'
  vm.runInContext(generated(ws), env.context)
  assert.equal(panel.textContent, 'Desligado')
  assert.equal(btn.disabled, true)

  for (const id of ['click_score', 'fleeing_target', 'keyboard_move', 'secret_reveal', 'todo_adder']) {
    assert.equal(insertMagicRecipe(ws, id), true)
  }
  assert.match(generated(ws), /uebitWriteNumber/)
})

test('menu pinning, layer z-index, background image, opacity and media control blocks execute cleanly', (t) => {
  const ws = workspace(t)
  const pin = block(ws, 'site_pin_element', { TARGET: 'panel-id', POSITION: 'sticky-top' })
  const layer = block(ws, 'site_layer_order', { TARGET: 'panel-id', LAYER: '999' })
  pin.nextConnection.connect(layer.previousConnection)
  const bg = block(ws, 'site_bg_image_element', { TARGET: 'panel-id' })
  connect(bg, 'URL', text(ws, 'https://example.com/hero.jpg'))
  layer.nextConnection.connect(bg.previousConnection)
  const op = block(ws, 'site_opacity_element', { TARGET: 'panel-id' })
  connect(op, 'OPACITY', block(ws, 'math_number', { NUM: 80 }))
  bg.nextConnection.connect(op.previousConnection)
  const media = block(ws, 'site_media_control', { TARGET: 'button-id', ACTION: 'play' })
  op.nextConnection.connect(media.previousConnection)

  const env = dom()
  const panel = env.node('panel-id')
  const videoNode = env.node('button-id')
  videoNode.tagName = 'VIDEO'
  let played = false
  videoNode.play = () => { played = true; return Promise.resolve() }

  vm.runInContext(generated(ws), env.context)
  assert.equal(panel.style.position, 'sticky')
  assert.equal(panel.style.top, '0px')
  assert.equal(panel.style.zIndex, '999')
  assert.equal(panel.style.backgroundImage, 'url("https://example.com/hero.jpg")')
  assert.equal(panel.style.backgroundSize, 'cover')
  assert.equal(panel.style.opacity, '0.8')
  assert.equal(played, true)
})

test('all built-in templates deserialize cleanly in Blockly with valid HTML targets', (t) => {
  for (const tpl of TEMPLATES) {
    if (!tpl.blockProject?.workspace) continue
    const targets = []
    const tagRegex = /<([a-zA-Z0-9-]+)\s+([^>]+)>/g
    let match
    while ((match = tagRegex.exec(tpl.code.html)) !== null) {
      const attrs = match[2]
      const idMatch = attrs.match(/data-block-id="([^"]+)"/)
      if (!idMatch) continue
      const classes = (attrs.match(/class="([^"]+)"/)?.[1] || '').split(/\s+/)
      const type = classes.find((c) => c !== 'site-block') || 'container'
      targets.push({ id: idMatch[1], type, label: idMatch[1] })
    }
    const ws = workspace(t, targets)
    Blockly.serialization.workspaces.load(tpl.blockProject.workspace, ws)
    const code = javascriptGenerator.workspaceToCode(ws)
    assert.ok(!code.includes('__none__'), `Template ${tpl.id} has unresolved target`)
    assert.equal(code, tpl.blockProject.generated)
  }
})


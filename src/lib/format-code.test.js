import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { formatCode, formatSource } from './format-code.js'
import { applyBlockCode } from './block-code.js'

test('HTML, CSS and JS receive consistent indentation and formatting is idempotent', async () => {
  const code = {
    html: '<!doctype html><html><head><title>Aula</title></head><body><main><section><h1>Olá!</h1><p>Vamos aprender.</p></section></main></body></html>',
    css: 'body{margin:0;color:#123456}@media(max-width:767px){main{padding:12px}}',
    js: 'function aula(){if(true){return {nome:"Uebit",passos:[1,2,3]}}}',
  }
  const snapshot = structuredClone(code)
  const formatted = await formatCode(code)
  assert.match(formatted.html, /\n  <head>\n    <title>Aula<\/title>\n  <\/head>/)
  assert.match(formatted.html, /\n      <section>\n        <h1>Olá!<\/h1>/)
  assert.match(formatted.css, /@media \(max-width: 767px\) \{\n  main \{\n    padding: 12px;/)
  assert.match(formatted.js, /function aula\(\) \{\n  if \(true\) \{\n    return/)
  for (const text of Object.values(formatted)) { assert.ok(text.endsWith('\n')); assert.ok(!text.includes('\r')); assert.ok(!text.includes('\t')) }
  assert.deepEqual(await formatCode(formatted), formatted)
  assert.deepEqual(code, snapshot)
})

test('formatting preserves JS strings, regular expressions and runtime behavior', async () => {
  const js = 'const texto=`linha 1\n  linha 2`; const html="<p>Olá</p>"; const regex=/a\\s+b/g; globalThis.result=JSON.stringify({texto,html,match:regex.test("a   b"),values:[1,2,3].map(n=>n*2)});'
  const original = {}
  const formatted = {}
  vm.runInNewContext(js, original)
  vm.runInNewContext(await formatSource(js, 'js'), formatted)
  assert.equal(formatted.result, original.result)
})

test('viewing formatted output does not break subsequent Blockly applications', async () => {
  const first = applyBlockCode('window.manual = true;', 'console.log("primeiro");', '')
  const displayed = await formatSource(first.js, 'js')
  assert.ok(displayed.includes('// UEBIT-BLOCKLY:START'))
  const next = applyBlockCode(first.js, 'console.log("segundo");', first.applied)
  assert.ok(next.js.includes('console.log("segundo");'))
  assert.ok(!next.js.includes('console.log("primeiro");'))
  assert.ok(next.js.startsWith('window.manual = true;'))
})

test('invalid source reports the affected file instead of silently exporting raw code', async () => {
  await assert.rejects(formatSource('function {', 'js'), /formatar script\.js/)
  await assert.rejects(formatCode({ html: '<p>Olá</p>', css: 'body {', js: '' }), /formatar style\.css/)
})

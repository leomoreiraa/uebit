import test from 'node:test'
import assert from 'node:assert/strict'
import { applyBlockCode } from './block-code.js'

test('block updates preserve hand-written code and remove only their own section', () => {
  const first = applyBlockCode('window.manual = true;', 'console.log(1);', '')
  const next = applyBlockCode(first.js + '\n// Mais código', 'console.log(2);', first.applied)
  assert.ok(next.js.startsWith('window.manual = true;'))
  assert.ok(next.js.endsWith('// Mais código'))
  assert.equal(next.js.includes('console.log(1)'), false)
  const cleared = applyBlockCode(next.js, '', next.applied)
  assert.ok(cleared.js.includes('window.manual = true;'))
  assert.equal(cleared.js.includes('CNA-BLOCKLY'), false)
})

test('manual changes to generated code are never silently overwritten', () => {
  const first = applyBlockCode('// JS', 'console.log(1);', '')
  assert.throws(() => applyBlockCode(first.js.replace('console.log(1)', 'console.log(9)'), '', first.applied), /editado/)
  assert.throws(() => applyBlockCode('// JS', '', first.applied), /removido/)
})

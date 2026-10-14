import assert from 'node:assert/strict'
import test from 'node:test'
import { syncActionScript, validateContent } from './element-content.js'

test('button actions retain manually authored JavaScript without duplicate handlers', () => {
  const document = { querySelector: () => ({}) }
  const original = 'window.lesson = "Preserve este código";'
  const first = syncActionScript(original, document)
  const second = syncActionScript(first, document)
  assert.ok(second.startsWith(original))
  assert.equal((second.match(/CNA-ACTIONS:START/g) ?? []).length, 1)
  assert.equal(second, first)
  const cleared = syncActionScript(second, { querySelector: () => null })
  assert.equal(cleared.trim(), original)
})

test('image editing supports uploaded images, local paths and hosted URLs', () => {
  for (const src of ['data:image/png;base64,AA==', '/images/test.svg', 'https://example.com/image.png']) {
    assert.doesNotThrow(() => validateContent('image', { src }))
  }
  assert.throws(() => validateContent('image', { src: '' }))
  assert.throws(() => validateContent('image', { src: 'file:///my-photo.png' }))
})

test('manual changes inside generated action code survive edits and removals', () => {
  const initial = syncActionScript('// Meu código', { querySelector: () => ({}) })
  const customized = initial.replace("background:'#1e293b'", "background:'purple'")
  assert.equal(syncActionScript(customized, { querySelector: () => ({}) }), customized)
  assert.equal(syncActionScript(customized, { querySelector: () => null }), customized)
})

test('button destinations are validated before updating the page', () => {
  assert.doesNotThrow(() => validateContent('button', { action: 'link', actionValue: 'https://example.com' }))
  assert.doesNotThrow(() => validateContent('button', { action: 'scroll', actionValue: '#lesson' }))
  assert.throws(() => validateContent('button', { action: 'link', actionValue: 'javascript:alert(1)' }))
  assert.throws(() => validateContent('button', { action: 'link', actionValue: '  java\nscript:alert(1)' }))
  assert.throws(() => validateContent('button', { action: 'message', actionValue: '' }))
})

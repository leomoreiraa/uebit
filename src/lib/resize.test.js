import test from 'node:test'
import assert from 'node:assert/strict'
import { resizeDimensions } from './resize.js'

const rect = { width: 300, height: 180, cssWidth: 300, cssHeight: 180, maxWidth: 600 }

test('resize corrects canvas scaling and reverses left/top handles', () => {
  assert.equal(resizeDimensions(rect, 'e', 50, 0, 0.5).width, '400px')
  assert.deepEqual(resizeDimensions(rect, 'nw', 25, -10, 0.5), { width: '250px', height: '200px', minHeight: '0px', maxHeight: 'none', flexShrink: '0' })
})

test('resize respects content-box padding/borders, parent width and minimum size', () => {
  const contentBox = { ...rect, cssWidth: 260, cssHeight: 160 }
  assert.equal(resizeDimensions(contentBox, 'e', 100, 0, 1).width, '360px')
  assert.equal(resizeDimensions(rect, 'e', 1000, 0, 1).width, '600px')
  assert.equal(resizeDimensions(rect, 's', 0, -1000, 1).height, '24px')
  assert.equal(resizeDimensions(rect, 's', 0, 50, 1).width, undefined)
})

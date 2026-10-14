import assert from 'node:assert/strict'
import test from 'node:test'
import { activeTree, DEFAULT_LAYOUT, findNode, flattenTree, insertNode, moveNode, removeNode } from './tree.js'

const leaf = (id) => ({ id, type: 'paragraph', layout: { ...DEFAULT_LAYOUT }, children: [] })
const box = (id, children = []) => ({ ...leaf(id), type: 'container', children })

test('reorders siblings in both directions without losing or duplicating nodes', () => {
  const tree = [leaf('a'), leaf('b'), leaf('c')]
  assert.deepEqual(moveNode(tree, 'a', null, 3).map((node) => node.id), ['b', 'c', 'a'])
  assert.deepEqual(moveNode(tree, 'c', null, 0).map((node) => node.id), ['c', 'a', 'b'])
  assert.deepEqual(tree.map((node) => node.id), ['a', 'b', 'c'])
})
test('moves a subtree between containers and back out to the root', () => {
  const tree = [box('a', [box('nested', [leaf('text')])]), box('b')]
  const moved = moveNode(tree, 'nested', 'b')
  assert.equal(findNode(moved, 'a').children.length, 0)
  assert.equal(findNode(moved, 'text').parentId, 'nested')
  assert.equal(findNode(moved, 'nested').parentId, 'b')
  const root = moveNode(moved, 'nested', null, 0)
  assert.equal(root[0].id, 'nested')
  assert.equal(flattenTree(root).length, 4)
})
test('rejects self-nesting, descendant cycles and non-container parents', () => {
  const tree = [box('a', [box('nested', [leaf('text')])])]
  assert.equal(moveNode(tree, 'a', 'a'), tree)
  assert.equal(moveNode(tree, 'a', 'nested'), tree)
  assert.equal(moveNode(tree, 'nested', 'text'), tree)
  assert.equal(insertNode(tree, leaf('new'), 'missing'), tree)
})
test('removing a container removes the entire subtree while preserving siblings', () => {
  const tree = [box('a', [box('b', [leaf('c')])]), leaf('keep')]
  assert.deepEqual(flattenTree(removeNode(tree, 'a')).map((node) => node.id), ['keep'])
})
test('mobile automatically stacks nested containers without changing desktop or custom mobile', () => {
  const tree = [box('a', [{ ...leaf('text'), mobileCustomized: true, mobileLayout: { ...DEFAULT_LAYOUT, width: '50%' } }])]
  tree[0].layout.direction = 'row'
  assert.equal(activeTree(tree, 'mobile')[0].layout.direction, 'column')
  assert.equal(findNode(activeTree(tree, 'mobile'), 'text').layout.width, '50%')
  assert.equal(tree[0].layout.direction, 'row')
})

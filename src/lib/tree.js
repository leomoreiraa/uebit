export function flattenTree(nodes, parentId = null, depth = 0) {
  return nodes.flatMap((node, index) => [{ ...node, parentId, depth, index }, ...flattenTree(node.children ?? [], node.id, depth + 1)])
}

export function findNode(nodes, id) {
  return flattenTree(nodes).find((node) => node.id === id)
}

export function mapTree(nodes, update) {
  return nodes.map((node) => update({ ...node, children: mapTree(node.children ?? [], update) }))
}

export function removeNode(nodes, id) {
  return nodes.filter((node) => node.id !== id).map((node) => ({ ...node, children: removeNode(node.children ?? [], id) }))
}

export function insertNode(nodes, node, parentId = null, index = Infinity) {
  if (parentId !== null && findNode(nodes, parentId)?.type !== 'container') return nodes
  const insert = (siblings) => [...siblings.slice(0, index), node, ...siblings.slice(index)]
  return parentId === null ? insert(nodes) : mapTree(nodes, (item) => item.id === parentId ? { ...item, children: insert(item.children) } : item)
}

// The insertion index refers to the destination list BEFORE removing the source.
export function moveNode(nodes, id, parentId, index = Infinity) {
  const source = findNode(nodes, id)
  if (!source || id === parentId || findNode(source.children ?? [], parentId)) return nodes
  if (parentId !== null && findNode(nodes, parentId)?.type !== 'container') return nodes
  const { parentId: oldParent, index: oldIndex, depth: _depth, ...node } = source
  const destinationIndex = oldParent === parentId && oldIndex < index ? index - 1 : index
  return insertNode(removeNode(nodes, id), node, parentId, destinationIndex)
}

export const DEFAULT_LAYOUT = { direction: 'column', justify: 'flex-start', align: 'stretch', gap: '16px', width: 'auto', minHeight: '0px' }
export function mobileLayout(element) {
  return element.mobileCustomized ? element.mobileLayout : { ...element.layout, direction: 'column', width: '100%' }
}

export function activeTree(nodes, device) {
  return mapTree(nodes, (node) => ({ ...node, layout: device === 'mobile' ? mobileLayout(node) : node.layout }))
}

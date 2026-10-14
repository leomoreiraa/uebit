const names = { container: 'Container', heading: 'Título', paragraph: 'Parágrafo', button: 'Botão', image: 'Imagem', custom: 'HTML' }

export function buildBlockTargets(elements, path = []) {
  return elements.flatMap((element, index) => {
    const description = element.type === 'container' ? '' : (element.text || element.alt || '').replace(/\s+/g, ' ').slice(0, 32)
    const label = `${names[element.type] ?? 'Elemento'} ${index + 1}${description ? `: ${description}` : ''}`
    const fullPath = [...path, label]
    return [{ id: element.id, type: element.type, label: fullPath.join(' › ') }, ...buildBlockTargets(element.children ?? [], fullPath)]
  })
}

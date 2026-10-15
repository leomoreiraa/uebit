const names = {
  container: 'Container',
  heading: 'Título',
  paragraph: 'Parágrafo',
  quote: 'Citação',
  list: 'Lista',
  button: 'Botão',
  input: 'Campo',
  image: 'Imagem',
  video: 'Vídeo',
  audio: 'Áudio',
  divider: 'Divisor',
  custom: 'HTML',
}

export function buildBlockTargets(elements, path = []) {
  return elements.flatMap((element, index) => {
    const description = element.type === 'container' ? '' : (element.text || element.alt || '').replace(/\s+/g, ' ').slice(0, 32)
    const defaultLabel = `${names[element.type] ?? 'Elemento'} ${index + 1}${description ? `: ${description}` : ''}`
    const label = element.name
      ? (element.htmlId ? `${element.name} (#${element.htmlId})` : element.name)
      : (element.htmlId ? `${defaultLabel} (#${element.htmlId})` : defaultLabel)
    const fullPath = [...path, label]
    return [{ id: element.id, type: element.type, label: fullPath.join(' › ') }, ...buildBlockTargets(element.children ?? [], fullPath)]
  })
}

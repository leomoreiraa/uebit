import { LESSONS } from '../data/lessons.js'

export const PROGRESS_KEY = 'uebit-lessons-v1'

export function walkElements(elements = []) {
  return elements.flatMap((element) => [element, ...walkElements(element.children ?? [])])
}

export function evaluateCheck(check, state) {
  const elements = state.elements ?? []
  const all = walkElements(elements)
  const html = state.code?.html ?? ''
  const css = state.code?.css ?? ''
  const js = state.code?.js ?? ''
  const blocks = JSON.stringify(state.blockProject?.workspace ?? {})
  const hasElement = (name, count = 1) => all.filter((item) => item.type === name).length >= count
  const containsPattern = (source, pattern) => {
    try { return new RegExp(pattern, 'i').test(source) } catch { return false }
  }

  switch (check.kind) {
    case 'element':
      return hasElement(check.value)
    case 'anyelement':
      return check.value.split('|').some((name) => hasElement(name))
    case 'both':
      return check.value.split('|').every((part) => {
        const [name, count] = part.split(':')
        return hasElement(name, Number(count || 1))
      })
    case 'nested':
      return all.some((node) => node.type === 'container' && (node.children?.length ?? 0) > 0)
    case 'nestedcount':
      return all.some((node) => node.type === 'container' && (node.children?.length ?? 0) >= Number(check.value))
    case 'form':
      return all.some((node) => node.type === 'container' && node.tagName === 'form')
    case 'imagealt':
      return all.some((node) => node.type === 'image'
        && typeof node.alt === 'string'
        && node.alt.trim().length > 8
        && node.alt !== 'Ilustração de montanhas com um sol em um céu claro')
    case 'device':
      return state.device === check.value
    case 'html':
      return html.toLowerCase().includes(check.value.toLowerCase())
    case 'css':
      return containsPattern(css, check.value)
    case 'js':
      return containsPattern(js, check.value)
    case 'block':
      return blocks.includes('"type":"' + check.value + '"')
    case 'jsorblocks':
      return containsPattern(js, 'addEventListener\\s*\\(')
        || (Boolean(state.blockProject?.generated?.trim()) && blocks.includes('"type":'))
    default:
      return false
  }
}

export function evaluateLesson(lesson, state) {
  return lesson.tasks.map((task) => evaluateCheck(task.check, state))
}

export function normalizeProgress(value) {
  const allowed = new Set(LESSONS.map((lesson) => lesson.id))
  const ids = Array.isArray(value?.completed) ? value.completed : []
  return { completed: [...new Set(ids.filter((id) => typeof id === 'string' && allowed.has(id)))] }
}

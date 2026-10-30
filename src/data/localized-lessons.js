import { LESSONS } from './lessons.js'
import { LESSONS_EN } from './lessons.en.js'
import { LESSONS_TH } from './lessons.th.js'

// Overlay text only: ids, activity checks, answers and editor targets stay identical.
const translations = { en: LESSONS_EN, th: LESSONS_TH }

export function getLessons(language = 'pt-BR') {
  const translation = translations[language]
  if (!translation) return LESSONS
  const byId = new Map(translation.map((item) => [item.id, item]))
  return LESSONS.map((original) => {
    const localized = byId.get(original.id)
    if (!localized) return original
    return {
      ...original,
      ...localized,
      id: original.id,
      minutes: original.minutes,
      tag: original.tag === 'Projeto' ? (language === 'en' ? 'Project' : 'โปรเจกต์') :
        original.tag === 'Blocos' ? (language === 'en' ? 'Blocks' : 'บล็อก') :
        original.tag === 'Layout' ? (language === 'en' ? 'Layout' : 'การจัดวาง') : original.tag,
      theory: original.theory.map((section, index) => ({ ...section, ...localized.theory[index] })),
      tasks: original.tasks.map((task, index) => ({
        ...task,
        ...localized.tasks[index],
        view: task.view,
        check: task.check,
      })),
      quiz: { ...original.quiz, ...localized.quiz, correct: original.quiz.correct },
    }
  })
}

export function getLesson(id, language = 'pt-BR') {
  return getLessons(language).find((lesson) => lesson.id === id) ?? null
}

import test from 'node:test'
import assert from 'node:assert/strict'
import { LESSONS } from '../data/lessons.js'
import { LESSONS_EN } from '../data/lessons.en.js'
import { LESSONS_TH } from '../data/lessons.th.js'
import { getLessons, getLesson } from '../data/localized-lessons.js'
import { MESSAGES, message } from '../i18n/messages.js'

test('Portuguese, English and Thai contain the same ten complete lessons', () => {
  for (const translations of [LESSONS_EN, LESSONS_TH]) {
    assert.deepEqual(translations.map(({ id }) => id), LESSONS.map(({ id }) => id))
    for (const [index, locale] of translations.entries()) {
      assert.equal(locale.theory.length, LESSONS[index].theory.length)
      assert.equal(locale.tasks.length, LESSONS[index].tasks.length)
      assert.equal(locale.goals.length, LESSONS[index].goals.length)
      for (const item of locale.theory) {
        assert.ok(item.heading && item.text.length > 90 && item.explain)
      }
      for (const task of locale.tasks) assert.ok(task.title && task.description && task.hint)
      assert.equal(locale.quiz.options.length, LESSONS[index].quiz.options.length)
      assert.ok(locale.quiz.question && locale.quiz.explain && locale.challenge)
    }
  }
})

test('localized lessons preserve all checks, ids, answers and progress keys', () => {
  for (const code of ['en', 'th']) {
    const lessons = getLessons(code)
    for (const [i, original] of LESSONS.entries()) {
      assert.equal(lessons[i].id, original.id)
      assert.equal(lessons[i].minutes, original.minutes)
      assert.equal(lessons[i].quiz.correct, original.quiz.correct)
      assert.deepEqual(lessons[i].tasks.map(({ check, view }) => ({ check, view })),
        original.tasks.map(({ check, view }) => ({ check, view })))
      assert.notEqual(lessons[i].title, original.title)
      assert.equal(getLesson(original.id, code)?.id, original.id)
    }
  }
  assert.equal(getLesson('missing', 'th'), null)
  assert.deepEqual(getLessons('pt-BR'), LESSONS)
  assert.deepEqual(getLessons('no-locale'), LESSONS)
})

test('interface strings have full translated key coverage', () => {
  for (const key of Object.keys(MESSAGES['pt-BR'])) {
    assert.ok(MESSAGES.en[key], 'Missing English: ' + key)
    assert.ok(MESSAGES.th[key], 'Missing Thai: ' + key)
  }
  assert.equal(message('en', 'lesson'), 'Lesson')
  assert.equal(message('th', 'lesson'), 'บทเรียน')
  assert.match(message('en', 'tasksChecked', { total: 3 }), /3/)
})

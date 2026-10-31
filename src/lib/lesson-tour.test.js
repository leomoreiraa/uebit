import test from 'node:test'
import assert from 'node:assert/strict'
import { getLessons } from '../data/localized-lessons.js'
import { TOUR_TARGETS, TOUR_SELECTORS, guideTarget, guideView } from './lesson-tour.js'

test('todos os 151 passos têm uma âncora de destaque válida', () => {
  const lessons = getLessons('pt-BR')
  let steps = 0
  for (const lesson of lessons) {
    const targets = TOUR_TARGETS[lesson.id]
    assert.equal(targets?.length, lesson.tasks.length, lesson.id)
    lesson.tasks.forEach((task, i) => {
      assert.equal(targets[i].length, task.tutorial.steps.length, lesson.id + ':' + i)
      targets[i].forEach((target, j) => {
        assert.equal(guideTarget(lesson.id, i, j), target)
        assert.ok(TOUR_SELECTORS[target], target)
        assert.ok(['visual', 'programming', 'code'].includes(guideView(target)))
        steps++
      })
    })
  }
  assert.equal(steps, 151)
})

test('guia é o mesmo nas versões português, inglês e tailandês', () => {
  for (const lang of ['en', 'th']) {
    const localized = getLessons(lang)
    for (const lesson of localized) {
      lesson.tasks.forEach((task, i) => task.tutorial.steps.forEach((_, j) => {
        assert.ok(TOUR_SELECTORS[guideTarget(lesson.id, i, j)], lesson.id + ':' + i + ':' + j)
      }))
    }
  }
})

test('campos do editor e controles de programação têm seletores', () => {
  for (const key of ['view-code', 'code-tab-html', 'code-tab-css', 'code-tab-js', 'code-editor', 'view-programming', 'blockly-workspace', 'field-html-id', 'field-text', 'field-alt', 'element-container', 'device-mobile']) {
    assert.ok(TOUR_SELECTORS[key], key)
  }
})

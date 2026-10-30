import test from 'node:test'
import assert from 'node:assert/strict'
import { LESSONS, lessonById } from '../data/lessons.js'
import { evaluateCheck, evaluateLesson, normalizeProgress } from './lesson-checks.js'

test('catálogo contém dez aulas completas com atividades, teoria e revisão', () => {
  assert.equal(LESSONS.length, 10)
  assert.equal(new Set(LESSONS.map((lesson) => lesson.id)).size, 10)
  for (const lesson of LESSONS) {
    assert.ok(lesson.theory.length >= 4, lesson.id)
    assert.ok(lesson.goals.length >= 3, lesson.id)
    assert.equal(lesson.tasks.length, 3)
    assert.ok(lesson.tasks.every((task) => task.check && task.description && task.hint && ['visual', 'programming', 'code'].includes(task.view)))
    assert.ok(lesson.quiz.options[lesson.quiz.correct])
    assert.ok(lesson.challenge)
    assert.equal(lessonById(lesson.id), lesson)
  }
  assert.equal(lessonById('inexistente'), null)
})

test('atividades são verificadas pelo estado do projeto em vez de botões manuais', () => {
  const state = {
    elements: [
      { type: 'container', tagName: 'form', children: [{ type: 'paragraph', children: [] }, { type: 'button', children: [] }] },
      { type: 'heading', children: [] },
      { type: 'image', alt: 'Um estudante trabalhando no computador', children: [] },
    ],
    code: { html: '<main><h1>Teste</h1></main>', css: 'body { background-color: #eee; } @media (max-width: 600px) {}', js: 'button.addEventListener("click", fn)' },
    blockProject: { workspace: { blocks: { blocks: [{ type: 'controls_if' }] } }, generated: 'if (true) {}' },
    device: 'mobile',
  }
  assert.equal(evaluateCheck({ kind: 'element', value: 'heading' }, state), true)
  assert.equal(evaluateCheck({ kind: 'element', value: 'input' }, state), false)
  assert.equal(evaluateCheck({ kind: 'nestedcount', value: '2' }, state), true)
  assert.equal(evaluateCheck({ kind: 'imagealt', value: '' }, state), true)
  assert.equal(evaluateCheck({ kind: 'block', value: 'controls_if' }, state), true)
  assert.equal(evaluateCheck({ kind: 'block', value: 'variables_set' }, state), false)
  assert.equal(evaluateCheck({ kind: 'device', value: 'mobile' }, state), true)
  assert.equal(evaluateCheck({ kind: 'css', value: 'max-width\\s*:\\s*600px' }, state), true)
  assert.equal(evaluateCheck({ kind: 'js', value: 'addEventListener\\s*\\(' }, state), true)
  assert.equal(evaluateCheck({ kind: 'jsorblocks', value: '' }, state), true)
  assert.equal(evaluateLesson(LESSONS[0], state).length, 3)
})

test('progresso é normalizado, deduplicado e não aceita ids desconhecidos', () => {
  const id = LESSONS[0].id
  assert.deepEqual(normalizeProgress({ completed: [id, id, 'fraude', 3] }), { completed: [id] })
  assert.deepEqual(normalizeProgress(null), { completed: [] })
})

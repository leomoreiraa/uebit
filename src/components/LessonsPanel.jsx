import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Code2, ExternalLink, GraduationCap, Lightbulb, RotateCcw, X } from 'lucide-react'
import { getLessons, getLesson } from '../data/localized-lessons'
import { useLanguage, languagePath } from '../i18n/language'
import { message } from '../i18n/messages'
import { evaluateLesson, normalizeProgress, PROGRESS_KEY } from '../lib/lesson-checks'

function initialProgress() {
  try { return normalizeProgress(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')) }
  catch { return normalizeProgress({}) }
}

export default function LessonsPanel({ lessonId, onSelectLesson, onClose, onViewChange, onFreshProject, editorState }) {
  const { language } = useLanguage()
  const t = (key, args) => message(language, key, args)
  const lessons = getLessons(language)
  const [progress, setProgress] = useState(initialProgress)
  const [quizChoice, setQuizChoice] = useState(null)
  const [showCatalog, setShowCatalog] = useState(!lessonId)
  const [message, setMessage] = useState('')

  const lesson = getLesson(lessonId, language)
  const lessonIndex = lesson ? lessons.findIndex((item) => item.id === lesson?.id) : -1
  const results = useMemo(() => lesson ? evaluateLesson(lesson, editorState) : [], [lesson, editorState])
  const passed = results.filter(Boolean).length
  const done = lesson ? progress.completed.includes(lesson.id) : false
  const passedQuiz = lesson && quizChoice === lesson.quiz.correct

  useEffect(() => {
    setShowCatalog(!lessonId)
    setQuizChoice(null)
    setMessage('')
  }, [lessonId])

  function completeLesson() {
    if (!lesson || !results.every(Boolean) || !passedQuiz) return
    const next = normalizeProgress({ completed: [...progress.completed, lesson.id] })
    setProgress(next)
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(next)) }
    catch { setMessage(t('saveError')) }
  }

  function selectLesson(id) {
    onSelectLesson(id)
    setShowCatalog(false)
  }

  return (
    <>
      <button type="button" aria-label={t('closeLessons')} className="fixed inset-0 z-40 bg-slate-950/50 2xl:hidden" onClick={onClose} />
      <aside aria-label={t('lessons')} className="fixed inset-y-0 right-0 z-50 flex w-[min(430px,100vw)] min-w-0 flex-col overflow-hidden border-l-2 border-purple-200 bg-white shadow-2xl 2xl:static 2xl:z-auto 2xl:w-[380px] 2xl:shrink-0 2xl:shadow-none">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b-2 border-purple-100 bg-purple-50 p-3">
          <button type="button" onClick={() => setShowCatalog(true)} className="flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-black text-purple-900 hover:bg-purple-100">
            <BookOpen size={18} aria-hidden="true" /> {t('lessons')}
          </button>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-800">{progress.completed.length}/10</span>
            <button type="button" aria-label={t('closePanel')} onClick={onClose} className="grid size-10 place-items-center rounded-xl text-purple-900 hover:bg-purple-100"><X size={20} /></button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
          {showCatalog || !lesson ? (
            <div>
              <div className="rounded-2xl bg-purple-600 p-4 text-white">
                <GraduationCap size={26} aria-hidden="true" />
                <h2 className="mt-2 text-xl font-black">{t('learningByDoing')}</h2>
                <p className="mt-1 text-sm leading-relaxed">{t('panelIntro')}</p>
              </div>
              <ol className="mt-4 space-y-2">
                {lessons.map((item, index) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => selectLesson(item.id)} className="flex w-full items-start gap-3 rounded-xl border-2 border-slate-200 bg-white p-3 text-left hover:border-purple-400 hover:bg-purple-50">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-purple-100 text-sm font-black text-purple-900">{index + 1}</span>
                      <span className="min-w-0 flex-1">
                        <strong className="block text-sm text-slate-900">{item.title.replace(/^\d+\.\s*/, '')}</strong>
                        <span className="mt-1 block text-xs text-slate-600">{item.tag} · {item.minutes} min</span>
                      </span>
                      {progress.completed.includes(item.id) ? <CheckCircle2 size={19} className="shrink-0 text-emerald-600" aria-label={t('completed')} /> : <ArrowRight size={18} className="shrink-0 text-purple-600" />}
                    </button>
                  </li>
                ))}
              </ol>
              <Link to={languagePath('/aulas', language)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-purple-800 underline underline-offset-4">{t('seePath')} <ExternalLink size={15} /></Link>
            </div>
          ) : (
            <article>
              <button type="button" onClick={() => setShowCatalog(true)} className="mb-3 inline-flex min-h-9 items-center gap-1 text-xs font-bold text-purple-800"><ArrowLeft size={15} /> {t('allLessons')}</button>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black text-purple-700"><span className="rounded-full bg-purple-100 px-2 py-1">{t('lesson')} {lessonIndex + 1}/10</span><span>{lesson.tag}</span><span>·</span><span>{lesson.minutes} {t('minutes')}</span></div>
              <h2 className="mt-3 text-2xl font-black leading-tight text-slate-900">{lesson.title.replace(/^\d+\.\s*/, '')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{lesson.summary}</p>
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <h3 className="text-sm font-black text-emerald-900">{t('objectives')}</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-xs leading-relaxed text-emerald-950">{lesson.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
              </div>
              <h3 className="mt-6 text-base font-black text-slate-900">{t('concepts')}</h3>
              {lesson.theory.map((section, index) => (
                <section key={section.heading} className="mt-4 border-b border-slate-100 pb-4">
                  <h4 className="text-sm font-black text-purple-950">{index + 1}. {section.heading}</h4>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">{section.text}</p>
                  {section.example && <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs leading-5 text-emerald-200"><code>{section.example}</code></pre>}
                  {section.explain && <p className="mt-2 flex gap-2 text-xs leading-relaxed text-slate-600"><Lightbulb size={16} className="shrink-0 text-amber-600" /><span>{section.explain}</span></p>}
                </section>
              ))}
              <div className="mt-6 rounded-2xl border-2 border-purple-200 bg-purple-50/50 p-3">
                <h3 className="text-base font-black text-slate-900">{t('practice')}</h3>
                <p role="status" className="mt-1 text-xs font-semibold text-purple-800">{passed} {t('tasksChecked', { total: lesson.tasks.length })}</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-purple-100" role="progressbar" aria-valuenow={passed} aria-valuemin={0} aria-valuemax={lesson.tasks.length} aria-label={t('tasksCompleted')}><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: (passed / lesson.tasks.length * 100) + '%' }} /></div>
                <ol className="mt-3 space-y-3">
                  {lesson.tasks.map((task, index) => (
                    <li key={task.title} className="rounded-xl border border-purple-100 bg-white p-3">
                      <div className="flex items-start gap-2">
                        {results[index] ? <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-emerald-600" aria-label={t('verified')} /> : <Circle size={19} className="mt-0.5 shrink-0 text-slate-400" aria-label={t('pending')} />}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-black text-slate-900">{task.title}</h4>
                          <p className="mt-1 text-xs leading-relaxed text-slate-700">{task.description}</p>
                          <details className="mt-2 text-xs text-slate-600"><summary className="cursor-pointer font-bold text-purple-700">{t('hint')}</summary><p className="mt-1 leading-relaxed">{task.hint}</p></details>
                          <button type="button" onClick={() => onViewChange(task.view)} className="mt-2 inline-flex min-h-9 items-center gap-1 rounded-lg bg-purple-100 px-3 text-xs font-black text-purple-900 hover:bg-purple-200"><Code2 size={14} /> {t('open')} {t(task.view === 'visual' ? 'visual' : task.view === 'programming' ? 'programming' : 'code')}</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-3">
                <h3 className="text-base font-black text-slate-900">{t('reviewHeading')}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-800">{lesson.quiz.question}</p>
                <div className="mt-3 space-y-2" role="group" aria-label={t('selectAnswer')}>
                  {lesson.quiz.options.map((option, index) => <button key={option} type="button" aria-pressed={quizChoice === index} onClick={() => setQuizChoice(index)} className={'w-full rounded-xl border-2 p-3 text-left text-xs font-semibold ' + (quizChoice === index ? 'border-purple-600 bg-purple-100 text-purple-900' : 'border-amber-100 bg-white text-slate-800 hover:border-purple-300')}>{option}</button>)}
                </div>
                {quizChoice !== null && <p role="status" className={'mt-3 text-xs font-bold leading-relaxed ' + (passedQuiz ? 'text-emerald-800' : 'text-rose-700')}>{passedQuiz ? t('correct') + ' ' + lesson.quiz.explain : t('tryAgain')}</p>}
              </section>
              <section className="mt-5 rounded-2xl bg-slate-100 p-3"><h3 className="text-sm font-black text-slate-900">{t('extraChallenge')}</h3><p className="mt-1 text-xs leading-5 text-slate-700">{lesson.challenge}</p></section>
              <button type="button" disabled={!results.every(Boolean) || !passedQuiz || done} onClick={completeLesson} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-black text-white enabled:hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"><CheckCircle2 size={18}/>{t(done ? 'finished' : 'finish')}</button>
              {!done && <p className="mt-2 text-center text-xs text-slate-500">{t('finishHelp')}</p>}
              {message && <p role="status" className="mt-2 text-xs text-amber-800">{message}</p>}
              {done && lessonIndex < lessons.length - 1 && <button type="button" onClick={() => selectLesson(lessons[lessonIndex + 1].id)} className="mt-2 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-purple-300 text-sm font-black text-purple-800">{t('nextLesson')} <ArrowRight size={16}/></button>}
              <div className="mt-6 border-t border-slate-200 pt-4">
                <button type="button" onClick={onFreshProject} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"><RotateCcw size={16}/> {t('emptyProject')}</button>
                <p className="mt-2 text-center text-[11px] leading-relaxed text-slate-500">{t('emptyNote')}</p>
              </div>
            </article>
          )}
        </div>
      </aside>
    </>
  )
}

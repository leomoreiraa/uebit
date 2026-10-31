import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Code2, GraduationCap, Sparkles } from 'lucide-react'
import UebitLogo from '../components/UebitLogo'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { getLessons } from '../data/localized-lessons'
import { normalizeProgress, PROGRESS_KEY } from '../lib/lesson-checks'
import { useLanguage, languagePath } from '../i18n/language'
import { message } from '../i18n/messages'

function readCompleted() {
  try { return normalizeProgress(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')).completed }
  catch { return [] }
}

export default function LessonsPage() {
  const { language } = useLanguage()
  const t = (key) => message(language, key)
  const lessons = getLessons(language)
  const completed = readCompleted()
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b-4 border-purple-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link to={languagePath('/', language)} aria-label={t('home')}><UebitLogo size={44} variant="full" /></Link>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher compact />
            <Link to={languagePath('/editor', language)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-black text-white hover:bg-emerald-500"><Code2 size={17} /> {t('openEditor')}</Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-purple-900"><GraduationCap size={17} /> {t('school')}</span>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">{t('headline')}</h1>
          <p className="mt-5 text-base leading-7 text-slate-700">{t('intro')}</p>
          <p className="mt-4 inline-flex rounded-xl bg-amber-100 px-3 py-2 text-sm font-bold text-amber-950">🐸 {t('ageAppropriate')}</p>
        </div>
        <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label={t('pathTitle')}>
          <div className="rounded-2xl border-2 border-purple-200 bg-white p-5"><BookOpen className="text-purple-600"/><p className="mt-3 text-3xl font-black">{lessons.length}</p><p className="text-sm font-semibold text-slate-600">{t('completedLessons')}</p></div>
          <div className="rounded-2xl border-2 border-amber-200 bg-white p-5"><Clock3 className="text-amber-700"/><p className="mt-3 text-3xl font-black">{lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)} min</p><p className="text-sm font-semibold text-slate-600">{t('duration')}</p></div>
          <div className="rounded-2xl border-2 border-emerald-200 bg-white p-5"><CheckCircle2 className="text-emerald-600"/><p className="mt-3 text-3xl font-black">{completed.length}/10</p><p className="text-sm font-semibold text-slate-600">{t('progress')}</p></div>
        </section>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="text-2xl font-black">{t('pathTitle')}</h2><p className="mt-2 text-sm text-slate-600">{t('pathIntro')}</p></div>
          <span className="inline-flex items-center gap-2 text-xs font-bold text-purple-800"><Sparkles size={17}/>{t('anyOrder')}</span>
        </div>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {lessons.map((lesson, index) => (
            <li key={lesson.id} className="flex flex-col rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-purple-400">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-purple-100 text-lg font-black text-purple-800">{index + 1}</span>
                <span className={'rounded-full px-3 py-1 text-xs font-black ' + (completed.includes(lesson.id) ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900')}>{completed.includes(lesson.id) ? t('completed') + ' ✓' : lesson.tag + ' · ' + lesson.minutes + ' min'}</span>
              </div>
              <h3 className="mt-4 text-xl font-black">{lesson.title.replace(/^\d+\.\s*/, '')}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{lesson.summary}</p>
              <ul className="mt-4 space-y-2">{lesson.goals.map((goal) => <li key={goal} className="flex items-start gap-2 text-xs font-semibold text-slate-700"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600"/>{goal}</li>)}</ul>
              <Link to={languagePath('/editor?lesson=' + encodeURIComponent(lesson.id), language)} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 text-sm font-black text-white hover:bg-purple-500">{completed.includes(lesson.id) ? t('review') : t('begin')} <ArrowRight size={17}/></Link>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-6 text-slate-600">{t('progressNote')}</p>
      </main>
    </div>
  )
}

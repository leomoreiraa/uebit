import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CheckCircle2, Clock3, Code2, GraduationCap, Sparkles } from 'lucide-react'
import UebitLogo from '../components/UebitLogo'
import { LESSONS } from '../data/lessons'
import { normalizeProgress, PROGRESS_KEY } from '../lib/lesson-checks'

function readCompleted() {
  try { return normalizeProgress(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')).completed }
  catch { return [] }
}

export default function LessonsPage() {
  const completed = readCompleted()
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b-4 border-purple-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link to="/" aria-label="Voltar ao início"><UebitLogo size={44} variant="full" /></Link>
          <Link to="/editor" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-black text-white hover:bg-emerald-500"><Code2 size={17} /> Abrir editor</Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-purple-900"><GraduationCap size={17} /> Escola Uebit</span>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">Aprenda desenvolvimento web criando de verdade.</h1>
          <p className="mt-5 text-base leading-7 text-slate-700">Uma trilha gratuita de 10 aulas em português, sem cadastro, para conhecer HTML, CSS, programação visual e JavaScript. Leia os conceitos, experimente no editor e descubra o que já conseguiu construir.</p>
        </div>
        <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Informações da trilha">
          <div className="rounded-2xl border-2 border-purple-200 bg-white p-5"><BookOpen className="text-purple-600"/><p className="mt-3 text-3xl font-black">10</p><p className="text-sm font-semibold text-slate-600">Aulas completas</p></div>
          <div className="rounded-2xl border-2 border-amber-200 bg-white p-5"><Clock3 className="text-amber-700"/><p className="mt-3 text-3xl font-black">{LESSONS.reduce((sum, lesson) => sum + lesson.minutes, 0)} min</p><p className="text-sm font-semibold text-slate-600">Carga horária estimada</p></div>
          <div className="rounded-2xl border-2 border-emerald-200 bg-white p-5"><CheckCircle2 className="text-emerald-600"/><p className="mt-3 text-3xl font-black">{completed.length}/10</p><p className="text-sm font-semibold text-slate-600">Aulas concluídas neste navegador</p></div>
        </section>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
          <div><h2 className="text-2xl font-black">Sua trilha de aprendizagem</h2><p className="mt-2 text-sm text-slate-600">Cada aula abre no editor, com conteúdo escrito, desafios e revisão de conhecimento.</p></div>
          <span className="inline-flex items-center gap-2 text-xs font-bold text-purple-800"><Sparkles size={17}/> Você pode estudar na ordem que preferir.</span>
        </div>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {LESSONS.map((lesson, index) => (
            <li key={lesson.id} className="flex flex-col rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-purple-400">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-purple-100 text-lg font-black text-purple-800">{index + 1}</span>
                <span className={'rounded-full px-3 py-1 text-xs font-black ' + (completed.includes(lesson.id) ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900')}>{completed.includes(lesson.id) ? 'Concluída ✓' : lesson.tag + ' · ' + lesson.minutes + ' min'}</span>
              </div>
              <h3 className="mt-4 text-xl font-black">{lesson.title.slice(lesson.title.indexOf('.') + 2)}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{lesson.summary}</p>
              <ul className="mt-4 space-y-2">{lesson.goals.map((goal) => <li key={goal} className="flex items-start gap-2 text-xs font-semibold text-slate-700"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600"/>{goal}</li>)}</ul>
              <Link to={'/editor?lesson=' + encodeURIComponent(lesson.id)} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 text-sm font-black text-white hover:bg-purple-500">{completed.includes(lesson.id) ? 'Revisar esta aula' : 'Começar aula'} <ArrowRight size={17}/></Link>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-6 text-slate-600">Seu progresso fica guardado localmente no navegador. Salve seus projetos em arquivos .frog para continuar seu trabalho em outros dispositivos; não é necessário criar uma conta.</p>
      </main>
    </div>
  )
}

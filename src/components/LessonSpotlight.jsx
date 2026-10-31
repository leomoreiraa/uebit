import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, X } from 'lucide-react'
import { TOUR_SELECTORS, guideTarget } from '../lib/lesson-tour'
import { useLanguage } from '../i18n/language'
import { message } from '../i18n/messages'

function formatted(text) {
  return String(text ?? '').split(/(\*\*[^*]+\*\*)/g).map((piece, index) =>
    piece.startsWith('**') && piece.endsWith('**')
      ? <strong key={index} className="font-black">{piece.slice(2, -2)}</strong>
      : <span key={index}>{piece}</span>)
}

function visibleTarget(selector) {
  if (!selector) return null
  for (const candidate of document.querySelectorAll(selector)) {
    const bounds = candidate.getBoundingClientRect()
    const styles = window.getComputedStyle(candidate)
    if (bounds.width > 6 && bounds.height > 6 && styles.visibility !== 'hidden' && styles.display !== 'none' && !candidate.closest('[inert]')) return candidate
  }
  return null
}

function geometry(node) {
  if (!node) return null
  const r = node.getBoundingClientRect()
  const w = window.innerWidth
  const h = window.innerHeight
  const left = Math.max(6, Math.min(w - 6, r.left - 5))
  const right = Math.max(left, Math.min(w - 6, r.right + 5))
  const top = Math.max(6, Math.min(h - 6, r.top - 5))
  const bottom = Math.max(top, Math.min(h - 6, r.bottom + 5))
  return right - left > 6 && bottom - top > 6 ? { left, right, top, bottom, width: right - left, height: bottom - top } : null
}

function cardPosition(rect) {
  const w = window.innerWidth
  const h = window.innerHeight
  const cardW = Math.min(370, w - 24)
  if (!rect) return { left: Math.max(12, (w - cardW) / 2), top: Math.max(12, (h - 290) / 2), width: cardW }
  if (w >= 900 && w - rect.right >= cardW + 25) return { left: rect.right + 15, top: Math.max(12, Math.min(h - 300, rect.top)), width: cardW }
  if (w >= 900 && rect.left >= cardW + 25) return { left: rect.left - cardW - 15, top: Math.max(12, Math.min(h - 300, rect.top)), width: cardW }
  const left = Math.max(12, Math.min(w - cardW - 12, (rect.left + rect.right - cardW) / 2))
  if (rect.bottom + 292 < h) return { left, top: rect.bottom + 12, width: cardW }
  if (rect.top >= 292) return { left, top: rect.top - 285, width: cardW }
  return { left, top: rect.top < h / 2 ? Math.max(12, h - 284) : 12, width: cardW }
}

export default function LessonSpotlight({ lessonId, activityIndex, task, stepIndex, onStepChange, onNavigate, onClose, passed }) {
  const { language } = useLanguage()
  const t = (key, params) => message(language, key, params)
  const targetKey = guideTarget(lessonId, activityIndex, stepIndex)
  const steps = task.tutorial?.steps ?? [task.hint]
  const [targetRect, setTargetRect] = useState(null)
  const [windowSize, setWindowSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))
  const lastScrolled = useRef('')
  const navigateRef = useRef(onNavigate)
  const taskRef = useRef(task)
  navigateRef.current = onNavigate
  taskRef.current = task

  useEffect(() => {
    navigateRef.current?.(targetKey, { lessonId, activityIndex, task: taskRef.current })
  }, [targetKey, activityIndex, lessonId])

  useEffect(() => {
    let running = true
    let frame = 0
    const refresh = () => {
      if (!running) return
      const element = visibleTarget(TOUR_SELECTORS[targetKey])
      if (element && lastScrolled.current !== lessonId + ':' + activityIndex + ':' + stepIndex) {
        lastScrolled.current = lessonId + ':' + activityIndex + ':' + stepIndex
        element.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
      }
      const rect = geometry(element)
      setTargetRect((previous) => JSON.stringify(previous) === JSON.stringify(rect) ? previous : rect)
      setWindowSize((previous) => previous.width === window.innerWidth && previous.height === window.innerHeight
        ? previous : { width: window.innerWidth, height: window.innerHeight })
    }
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(refresh)
    }
    update()
    const timer = window.setInterval(update, 450)
    window.addEventListener('resize', update)
    document.addEventListener('scroll', update, true)
    return () => {
      running = false
      clearInterval(timer)
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', update)
      document.removeEventListener('scroll', update, true)
    }
  }, [targetKey, lessonId, activityIndex, stepIndex])

  useEffect(() => {
    document.body.dataset.uebitTourActive = 'true'
    return () => { delete document.body.dataset.uebitTourActive }
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose() }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  const w = windowSize.width
  const h = windowSize.height
  const rect = targetRect
  const masks = rect ? [
    { left: 0, top: 0, width: w, height: rect.top },
    { left: 0, top: rect.bottom, width: w, height: h - rect.bottom },
    { left: 0, top: rect.top, width: rect.left, height: rect.height },
    { left: rect.right, top: rect.top, width: w - rect.right, height: rect.height },
  ] : [{ left: 0, top: 0, width: w, height: h }]
  const last = stepIndex === steps.length - 1

  return createPortal(
    <div data-testid="lesson-spotlight" aria-label={t('spotlightTitle')} role="region">
      {masks.map((style, index) => <div key={index} aria-hidden="true" className="fixed bg-slate-950/65" style={{ ...style, zIndex: 10000 }} />)}
      {rect && <div aria-hidden="true" className="pointer-events-none fixed rounded-xl border-4 border-amber-400 shadow-[0_0_0_3px_rgba(255,255,255,0.95),0_0_28px_7px_rgba(250,204,21,0.7)]" style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height, zIndex: 10001 }} />}
      <section data-testid="spotlight-card" aria-live="polite" aria-label={t('spotlightTitle')} className="fixed flex max-h-[min(360px,54dvh)] flex-col overflow-hidden rounded-2xl border-2 border-amber-400 bg-white text-slate-900 shadow-2xl" style={{ ...cardPosition(rect), zIndex: 10002 }}>
        <div className="flex shrink-0 items-center gap-2 bg-violet-700 px-4 py-3 text-white">
          <Lightbulb size={21} className="text-amber-300" />
          <strong className="min-w-0 flex-1 text-sm">{t('spotlightTitle')}</strong>
          <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-bold">{stepIndex + 1}/{steps.length}</span>
          <button type="button" onClick={onClose} aria-label={t('spotlightClose')} className="grid size-9 place-items-center rounded-lg hover:bg-white/20"><X size={19} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="mb-3 flex gap-1.5" aria-label={t('spotlightProgress', { current: stepIndex + 1, total: steps.length })}>
            {steps.map((_, i) => <span key={i} className={'h-1.5 flex-1 rounded-full ' + (i <= stepIndex ? 'bg-violet-600' : 'bg-slate-200')} />)}
          </div>
          <p className="text-sm font-semibold leading-6">{formatted(steps[stepIndex])}</p>
          {!rect && <p role="status" className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">{t('spotlightMissing')}</p>}
          {passed && <p className="mt-3 flex items-center gap-2 text-xs font-black text-emerald-700"><CheckCircle2 size={15}/>{t('completedTask')}</p>}
        </div>
        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-purple-100 bg-purple-50 px-3 py-3">
          <button type="button" onClick={() => onStepChange(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0} className="inline-flex min-h-10 items-center gap-1 rounded-xl px-3 text-xs font-black text-purple-800 disabled:opacity-40"><ArrowLeft size={15}/>{t('spotlightPrevious')}</button>
          <button type="button" onClick={() => last ? onClose() : onStepChange(stepIndex + 1)} className="inline-flex min-h-10 items-center gap-1 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-500">
            {last ? t('spotlightFinish') : t('spotlightNext')} {!last && <ArrowRight size={15}/>}
          </button>
        </div>
      </section>
    </div>, document.body)
}

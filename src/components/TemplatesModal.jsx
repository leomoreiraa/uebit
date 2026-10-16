import { useEffect } from 'react'
import {
  X,
  Sparkles,
  Gamepad2,
  Rocket,
  Wand2,
  Palette,
  UtensilsCrossed,
  ArrowRight,
} from 'lucide-react'
import { TEMPLATES } from '../data/templates'

const iconMap = {
  Sparkles,
  Gamepad2,
  Rocket,
  Wand2,
  Palette,
  UtensilsCrossed,
}

export default function TemplatesModal({ isOpen, onClose, onSelectTemplate }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="templates-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl border-4 border-purple-300 bg-white p-6 shadow-2xl overflow-y-auto sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-purple-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-amber-400 text-amber-950 shadow-md">
              <Sparkles className="size-6" />
            </span>
            <div>
              <h2 id="templates-title" className="text-2xl font-black text-slate-900">
                Modelos de Projetos 🚀
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Escolha um projeto pronto para começar ou solte a imaginação do zero!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de modelos"
            className="grid size-10 place-items-center rounded-full border-2 border-slate-200 bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
          {TEMPLATES.map((template) => {
            const Icon = iconMap[template.icon] ?? Sparkles
            return (
              <div
                key={template.id}
                data-template-id={template.id}
                className="group flex flex-col justify-between rounded-2xl border-3 border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-400 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-purple-100 text-purple-700 shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="size-6" />
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black ${template.tagColor}`}>
                      {template.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-black text-slate-900">
                    {template.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-medium">
                    {template.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    aria-label={`Usar modelo ${template.name}`}
                    onClick={() => {
                      onSelectTemplate(template.id)
                      onClose()
                    }}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border-b-3 px-4 py-2.5 text-xs font-black text-white shadow-sm transition-all hover:scale-102 active:translate-y-0.5 ${template.buttonColor}`}
                  >
                    <span>Usar este Modelo</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

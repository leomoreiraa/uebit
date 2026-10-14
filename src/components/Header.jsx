import { Blocks, CodeXml, Download, LayoutTemplate, Play, Square } from 'lucide-react'

export default function Header({ view, onViewChange, onExport, exporting, exportDisabled, stageOpen, onToggleStage }) {
  return (
    <header className="flex min-h-24 flex-wrap items-center justify-between gap-4 border-b-4 border-violet-800 bg-violet-600 px-5 py-4 text-white shadow-sm lg:px-6">
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-2xl border-2 border-white/30 bg-white/15"><Blocks aria-hidden="true" size={28} /></span>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">CNA Studio</h1>
          <p className="text-xs font-medium text-violet-100">Imagine. Monte. Crie seu site!</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {!stageOpen && <div className="flex gap-1 rounded-2xl bg-violet-800/50 p-1.5" role="group" aria-label="Modo de visualização">
          {[
            ['visual', 'Visual'],
            ['code', 'Código'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={view === value}
              aria-controls="workspace"
              onClick={() => onViewChange(value)}
              className={`flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-bold transition-colors ${view === value ? 'bg-white text-violet-800 shadow-sm' : 'text-white hover:bg-violet-500'}`}
            >
              {value === 'visual' ? <LayoutTemplate aria-hidden="true" size={18} /> : <CodeXml aria-hidden="true" size={18} />}{label}
            </button>
          ))}
        </div>}
        <button type="button" onClick={onToggleStage} aria-pressed={stageOpen} aria-controls={stageOpen ? 'stage' : undefined} className="flex min-h-12 items-center gap-2 rounded-2xl border-b-4 border-emerald-800 bg-emerald-100 px-5 text-sm font-extrabold text-emerald-900 shadow-sm hover:bg-emerald-200">
          {stageOpen ? <Square aria-hidden="true" size={20} className="fill-emerald-600 text-emerald-600" /> : <Play aria-hidden="true" size={22} className="fill-emerald-600 text-emerald-600" />}
          {stageOpen ? 'Voltar ao editor' : 'Play · Abrir palco'}
        </button>
        <button type="button" onClick={onExport} disabled={exporting || exportDisabled} title={exportDisabled ? 'Corrija o erro de código antes de exportar' : 'Baixar HTML, CSS e JavaScript em um arquivo ZIP'} className="flex min-h-12 items-center gap-2 rounded-2xl border-b-4 border-amber-600 bg-amber-300 px-5 text-sm font-extrabold text-amber-950 shadow-sm enabled:hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50">
          <Download aria-hidden="true" size={20} />
          {exporting ? 'Exportando…' : 'Exportar Site'}
        </button>
      </div>
    </header>
  )
}

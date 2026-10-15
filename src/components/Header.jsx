import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { Blocks, CodeXml, Download, LayoutTemplate, Play, Square, Home, Save, Upload, Sparkles } from 'lucide-react'

export default function Header({
  name,
  onNameChange,
  onNameBlur,
  onSaveProject,
  onImportProject,
  importing,
  view,
  onViewChange,
  onExport,
  exporting,
  exportDisabled,
  stageOpen,
  onToggleStage,
  onOpenTemplates,
}) {
  const fileInput = useRef(null)
  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b-4 border-purple-400 bg-white/95 px-4 py-2.5 shadow-sm lg:px-6">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          title="Ir para a página inicial"
          className="group flex items-center gap-2.5 rounded-2xl p-1 transition-transform hover:scale-102"
        >
          <span className="grid size-11 place-items-center rounded-2xl border-2 border-purple-300 bg-purple-600 text-white shadow-md transition-transform group-hover:rotate-6">
            <Blocks aria-hidden="true" size={24} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-slate-900">Uebit</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-900">
                <Home size={10} aria-hidden="true" /> Início
              </span>
            </div>
            <p className="text-[11px] font-bold text-purple-700 hidden sm:block">Web Builder em Blocos</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        <input
          aria-label="Nome do projeto"
          title="Nome do projeto"
          placeholder="Nome do projeto"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          onBlur={onNameBlur}
          maxLength={120}
          className="h-10 w-44 rounded-full border-2 border-purple-200 bg-purple-50/50 px-4 text-xs font-black text-slate-800 transition-colors focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 sm:w-56"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {onOpenTemplates && (
          <button
            type="button"
            onClick={onOpenTemplates}
            title="Escolha um modelo pronto de projeto"
            aria-label="Modelos de Projeto"
            className="flex h-10 items-center gap-1.5 rounded-full border-b-3 border-pink-700 bg-pink-500 px-3.5 text-xs font-black text-white shadow-md transition-all hover:scale-105 hover:bg-pink-400 active:scale-95 active:translate-y-0.5"
          >
            <Sparkles aria-hidden="true" size={16} />
            <span>Modelos</span>
          </button>
        )}

        <button
          type="button"
          onClick={onSaveProject}
          disabled={importing}
          title="Salvar Projeto"
          aria-label="Salvar Projeto"
          className="flex h-10 items-center gap-1.5 rounded-full border-b-3 border-violet-800 bg-violet-600 px-4 text-xs font-black text-white shadow-md transition-all hover:scale-105 hover:bg-violet-500 active:scale-95 active:translate-y-0.5 disabled:opacity-50"
        >
          <Save aria-hidden="true" size={16} />
          <span>Salvar Projeto</span>
        </button>

        <button
          type="button"
          onClick={() => fileInput.current.click()}
          disabled={importing}
          title="Importar Projeto"
          aria-label="Importar Projeto"
          className="flex h-10 items-center gap-1.5 rounded-full border-b-3 border-indigo-800 bg-indigo-600 px-4 text-xs font-black text-white shadow-md transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95 active:translate-y-0.5 disabled:opacity-50"
        >
          <Upload aria-hidden="true" size={16} />
          <span>{importing ? 'Importando…' : 'Importar Projeto'}</span>
        </button>

        <input
          ref={fileInput}
          type="file"
          accept=".frog"
          aria-label="Arquivo do projeto .frog"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            onImportProject(file)
          }}
        />

        {!stageOpen && (
          <div className="flex flex-wrap rounded-2xl border-2 border-purple-200 bg-purple-50 p-0.5 shadow-xs" role="group" aria-label="Ambientes do projeto">
            {[
              ['visual', 'Design Visual'],
              ['programming', 'Programação'],
              ['code', 'Código Gerado'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={view === value}
                aria-controls="workspace"
                onClick={() => onViewChange(value)}
                className={`flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-black transition-all ${
                  view === value
                    ? 'border border-purple-400 bg-purple-600 text-white shadow-sm'
                    : 'text-purple-800 hover:bg-purple-100 hover:text-purple-950'
                }`}
              >
                {value === 'visual' ? <LayoutTemplate aria-hidden="true" size={15} /> : value === 'programming' ? <Blocks aria-hidden="true" size={15} /> : <CodeXml aria-hidden="true" size={15} />}
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onToggleStage}
          aria-pressed={stageOpen}
          aria-controls={stageOpen ? 'stage' : undefined}
          title={stageOpen ? 'Voltar ao editor' : 'Play · Abrir palco'}
          className="flex h-10 items-center gap-2 rounded-full border-b-4 border-emerald-700 bg-emerald-500 px-5 text-xs font-black text-white shadow-md transition-all hover:scale-105 hover:bg-emerald-400 active:scale-95 active:translate-y-0.5"
        >
          {stageOpen ? <Square aria-hidden="true" size={16} className="fill-white" /> : <Play aria-hidden="true" size={16} className="fill-white" />}
          <span>{stageOpen ? 'Voltar ao editor' : 'Play · Abrir palco'}</span>
        </button>

        <button
          type="button"
          onClick={onExport}
          disabled={exporting || exportDisabled}
          title={exportDisabled ? 'Corrija o erro de código antes de exportar' : 'Baixar HTML, CSS e JavaScript em um arquivo ZIP'}
          className="flex h-10 items-center gap-2 rounded-full border-b-4 border-amber-600 bg-amber-400 px-5 text-xs font-black text-amber-950 shadow-md transition-all enabled:hover:scale-105 enabled:hover:bg-amber-300 enabled:active:scale-95 enabled:active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download aria-hidden="true" size={16} />
          <span>{exporting ? 'Exportando…' : 'Exportar Site'}</span>
        </button>
      </div>
    </header>
  )
}

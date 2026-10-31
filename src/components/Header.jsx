import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { Menu, Settings, BookOpen } from 'lucide-react'
import { CodeXml, Download, LayoutTemplate, Play, Square, Save, Upload, Sparkles, Blocks } from './BrandIcon'
import UebitLogo from './UebitLogo'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage, languagePath } from '../i18n/language'
import { message } from '../i18n/messages'

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
  onOpenLessons,
  lessonsOpen,
  mobilePanel,
  onTogglePanel,
}) {
  const fileInput = useRef(null)
  const { language } = useLanguage()
  const t = (key) => message(language, key)

  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b-4 border-purple-300 bg-white/95 px-4 py-2.5 shadow-sm lg:px-6">
      <div className="flex min-w-0 items-center gap-2">
        {view === 'visual' && !stageOpen && (
          <button type="button" onClick={(event) => onTogglePanel('palette', event.currentTarget)} data-tour="open-palette" aria-label={t('visualPalette')} aria-expanded={mobilePanel === 'palette'} aria-controls="editor-palette" aria-haspopup="dialog" className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-100 text-purple-900 focus-visible:outline-2 xl:hidden">
            <Menu size={22} aria-hidden="true" />
          </button>
        )}
        <Link
          to={languagePath('/', language)}
          title={t('home')}
          className="group flex items-center gap-2 rounded-2xl p-1 transition-transform hover:scale-102"
        >
          <UebitLogo size={38} variant="icon" animated className="sm:hidden" />
          <UebitLogo size={38} variant="full" animated className="max-sm:hidden" />
        </Link>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:flex-none">
        <input
          aria-label={t('projectName')}
          title={t('projectName')}
          placeholder={t('projectName')}
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          onBlur={onNameBlur}
          maxLength={120}
          className="h-10 min-w-0 w-full max-w-44 rounded-full border-2 border-purple-200 bg-purple-50/50 px-4 text-xs font-black text-slate-800 transition-colors focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 sm:w-56"
        />
        {view === 'visual' && !stageOpen && (
          <button type="button" onClick={(event) => onTogglePanel('properties', event.currentTarget)} data-tour="open-properties" aria-label={t('properties')} aria-expanded={mobilePanel === 'properties'} aria-controls="editor-properties" aria-haspopup="dialog" className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-100 text-purple-900 focus-visible:outline-2 xl:hidden">
            <Settings size={22} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex max-w-full min-w-0 items-center gap-2 overflow-x-auto overscroll-contain py-1 max-sm:w-full [&>button]:shrink-0 [&>div]:shrink-0 sm:flex-wrap sm:gap-2.5">
        <LanguageSwitcher compact />
        {onOpenLessons && (
          <button type="button" aria-pressed={Boolean(lessonsOpen)} onClick={onOpenLessons} title={t('openLessons')} className="flex h-10 items-center gap-1.5 rounded-full border-b-4 border-purple-800 bg-purple-600 px-3.5 text-xs font-black text-white shadow-md hover:bg-purple-500">
            <BookOpen size={16} aria-hidden="true" />
            <span>{t('lessons')}</span>
          </button>
        )}
        {onOpenTemplates && (
          <button
            type="button"
            onClick={onOpenTemplates}
            title={t('templates')}
            aria-label={t('templates')}
            className="flex h-10 items-center gap-1.5 rounded-full border-b-4 border-amber-600 bg-amber-400 px-3.5 text-xs font-black text-amber-950 shadow-md transition-all hover:scale-105 hover:bg-amber-300 active:scale-95 active:translate-y-0.5"
          >
            <Sparkles aria-hidden="true" size={16} />
            <span>{t('templates')}</span>
          </button>
        )}

        {/* Salvar Projeto - Roxo Vibrante */}
        <button
          type="button"
          onClick={onSaveProject}
          data-tour="save-project"
          disabled={importing}
          title={t('saveProject')}
          aria-label={t('saveProject')}
          className="flex h-10 items-center gap-1.5 rounded-full border-b-4 border-purple-800 bg-purple-600 px-4 text-xs font-black text-white shadow-md transition-all hover:scale-105 hover:bg-purple-500 active:scale-95 active:translate-y-0.5 disabled:opacity-50"
        >
          <Save aria-hidden="true" size={16} />
          <span>{t('saveProject')}</span>
        </button>

        {/* Importar Projeto - Vermelho/Rose */}
        <button
          type="button"
          onClick={() => fileInput.current.click()}
          disabled={importing}
          title={t('importProject')}
          aria-label={t('importProject')}
          className="flex h-10 items-center gap-1.5 rounded-full border-b-4 border-rose-700 bg-rose-500 px-4 text-xs font-black text-white shadow-md transition-all hover:scale-105 hover:bg-rose-400 active:scale-95 active:translate-y-0.5 disabled:opacity-50"
        >
          <Upload aria-hidden="true" size={16} />
          <span>{t(importing ? 'importing' : 'importProject')}</span>
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
              ['visual', t('visual')],
              ['programming', t('programming')],
              ['code', t('code')],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                data-tour-view={value}
                aria-pressed={view === value}
                aria-controls="workspace"
                onClick={() => onViewChange(value)}
                className={`flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-black transition-all ${
                  view === value
                    ? 'border-2 border-purple-400 bg-purple-600 text-white shadow-sm'
                    : 'text-purple-800 hover:bg-purple-100 hover:text-purple-950'
                }`}
              >
                {value === 'visual' ? <LayoutTemplate aria-hidden="true" size={15} /> : value === 'programming' ? <Blocks aria-hidden="true" size={15} /> : <CodeXml aria-hidden="true" size={15} />}
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Botão Play (Palco) - Verde Sapo */}
        <button
          type="button"
          onClick={onToggleStage}
          data-tour="play"
          aria-pressed={stageOpen}
          aria-controls={stageOpen ? 'stage' : undefined}
          title={t(stageOpen ? 'backEditor' : 'stage')}
          className={`flex h-10 items-center gap-2 rounded-full border-b-4 px-5 text-xs font-black shadow-md transition-all hover:scale-105 active:scale-95 active:translate-y-0.5 ${
            stageOpen
              ? 'border-slate-800 bg-slate-700 text-white hover:bg-slate-600'
              : 'border-emerald-700 bg-emerald-500 text-white hover:bg-emerald-400'
          }`}
        >
          {stageOpen ? <Square aria-hidden="true" size={16} className="fill-white" /> : <Play aria-hidden="true" size={16} className="fill-white" />}
          <span>{stageOpen ? 'Voltar ao editor' : 'Play · Abrir palco'}</span>
        </button>

        {/* Botão Exportar Site - Verde Intenso */}
        <button
          type="button"
          onClick={onExport}
          disabled={exporting || exportDisabled}
          title={exportDisabled ? 'Corrija o erro de código antes de exportar' : 'Baixar HTML, CSS e JavaScript em um arquivo ZIP'}
          className="flex h-10 items-center gap-2 rounded-full border-b-4 border-green-800 bg-green-600 px-5 text-xs font-black text-white shadow-md transition-all enabled:hover:scale-105 enabled:hover:bg-green-500 enabled:active:scale-95 enabled:active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download aria-hidden="true" size={16} />
          <span>{t(exporting ? 'exporting' : 'exportSite')}</span>
        </button>
      </div>
    </header>
  )
}

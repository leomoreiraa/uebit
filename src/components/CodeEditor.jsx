import { useEffect, useMemo, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Eye, EyeOff, Monitor, Smartphone, Sparkles } from 'lucide-react'
import '../lib/monaco'
import { formatSource } from '../lib/format-code'
import { MOBILE_WIDTHS } from '../lib/responsive'
import { createSiteDocument, serializeSiteDocument } from '../lib/site-document'
import SitePreview from './SitePreview'

const files = [
  { key: 'html', label: 'HTML', name: 'index.html', language: 'html' },
  { key: 'css', label: 'CSS', name: 'style.css', language: 'css' },
  { key: 'js', label: 'JS', name: 'script.js', language: 'javascript' },
]

export default function CodeEditor({
  codeTab,
  onCodeTabChange,
  code,
  draft,
  onCodeChange,
  device = 'desktop',
  onDeviceChange,
  viewportWidth = 390,
  onMobileWidthChange,
}) {
  const active = files.find((file) => file.key === codeTab) ?? files[0]
  const liveCode = draft ?? code
  const lastTypedRef = useRef({ key: null, raw: null })
  const html = useMemo(() => {
    try {
      return serializeSiteDocument(createSiteDocument(liveCode.html))
    } catch {
      return liveCode.html
    }
  }, [liveCode.html])
  const source = active.key === 'html' ? html : liveCode[active.key]

  const [editorState, setEditorState] = useState({ key: active.key, source, text: source, error: '', ready: false })
  const [showPreview, setShowPreview] = useState(true)
  const [runtimeError, setRuntimeError] = useState('')
  const [debouncedJs, setDebouncedJs] = useState(liveCode.js)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedJs(liveCode.js), 350)
    return () => clearTimeout(timer)
  }, [liveCode.js])

  useEffect(() => {
    // Skip auto-formatting while the user is actively typing in the current tab
    if (
      lastTypedRef.current.key === active.key &&
      (lastTypedRef.current.raw === source || lastTypedRef.current.raw === liveCode[active.key])
    ) {
      return
    }
    let cancelled = false
    formatSource(source, active.key).then(
      (text) => {
        if (!cancelled) setEditorState({ key: active.key, source, text, error: '', ready: true })
      },
      (error) => {
        if (!cancelled) setEditorState({ key: active.key, source, text: source, error: error.message, ready: true })
      },
    )
    return () => {
      cancelled = true
    }
  }, [source, active.key, liveCode])

  const handleFormatClick = async () => {
    const currentText = editorState.key === active.key ? editorState.text : source
    try {
      const formattedText = await formatSource(currentText, active.key)
      lastTypedRef.current = { key: active.key, raw: formattedText }
      setEditorState({ key: active.key, source: formattedText, text: formattedText, error: '', ready: true })
      onCodeChange?.(active.key, formattedText)
    } catch (error) {
      setEditorState((prev) => ({ ...prev, error: error.message }))
    }
  }

  const handleEditorChange = (nextValue) => {
    const val = nextValue ?? ''
    lastTypedRef.current = { key: active.key, raw: val }
    setEditorState({ key: active.key, source: val, text: val, error: '', ready: true })
    setRuntimeError('')
    onCodeChange?.(active.key, val)
  }

  const previewCode = useMemo(
    () => ({
      html: liveCode.html,
      css: liveCode.css,
      js: debouncedJs,
    }),
    [liveCode.html, liveCode.css, debouncedJs],
  )

  const displayValue = editorState.key === active.key ? editorState.text : source

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
        <div role="group" aria-label="Arquivos do projeto" className="flex flex-wrap items-center gap-1">
          {files.map((file) => (
            <button
              key={file.key}
              type="button"
              aria-pressed={active.key === file.key}
              data-tour-code-tab={file.key}
              onClick={() => onCodeTabChange(file.key)}
              className={`min-h-10 rounded-xl px-4 text-xs font-black transition-all ${
                active.key === file.key
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-purple-100 hover:text-purple-950'
              }`}
            >
              {file.label}
              <span className={`ml-1.5 font-mono text-[11px] font-medium ${active.key === file.key ? 'text-purple-200' : 'text-slate-400'}`}>
                {file.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleFormatClick}
            className="flex min-h-9 items-center gap-1.5 rounded-xl border-2 border-purple-200 bg-white px-3 text-xs font-bold text-purple-900 shadow-xs transition-all hover:bg-purple-50"
          >
            <Sparkles aria-hidden="true" size={14} className="text-purple-600" />
            Formatar código
          </button>
          <button
            type="button"
            aria-pressed={showPreview}
            onClick={() => setShowPreview((current) => !current)}
            className={`flex min-h-9 items-center gap-1.5 rounded-xl border-2 px-3 text-xs font-bold transition-all ${
              showPreview
                ? 'border-purple-300 bg-purple-100 text-purple-950'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {showPreview ? <EyeOff aria-hidden="true" size={14} /> : <Eye aria-hidden="true" size={14} />}
            {showPreview ? 'Ocultar prévia' : 'Ver prévia ao vivo'}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 text-xs text-slate-500">
        <span>
          <code>{active.name}</code> · Edição em tempo real · Indentação de 2 espaços
        </span>
        {editorState.error && (
          <span role="alert" aria-label="Erro de formatação" className="font-semibold text-amber-700">
            {editorState.error}
          </span>
        )}
      </div>

      {/* Main Split Area: Editor + Real-Time Preview */}
      <div className={`grid min-h-0 flex-1 overflow-hidden ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        <div data-tour="code-editor" className="flex min-h-0 min-w-0 flex-col overflow-hidden border-b border-slate-200 lg:border-r lg:border-b-0">
          <Editor
            height="max(360px, calc(100dvh - 230px))"
            path={active.name}
            language={active.language}
            value={displayValue}
            onChange={handleEditorChange}
            loading={<p className="p-6 text-sm text-slate-500">Carregando editor de código…</p>}
            options={{
              readOnly: false,
              domReadOnly: false,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              wordWrap: 'on',
              tabSize: 2,
              insertSpaces: true,
              detectIndentation: false,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              ariaLabel: `Código ${active.label} — editor em tempo real`,
              padding: { top: 16 },
              fixedOverflowWidgets: true,
            }}
          />
        </div>

        {showPreview && (
          <div className="uebit-dot-backdrop flex min-h-0 min-w-0 flex-col overflow-hidden bg-slate-50">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 bg-white px-3 py-2">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-900">
                <span className="inline-block size-2 rounded-full bg-emerald-500" />
                Prévia em Tempo Real
              </span>
              <div className="flex items-center gap-1.5">
                <div role="group" aria-label="Dispositivo da prévia do código" className="flex gap-1 rounded-full border border-purple-200 bg-purple-50 p-0.5">
                  <button
                    type="button"
                    aria-pressed={device === 'desktop'}
                    onClick={() => onDeviceChange?.('desktop')}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black transition-all ${
                      device === 'desktop' ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-800 hover:text-purple-950'
                    }`}
                  >
                    <Monitor aria-hidden="true" size={12} />
                    Desktop
                  </button>
                  <button
                    type="button"
                    aria-pressed={device === 'mobile'}
                    onClick={() => onDeviceChange?.('mobile')}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black transition-all ${
                      device === 'mobile' ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-800 hover:text-purple-950'
                    }`}
                  >
                    <Smartphone aria-hidden="true" size={12} />
                    Mobile
                  </button>
                </div>
                {device === 'mobile' && (
                  <select
                    aria-label="Largura mobile na prévia do código"
                    value={viewportWidth}
                    onChange={(event) => onMobileWidthChange?.(Number(event.target.value))}
                    className="h-7 rounded-full border border-purple-200 bg-white px-2 text-[11px] font-bold text-slate-700"
                  >
                    {MOBILE_WIDTHS.map((width) => (
                      <option key={width} value={width}>
                        {width} px
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto p-3">
              <div
                className="mx-auto h-full overflow-hidden rounded-xl border-2 border-purple-200 bg-white shadow-sm transition-all"
                style={device === 'mobile' ? { maxWidth: viewportWidth + 4 } : undefined}
              >
                <SitePreview
                  code={previewCode}
                  onError={setRuntimeError}
                  className="block h-full min-h-80 w-full bg-white"
                  style={{ height: 'max(340px, calc(100dvh - 290px))' }}
                />
              </div>
            </div>
            {runtimeError && (
              <p role="status" className="border-t border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                JavaScript: {runtimeError}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import Editor from '@monaco-editor/react'
import '../lib/monaco'
import { formatSource } from '../lib/format-code'
import { createSiteDocument, serializeSiteDocument } from '../lib/site-document'

const files = [
  { key: 'html', label: 'HTML', name: 'index.html', language: 'html' },
  { key: 'css', label: 'CSS', name: 'style.css', language: 'css' },
  { key: 'js', label: 'JS', name: 'script.js', language: 'javascript' },
]

export default function CodeEditor({ codeTab, onCodeTabChange, code }) {
  const active = files.find((file) => file.key === codeTab) ?? files[0]
  const html = useMemo(() => serializeSiteDocument(createSiteDocument(code.html)), [code.html])
  const source = active.key === 'html' ? html : code[active.key]
  const [formatted, setFormatted] = useState(null)
  useEffect(() => {
    let cancelled = false
    formatSource(source, active.key).then(
      (text) => { if (!cancelled) setFormatted({ source, language: active.key, text, error: '' }) },
      (error) => { if (!cancelled) setFormatted({ source, language: active.key, text: source, error: error.message }) },
    )
    return () => { cancelled = true }
  }, [source, active.key])
  const ready = formatted?.source === source && formatted?.language === active.key
  return <>
    <div role="group" aria-label="Arquivos do projeto" className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
      {files.map((file) => <button key={file.key} type="button" aria-pressed={active.key === file.key} onClick={() => onCodeTabChange(file.key)} className={`min-h-11 rounded-lg px-4 text-sm font-bold ${active.key === file.key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>{file.label}</button>)}
    </div>
    <p className="border-b border-slate-200 px-4 py-3 text-xs text-slate-500"><code>{active.name}</code> · Somente leitura · Indentação de 2 espaços</p>
    {ready && formatted.error && <p role="alert" aria-label="Erro de formatação" className="bg-amber-50 p-3 text-sm text-amber-900">{formatted.error} Exibindo o código original.</p>}
    {!ready ? <p role="status" className="p-6 text-sm text-slate-500">Formatando {active.name}…</p> : <Editor height="max(400px, calc(100dvh - 240px))" path={active.name} language={active.language} value={formatted.text}
      loading={<p className="p-6 text-sm text-slate-500">Carregando código gerado…</p>}
      options={{ readOnly: true, domReadOnly: true, readOnlyMessage: { value: 'Edite seu site em Design Visual ou Programação.' }, minimap: { enabled: false }, fontSize: 14, lineNumbers: 'on', wordWrap: 'on', tabSize: 2, insertSpaces: true, detectIndentation: false, automaticLayout: true, scrollBeyondLastLine: false, ariaLabel: `Código ${active.label} — somente leitura`, padding: { top: 16 }, fixedOverflowWidgets: true }} />}
  </>
}

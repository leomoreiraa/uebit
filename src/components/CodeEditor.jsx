import Editor from '@monaco-editor/react'
import '../lib/monaco'

const files = [
  { key: 'html', label: 'HTML', name: 'index.html', language: 'html' },
  { key: 'css', label: 'CSS', name: 'style.css', language: 'css' },
  { key: 'js', label: 'JS', name: 'script.js', language: 'javascript' },
]

export default function CodeEditor({ codeTab, onCodeTabChange, code }) {
  const active = files.find((file) => file.key === codeTab) ?? files[0]
  return <>
    <div role="group" aria-label="Arquivos do projeto" className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
      {files.map((file) => <button key={file.key} type="button" aria-pressed={active.key === file.key} onClick={() => onCodeTabChange(file.key)} className={`min-h-11 rounded-lg px-4 text-sm font-bold ${active.key === file.key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>{file.label}</button>)}
    </div>
    <p className="border-b border-slate-200 px-4 py-3 text-xs text-slate-500"><code>{active.name}</code> · Somente leitura · Código atual do site</p>
    <Editor height="max(400px, calc(100dvh - 240px))" path={active.name} language={active.language} value={code[active.key]}
      loading={<p className="p-6 text-sm text-slate-500">Carregando código gerado…</p>}
      options={{ readOnly: true, domReadOnly: true, readOnlyMessage: { value: 'Edite seu site em Design Visual ou Programação.' }, minimap: { enabled: false }, fontSize: 14, lineNumbers: 'on', wordWrap: 'on', tabSize: 2, automaticLayout: true, scrollBeyondLastLine: false, ariaLabel: `Código ${active.label} — somente leitura`, padding: { top: 16 }, fixedOverflowWidgets: true }} />
  </>
}

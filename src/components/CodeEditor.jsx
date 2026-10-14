import { lazy, Suspense, useState } from 'react'
import Editor from '@monaco-editor/react'
import '../lib/monaco'
import SitePreview from './SitePreview'

const BlocksEditor = lazy(() => import('./BlocksEditor'))
const blocksTab = { key: 'blocks', label: 'Blocos', name: 'JavaScript em blocos', hint: 'Encaixe sua lógica e clique em Aplicar blocos. HTML, CSS e JS continuam editáveis.' }

const files = [
  { key: 'html', label: 'HTML', name: 'index.html', language: 'html', hint: 'HTML organiza os elementos da página.' },
  { key: 'css', label: 'CSS', name: 'style.css', language: 'css', hint: 'CSS define cores, tamanhos e o layout responsivo.' },
  { key: 'js', label: 'JS', name: 'script.js', language: 'javascript', hint: 'JavaScript adiciona ações à página. Experimente clicar na prévia.' },
]

export default function CodeEditor({ draft, code, onCodeChange, error, blockProject, blockTargets, onBlockProjectChange, onApplyBlocks }) {
  const [active, setActive] = useState(files[0])
  const [runtimeError, setRuntimeError] = useState('')
  return (
    <>
      <div role="group" aria-label="Arquivos do projeto" className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
        {[...files, blocksTab].map((file) => <button key={file.key} type="button" aria-pressed={active.key === file.key} onClick={() => setActive(file)} className={`min-h-11 rounded-lg px-4 text-sm font-medium ${active.key === file.key ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>{file.label}</button>)}
      </div>
      <div className="border-b border-slate-200 px-4 py-3 text-xs text-slate-500"><code>{active.name}</code> · {active.hint}</div>
      {error && <p role="alert" aria-label="Erro no código" className="border-b border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{error} A prévia mantém a última versão válida.</p>}
      <div className={`grid min-w-0 ${active.key === 'blocks' ? '' : 'xl:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]'}`}>
        {active.key === 'blocks' ? <Suspense fallback={<p className="p-6">Carregando blocos…</p>}><BlocksEditor project={blockProject} targets={blockTargets} onProjectChange={onBlockProjectChange} onApply={onApplyBlocks} disabled={Boolean(error)} /></Suspense> : <Editor height="560px" path={active.name} language={active.language} value={draft[active.key]} onChange={(value) => { setRuntimeError(''); onCodeChange(active.key, value ?? '') }} loading={<p className="p-6 text-sm text-slate-500">Carregando editor…</p>}
          options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: 'on', wordWrap: 'on', tabSize: 2, automaticLayout: true, scrollBeyondLastLine: false, ariaLabel: `Editor de ${active.label}`, padding: { top: 16 }, fixedOverflowWidgets: true }} />}
        <div className="min-w-0 border-t border-slate-200 xl:border-t-0 xl:border-l">
          <p className="border-b border-slate-200 px-4 py-3 text-xs font-medium text-slate-500">Prévia ao vivo · Atualiza enquanto você escreve</p>
          <SitePreview code={code} onError={setRuntimeError} className="h-128 w-full bg-white" />
          {runtimeError && <p role="status" className="bg-amber-50 p-3 text-xs text-amber-900">JavaScript: {runtimeError}</p>}
        </div>
      </div>
    </>
  )
}

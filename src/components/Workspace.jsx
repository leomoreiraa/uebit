import { lazy, Suspense } from 'react'
import Canvas from './Canvas'

const CodeEditor = lazy(() => import('./CodeEditor'))
const BlocksEditor = lazy(() => import('./BlocksEditor'))

export default function Workspace({ active = true, codeTab, onCodeTabChange, view, elements, selectedId, onSelect, dropPreview, message, code, codeError, onRestoreCode, blockProject, blockTargets, onBlockProjectChange, onApplyBlocks, ...viewportProps }) {
  const label = view === 'visual' ? 'Design Visual' : view === 'programming' ? 'Programação' : 'Código Gerado'
  return (
    <main id="workspace" className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden" aria-label={label}>
      <h2 className="sr-only">{label}</h2>
      {codeError && <div role="alert" aria-label="Erro no código" className="mb-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        <p>{codeError} O projeto contém um rascunho inválido. A última versão válida está preservada.</p>
        <button type="button" onClick={onRestoreCode} className="mt-2 min-h-11 rounded-xl border border-amber-400 bg-white px-3 font-bold">Descartar rascunho e usar última versão válida</button>
      </div>}
      <section aria-label={view === 'visual' ? 'Canvas da página' : label} className="uebit-workspace flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border-2 border-purple-200 bg-white shadow-sm">
        {view === 'visual' && <Canvas elements={elements} selectedId={selectedId} onSelect={onSelect} dropPreview={dropPreview} message={message} code={code} disabled={Boolean(codeError)} {...viewportProps} />}
        <div className={`${view === 'programming' ? 'flex' : 'hidden'} min-h-0 min-w-0 flex-1 flex-col overflow-hidden`} aria-hidden={view !== 'programming'}>
          <Suspense fallback={<p className="p-8 text-sm text-slate-500">Carregando programação…</p>}>
            <BlocksEditor project={blockProject} targets={blockTargets} onProjectChange={onBlockProjectChange} onApply={onApplyBlocks} disabled={Boolean(codeError)} active={active && view === 'programming'} expanded />
          </Suspense>
        </div>
        {view === 'code' && (
          <Suspense fallback={<p className="p-8 text-sm text-slate-500">Carregando código gerado…</p>}>
            {blockProject.generated !== blockProject.appliedGenerated && <p role="status" className="bg-violet-50 p-3 text-xs text-violet-900">Há alterações nos blocos ainda não aplicadas. Aplique-as em Programação para atualizar o código final.</p>}
            <CodeEditor codeTab={codeTab} onCodeTabChange={onCodeTabChange} code={code} />
          </Suspense>
        )}
      </section>
    </main>
  )
}

import { lazy, Suspense } from 'react'
import Canvas from './Canvas'

const CodeEditor = lazy(() => import('./CodeEditor'))

export default function Workspace({ view, elements, selectedId, onSelect, dropPreview, message, code, draft, codeError, onCodeChange, blockProject, blockTargets, onBlockProjectChange, onApplyBlocks, ...viewportProps }) {
  return (
    <main id="workspace" className="flex min-w-0 flex-col" aria-labelledby="workspace-heading">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-violet-100 bg-white px-5 py-4 shadow-sm">
        <div>
          <p className="text-xs font-bold tracking-widest text-violet-600 uppercase">Seu espaço de criação</p>
          <h2 id="workspace-heading" className="mt-1 text-xl font-extrabold tracking-tight text-slate-800">Meu primeiro site</h2>
        </div>
        <span className="rounded-xl bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800">{view === 'visual' ? 'Modo de criação' : 'Código escrito'}</span>
      </div>
      <section aria-label={view === 'visual' ? 'Canvas da página' : 'Área de código'} className="uebit-workspace flex min-h-110 flex-1 flex-col overflow-hidden rounded-2xl border-2 border-violet-200 bg-white shadow-sm">
        {view === 'visual' ? (
          <>
            {codeError && <p role="alert" aria-label="Erro no código" className="bg-amber-50 p-4 text-sm text-amber-900">{codeError} Corrija o código para continuar editando visualmente. A última prévia válida está preservada.</p>}
            <Canvas elements={elements} selectedId={selectedId} onSelect={onSelect} dropPreview={dropPreview} message={message} code={code} disabled={Boolean(codeError)} {...viewportProps} />
          </>
        ) : (
          <Suspense fallback={<p className="p-8 text-sm text-slate-500">Carregando editor de código…</p>}>
            <CodeEditor draft={draft} code={code} onCodeChange={onCodeChange} error={codeError} blockProject={blockProject} blockTargets={blockTargets} onBlockProjectChange={onBlockProjectChange} onApplyBlocks={onApplyBlocks} />
          </Suspense>
        )}
      </section>
      <p className="mt-4 text-center text-xs leading-5 text-slate-500">Crie, explore e descubra como a web funciona.</p>
    </main>
  )
}

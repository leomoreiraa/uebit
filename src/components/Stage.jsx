import { useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import SitePreview from './SitePreview'

export default function Stage({ code, codeError, device, viewportWidth }) {
  const [runtimeError, setRuntimeError] = useState('')

  return (
    <main id="stage" aria-labelledby="stage-heading" className="uebit-dot-backdrop flex flex-1 flex-col p-3 sm:p-6">
      <div className="mx-auto mb-4 flex w-full max-w-7xl flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="stage-heading" className="text-xl font-extrabold text-violet-900">Palco do seu site</h2>
          <p className="mt-1 text-sm text-slate-600">Explore sua criação! Os links e botões estão funcionando.</p>
        </div>
        <span className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-violet-800 shadow-sm">
          {device === 'mobile' ? <Smartphone aria-hidden="true" size={18} /> : <Monitor aria-hidden="true" size={18} />}
          {device === 'mobile' ? `Mobile · ${viewportWidth} px` : 'Desktop · Tela adaptável'}
        </span>
      </div>
      {codeError && <p role="status" className="mx-auto mb-3 w-full max-w-7xl rounded-xl bg-amber-100 p-3 text-sm text-amber-900">Há um erro no código. O palco mostra a última versão válida. Volte ao editor para corrigir.</p>}
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border-4 border-violet-200 bg-white shadow-lg" style={device === 'mobile' ? { maxWidth: viewportWidth + 8 } : undefined}>
        <SitePreview code={code} onError={setRuntimeError} className="block min-h-96 w-full bg-white" style={{ height: 'calc(100dvh - 240px)' }} />
      </div>
      {runtimeError && <p role="status" className="mx-auto mt-3 w-full max-w-7xl rounded-xl bg-amber-100 p-3 text-sm text-amber-900">JavaScript: {runtimeError}</p>}
    </main>
  )
}

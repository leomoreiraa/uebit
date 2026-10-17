import { useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import { MOBILE_WIDTHS } from '../lib/responsive'
import SitePreview from './SitePreview'

export default function Stage({ code, codeError, device, viewportWidth, onDeviceChange, onMobileWidthChange }) {
  const [runtimeError, setRuntimeError] = useState('')

  return (
    <main id="stage" aria-labelledby="stage-heading" className="uebit-dot-backdrop flex min-h-0 flex-1 flex-col overflow-y-auto p-3 sm:p-6">
      <div className="mx-auto mb-4 flex w-full max-w-7xl flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="stage-heading" className="text-xl font-extrabold text-violet-900">Palco do seu site</h2>
          <p className="mt-1 text-sm text-slate-600">Explore sua criação! Os links e botões estão funcionando.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Versão da página no palco" className="flex gap-1 rounded-full border-2 border-purple-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              aria-pressed={device === 'desktop'}
              onClick={() => onDeviceChange?.('desktop')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black transition-all ${
                device === 'desktop'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-800 hover:bg-purple-50 hover:text-purple-950'
              }`}
            >
              <Monitor aria-hidden="true" size={15} />
              Desktop
            </button>
            <button
              type="button"
              aria-pressed={device === 'mobile'}
              onClick={() => onDeviceChange?.('mobile')}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black transition-all ${
                device === 'mobile'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-800 hover:bg-purple-50 hover:text-purple-950'
              }`}
            >
              <Smartphone aria-hidden="true" size={15} />
              Mobile
            </button>
          </div>
          {device === 'mobile' && (
            <select
              aria-label="Largura da tela mobile no palco"
              value={viewportWidth}
              onChange={(event) => onMobileWidthChange?.(Number(event.target.value))}
              className="h-9 rounded-full border-2 border-purple-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-xs"
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
      {codeError && <p role="status" className="mx-auto mb-3 w-full max-w-7xl rounded-xl bg-amber-100 p-3 text-sm text-amber-900">Há um erro no código. O palco mostra a última versão válida. Volte ao editor para corrigir.</p>}
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border-4 border-violet-200 bg-white shadow-lg transition-all" style={device === 'mobile' ? { maxWidth: viewportWidth + 8 } : undefined}>
        <SitePreview code={code} onError={setRuntimeError} className="block min-h-96 w-full bg-white" style={{ height: 'calc(100dvh - 240px)' }} />
      </div>
      {runtimeError && <p role="status" className="mx-auto mt-3 w-full max-w-7xl rounded-xl bg-amber-100 p-3 text-sm text-amber-900">JavaScript: {runtimeError}</p>}
    </main>
  )
}

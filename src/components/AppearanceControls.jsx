import { Paintbrush, Maximize2 } from 'lucide-react'
import BoxModelControls from './BoxModelControls'
import ColorPicker from './ColorPicker'

const buttonClass = 'flex min-h-9 flex-1 items-center justify-center rounded-xl border-2 border-purple-200 bg-white px-2.5 text-xs font-bold text-purple-900 shadow-xs transition-all hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40'

export default function AppearanceControls({ element, layout = {}, device, disabled, onAppearanceChange, onUpdateLayout }) {
  const appearance = element.appearance ?? {}
  const hasText = ['heading', 'paragraph', 'button', 'quote', 'list', 'ordered-list', 'input', 'textarea', 'link', 'strong', 'em', 'code', 'span', 'select', 'checkbox', 'table', 'custom'].includes(element.type)
  const change = (property, value) => onAppearanceChange(element.id, property, value)

  return (
    <fieldset disabled={disabled} aria-label="Aparência do elemento" className="mt-4 space-y-4 rounded-2xl border-2 border-purple-200 bg-purple-50/50 p-3.5 shadow-xs disabled:opacity-50">
      <legend className="flex items-center gap-1.5 px-1 text-xs font-black uppercase tracking-wider text-purple-950">
        <Paintbrush aria-hidden="true" size={15} className="text-purple-600" />
        Visual & Estilo
      </legend>

      {/* Cores */}
      <div className="rounded-xl border border-purple-100 bg-white p-3 space-y-3">
        {hasText && <ColorPicker label="Cor do texto" property="color" value={appearance.color} onChange={change} />}
        <ColorPicker label="Cor de fundo" property="backgroundColor" value={appearance.backgroundColor} onChange={change} />
        {element.type === 'image' && <p className="text-[11px] text-slate-500">O fundo aparece se a imagem não preencher todo o bloco.</p>}
      </div>

      {/* Tipografia */}
      {hasText && (
        <div className="rounded-xl border border-purple-100 bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Tamanho do texto</span>
            {appearance.fontSize && (
              <button
                type="button"
                onClick={() => change('fontSize', '')}
                className="text-[10px] font-bold text-purple-700 underline hover:text-purple-900"
              >
                Padrão
              </button>
            )}
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {[
              ['P (16px)', '16px'],
              ['M (24px)', '24px'],
              ['G (36px)', '36px'],
            ].map(([label, size]) => (
              <button
                key={size}
                type="button"
                aria-pressed={appearance.fontSize === size}
                onClick={() => change('fontSize', size)}
                className={`${buttonClass} ${
                  appearance.fontSize === size
                    ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                    : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dimensões do bloco */}
      <div className="rounded-xl border border-purple-100 bg-white p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-purple-950">
            <Maximize2 aria-hidden="true" size={14} className="text-purple-600" />
            Dimensões ({device === 'mobile' ? 'Mobile' : 'Desktop'})
          </h3>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-600">Largura</span>
          <div className="mt-1 flex gap-1.5">
            {[
              ['Natural', 'auto'],
              ['Metade', 'calc(50% - 8px)'],
              ['Toda (100%)', '100%'],
            ].map(([label, width]) => (
              <button
                key={width}
                type="button"
                aria-pressed={layout.width === width}
                onClick={() => onUpdateLayout(element.id, { width })}
                className={`${buttonClass} ${
                  layout.width === width
                    ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                    : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-600">Altura mínima</span>
          <div className="mt-1 flex gap-1.5">
            {[
              ['Natural', '0px'],
              ['Média (160)', '160px'],
              ['Alta (320)', '320px'],
            ].map(([label, minHeight]) => (
              <button
                key={minHeight}
                type="button"
                aria-pressed={layout.minHeight === minHeight && (!layout.height || layout.height === 'auto')}
                onClick={() => onUpdateLayout(element.id, { height: 'auto', minHeight })}
                className={`${buttonClass} ${
                  layout.minHeight === minHeight && (!layout.height || layout.height === 'auto')
                    ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                    : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Espaçamento e Bordas com BoxModelControls */}
      <div className="rounded-xl border border-purple-100 bg-white p-3">
        <BoxModelControls key={element.id} values={appearance} onChange={change} />
      </div>
    </fieldset>
  )
}

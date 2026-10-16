import { useMemo, useState } from 'react'
import { readGlobalStyles } from '../lib/code-engine'
import BoxModelControls, { StyleField } from './BoxModelControls'
import ColorPicker from './ColorPicker'
import { Paintbrush, Type, LayoutGrid } from 'lucide-react'

const fontOptions = [
  ['system-ui, sans-serif', 'Sistema (Moderna & Padrão)'],
  ['ui-rounded, "Aptos", sans-serif', 'Arredondada (Amigável)'],
  ['Georgia, serif', 'Clássica (Serifada)'],
  ['ui-monospace, monospace', 'Código (Monoespaçada)'],
  ['Impact, fantasy', 'Impacto (Marcante)'],
]

export default function GlobalStylesPanel({ code, disabled, onChange }) {
  const [selector, setSelector] = useState('body')
  const values = useMemo(() => readGlobalStyles(code, selector), [code, selector])
  const change = (property, value) => onChange(selector, property, value)

  return (
    <div className="mt-3 space-y-4">
      {/* Alvo do seletor */}
      <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/70 p-3 shadow-xs">
        <span className="block text-xs font-black uppercase tracking-wider text-purple-900">
          Onde aplicar estes estilos?
        </span>
        <div className="mt-2 flex gap-1.5 rounded-xl bg-purple-200/60 p-1">
          <button
            type="button"
            onClick={() => setSelector('body')}
            className={`flex-1 rounded-lg py-1.5 text-xs font-black transition-all ${
              selector === 'body'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Página (body)
          </button>
          <button
            type="button"
            onClick={() => setSelector('*')}
            className={`flex-1 rounded-lg py-1.5 text-xs font-black transition-all ${
              selector === '*'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Todos os blocos (*)
          </button>
        </div>
      </div>

      <fieldset disabled={disabled} className="space-y-4 disabled:opacity-50">
        {/* Cores Globais */}
        <div className="rounded-2xl border-2 border-purple-100 bg-white p-3.5 shadow-xs space-y-3">
          <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-950">
            <Paintbrush size={14} className="text-purple-600" />
            Cores Globais
          </h3>
          <ColorPicker
            label={`Cor de fundo (${selector})`}
            property="backgroundColor"
            value={values.backgroundColor}
            onChange={change}
          />
          <ColorPicker
            label={`Cor do texto (${selector})`}
            property="color"
            value={values.color}
            onChange={change}
          />
        </div>

        {/* Tipografia Global */}
        <div className="rounded-2xl border-2 border-purple-100 bg-white p-3.5 shadow-xs space-y-3">
          <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-950">
            <Type size={14} className="text-purple-600" />
            Tipografia Global
          </h3>
          <StyleField
            property="fontFamily"
            label="Família da fonte"
            value={values.fontFamily}
            onChange={change}
            options={fontOptions}
          />
          <div className="grid grid-cols-2 gap-2">
            <StyleField
              property="fontSize"
              label="Tamanho base do texto"
              value={values.fontSize}
              onChange={change}
              options={[
                ['14px', 'Pequeno (14px)'],
                ['16px', 'Normal (16px)'],
                ['18px', 'Médio (18px)'],
                ['20px', 'Grande (20px)'],
              ]}
            />
            <StyleField
              property="lineHeight"
              label="Espaçamento entre linhas"
              value={values.lineHeight}
              onChange={change}
              options={[
                ['1.2', 'Justo (1.2)'],
                ['1.5', 'Normal (1.5)'],
                ['1.75', 'Amplo (1.75)'],
              ]}
            />
          </div>
        </div>

        {/* Espaçamento e Bordas Globais */}
        <div className="rounded-2xl border-2 border-purple-100 bg-white p-3.5 shadow-xs space-y-3">
          <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-950">
            <LayoutGrid size={14} className="text-purple-600" />
            Espaçamento & Bordas
          </h3>
          <BoxModelControls values={values} onChange={change} />
        </div>
      </fieldset>
    </div>
  )
}

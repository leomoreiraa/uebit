import { useMemo, useState } from 'react'
import { readGlobalStyles } from '../lib/code-engine'
import BoxModelControls, { StyleField } from './BoxModelControls'

export default function GlobalStylesPanel({ code, disabled, onChange }) {
  const [selector, setSelector] = useState('body')
  const values = useMemo(() => readGlobalStyles(code, selector), [code, selector])
  const change = (property, value) => onChange(selector, property, value)
  return <fieldset disabled={disabled} className="mt-3 space-y-4 disabled:opacity-50">
    <legend className="text-sm font-extrabold text-violet-900">Estilos Globais</legend>
    <label className="block text-xs font-bold text-slate-700">Aplicar estilos a
      <select aria-label="Alvo dos estilos globais" value={selector} onChange={(event) => setSelector(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border-2 border-violet-200 bg-white px-2">
        <option value="body">Página inteira (body)</option><option value="*">Todos os elementos (*)</option>
      </select>
    </label>
    <p className="text-xs leading-5 text-slate-500">Valem para desktop e mobile. Estilos específicos dos elementos podem ter prioridade sobre estas regras globais.</p>
    <div key={selector} className="space-y-3">
      {[
        ['backgroundColor', 'Fundo global'], ['color', 'Cor do texto global'], ['fontFamily', 'Fonte global'],
        ['fontSize', 'Tamanho do texto global'], ['lineHeight', 'Altura de linha global'],
      ].map(([property, label]) => <StyleField key={property} property={property} label={label} value={values[property]} onChange={change} />)}
      <StyleField property="boxSizing" label="Cálculo do tamanho" value={values.boxSizing} onChange={change} options={[['border-box', 'Incluir bordas e padding'], ['content-box', 'Somente conteúdo']]} />
      <BoxModelControls values={values} onChange={change} />
    </div>
  </fieldset>
}

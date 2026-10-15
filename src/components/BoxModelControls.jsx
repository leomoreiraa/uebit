import { useState } from 'react'
import { CORNERS, SIDES, validateStyle } from '../lib/styles'

const fieldClass = 'mt-1 min-h-10 w-full min-w-0 rounded-lg border border-violet-200 bg-white px-2 text-sm text-slate-800'

export function StyleField(props) {
  return <StyleFieldInput key={props.value ?? ''} {...props} />
}

function StyleFieldInput({ label, property, value = '', onChange, options }) {
  const [draft, setDraft] = useState(value)
  const [error, setError] = useState('')
  function apply(next) {
    try {
      const trimmed = next.trim()
      validateStyle(property, trimmed)
      onChange(property, trimmed)
      setDraft(trimmed)
      setError('')
    } catch (failure) { setError(failure.message) }
  }
  return <label className="block min-w-0 text-xs font-medium text-slate-700">{label}
    {options ? <select aria-label={label} value={value} onChange={(event) => apply(event.target.value)} className={fieldClass}>
      <option value="">Padrão do CSS</option>
      {value && !options.some(([key]) => key === value) && <option value={value}>{value}</option>}
      {options.map(([key, text]) => <option key={key} value={key}>{text}</option>)}
    </select> : <input aria-label={label} aria-invalid={Boolean(error)} value={draft} placeholder="Padrão do CSS" onChange={(event) => { setDraft(event.target.value); setError('') }} onBlur={() => apply(draft)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); event.currentTarget.blur() } }} className={fieldClass} />}
    {error && <span role="alert" className="mt-1 block text-red-700">{error}</span>}
  </label>
}

const borderStyles = [['none', 'Nenhuma'], ['solid', 'Contínua'], ['dashed', 'Tracejada'], ['dotted', 'Pontilhada'], ['double', 'Dupla'], ['groove', 'Sulco'], ['ridge', 'Relevo'], ['inset', 'Interna'], ['outset', 'Externa'], ['hidden', 'Oculta']]

export default function BoxModelControls({ values, onChange }) {
  const field = (property, label, options) => <StyleField key={property} property={property} label={label} value={values[property]} onChange={onChange} options={options} />
  return <div className="space-y-4">
    <p className="text-xs leading-5 text-slate-500">Use unidades como px, rem ou %. Confirme com Enter ou saia do campo. Apague o valor para restaurar o CSS.</p>
    {[['margin', 'Margem'], ['padding', 'Padding']].map(([prefix, label]) => <fieldset key={prefix}>
      <legend className="mb-2 text-sm font-bold text-violet-900">{label === 'Margem' ? 'Margens · espaço externo' : 'Paddings · espaço interno'}</legend>
      <div className="grid grid-cols-2 gap-2">{SIDES.map(([side, name]) => field(`${prefix}${side}`, `${label} ${name.toLowerCase()}`))}</div>
    </fieldset>)}
    <details className="rounded-xl border border-violet-200 p-2" open>
      <summary className="cursor-pointer text-sm font-bold text-violet-900">Bordas individuais</summary>
      {SIDES.map(([side, name]) => <fieldset key={side} className="mt-3 space-y-2 border-t border-violet-100 pt-2">
        <legend className="text-xs font-bold text-violet-800">{name}</legend>
        {field(`border${side}Style`, `Borda ${name.toLowerCase()} · estilo`, borderStyles)}
        <div className="grid grid-cols-2 gap-2">
          {field(`border${side}Width`, `Borda ${name.toLowerCase()} · largura`)}
          {field(`border${side}Color`, `Borda ${name.toLowerCase()} · cor`)}
        </div>
      </fieldset>)}
    </details>
    <fieldset><legend className="mb-2 text-sm font-bold text-violet-900">Arredondamento dos cantos</legend>
      <div className="grid grid-cols-2 gap-2">{CORNERS.map(([corner, name]) => field(`border${corner}Radius`, `Canto ${name.toLowerCase()}`))}</div>
    </fieldset>
  </div>
}

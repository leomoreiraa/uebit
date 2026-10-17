import { useState } from 'react'
import { CORNERS, normalizeStyleValue, SIDES, validateStyle } from '../lib/styles'

const fieldClass = 'mt-1 min-h-9 w-full min-w-0 rounded-lg border border-purple-200 bg-white px-2 py-1 text-xs text-slate-800'
const chipClass = 'flex-1 min-h-8 rounded-lg border text-xs font-bold transition-all'

export function StyleField({ label, property, value = '', onChange, options }) {
  const [draft, setDraft] = useState(value)
  const [prevValue, setPrevValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState('')

  if (value !== prevValue) {
    setPrevValue(value)
    if (!isFocused) {
      setDraft(value)
      setError('')
    }
  }

  function apply(next) {
    try {
      const normalized = normalizeStyleValue(property, next)
      validateStyle(property, normalized)
      onChange(property, normalized)
      setDraft(normalized)
      setPrevValue(normalized)
      setError('')
    } catch (failure) {
      setError(failure.message)
    }
  }

  return (
    <label className="block min-w-0 text-[11px] font-bold text-slate-700">
      {label}
      {options ? (
        <select
          aria-label={label}
          value={value}
          onChange={(event) => apply(event.target.value)}
          className={fieldClass}
        >
          <option value="">Padrão do CSS</option>
          {value && !options.some(([key]) => key === value) && <option value={value}>{value}</option>}
          {options.map(([key, text]) => (
            <option key={key} value={key}>{text}</option>
          ))}
        </select>
      ) : (
        <input
          aria-label={label}
          aria-invalid={Boolean(error)}
          value={draft}
          placeholder="ex: 16px"
          onFocus={() => setIsFocused(true)}
          onChange={(event) => {
            const val = event.target.value
            setDraft(val)
            setError('')
            try {
              const normalized = normalizeStyleValue(property, val)
              validateStyle(property, normalized)
              onChange(property, normalized)
            } catch {
              /* allow mid-typing */
            }
          }}
          onBlur={() => {
            setIsFocused(false)
            apply(draft)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              event.currentTarget.blur()
            }
          }}
          className={fieldClass}
        />
      )}
      {error && <span role="alert" className="mt-0.5 block text-[10px] text-red-700">{error}</span>}
    </label>
  )
}

const borderStyles = [
  ['none', 'Nenhuma'],
  ['solid', 'Contínua'],
  ['dashed', 'Tracejada'],
  ['dotted', 'Pontilhada'],
  ['double', 'Dupla'],
]

export default function BoxModelControls({ values = {}, onChange }) {
  const currentMargin = values.marginTop || values.margin || ''
  const currentPadding = values.paddingTop || values.padding || ''
  const currentRadius = values.borderTopLeftRadius || ''

  function setAll(prefix, val) {
    const patch = {}
    SIDES.forEach(([side]) => {
      try {
        validateStyle(`${prefix}${side}`, val)
        patch[`${prefix}${side}`] = val
      } catch {
        /* preserve */
      }
    })
    if (Object.keys(patch).length > 0) onChange(patch)
  }

  function setRadiusAll(val) {
    const patch = {}
    CORNERS.forEach(([corner]) => {
      try {
        validateStyle(`border${corner}Radius`, val)
        patch[`border${corner}Radius`] = val
      } catch {
        /* preserve */
      }
    })
    if (Object.keys(patch).length > 0) onChange(patch)
  }

  function setBorderStyleAll(style, width) {
    const patch = {}
    SIDES.forEach(([side]) => {
      if (style !== undefined) patch[`border${side}Style`] = style
      if (width !== undefined) patch[`border${side}Width`] = width
      if (!values[`border${side}Color`]) patch[`border${side}Color`] = '#cbd5e1'
    })
    if (Object.keys(patch).length > 0) onChange(patch)
  }

  function setBorderPropAll(suffix, val) {
    const patch = {}
    SIDES.forEach(([side]) => {
      try {
        validateStyle(`border${side}${suffix}`, val)
        patch[`border${side}${suffix}`] = val
      } catch {
        /* preserve */
      }
    })
    if (Object.keys(patch).length > 0) onChange(patch)
  }

  const field = (property, label, options, customChange = onChange) => (
    <StyleField key={property} property={property} label={label} value={values[property]} onChange={customChange} options={options} />
  )

  return (
    <div className="space-y-3.5">
      {/* Margem rápida */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-950">Margem (espaço fora)</span>
          {currentMargin && (
            <button
              type="button"
              onClick={() => setAll('margin', '')}
              className="text-[10px] font-bold text-purple-700 underline hover:text-purple-900"
            >
              Limpar
            </button>
          )}
        </div>
        <div className="mt-1.5 flex gap-1">
          {[
            ['0px', '0'],
            ['8px', 'P (8)'],
            ['16px', 'M (16)'],
            ['24px', 'G (24)'],
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setAll('margin', val)}
              className={`${chipClass} ${
                currentMargin === val
                  ? 'border-purple-600 bg-purple-600 text-white'
                  : 'border-purple-200 bg-white text-purple-900 hover:bg-purple-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Padding rápido */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-950">Padding (espaço dentro)</span>
          {currentPadding && (
            <button
              type="button"
              onClick={() => setAll('padding', '')}
              className="text-[10px] font-bold text-purple-700 underline hover:text-purple-900"
            >
              Limpar
            </button>
          )}
        </div>
        <div className="mt-1.5 flex gap-1">
          {[
            ['0px', '0'],
            ['8px', 'P (8)'],
            ['16px', 'M (16)'],
            ['24px', 'G (24)'],
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setAll('padding', val)}
              className={`${chipClass} ${
                currentPadding === val
                  ? 'border-purple-600 bg-purple-600 text-white'
                  : 'border-purple-200 bg-white text-purple-900 hover:bg-purple-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cantos arredondados */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-950">Arredondar cantos</span>
          {currentRadius && (
            <button
              type="button"
              onClick={() => setRadiusAll('')}
              className="text-[10px] font-bold text-purple-700 underline hover:text-purple-900"
            >
              Limpar
            </button>
          )}
        </div>
        <div className="mt-1.5 flex gap-1">
          {[
            ['0px', 'Reto'],
            ['8px', 'Leve (8)'],
            ['16px', 'Médio (16)'],
            ['9999px', 'Pílula'],
          ].map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setRadiusAll(val)}
              className={`${chipClass} ${
                currentRadius === val
                  ? 'border-purple-600 bg-purple-600 text-white'
                  : 'border-purple-200 bg-white text-purple-900 hover:bg-purple-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Borda rápida */}
      <div>
        <span className="text-xs font-bold text-purple-950">Estilo de borda</span>
        <div className="mt-1.5 flex gap-1">
          {[
            ['none', '0px', 'Sem'],
            ['solid', '1px', 'Fina'],
            ['solid', '3px', 'Média'],
            ['dashed', '2px', 'Traço'],
          ].map(([style, width, label]) => {
            const isSelected = (values.borderTopStyle || 'none') === style && (values.borderTopWidth || '0px') === width
            return (
              <button
                key={label}
                type="button"
                onClick={() => setBorderStyleAll(style, width)}
                className={`${chipClass} ${
                  isSelected
                    ? 'border-purple-600 bg-purple-600 text-white'
                    : 'border-purple-200 bg-white text-purple-900 hover:bg-purple-50'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Opções avançadas (recolhidas por padrão) */}
      <details className="rounded-xl border border-purple-200 bg-purple-50/40 p-2 text-xs">
        <summary className="cursor-pointer font-bold text-purple-800 hover:text-purple-950">
          Ajustar lados individuais (Avançado)
        </summary>
        <div className="mt-3 space-y-3 pt-2 border-t border-purple-200">
          <fieldset>
            <legend className="mb-1 text-[11px] font-bold text-purple-900">Margens individuais</legend>
            <div className="grid grid-cols-2 gap-1.5">
              {SIDES.map(([side, name]) => field(`margin${side}`, `Margem ${name.toLowerCase()}`))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-1 text-[11px] font-bold text-purple-900">Paddings individuais</legend>
            <div className="grid grid-cols-2 gap-1.5">
              {SIDES.map(([side, name]) => field(`padding${side}`, `Padding ${name.toLowerCase()}`))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-1 text-[11px] font-bold text-purple-900">Bordas detalhadas</legend>
            <div className="grid grid-cols-2 gap-1.5">
              {field('borderTopWidth', 'Largura da borda', undefined, (_, val) => setBorderPropAll('Width', val))}
              {field('borderTopColor', 'Cor da borda', undefined, (_, val) => setBorderPropAll('Color', val))}
            </div>
            <div className="mt-1">
              {field('borderTopStyle', 'Estilo', borderStyles, (_, val) => setBorderPropAll('Style', val))}
            </div>
          </fieldset>
        </div>
      </details>
    </div>
  )
}

import { Paintbrush, Maximize2 } from 'lucide-react'
import BoxModelControls from './BoxModelControls'

const colors = [
  ['Azul', '#2563eb'], ['Roxo', '#9333ea'], ['Verde', '#15803d'], ['Laranja', '#ea580c'],
  ['Rosa', '#db2777'], ['Amarelo', '#facc15'], ['Branco', '#ffffff'], ['Escuro', '#1e293b'],
]
const buttonClass = 'flex min-h-11 items-center justify-center rounded-xl border-2 border-violet-200 bg-white px-3 text-sm font-bold text-violet-800 shadow-sm enabled:hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40'

function ColorPicker({ label, property, value, onChange }) {
  // The browser serializes inline colors as rgb(), even when selected as hex.
  const matches = (hex) => value === hex || value === `rgb(${[1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16)).join(', ')})`
  return <fieldset>
    <legend className="mb-2 text-xs font-bold text-slate-600">{label}</legend>
    <div className="grid grid-cols-4 gap-2">
      {colors.map(([name, hex]) => <button key={hex} type="button" aria-label={`${label}: ${name}`} title={name} aria-pressed={matches(hex)} onClick={() => onChange(property, hex)} className={`grid min-h-11 place-items-center rounded-xl border-2 shadow-sm ${matches(hex) ? 'border-violet-700 ring-2 ring-violet-300' : 'border-slate-200'}`}>
        <span aria-hidden="true" className="size-7 rounded-lg border border-black/15" style={{ backgroundColor: hex }} />
      </button>)}
    </div>
    <button type="button" onClick={() => onChange(property, '')} className="mt-2 min-h-11 w-full rounded-xl bg-violet-100 px-3 text-xs font-bold text-violet-800">Restaurar {label.toLowerCase()}</button>
    <p className="mt-1 text-xs text-slate-500">{!value ? 'Usando o estilo do CSS.' : colors.some(([, hex]) => matches(hex)) ? 'Cor personalizada aplicada.' : 'Cor personalizada no código.'}</p>
  </fieldset>
}

export default function AppearanceControls({ element, layout, device, disabled, onAppearanceChange, onUpdateLayout }) {
  const appearance = element.appearance ?? {}
  const hasText = ['heading', 'paragraph', 'button', 'quote', 'list', 'input', 'custom'].includes(element.type)
  const change = (property, value) => onAppearanceChange(element.id, property, value)
  return <fieldset disabled={disabled} aria-label="Aparência do elemento" className="mt-5 space-y-5 rounded-2xl border-2 border-violet-100 bg-violet-50/50 p-3 disabled:opacity-50">
    <legend className="flex items-center gap-2 px-1 text-sm font-extrabold text-violet-900"><Paintbrush aria-hidden="true" size={18} />Deixe com a sua cara</legend>
    {hasText && <ColorPicker label="Cor do texto" property="color" value={appearance.color} onChange={change} />}
    <ColorPicker label="Cor de fundo" property="backgroundColor" value={appearance.backgroundColor} onChange={change} />
    {element.type === 'image' && <p className="text-xs text-slate-500">O fundo aparece nas áreas que a imagem não preenche.</p>}
    {hasText && <fieldset>
      <legend className="mb-2 text-xs font-bold text-slate-600">Tamanho do texto</legend>
      <div className="grid grid-cols-3 gap-2">{[['P', 16], ['M', 24], ['G', 36]].map(([name, size]) => <button key={name} type="button" aria-label={`Texto ${name} (${size} px)`} aria-pressed={appearance.fontSize === `${size}px`} onClick={() => change('fontSize', `${size}px`)} className={`${buttonClass} ${appearance.fontSize === `${size}px` ? 'ring-2 ring-violet-500' : ''}`}>{name}</button>)}</div>
      <button type="button" onClick={() => change('fontSize', '')} className="mt-2 min-h-11 w-full rounded-xl bg-violet-100 text-xs font-bold text-violet-800">Restaurar tamanho do texto</button>
    </fieldset>}
    <div className="space-y-4 border-t-2 border-violet-100 pt-4">
      <h3 className="flex items-center gap-2 text-sm font-extrabold text-violet-900"><Maximize2 aria-hidden="true" size={18} />Espaço do bloco</h3>
      <p className="text-xs text-slate-600">Ajustando {device === 'mobile' ? 'mobile' : 'desktop'}. O conteúdo flui e cresce naturalmente.</p>
      <div role="group" aria-label="Largura do bloco" className="flex flex-wrap gap-2">{[['Natural', 'auto'], ['Metade', 'calc(50% - 8px)'], ['Toda', '100%']].map(([label, width]) => <button key={width} type="button" aria-label={`Largura: ${label}`} aria-pressed={layout.width === width} onClick={() => onUpdateLayout(element.id, { width })} className={`${buttonClass} ${layout.width === width ? 'ring-2 ring-violet-500' : ''}`}>{label}</button>)}</div>
      <p className="text-xs font-bold text-slate-600">Altura mínima</p>
      <div className="flex flex-wrap gap-2">{[['Natural', '0px'], ['Média', '160px'], ['Grande', '320px']].map(([label, minHeight]) => <button key={minHeight} type="button" aria-label={`Altura: ${label}`} aria-pressed={layout.minHeight === minHeight && (!layout.height || layout.height === 'auto')} onClick={() => onUpdateLayout(element.id, { height: 'auto', minHeight })} className={buttonClass}>{label}</button>)}</div>
    </div>
    <BoxModelControls key={element.id} values={appearance} onChange={change} />
    <p className="text-xs text-slate-500">Cores, texto, margens, paddings e bordas valem para desktop e mobile.</p>
  </fieldset>
}

import { Columns2, Rows2, AlignCenter, ArrowRightLeft } from 'lucide-react'

const buttonClass = 'flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 px-3 py-2 text-xs font-bold shadow-sm'

export default function FlexControls({ element, layout, onUpdateLayout, disabled }) {
  const update = (changes) => onUpdateLayout(element.id, changes)
  const choices = (key, items) => <div className="flex flex-wrap gap-2">{items.map(([value, label]) => <button type="button" key={value} aria-pressed={layout[key] === value} onClick={() => update({ [key]: value })} className={`${buttonClass} ${layout[key] === value ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-emerald-200 bg-white text-emerald-900'}`}>{label}</button>)}</div>
  return <fieldset disabled={disabled} className="mt-5 space-y-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 disabled:opacity-50">
    <legend className="px-1 text-sm font-extrabold text-emerald-900">Organizar dentro do container</legend>
    {choices('direction', [['row', <><Columns2 aria-hidden="true" size={18} />Lado a lado</>], ['column', <><Rows2 aria-hidden="true" size={18} />Empilhado</>]])}
    <button type="button" onClick={() => update({ justify: 'center', align: 'center' })} className={`${buttonClass} w-full border-emerald-600 bg-emerald-600 text-white`}><AlignCenter aria-hidden="true" size={18} />Centralizar tudo</button>
    <p className="text-xs font-bold text-emerald-900">Na direção escolhida</p>
    {choices('justify', [['flex-start', 'No começo'], ['center', 'No centro'], ['flex-end', 'No final'], ['space-between', 'Espalhar']])}
    <p className="text-xs font-bold text-emerald-900">Na outra direção</p>
    {choices('align', [['stretch', 'Esticar'], ['flex-start', 'Alinhar no começo'], ['center', 'Alinhar no centro'], ['flex-end', 'Alinhar no final']])}
    <p className="flex items-center gap-2 text-xs font-bold text-emerald-900"><ArrowRightLeft aria-hidden="true" size={16} />Espaço entre os blocos</p>
    {choices('gap', [['0px', 'Juntinhos'], ['16px', 'Um espaço'], ['32px', 'Bem separados']])}
    <p className="text-xs leading-5 text-emerald-900">Arraste blocos para dentro. Se faltar espaço lado a lado, eles passam para a próxima linha.</p>
  </fieldset>
}

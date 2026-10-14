import { useDraggable } from '@dnd-kit/core'
import { elementTypes } from '../data/elements'
import { Heading1, Image, MousePointer2, Text, Lightbulb, Shapes, PanelsTopLeft } from 'lucide-react'

const categories = [
  { name: 'Texto', types: ['heading', 'paragraph'], color: 'text-blue-700', card: 'border-blue-400 bg-blue-500 hover:bg-blue-600', icon: 'bg-blue-700/40' },
  { name: 'Imagens', types: ['image'], color: 'text-purple-700', card: 'border-purple-400 bg-purple-500 hover:bg-purple-600', icon: 'bg-purple-700/40' },
  { name: 'Ações', types: ['button'], color: 'text-orange-700', card: 'border-orange-400 bg-orange-500 hover:bg-orange-600', icon: 'bg-orange-700/40' },
  { name: 'Organização', types: ['container'], color: 'text-emerald-700', card: 'border-emerald-400 bg-emerald-600 hover:bg-emerald-700', icon: 'bg-emerald-800/40' },
]
const icons = { heading: Heading1, paragraph: Text, image: Image, button: MousePointer2, container: PanelsTopLeft }

function ElementCard({ element, category, disabled, onAddElement }) {
  const Icon = icons[element.type]
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${element.type}`,
    data: { type: element.type },
    disabled,
  })

  return (
    <button
      ref={setNodeRef}
      type="button"
      {...attributes}
      {...listeners}
      disabled={disabled}
      onClick={() => onAddElement(element.type)}
      aria-label={`Adicionar ${element.name.toLowerCase()}`}
      title={disabled ? 'Volte ao modo Visual para adicionar elementos' : 'Arraste para a página ou clique para adicionar'}
      className={`flex w-full touch-none select-none items-center gap-3 rounded-2xl border-2 border-b-4 p-3 text-left text-white shadow-sm transition-colors enabled:cursor-grab disabled:cursor-not-allowed disabled:opacity-50 ${category.card} ${isDragging ? 'opacity-50' : ''}`}
    >
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${category.icon}`}><Icon aria-hidden="true" size={24} /></span>
      <span>
        <span className="block text-sm font-extrabold">{element.name}</span>
        <span className="mt-0.5 block text-xs text-white">{element.description}</span>
        <code className="mt-1 inline-block rounded-lg bg-black/15 px-2 py-0.5 text-xs text-white">{element.tag}</code>
      </span>
    </button>
  )
}

export default function Sidebar({ disabled, onAddElement }) {
  return (
    <aside aria-labelledby="elements-heading" className="flex min-w-0 flex-col rounded-2xl border-2 border-violet-100 bg-white p-4 shadow-sm md:sticky md:top-3 md:max-h-[calc(100dvh-8rem)] md:overflow-y-auto">
      <h2 id="elements-heading" className="flex items-center gap-2 text-base font-extrabold text-violet-900"><Shapes aria-hidden="true" size={22} />Paleta de elementos</h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">Arraste ou clique para adicionar.</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-3 md:grid-cols-1">
        {categories.map((category) => <section key={category.name} aria-label={category.name}>
          <h3 className={`mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide ${category.color}`}><span aria-hidden="true" className="size-2.5 rounded-full bg-current" />{category.name}</h3>
          <ul className="grid gap-3">{elementTypes.filter((element) => category.types.includes(element.type)).map((element) => <li key={element.type}><ElementCard element={element} category={category} disabled={disabled} onAddElement={onAddElement} /></li>)}</ul>
        </section>)}
      </div>
      <div className="pt-6 md:mt-auto">
        <div className="rounded-2xl border-2 border-amber-100 bg-amber-50 p-4">
          <Lightbulb aria-hidden="true" className="mb-2 text-amber-600" size={24} />
          <p className="text-sm font-bold text-amber-950">Uma ideia, um bloco de cada vez.</p>
          <p className="mt-2 text-xs leading-5 text-indigo-800">{disabled ? 'Volte ao modo Visual para montar sua página.' : 'Arraste para ordenar. Solte no centro de um container para colocar dentro dele. Ao clicar na paleta, o bloco entra no container selecionado.'}</p>
        </div>
      </div>
    </aside>
  )
}

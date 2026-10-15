import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { elementTypes } from '../data/elements'
import {
  Heading1,
  Image,
  MousePointer2,
  Text,
  Shapes,
  PanelsTopLeft,
  Quote,
  List,
  Video,
  Music,
  TextCursorInput,
  Minus,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'

const categories = [
  {
    id: 'text',
    name: 'Texto',
    types: ['heading', 'paragraph', 'quote', 'list'],
    color: 'text-blue-900',
    headerHover: 'hover:bg-blue-100/60',
    sectionBorder: 'border-2 border-blue-200 bg-blue-50/60',
    dotColor: 'bg-blue-600',
    card: 'border-2 border-b-4 border-blue-600 bg-blue-500 hover:bg-blue-400',
    icon: 'bg-blue-700/50',
  },
  {
    id: 'media',
    name: 'Mídia',
    types: ['image', 'video', 'audio'],
    color: 'text-purple-900',
    headerHover: 'hover:bg-purple-100/60',
    sectionBorder: 'border-2 border-purple-200 bg-purple-50/60',
    dotColor: 'bg-purple-600',
    card: 'border-2 border-b-4 border-purple-800 bg-purple-700 hover:bg-purple-600',
    icon: 'bg-purple-900/50',
  },
  {
    id: 'interaction',
    name: 'Interação',
    types: ['button', 'input'],
    color: 'text-orange-900',
    headerHover: 'hover:bg-orange-100/60',
    sectionBorder: 'border-2 border-orange-200 bg-orange-50/60',
    dotColor: 'bg-orange-600',
    card: 'border-2 border-b-4 border-orange-600 bg-orange-500 hover:bg-orange-400',
    icon: 'bg-orange-700/50',
  },
  {
    id: 'structure',
    name: 'Estrutura',
    types: ['container', 'section', 'divider'],
    color: 'text-emerald-900',
    headerHover: 'hover:bg-emerald-100/60',
    sectionBorder: 'border-2 border-emerald-200 bg-emerald-50/60',
    dotColor: 'bg-emerald-600',
    card: 'border-2 border-b-4 border-emerald-700 bg-emerald-600 hover:bg-emerald-500',
    icon: 'bg-emerald-800/50',
  },
]

const icons = {
  heading: Heading1,
  paragraph: Text,
  quote: Quote,
  list: List,
  image: Image,
  video: Video,
  audio: Music,
  button: MousePointer2,
  input: TextCursorInput,
  container: PanelsTopLeft,
  section: PanelsTopLeft,
  divider: Minus,
}

function ElementCard({ element, category, disabled, onAddElement }) {
  const Icon = icons[element.type] ?? Shapes
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
      title={disabled ? 'Resolva o rascunho inválido para adicionar elementos' : 'Arraste para a página ou clique para adicionar'}
      className={`group flex w-full touch-none select-none items-center gap-2.5 rounded-xl p-2 text-left text-white shadow-xs transition-all enabled:cursor-grab enabled:hover:scale-102 active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${category.card} ${isDragging ? 'opacity-50' : ''}`}
    >
      <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${category.icon}`}>
        <Icon aria-hidden="true" size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-1">
          <span className="block text-xs font-black truncate leading-snug">{element.name}</span>
        </span>
        <span className="block text-[11px] text-white/90 truncate leading-tight font-medium">{element.description}</span>
      </span>
    </button>
  )
}

export default function Sidebar({ disabled, onAddElement }) {
  const [collapsed, setCollapsed] = useState({})

  const toggleSection = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside
      aria-labelledby="elements-heading"
      className="flex min-w-0 flex-col rounded-3xl border-2 border-purple-200 bg-white p-3.5 shadow-sm md:sticky md:top-3 md:max-h-[calc(100dvh-1.5rem)] md:overflow-y-auto md:overscroll-y-contain"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id="elements-heading" className="flex items-center gap-2 text-base font-black text-purple-900">
          <span className="grid size-7 place-items-center rounded-xl bg-purple-100 text-purple-700 shadow-xs">
            <Shapes aria-hidden="true" size={18} />
          </span>
          Paleta de elementos
        </h2>
      </div>
      <p className="mt-1 text-xs font-medium text-slate-500">Arraste ou clique para adicionar à página.</p>

      {/* Conjuntos de elementos coloridos */}
      <div className="mt-3 space-y-3">
        {categories.map((category) => {
          const isCollapsed = Boolean(collapsed[category.id])
          const items = elementTypes.filter((element) => category.types.includes(element.type))

          return (
            <section key={category.id} aria-label={category.name} className={`rounded-2xl p-2.5 transition-colors ${category.sectionBorder}`}>
              <button
                type="button"
                onClick={() => toggleSection(category.id)}
                aria-expanded={!isCollapsed}
                className={`flex w-full items-center justify-between rounded-xl px-1.5 py-1 text-left transition-colors ${category.headerHover}`}
              >
                <span className={`flex items-center gap-2 text-xs font-black uppercase tracking-wide ${category.color}`}>
                  <span aria-hidden="true" className={`size-2.5 rounded-full ${category.dotColor}`} />
                  {category.name}
                </span>
                <span className={category.color}>
                  {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {!isCollapsed && (
                <div className="mt-2 space-y-2">
                  {items.map((element) => (
                    <ElementCard
                      key={element.type}
                      element={element}
                      category={category}
                      disabled={disabled}
                      onAddElement={onAddElement}
                    />
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </aside>
  )
}

import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { elementTypes } from '../data/elements'
import { ChevronDown, ChevronRight } from 'lucide-react'
import BrandIcon, { Boxes as Shapes } from './BrandIcon'

// O esquema de 4 cores clássico: Amarelo (Texto), Roxo (Mídia), Vermelho (Interação) e Verde (Estrutura)
const categories = [
  {
    id: 'text',
    name: 'Texto',
    types: ['heading', 'paragraph', 'break', 'link', 'strong', 'em', 'code', 'span', 'quote', 'list', 'ordered-list'],
    color: 'text-amber-950',
    headerHover: 'hover:bg-amber-100/80',
    sectionBorder: 'border-2 border-amber-200 bg-amber-50/70',
    dotColor: 'bg-amber-500',
    card: 'border-2 border-b-4 border-amber-600 bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs',
    icon: 'bg-amber-600/70 text-slate-950',
  },
  {
    id: 'media',
    name: 'Mídia',
    types: ['image', 'video', 'audio', 'iframe'],
    color: 'text-purple-950',
    headerHover: 'hover:bg-purple-100/80',
    sectionBorder: 'border-2 border-purple-200 bg-purple-50/70',
    dotColor: 'bg-purple-600',
    card: 'border-2 border-b-4 border-purple-800 bg-purple-600 hover:bg-purple-500 text-white shadow-xs',
    icon: 'bg-purple-800/70 text-white',
  },
  {
    id: 'interaction',
    name: 'Interação & Formulários',
    types: ['button', 'input', 'textarea', 'select', 'checkbox', 'form'],
    color: 'text-rose-950',
    headerHover: 'hover:bg-rose-100/80',
    sectionBorder: 'border-2 border-rose-200 bg-rose-50/70',
    dotColor: 'bg-rose-500',
    card: 'border-2 border-b-4 border-rose-700 bg-rose-500 hover:bg-rose-400 text-white shadow-xs',
    icon: 'bg-rose-700/70 text-white',
  },
  {
    id: 'structure',
    name: 'Estrutura & Semântica',
    types: ['container', 'section', 'header', 'footer', 'nav', 'article', 'aside', 'table', 'divider'],
    color: 'text-emerald-950',
    headerHover: 'hover:bg-emerald-100/80',
    sectionBorder: 'border-2 border-emerald-200 bg-emerald-50/70',
    dotColor: 'bg-emerald-600',
    card: 'border-2 border-b-4 border-emerald-700 bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs',
    icon: 'bg-emerald-800/70 text-white',
  },
]

function ElementCard({ element, category, disabled, onAddElement }) {
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
      className={`group flex w-full touch-none select-none items-center gap-2.5 rounded-2xl p-2 text-left shadow-xs transition-colors enabled:cursor-grab enabled:hover:brightness-105 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 ${category.card} ${isDragging ? 'opacity-40' : ''}`}
    >
      <span className={`grid size-8 shrink-0 place-items-center rounded-xl ${category.icon} shadow-xs`}>
        <BrandIcon name={element.type} size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-1.5">
          <span className="block text-xs font-black truncate leading-snug">{element.name}</span>
          {element.tag && (
            <span className="shrink-0 rounded-md bg-black/15 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-tight opacity-90">
              {element.tag}
            </span>
          )}
        </span>
        <span className="block text-[11px] opacity-90 truncate leading-tight font-semibold">{element.description}</span>
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
      className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border-2 border-purple-200 bg-white p-3.5 shadow-sm"
    >
      <div className="flex shrink-0 items-center justify-between gap-2">
        <h2 id="elements-heading" className="flex items-center gap-2 text-base font-black text-slate-900">
          <span className="grid size-8 place-items-center rounded-xl bg-purple-100 text-purple-700 shadow-xs">
            <Shapes aria-hidden="true" size={18} />
          </span>
          <span>Paleta de elementos</span>
        </h2>
      </div>
      <p className="mt-1 shrink-0 text-xs font-medium text-slate-500">Arraste ou clique para adicionar à página.</p>

      {/* Conjuntos de elementos coloridos nas 4 cores */}
      <div className="mt-3 flex-1 min-h-0 space-y-3 overflow-y-auto overscroll-contain pr-1">
        {categories.map((category) => {
          const isCollapsed = Boolean(collapsed[category.id])
          const items = elementTypes.filter((element) => category.types.includes(element.type))

          return (
            <section key={category.id} aria-label={category.name} className={`rounded-2xl p-2.5 transition-colors ${category.sectionBorder}`}>
              <button
                type="button"
                onClick={() => toggleSection(category.id)}
                aria-expanded={!isCollapsed}
                className={`flex w-full items-center justify-between rounded-xl px-2 py-1 text-left transition-colors ${category.headerHover}`}
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

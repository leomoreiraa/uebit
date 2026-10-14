import { MousePointer2, SlidersHorizontal } from 'lucide-react'
import ElementInspector from './ElementInspector'
import AppearanceControls from './AppearanceControls'
import FlexControls from './FlexControls'
import { findNode, flattenTree } from '../lib/tree'
import { elementTypes } from '../data/elements'

export default function PropertiesPanel({ selected, elements, onSelect, onMoveElement, onUpdateElement, onRemoveElement, disabled, view, device, layout, onAppearanceChange, onUpdateLayout }) {
  const flat = flattenTree(elements)
  const parent = findNode(elements, selected?.parentId)
  const siblings = parent?.children ?? elements
  return (
    <aside aria-labelledby="properties-heading" className="min-w-0 rounded-2xl border-2 border-violet-100 bg-white p-4 shadow-sm md:col-start-2 xl:col-start-auto">
      <h2 id="properties-heading" className="flex items-center gap-2 text-base font-extrabold text-violet-900"><SlidersHorizontal aria-hidden="true" size={22} />Propriedades</h2>
      <p className="mt-1 text-sm text-slate-500">Dê seu toque a cada elemento.</p>
      {view === 'visual' && flat.length > 0 && <nav aria-label="Estrutura da página" className="mt-4 max-h-64 overflow-auto rounded-xl border-2 border-violet-100 p-2">
        <p className="mb-2 text-xs font-bold text-violet-900">Sua página por dentro</p>
        {flat.map((node, index) => <button key={node.id} type="button" data-tree-id={node.id} aria-label={`Selecionar ${elementTypes.find((type) => type.type === node.type)?.name ?? 'bloco'} ${index + 1}`} aria-pressed={selected?.id === node.id} onClick={() => onSelect(node.id)} className={`block min-h-11 w-full rounded-xl py-2 pr-2 text-left text-xs font-bold ${selected?.id === node.id ? 'bg-violet-100 text-violet-900' : 'text-slate-600 hover:bg-violet-50'}`} style={{ paddingLeft: 8 + node.depth * 16 }}>{node.type === 'container' ? '□ Container' : (node.text || node.alt || node.type).slice(0, 32)}</button>)}
      </nav>}
      {selected && view === 'visual' ? <>
        <fieldset disabled={disabled} className="mt-3 flex flex-wrap gap-2">
          <button type="button" disabled={selected.index === 0} onClick={() => onMoveElement(selected.id, selected.parentId, selected.index - 1)} className="min-h-11 rounded-xl bg-violet-100 px-3 text-xs font-bold disabled:opacity-40">Mover antes</button>
          <button type="button" disabled={selected.index === siblings.length - 1} onClick={() => onMoveElement(selected.id, selected.parentId, selected.index + 2)} className="min-h-11 rounded-xl bg-violet-100 px-3 text-xs font-bold disabled:opacity-40">Mover depois</button>
          {parent && <button type="button" onClick={() => onMoveElement(selected.id, parent.parentId, parent.index + 1)} className="min-h-11 rounded-xl bg-emerald-100 px-3 text-xs font-bold">Sair do container</button>}
        </fieldset>
        {selected.type === 'container' && <FlexControls element={selected} layout={layout} disabled={disabled} onUpdateLayout={onUpdateLayout} />}
        <AppearanceControls element={selected} layout={layout} device={device} disabled={disabled} onAppearanceChange={onAppearanceChange} onUpdateLayout={onUpdateLayout} />
        <ElementInspector key={selected.id} element={selected} elements={flat} onUpdate={onUpdateElement} onRemove={onRemoveElement} disabled={disabled} />
      </> : (
        <div className="mt-5 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50 p-5 text-center">
          <span className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-violet-200 text-violet-700"><MousePointer2 aria-hidden="true" size={28} /></span>
          <h3 className="text-sm font-bold text-violet-900">{view === 'visual' ? 'Qual bloco vamos editar?' : 'Explore seu código'}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{view === 'visual' ? 'Clique em um elemento da página. Seus textos, imagens e ações aparecem aqui.' : 'Edite HTML, CSS e JavaScript. Volte ao Visual para selecionar um elemento.'}</p>
        </div>
      )}
    </aside>
  )
}

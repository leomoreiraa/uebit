import {
  MousePointer2,
  SlidersHorizontal,
  Paintbrush,
  Layers,
} from 'lucide-react'
import ElementInspector from './ElementInspector'
import AppearanceControls from './AppearanceControls'
import FlexControls from './FlexControls'
import GlobalStylesPanel from './GlobalStylesPanel'
import { findNode, flattenTree } from '../lib/tree'
import { elementTypes } from '../data/elements'

export default function PropertiesPanel({
  activeTab,
  onTabChange,
  selected,
  elements,
  onSelect,
  onMoveElement,
  onUpdateElement,
  onRemoveElement,
  disabled,
  view,
  device,
  layout,
  onAppearanceChange,
  onGlobalStyleChange,
  onUpdateLayout,
  code,
}) {
  const flat = flattenTree(elements)
  const parent = findNode(elements, selected?.parentId)
  const siblings = parent?.children ?? elements

  const tabs = [
    { id: 'global', label: 'Estilos Globais', icon: Paintbrush },
    { id: 'styles', label: 'Estilos', icon: SlidersHorizontal, badge: flat.length > 0 ? `${flat.length}` : null },
  ]

  return (
    <aside
      aria-labelledby="panel-tab-heading"
      className="flex w-full min-w-0 max-w-full flex-col overflow-x-hidden rounded-3xl border-2 border-purple-200 bg-white p-3 shadow-sm md:col-start-2 xl:col-start-auto xl:sticky xl:top-3 xl:max-h-[calc(100dvh-6rem)] xl:overflow-y-auto"
    >
      {/* Tab Navigation */}
      <div
        role="tablist"
        aria-label="Abas de propriedades"
        className="flex flex-wrap items-center gap-1 rounded-2xl bg-purple-50 p-1 border-2 border-purple-200 shadow-xs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-black transition-all ${
                isActive
                  ? 'border-2 border-purple-300 bg-purple-600 text-white shadow-xs'
                  : 'text-purple-800 hover:bg-purple-100 hover:text-purple-950'
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`hidden sm:inline-block rounded-md px-1.5 py-0.5 text-[10px] font-black ${
                    isActive ? 'bg-purple-800 text-amber-300' : 'bg-purple-200 text-purple-900'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Heading for Screen Readers */}
      <h2 id="panel-tab-heading" className="sr-only">
        {activeTab === 'global' ? 'Estilos Globais' : 'Painel de Estilos e Propriedades'}
      </h2>

      {activeTab === 'global' && <div id="panel-global" role="tabpanel" aria-labelledby="tab-global">
        <GlobalStylesPanel code={code} disabled={disabled} onChange={onGlobalStyleChange} />
      </div>}

      {/* Tab 1: Estilos / Propriedades */}
      {activeTab === 'styles' && (
        <div id="panel-styles" role="tabpanel" aria-labelledby="tab-styles" className="mt-3">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-violet-800">
              <Paintbrush size={15} aria-hidden="true" />
              Estilos & Elementos
            </span>
            <span className="text-xs text-slate-500">
              {selected ? 'Elemento selecionado' : 'Nenhum selecionado'}
            </span>
          </div>

          {/* Tree Structure */}
          {view === 'visual' && flat.length > 0 && (
            <nav aria-label="Estrutura da página" className="mt-3 max-h-52 overflow-auto rounded-xl border-2 border-violet-100 bg-slate-50/50 p-2">
              <p className="mb-1.5 flex items-center gap-1 text-[11px] font-extrabold uppercase text-violet-900">
                <Layers size={13} aria-hidden="true" />
                Sua página por dentro
              </p>
              {flat.map((node, index) => {
                const typeName = elementTypes.find((type) => type.type === node.type)?.name ?? 'bloco'
                const label = node.name
                  ? `${node.type === 'container' ? '□ ' : ''}${node.name}`
                  : node.type === 'container'
                    ? '□ Container'
                    : (node.text || node.alt || node.type).slice(0, 28)
                const isCurrent = selected?.id === node.id
                return (
                  <button
                    key={node.id}
                    type="button"
                    data-tree-id={node.id}
                    aria-label={`Selecionar ${typeName} ${index + 1}`}
                    aria-pressed={isCurrent}
                    onClick={() => onSelect(node.id)}
                    className={`block min-h-10 w-full rounded-xl py-1.5 pr-2 text-left text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'border border-violet-300 bg-violet-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-violet-100'
                    }`}
                    style={{ paddingLeft: 8 + node.depth * 14 }}
                  >
                    <span>{label}</span>
                    {node.htmlId && (
                      <span className={`ml-1 text-[10px] font-mono ${isCurrent ? 'text-amber-300' : 'text-violet-600'}`}>
                        #{node.htmlId}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          )}

          {/* Selected element inspector and controls */}
          {selected && view === 'visual' ? (
            <>
              <ElementInspector
                element={selected}
                elements={flat}
                onUpdate={onUpdateElement}
                onRemove={onRemoveElement}
                disabled={disabled}
              />
              {selected.type === 'container' && (
                <FlexControls
                  element={selected}
                  layout={layout}
                  disabled={disabled}
                  onUpdateLayout={onUpdateLayout}
                />
              )}
              <AppearanceControls
                element={selected}
                layout={layout}
                device={device}
                disabled={disabled}
                onAppearanceChange={onAppearanceChange}
                onUpdateLayout={onUpdateLayout}
              />
              <fieldset disabled={disabled} className="mt-4 flex flex-wrap gap-2 border-t-2 border-violet-100 pt-3">
                <p className="w-full text-xs font-bold text-violet-900">Posição no container</p>
                <button
                  type="button"
                  disabled={selected.index === 0}
                  onClick={() => onMoveElement(selected.id, selected.parentId, selected.index - 1)}
                  className="min-h-10 flex-1 rounded-xl bg-violet-100 px-3 text-xs font-bold text-violet-800 disabled:opacity-40 hover:bg-violet-200"
                >
                  Mover antes
                </button>
                <button
                  type="button"
                  disabled={selected.index === siblings.length - 1}
                  onClick={() => onMoveElement(selected.id, selected.parentId, selected.index + 2)}
                  className="min-h-10 flex-1 rounded-xl bg-violet-100 px-3 text-xs font-bold text-violet-800 disabled:opacity-40 hover:bg-violet-200"
                >
                  Mover depois
                </button>
                {parent && (
                  <button
                    type="button"
                    onClick={() => onMoveElement(selected.id, parent.parentId, parent.index + 1)}
                    className="min-h-10 w-full rounded-xl bg-emerald-100 px-3 text-xs font-bold text-emerald-900 hover:bg-emerald-200"
                  >
                    Sair do container
                  </button>
                )}
              </fieldset>
            </>
          ) : (
            <div className="mt-5 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/70 p-5 text-center">
              <span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-violet-200 text-violet-700">
                <MousePointer2 aria-hidden="true" size={24} />
              </span>
              <h3 className="text-sm font-extrabold text-violet-900">
                {view === 'visual' ? 'Qual bloco vamos estilizar?' : 'Explore seu código'}
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                {view === 'visual'
                  ? 'Clique em qualquer bloco na página para personalizar suas cores, textos, IDs e o layout Flexbox!'
                  : 'Volte ao Design Visual para selecionar e personalizar os elementos.'}
              </p>
            </div>
          )}
        </div>
      )}

    </aside>
  )
}

import { useMemo, useState } from 'react'
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, closestCenter, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { createElement, elementTypes } from './data/elements'
import { DESKTOP_WIDTH } from './lib/responsive'
import { activeTree, findNode, flattenTree, insertNode, mapTree, mobileLayout, moveNode, removeNode } from './lib/tree'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Workspace from './components/Workspace'
import PropertiesPanel from './components/PropertiesPanel'
import Stage from './components/Stage'
import { applyBlockCode } from './lib/block-code'
import { buildBlockTargets } from './lib/block-targets'
import { createInitialCode, identifyCodeElements, readCode, updateElementAppearance, updateElementContent, writeVisualCode } from './lib/code-engine'

export default function App() {
  const [view, setView] = useState('visual')
  const [stageOpen, setStageOpen] = useState(false)
  const [blockProject, setBlockProject] = useState({ workspace: undefined, generated: '', applied: '', appliedGenerated: '' })
  const [elements, setElements] = useState([])
  const blockTargets = useMemo(() => buildBlockTargets(elements), [elements])
  const [code, setCode] = useState(createInitialCode)
  const [draft, setDraft] = useState(createInitialCode)
  const [codeError, setCodeError] = useState('')
  const [exporting, setExporting] = useState(false)
  const [exportMessage, setExportMessage] = useState('')
  const [exportError, setExportError] = useState('')
  const [draggedType, setDraggedType] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [dropPreview, setDropPreview] = useState(null)
  const [message, setMessage] = useState('')
  const [device, setDevice] = useState('desktop')
  const [mobileWidth, setMobileWidth] = useState(390)
  const viewportWidth = device === 'desktop' ? DESKTOP_WIDTH : mobileWidth
  const visibleElements = activeTree(elements, device)
  const selectedElement = findNode(elements, selectedId)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))
  const draggedElement = elementTypes.find((element) => element.type === draggedType)

  function acceptCode(next) {
    setElements(readCode(next)); setCode(next); setDraft(next)
  }
  function commitElements(updater) {
    if (codeError) return
    acceptCode(writeVisualCode(code, updater(elements)))
  }
  function editCode(language, value) {
    const next = { ...draft, [language]: value }
    setDraft(next)
    try { setElements(readCode(next)); setCode(next); setCodeError('') }
    catch (error) { setCodeError(error.name === 'CssSyntaxError' ? `CSS, linha ${error.line}: ${error.reason}.` : error.message) }
  }
  function updateContent(id, content) {
    if (codeError) return
    acceptCode(updateElementContent(code, id, content))
    setMessage('Conteúdo atualizado.')
  }
  function updateAppearance(id, property, value) {
    if (codeError) return
    acceptCode(updateElementAppearance(code, id, property, value))
  }
  function applyBlocks() {
    if (codeError) return
    const result = applyBlockCode(draft.js, blockProject.generated, blockProject.applied)
    acceptCode(identifyCodeElements({ ...draft, js: result.js }))
    setBlockProject((current) => ({ ...current, applied: result.applied, appliedGenerated: current.generated }))
  }
  function removeElement(id) {
    commitElements((current) => removeNode(current, id)); setSelectedId(null)
    setMessage('Elemento e seu conteúdo removidos.')
  }
  async function exportSite() {
    if (exporting || codeError) return
    setExporting(true); setExportMessage(''); setExportError('')
    try {
      const { downloadSite } = await import('./lib/export-site')
      await downloadSite(code)
      setExportMessage('Site exportado em meu-site.zip: index.html, style.css e script.js.')
    } catch (error) { setExportError(error.message || 'Não foi possível exportar o site.') }
    finally { setExporting(false) }
  }
  function addElement(type, destination) {
    if (view !== 'visual' || codeError) return
    const element = createElement(type)
    if (!element) return
    const parentId = destination ? destination.parentId : selectedElement?.type === 'container' ? selectedId : null
    commitElements((current) => insertNode(current, element, parentId, destination?.index ?? Infinity))
    setSelectedId(element.id); setMessage(parentId ? 'Bloco adicionado dentro do container.' : 'Bloco adicionado à página.')
  }
  function updateLayout(id, changes) {
    commitElements((current) => mapTree(current, (node) => node.id !== id ? node : device === 'desktop'
      ? { ...node, layout: { ...node.layout, ...changes } }
      : { ...node, mobileLayout: { ...mobileLayout(node), ...changes }, mobileCustomized: true }))
  }
  function moveElement(id, parentId, index) {
    commitElements((current) => moveNode(current, id, parentId, index))
    setMessage('Ordem e agrupamento atualizados.')
  }
  function collisionDetection(args) {
    const id = args.active.data.current?.elementId
    const source = findNode(elements, id)
    const excluded = new Set(source ? [id, ...flattenTree(source.children).map((node) => node.id)] : [])
    const valid = { ...args, droppableContainers: args.droppableContainers.filter((container) => !excluded.has(container.id)) }
    const hits = args.pointerCoordinates ? pointerWithin(valid) : closestCenter(valid)
    return args.pointerCoordinates ? hits.sort((a, b) => (findNode(elements, b.id)?.depth ?? -1) - (findNode(elements, a.id)?.depth ?? -1)) : hits
  }
  function destinationFor(event) {
    const { over, active, activatorEvent, delta } = event
    if (!over) return null
    if (over.id === 'canvas') return { parentId: null, index: elements.length, overId: 'canvas', mode: 'inside' }
    const target = findNode(visibleElements, over.id)
    if (!target) return null
    const point = 'clientX' in activatorEvent ? { x: activatorEvent.clientX + delta.x, y: activatorEvent.clientY + delta.y } : { x: over.rect.left + over.rect.width / 2, y: over.rect.top + over.rect.height / 2 }
    const parent = findNode(visibleElements, target.parentId)
    const horizontal = parent?.layout.direction.startsWith('row')
    const ratio = horizontal ? (point.x - over.rect.left) / Math.max(over.rect.width, 1) : (point.y - over.rect.top) / Math.max(over.rect.height, 1)
    if (target.type === 'container' && ratio > 0.2 && ratio < 0.8) return { parentId: target.id, index: target.children.length, overId: target.id, mode: 'inside' }
    const after = ratio > 0.5
    const source = findNode(elements, active.data.current?.elementId)
    if (source && (target.id === source.id || findNode(source.children, target.id))) return null
    return { parentId: target.parentId, index: target.index + (after ? 1 : 0), overId: target.id, mode: after ? 'after' : 'before', horizontal }
  }
  function handleDragEnd(event) {
    const destination = destinationFor(event)
    setDraggedType(null); setDropPreview(null)
    if (!destination || codeError) return
    const id = event.active.data.current?.elementId
    if (id) moveElement(id, destination.parentId, destination.index)
    else addElement(event.active.data.current?.type, destination)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={collisionDetection}
      onDragStart={({ active }) => { setDraggedType(active.data.current?.type); if (active.data.current?.elementId) setSelectedId(active.data.current.elementId) }}
      onDragMove={(event) => setDropPreview(destinationFor(event))} onDragOver={(event) => setDropPreview(destinationFor(event))}
      onDragEnd={handleDragEnd} onDragCancel={() => { setDraggedType(null); setDropPreview(null) }}
      accessibility={{ screenReaderInstructions: { draggable: 'Pressione Enter na paleta para adicionar. Nos controles Mover, use Espaço, setas e Espaço para soltar; Escape cancela.' }, announcements: {
        onDragStart: () => 'Arraste para reordenar ou colocar dentro de um container.',
        onDragOver: ({ over }) => over ? 'Destino disponível.' : 'Fora da página.',
        onDragEnd: ({ over }) => over ? 'Movimento concluído.' : 'Movimento cancelado.', onDragCancel: () => 'Movimento cancelado.',
      } }}>
      <div className="flex min-h-dvh flex-col">
        <Header view={view} onViewChange={setView} onExport={exportSite} exporting={exporting} exportDisabled={Boolean(codeError)} stageOpen={stageOpen} onToggleStage={() => setStageOpen((current) => !current)} />
        {exportMessage && <p role="status" className="bg-emerald-50 px-6 py-3 text-sm text-emerald-800">{exportMessage}</p>}
        {exportError && <p role="alert" className="bg-red-50 px-6 py-3 text-sm text-red-800">{exportError}</p>}
        {stageOpen ? <Stage code={code} codeError={codeError} device={device} viewportWidth={viewportWidth} /> : <div className="grid flex-1 grid-cols-1 items-start gap-3 p-3 md:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[248px_minmax(0,1fr)_288px]">
          <Sidebar disabled={view !== 'visual' || Boolean(codeError)} onAddElement={addElement} />
          <Workspace view={view} elements={visibleElements} selectedId={selectedId} onSelect={setSelectedId} dropPreview={dropPreview} message={message}
            device={device} onDeviceChange={setDevice} viewportWidth={viewportWidth} onMobileWidthChange={setMobileWidth}
            onResetMobile={() => commitElements((current) => mapTree(current, (element) => ({ ...element, mobileCustomized: false })))}
            code={code} draft={draft} codeError={codeError} onCodeChange={editCode} isDragging={Boolean(draggedType)}
            blockProject={blockProject} blockTargets={blockTargets} onBlockProjectChange={(changes) => setBlockProject((current) => ({ ...current, ...changes }))} onApplyBlocks={applyBlocks} />
          <PropertiesPanel selected={selectedElement} elements={elements} onSelect={setSelectedId} onMoveElement={moveElement} onUpdateElement={updateContent} onRemoveElement={removeElement} disabled={Boolean(codeError)} view={view} device={device} layout={findNode(visibleElements, selectedId)?.layout} onAppearanceChange={updateAppearance} onUpdateLayout={updateLayout} />
        </div>}
      </div>
      <DragOverlay dropAnimation={null}>{draggedElement && <div className="rounded-2xl border-2 border-violet-300 bg-violet-600 px-5 py-3 font-bold text-white shadow-xl">{draggedElement.icon} {draggedElement.name}</div>}</DragOverlay>
    </DndContext>
  )
}

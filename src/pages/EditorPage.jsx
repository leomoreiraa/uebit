import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { saveAs } from 'file-saver'
import { updateGlobalStyle } from '../lib/code-engine'
import { DEFAULT_PROJECT_NAME, parseProject, projectFilename, projectName, serializeProject } from '../lib/project'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { createElement, elementTypes } from '../data/elements'
import { DESKTOP_WIDTH } from '../lib/responsive'
import { activeTree, findNode, flattenTree, insertNode, mapTree, mobileLayout, moveNode, removeNode } from '../lib/tree'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Workspace from '../components/Workspace'
import PropertiesPanel from '../components/PropertiesPanel'
import Stage from '../components/Stage'
import TemplatesModal from '../components/TemplatesModal'
import { getTemplate } from '../data/templates'
import { applyBlockCode } from '../lib/block-code'
import { buildBlockTargets } from '../lib/block-targets'
import { createInitialCode, identifyCodeElements, readCode, updateElementAppearance, updateElementContent, writeVisualCode } from '../lib/code-engine'

export default function EditorPage() {
  const [searchParams] = useSearchParams()
  const initialTemplateParam = searchParams.get('template')
  const initialTemplate = initialTemplateParam ? getTemplate(initialTemplateParam) : null
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false)

  const [name, setName] = useState(() => initialTemplate?.name || DEFAULT_PROJECT_NAME)
  const [projectRevision, setProjectRevision] = useState(0)
  const [projectMessage, setProjectMessage] = useState('')
  const [projectError, setProjectError] = useState('')
  const [importing, setImporting] = useState(false)
  const [codeTab, setCodeTab] = useState('html')
  const [panelTab, setPanelTab] = useState('styles')
  const [view, setView] = useState('visual')
  const [stageOpen, setStageOpen] = useState(false)
  const [blockProject, setBlockProject] = useState(() => initialTemplate?.blockProject || { workspace: undefined, generated: '', applied: '', appliedGenerated: '' })
  const [elements, setElements] = useState(() => (initialTemplate && initialTemplate.id !== 'blank' ? readCode(initialTemplate.code) : []))
  const blockTargets = useMemo(() => buildBlockTargets(elements), [elements])
  const [code, setCode] = useState(() => initialTemplate?.code || createInitialCode())
  const [draft, setDraft] = useState(() => initialTemplate?.code || createInitialCode())
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
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates, scrollBehavior: 'instant' }),
  )
  const draggedElement = elementTypes.find((element) => element.type === draggedType)

  function saveProject() {
    try {
      const normalizedName = projectName(name)
      const content = serializeProject({ name: normalizedName, elements, code, draft, blockProject,
        editor: { view, codeTab, panelTab, panelFile: 'html', stageOpen, device, mobileWidth, selectedId } })
      saveAs(new Blob([content], { type: 'application/json;charset=utf-8' }), projectFilename(normalizedName))
      setName(normalizedName)
      setProjectError('')
      setProjectMessage(`Projeto salvo em ${projectFilename(normalizedName)}.`)
    } catch (error) {
      setProjectMessage('')
      setProjectError(error.message || 'Não foi possível salvar o projeto.')
    }
  }

  async function importProject(file) {
    if (!file || importing) return
    setImporting(true)
    setProjectError('')
    setProjectMessage('')
    try {
      if (!/\.frog$/i.test(file.name)) throw new Error('Escolha um arquivo com a extensão .frog.')
      const project = await parseProject(await file.text())
      setName(project.name)
      setElements(project.elements)
      setCode(project.code)
      setDraft(project.draft)
      setCodeError(project.codeError)
      setBlockProject(project.blockProject)
      setView(project.editor.view)
      setCodeTab(project.editor.codeTab)
      setPanelTab(project.editor.panelTab)
      setStageOpen(project.editor.stageOpen)
      setDevice(project.editor.device)
      setMobileWidth(project.editor.mobileWidth)
      setSelectedId(project.editor.selectedId)
      setDraggedType(null)
      setDropPreview(null)
      setMessage('')
      setExportMessage('')
      setExportError('')
      setProjectRevision((current) => current + 1)
      setProjectMessage(`Projeto “${project.name}” importado.`)
    } catch (error) {
      setProjectError(error.message || 'Não foi possível importar o projeto.')
    } finally {
      setImporting(false)
    }
  }

  function loadTemplate(templateId) {
    const template = getTemplate(templateId)
    if (!template) return
    try {
      const restoredElements = template.id === 'blank' ? [] : readCode(template.code)
      setName(template.name)
      setCode(template.code)
      setDraft(template.code)
      setElements(restoredElements)
      setCodeError('')
      setBlockProject(template.blockProject ?? { workspace: undefined, generated: '', applied: '', appliedGenerated: '' })
      setSelectedId(null)
      setDraggedType(null)
      setDropPreview(null)
      setStageOpen(false)
      setView('visual')
      setProjectRevision((current) => current + 1)
      setProjectMessage(`Modelo “${template.name}” carregado!`)
      setProjectError('')
    } catch (error) {
      setProjectError(error.message || 'Não foi possível carregar o modelo.')
    }
  }

  function acceptCode(next) {
    setElements(readCode(next))
    setCode(next)
    setDraft(next)
  }

  function commitElements(updater) {
    if (codeError) return
    acceptCode(writeVisualCode(code, updater(elements)))
  }

  function updateContent(id, content) {
    if (codeError) return
    acceptCode(updateElementContent(code, id, content))
    const newId = (content.htmlId !== undefined ? content.htmlId : content.id)?.trim()
    if (newId && newId !== id) {
      setSelectedId(newId)
      setBlockProject((current) => {
        if (!current.workspace) return current
        try {
          const str = JSON.stringify(current.workspace)
          if (str.includes(JSON.stringify(id))) {
            const updated = JSON.parse(str.replaceAll(JSON.stringify(id), JSON.stringify(newId)))
            return { ...current, workspace: updated }
          }
        } catch {
          /* preserve */
        }
        return current
      })
    }
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
    commitElements((current) => removeNode(current, id))
    setSelectedId(null)
    setMessage('Elemento e seu conteúdo removidos.')
  }

  async function exportSite() {
    if (exporting || codeError) return
    setExporting(true)
    setExportMessage('')
    setExportError('')
    try {
      const { downloadSite } = await import('../lib/export-site')
      await downloadSite(code)
      setExportMessage('Site exportado em meu-site.zip: index.html, style.css e script.js.')
    } catch (error) {
      setExportError(error.message || 'Não foi possível exportar o site.')
    } finally {
      setExporting(false)
    }
  }

  function addElement(type, destination) {
    if (view !== 'visual' || codeError) return
    const element = createElement(type)
    if (!element) return
    const parentId = destination ? destination.parentId : selectedElement?.type === 'container' ? selectedId : null
    commitElements((current) => insertNode(current, element, parentId, destination?.index ?? Infinity))
    setSelectedId(element.id)
    setMessage(parentId ? 'Bloco adicionado dentro do container.' : 'Bloco adicionado à página.')
  }

  function updateLayout(id, changes) {
    commitElements((current) =>
      mapTree(current, (node) =>
        node.id !== id
          ? node
          : device === 'desktop'
            ? { ...node, layout: { ...node.layout, ...changes } }
            : { ...node, mobileLayout: { ...mobileLayout(node), ...changes }, mobileCustomized: true },
      ),
    )
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
    const point =
      'clientX' in activatorEvent
        ? { x: activatorEvent.clientX + delta.x, y: activatorEvent.clientY + delta.y }
        : { x: over.rect.left + over.rect.width / 2, y: over.rect.top + over.rect.height / 2 }
    const parent = findNode(visibleElements, target.parentId)
    const horizontal = parent?.layout.direction.startsWith('row')
    const ratio = horizontal
      ? (point.x - over.rect.left) / Math.max(over.rect.width, 1)
      : (point.y - over.rect.top) / Math.max(over.rect.height, 1)
    if (target.type === 'container' && ratio > 0.2 && ratio < 0.8) {
      return { parentId: target.id, index: target.children.length, overId: target.id, mode: 'inside' }
    }
    const after = ratio > 0.5
    const source = findNode(elements, active.data.current?.elementId)
    if (source && (target.id === source.id || findNode(source.children, target.id))) return null
    return { parentId: target.parentId, index: target.index + (after ? 1 : 0), overId: target.id, mode: after ? 'after' : 'before', horizontal }
  }

  function handleDragEnd(event) {
    const isPalette = String(event.active?.id).startsWith('palette-')
    const destination = (isPalette && dropPreview) ? dropPreview : destinationFor(event)
    setDraggedType(null)
    setDropPreview(null)
    if (!destination || codeError) return
    const id = event.active.data.current?.elementId
    if (id) moveElement(id, destination.parentId, destination.index)
    else addElement(event.active.data.current?.type, destination)
  }

  return (
    <DndContext
      autoScroll={{ threshold: { x: 0.1, y: 0.1 } }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        setDraggedType(active.data.current?.type)
        if (active.data.current?.elementId) setSelectedId(active.data.current.elementId)
      }}
      onDragMove={(event) => setDropPreview(destinationFor(event))}
      onDragOver={(event) => setDropPreview(destinationFor(event))}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setDraggedType(null)
        setDropPreview(null)
      }}
      accessibility={{
        screenReaderInstructions: {
          draggable: 'Pressione Enter na paleta para adicionar. Nos controles Mover, use Espaço, setas e Espaço para soltar; Escape cancela.',
        },
        announcements: {
          onDragStart: () => 'Arraste para reordenar ou colocar dentro de um container.',
          onDragOver: ({ over }) => (over ? 'Destino disponível.' : 'Fora da página.'),
          onDragEnd: ({ over }) => (over ? 'Movimento concluído.' : 'Movimento cancelado.'),
          onDragCancel: () => 'Movimento cancelado.',
        },
      }}
    >
      <div className="flex min-h-dvh flex-col bg-slate-50">
        <Header
          name={name}
          onNameChange={setName}
          onNameBlur={() => setName(projectName(name))}
          onSaveProject={saveProject}
          onImportProject={importProject}
          importing={importing}
          view={view}
          onViewChange={setView}
          onExport={exportSite}
          exporting={exporting}
          exportDisabled={Boolean(codeError)}
          stageOpen={stageOpen}
          onToggleStage={() => setStageOpen((current) => !current)}
          onOpenTemplates={() => setTemplatesModalOpen(true)}
        />
        {exportMessage && <p role="status" className="bg-emerald-50 px-6 py-3 text-sm text-emerald-800">{exportMessage}</p>}
        {projectMessage && <p role="status" className="bg-emerald-50 px-6 py-3 text-sm text-emerald-800">{projectMessage}</p>}
        {projectError && <p role="alert" className="bg-red-50 px-6 py-3 text-sm text-red-800">{projectError}</p>}
        {exportError && <p role="alert" className="bg-red-50 px-6 py-3 text-sm text-red-800">{exportError}</p>}
        {stageOpen ? (
          <Stage key={projectRevision} code={code} codeError={codeError} device={device} viewportWidth={viewportWidth} />
        ) : (
          <div key={projectRevision} className={view === 'visual' ? 'grid flex-1 grid-cols-1 items-start gap-3 p-3 md:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[248px_minmax(0,1fr)_288px]' : 'flex min-w-0 flex-1 p-3'}>
            {view === 'visual' && <Sidebar disabled={Boolean(codeError)} onAddElement={addElement} />}
            <Workspace
              onUpdateLayout={updateLayout}
              codeTab={codeTab}
              onCodeTabChange={setCodeTab}
              view={view}
              elements={visibleElements}
              selectedId={selectedId}
              onSelect={setSelectedId}
              dropPreview={dropPreview}
              message={message}
              device={device}
              onDeviceChange={setDevice}
              viewportWidth={viewportWidth}
              onMobileWidthChange={setMobileWidth}
              onResetMobile={() => commitElements((current) => mapTree(current, (element) => ({ ...element, mobileCustomized: false })))}
              code={code}
              codeError={codeError}
              onRestoreCode={() => { acceptCode(code); setCodeError('') }}
              isDragging={Boolean(draggedType)}
              blockProject={blockProject}
              blockTargets={blockTargets}
              onBlockProjectChange={(changes) => setBlockProject((current) => ({ ...current, ...changes }))}
              onApplyBlocks={applyBlocks}
            />
            {view === 'visual' && <PropertiesPanel
              activeTab={panelTab}
              onTabChange={setPanelTab}
              selected={selectedElement}
              elements={elements}
              onSelect={setSelectedId}
              onMoveElement={moveElement}
              onUpdateElement={updateContent}
              onRemoveElement={removeElement}
              disabled={Boolean(codeError)}
              view={view}
              device={device}
              layout={findNode(visibleElements, selectedId)?.layout}
              onAppearanceChange={updateAppearance}
              onGlobalStyleChange={(selector, property, value) => { if (!codeError) acceptCode(updateGlobalStyle(code, selector, property, value)) }}
              onUpdateLayout={updateLayout}
              code={code}
            />}
          </div>
        )}
      </div>
      <DragOverlay dropAnimation={null}>
        {draggedElement && (
          <div className="rounded-2xl border-2 border-violet-300 bg-violet-600 px-5 py-3 font-bold text-white shadow-xl">
            {draggedElement.icon} {draggedElement.name}
          </div>
        )}
      </DragOverlay>
      <TemplatesModal
        isOpen={templatesModalOpen}
        onClose={() => setTemplatesModalOpen(false)}
        onSelectTemplate={loadTemplate}
      />
    </DndContext>
  )
}

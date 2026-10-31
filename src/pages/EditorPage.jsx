import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { saveAs } from 'file-saver'
import TrashButton from '../components/TrashButton'
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
import LessonsPanel from '../components/LessonsPanel'
import { lessonById } from '../data/lessons'
import { guideView } from '../lib/lesson-tour'
import { useLanguage } from '../i18n/language'
import { message as translateMessage } from '../i18n/messages'
import { getTemplate } from '../data/templates'
import { applyBlockCode } from '../lib/block-code'
import { buildBlockTargets } from '../lib/block-targets'
import { createInitialCode, identifyCodeElements, readCode, updateElementAppearance, updateElementContent, writeVisualCode } from '../lib/code-engine'

// Keep the same panel subtree on desktop and mobile (including inspector state).
function EditorPanel({ id, label, side, open, onClose, triggerRef, children }) {
  const panelRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current ?? document.activeElement
    const panel = panelRef.current
    const focusable = 'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'
    const visible = (element) => element.getClientRects().length > 0 && !element.closest('[inert]')
    panel.querySelector('button')?.focus()
    function onKeyDown(event) {
      // ColorPicker renders a dialog into document.body; let its Escape handler close it first.
      const popovers = [...document.querySelectorAll('body > [role="dialog"]')]
      if (event.key === 'Escape') {
        if (popovers.length) return
        event.preventDefault()
        onClose()
      }
      if (event.key !== 'Tab') return
      const controls = [panel, ...popovers].flatMap((root) => [...root.querySelectorAll(focusable)]).filter(visible)
      const first = controls[0]
      const last = controls.at(-1)
      if (!first) { event.preventDefault(); panel.focus(); return }
      if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
        event.preventDefault(); last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) {
        event.preventDefault(); first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (trigger instanceof HTMLElement && trigger.isConnected && visible(trigger)) trigger.focus()
    }
  }, [open, onClose, triggerRef])

  return (
    <div
      id={id}
      ref={panelRef}
      role={open ? 'dialog' : undefined}
      aria-modal={open ? true : undefined}
      aria-label={label}
      tabIndex={-1}
      className={`${open ? 'flex' : 'hidden'} fixed inset-y-0 ${side === 'left' ? 'left-0' : 'right-0'} z-30 w-[min(22rem,calc(100vw-2rem))] min-h-0 min-w-0 flex-col overflow-hidden bg-white p-2 shadow-2xl xl:static xl:z-auto xl:flex xl:w-auto xl:bg-transparent xl:p-0 xl:shadow-none`}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 px-2 pb-2 xl:hidden">
        <span className="font-bold text-purple-950">{label}</span>
        <button type="button" onClick={onClose} aria-label={`Fechar ${label.toLowerCase()}`} className="grid size-11 place-items-center rounded-xl text-purple-900 hover:bg-purple-100 focus-visible:outline-2">
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      {children}
    </div>
  )
}

export default function EditorPage() {
  const { language } = useLanguage()
  const t = (key) => translateMessage(language, key)
  const [searchParams, setSearchParams] = useSearchParams()
  const [lessonId, setLessonId] = useState(() => lessonById(searchParams.get('lesson'))?.id ?? null)
  const [lessonsOpen, setLessonsOpen] = useState(() => Boolean(lessonById(searchParams.get('lesson'))))
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
  const [mobilePanel, setMobilePanel] = useState(null)
  const panelTriggerRef = useRef(null)
  const closeMobilePanel = useCallback(() => setMobilePanel(null), [])
  const panelOpen = view === 'visual' && !stageOpen ? mobilePanel : null

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)')
    const onResize = () => { if (desktop.matches) closeMobilePanel() }
    desktop.addEventListener('change', onResize)
    return () => desktop.removeEventListener('change', onResize)
  }, [closeMobilePanel])
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

  const handleInlineTextEdit = useCallback((id, text) => {
    setCode((currentCode) => {
      try {
        const next = updateElementContent(currentCode, id, { text })
        setDraft(next)
        setElements(readCode(next))
        return next
      } catch {
        return currentCode
      }
    })
  }, [])

  function handleCodeChange(fileKey, value) {
    const nextDraft = { ...draft, [fileKey]: value }
    setDraft(nextDraft)
    try {
      const nextCode = identifyCodeElements(nextDraft)
      const parsed = readCode(nextCode)
      setElements(parsed)
      setCode(nextCode)
      setCodeError('')
    } catch (error) {
      setCodeError(error.message || 'Erro de sintaxe no código.')
    }
  }

  function handleBlockProjectChange(changes) {
    if (changes.generated !== undefined && changes.generated !== blockProject.appliedGenerated && !codeError) {
      try {
        const result = applyBlockCode(draft.js, changes.generated, blockProject.applied)
        acceptCode(identifyCodeElements({ ...draft, js: result.js }))
        setBlockProject((current) => ({
          ...current,
          ...changes,
          applied: result.applied,
          appliedGenerated: changes.generated,
        }))
        return
      } catch {
        /* preserve state on transient generation error */
      }
    }
    setBlockProject((current) => ({ ...current, ...changes }))
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
    if (over.id === 'trash') return { mode: 'trash', overId: 'trash' }
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
    if (destination.mode === 'trash' || event.over?.id === 'trash') {
      const id = event.active.data.current?.elementId
      if (id) {
        removeElement(id)
        setMessage('Componente excluído na lixeira.')
      } else {
        setMessage('Criação cancelada.')
      }
      return
    }
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
      <div className="flex h-dvh min-h-0 w-full max-w-full flex-col overflow-hidden bg-slate-50">
        <div className="shrink-0" inert={panelOpen ? true : undefined}>
        <Header
          name={name}
          onNameChange={setName}
          onNameBlur={() => setName(projectName(name))}
          onSaveProject={saveProject}
          onImportProject={importProject}
          importing={importing}
          view={view}
          onViewChange={(next) => { closeMobilePanel(); setView(next) }}
          onExport={exportSite}
          exporting={exporting}
          exportDisabled={Boolean(codeError)}
          stageOpen={stageOpen}
          onToggleStage={() => { closeMobilePanel(); setStageOpen((current) => !current) }}
          mobilePanel={panelOpen}
          onTogglePanel={(panel, trigger) => {
            panelTriggerRef.current = trigger
            setMobilePanel((current) => current === panel ? null : panel)
          }}
          onOpenTemplates={() => setTemplatesModalOpen(true)}
          onOpenLessons={() => setLessonsOpen((current) => !current)}
          lessonsOpen={lessonsOpen}
        />
        {exportMessage && <p role="status" className="bg-emerald-50 px-6 py-3 text-sm text-emerald-800">{exportMessage}</p>}
        {projectMessage && <p role="status" className="bg-emerald-50 px-6 py-3 text-sm text-emerald-800">{projectMessage}</p>}
        {projectError && <p role="alert" className="bg-red-50 px-6 py-3 text-sm text-red-800">{projectError}</p>}
        {exportError && <p role="alert" className="bg-red-50 px-6 py-3 text-sm text-red-800">{exportError}</p>}
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {stageOpen && (
          <Stage
            key={`stage-${projectRevision}`}
            code={code}
            codeError={codeError}
            device={device}
            viewportWidth={viewportWidth}
            onDeviceChange={setDevice}
            onMobileWidthChange={setMobileWidth}
          />
        )}
        <div key={projectRevision} className={`${stageOpen ? 'hidden' : 'flex'} min-h-0 min-w-0 flex-1 overflow-hidden p-2 sm:p-3 ${view === 'visual' && !stageOpen ? 'xl:grid xl:grid-cols-[248px_minmax(0,1fr)_288px] xl:gap-3' : ''}`}>
            {panelOpen && <div aria-hidden="true" onClick={closeMobilePanel} className="fixed inset-0 z-20 bg-slate-950/40 xl:hidden" />}
            {view === 'visual' && <EditorPanel id="editor-palette" label={t('palette')} side="left" open={panelOpen === 'palette'} onClose={closeMobilePanel} triggerRef={panelTriggerRef}>
              <Sidebar disabled={Boolean(codeError)} onAddElement={(...args) => { addElement(...args); closeMobilePanel() }} />
            </EditorPanel>}
            <div inert={panelOpen ? true : undefined} className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <Workspace
              active={!stageOpen}
              onUpdateLayout={updateLayout}
              codeTab={codeTab}
              onCodeTabChange={setCodeTab}
              view={view}
              elements={visibleElements}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onEditText={handleInlineTextEdit}
              dropPreview={dropPreview}
              message={message}
              device={device}
              onDeviceChange={setDevice}
              viewportWidth={viewportWidth}
              onMobileWidthChange={setMobileWidth}
              onResetMobile={() => commitElements((current) => mapTree(current, (element) => ({ ...element, mobileCustomized: false })))}
              code={code}
              draft={draft}
              onCodeChange={handleCodeChange}
              codeError={codeError}
              onRestoreCode={() => { acceptCode(code); setCodeError('') }}
              isDragging={Boolean(draggedType)}
              blockProject={blockProject}
              blockTargets={blockTargets}
              onBlockProjectChange={handleBlockProjectChange}
              onApplyBlocks={applyBlocks}
            />
            </div>
            {view === 'visual' && <EditorPanel id="editor-properties" label={t('properties')} side="right" open={panelOpen === 'properties'} onClose={closeMobilePanel} triggerRef={panelTriggerRef}><PropertiesPanel
              activeTab={panelTab}
              onTabChange={setPanelTab}
              selected={selectedElement}
              elements={elements}
              onSelect={setSelectedId}
              onMoveElement={moveElement}
              onUpdateElement={updateContent}
              onRemoveElement={removeElement}
              onOpenProgramming={() => { closeMobilePanel(); setView('programming') }}
              disabled={Boolean(codeError)}
              view={view}
              device={device}
              layout={findNode(visibleElements, selectedId)?.layout}
              onAppearanceChange={updateAppearance}
              onGlobalStyleChange={(selector, property, value) => { if (!codeError) acceptCode(updateGlobalStyle(code, selector, property, value)) }}
              onUpdateLayout={updateLayout}
              code={code}
            /></EditorPanel>}
          </div>
          </div>
          {lessonsOpen && (
            <LessonsPanel
              lessonId={lessonId}
              onClose={() => setLessonsOpen(false)}
              onSelectLesson={(id) => {
                setLessonId(id)
                setSearchParams((previous) => {
                  const next = new URLSearchParams(previous)
                  next.set('lesson', id)
                  return next
                }, { replace: true })
                closeMobilePanel()
                setStageOpen(false)
              }}
              onViewChange={(nextView) => {
                closeMobilePanel()
                setStageOpen(false)
                setView(nextView)
              }}
              onNavigateTour={(target, { lessonId: guidedLesson, activityIndex }) => {
                const nextView = guideView(target)
                setView(nextView)
                setStageOpen(false)
                if (target === 'code-tab-html') setCodeTab('html')
                if (target === 'code-tab-css') setCodeTab('css')
                if (target === 'code-tab-js') setCodeTab('js')
                if (target.startsWith('field-') || target === 'inspector') {
                  setPanelTab('styles')
                  const types = {
                    'primeiros-passos': ['heading', 'paragraph', 'heading'],
                    'textos-links': ['list', 'link', 'strong'],
                    'imagens-acessibilidade': ['image', 'image', 'paragraph'],
                    'layout-flexbox': ['container', 'paragraph', 'container'],
                    'css-cores': ['heading'],
                    'responsivo': ['paragraph'],
                    'formularios': ['container', 'input', 'button'],
                    'javascript-eventos': ['button', 'paragraph'],
                    'logica-blocos': ['button'],
                    'projeto-final': ['paragraph', 'button'],
                  }
                  const requested = types[guidedLesson]?.[activityIndex]
                  const found = requested && flattenTree(elements).filter((node) => node.type === requested).at(-1)
                  if (found) setSelectedId(found.id)
                }
                const smallScreen = window.matchMedia('(max-width: 1279px)').matches
                if (nextView === 'visual' && smallScreen) {
                  if (target.startsWith('field-') || target === 'inspector') setMobilePanel('properties')
                  else if (target === 'palette' || target.startsWith('category-') || target.startsWith('element-')) setMobilePanel('palette')
                  else setMobilePanel(null)
                } else setMobilePanel(null)
                if (target.startsWith('element-')) {
                  const type = target.slice('element-'.length)
                  const category = ['heading', 'paragraph', 'link', 'strong', 'list'].includes(type) ? 'text' : ['image'].includes(type) ? 'media' : ['container'].includes(type) ? 'structure' : 'interaction'
                  window.dispatchEvent(new CustomEvent('uebit-tour-expand-category', { detail: category }))
                }
              }}
              onFreshProject={() => {
                if (window.confirm(t('freshConfirm'))) loadTemplate('blank')
              }}
              editorState={{ elements, code, blockProject, device }}
            />
          )}
        </div>
      </div>
      {view === 'visual' && !stageOpen && !panelOpen && (
        <TrashButton
          selectedElement={selectedElement}
          onRemove={removeElement}
          isDragging={Boolean(draggedType)}
          onNotify={setMessage}
        />
      )}
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

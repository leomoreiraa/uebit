import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
import { elementTypes } from '../data/elements'
import { MOBILE_WIDTHS } from '../lib/responsive'
import { flattenTree } from '../lib/tree'
import SitePreview from './SitePreview'

function FlowElement({ element, parentRect, rects, selectedId, onSelect, dropPreview, disabled }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging } = useSortable({ id: element.id, data: { type: element.type, elementId: element.id }, disabled })
  const rect = rects.find((item) => item.id === element.id)
  const name = elementTypes.find((type) => type.type === element.type)?.name ?? 'Bloco HTML'
  const selected = selectedId === element.id
  const highlight = dropPreview?.overId === element.id
  if (!rect) return null
  return <div ref={setNodeRef} data-element-id={element.id} className={`pointer-events-none absolute rounded-xl ${selected ? 'outline-2 outline-violet-500' : ''} ${isDragging ? 'opacity-30' : ''}`}
    style={{ left: rect.x - (parentRect?.x ?? 0), top: rect.y - (parentRect?.y ?? 0), width: rect.width, height: rect.height }}>
    <button ref={setActivatorNodeRef} type="button" {...attributes} {...listeners} aria-label={`Mover ${name.toLowerCase()}`} onFocus={() => onSelect(element.id)}
      className={`pointer-events-auto absolute top-0 left-0 z-20 flex touch-none items-center gap-1 rounded-xl bg-violet-600 px-2 text-xs font-bold text-white shadow-sm focus:opacity-100 ${selected ? '' : 'opacity-0'}`} style={{ pointerEvents: selected ? 'auto' : 'none', transform: 'translateY(-35%)', cursor: 'grab' }}><GripVertical aria-hidden="true" size={16} />Mover</button>
    {highlight && <div data-drop-preview="true" className={`absolute z-10 ${dropPreview.mode === 'inside' ? 'inset-0 rounded-xl border-4 border-emerald-500 bg-emerald-200/30' : 'bg-violet-600'}`}
      style={dropPreview.mode === 'inside' ? undefined : dropPreview.horizontal ? { top: 0, bottom: 0, width: 5, [dropPreview.mode === 'before' ? 'left' : 'right']: -4 } : { left: 0, right: 0, height: 5, [dropPreview.mode === 'before' ? 'top' : 'bottom']: -4 }} />}
    {element.type === 'container' && <>
      {element.children.length === 0 && <span className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm font-bold text-emerald-800">Solte blocos dentro deste container</span>}
      <SortableContext items={element.children.map((child) => child.id)} strategy={rectSortingStrategy}>
        {element.children.map((child) => <FlowElement key={child.id} element={child} parentRect={rect} rects={rects} selectedId={selectedId} onSelect={onSelect} dropPreview={dropPreview} disabled={disabled} />)}
      </SortableContext>
    </>}
  </div>
}

export default function Canvas({ elements, selectedId, onSelect, dropPreview, message, device, onDeviceChange, viewportWidth, onMobileWidthChange, onResetMobile, code, isDragging, disabled }) {
  const { setNodeRef } = useDroppable({ id: 'canvas', disabled })
  const frameRef = useRef(null)
  const [availableWidth, setAvailableWidth] = useState(viewportWidth)
  const [previewLayout, setPreviewLayout] = useState(null)
  const [runtimeError, setRuntimeError] = useState('')
  const [testMode, setTestMode] = useState(false)
  const receiveLayout = useCallback((layout) => setPreviewLayout(layout), [])
  const scale = Math.min(1, availableWidth / viewportWidth)
  const height = previewLayout?.height ?? 688
  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => setAvailableWidth(entry.contentRect.width))
    observer.observe(frameRef.current)
    return () => observer.disconnect()
  }, [])
  return <>
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-100 p-3">
      <div role="group" aria-label="Versão da página" className="flex gap-1 rounded-xl bg-violet-50 p-1">
        {['desktop', 'mobile'].map((mode) => <button type="button" key={mode} aria-pressed={device === mode} onClick={() => onDeviceChange(mode)} className={`rounded-xl px-3 text-sm ${device === mode ? 'bg-violet-600 text-white' : 'text-violet-800'}`}>{mode === 'desktop' ? 'Desktop' : 'Mobile'}</button>)}
      </div>
      <button type="button" aria-pressed={testMode} onClick={() => setTestMode((current) => !current)} className="rounded-xl border-2 border-violet-200 px-3 text-xs text-violet-800">{testMode ? 'Voltar a editar' : 'Testar página'}</button>
      {device === 'mobile' && <>
        <select aria-label="Largura da tela mobile" value={viewportWidth} onChange={(event) => onMobileWidthChange(Number(event.target.value))} className="min-h-11 rounded-xl border-2 border-violet-100 px-2">{MOBILE_WIDTHS.map((width) => <option key={width} value={width}>{width} px</option>)}</select>
        <button type="button" disabled={disabled} onClick={onResetMobile} className="rounded-xl border-2 border-violet-100 px-3 text-xs">Regerar mobile</button>
      </>}
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 bg-violet-50 px-4 py-3 text-xs text-violet-900">
      <span>Flexbox · {flattenTree(elements).length} elementos · Zoom {Math.round(scale * 100)}%</span>
      {!testMode && <button type="button" onClick={() => onSelect(null)} className="rounded-xl bg-white px-3">Selecionar página</button>}
    </div>
    <p className="px-4 py-3 text-xs leading-5 text-slate-600">{testMode ? 'Clique nos botões para testar suas ações.' : 'Arraste pelo botão Mover. A linha roxa mostra a ordem; o destaque verde coloca o bloco dentro do container. Clique no conteúdo para editar.'}</p>
    <div ref={frameRef} className="uebit-dot-backdrop min-w-0 overflow-hidden p-4">
      <div className="mx-auto" style={{ width: viewportWidth * scale, height: (height + 80) * scale }}>
        <div ref={setNodeRef} aria-label="Página: solte os elementos aqui" data-device={device} className="relative rounded-2xl bg-white shadow-sm" style={{ width: viewportWidth, height: height + 80, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <SitePreview code={code} onLayout={receiveLayout} onSelect={onSelect} onError={setRuntimeError} interactive={!isDragging} editing={!testMode} className="absolute inset-x-0 top-0 w-full rounded-xl bg-white" style={{ height }} />
          {!testMode && <>
            <SortableContext items={elements.map((element) => element.id)} strategy={rectSortingStrategy}>
              {elements.map((element) => <FlowElement key={element.id} element={element} rects={previewLayout?.blocks ?? []} selectedId={selectedId} onSelect={onSelect} dropPreview={dropPreview} disabled={disabled} />)}
            </SortableContext>
            {elements.length === 0 && <div className="pointer-events-none absolute inset-x-12 top-24 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50 p-8 text-center text-violet-900"><h3 className="text-xl font-extrabold">Sua página começa aqui</h3><p className="mt-3">Arraste um bloco ou um container da paleta.</p></div>}
            <div data-page-end className={`absolute inset-x-0 bottom-0 flex h-20 items-center justify-center rounded-xl border-2 border-dashed text-sm font-bold ${dropPreview?.overId === 'canvas' ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-violet-200 bg-violet-50 text-violet-800'}`}>Solte aqui para colocar no final da página (fora dos containers)</div>
          </>}
        </div>
      </div>
    </div>
    {runtimeError && <p role="status" className="bg-amber-50 p-3 text-xs text-amber-900">JavaScript: {runtimeError}</p>}
    <p role="status" className="sr-only">{message}</p>
  </>
}

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
import { elementTypes } from '../data/elements'
import { MOBILE_WIDTHS } from '../lib/responsive'
import SitePreview from './SitePreview'
import ResizeHandles from './ResizeHandles'

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
      className={`pointer-events-auto absolute top-0 left-0 z-20 flex touch-none items-center gap-1 rounded-xl bg-violet-600 px-2 text-xs font-bold text-white shadow-sm focus:opacity-100 ${selected ? '' : 'opacity-0'}`} style={{ pointerEvents: selected ? 'auto' : 'none', transform: 'translateY(-35%)', cursor: 'grab' }}><GripVertical aria-hidden="true" size={16} />Mover{element.name ? `: ${element.name}` : ''}</button>
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

export default function Canvas({ elements, selectedId, onSelect, dropPreview, message, device, onDeviceChange, viewportWidth, onMobileWidthChange, onResetMobile, onUpdateLayout, code, isDragging, disabled }) {
  const { setNodeRef } = useDroppable({ id: 'canvas', disabled })
  const frameRef = useRef(null)
  const [availableWidth, setAvailableWidth] = useState(viewportWidth)
  const [previewLayout, setPreviewLayout] = useState(null)
  const [runtimeError, setRuntimeError] = useState('')
  const [testMode, setTestMode] = useState(false)
  const [resizePreview, setResizePreview] = useState(null)
  const selectedRect = previewLayout?.blocks.find((rect) => rect.id === selectedId)
  const receiveLayout = useCallback((layout) => setPreviewLayout(layout), [])
  const scale = Math.min(1, availableWidth / viewportWidth)
  const height = previewLayout?.height ?? 688
  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => setAvailableWidth(entry.contentRect.width))
    observer.observe(frameRef.current)
    return () => observer.disconnect()
  }, [])
  return <>
    <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-purple-100 bg-white px-3 py-2">
      <div className="flex items-center gap-2">
        <div role="group" aria-label="Versão da página" className="flex gap-1 rounded-full bg-purple-50 p-1 border-2 border-purple-200">
          {['desktop', 'mobile'].map((mode) => (
            <button
              type="button"
              key={mode}
              aria-pressed={device === mode}
              onClick={() => onDeviceChange(mode)}
              className={`rounded-full px-3.5 py-1 text-xs font-black transition-all ${
                device === mode ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-700 hover:text-purple-950'
              }`}
            >
              {mode === 'desktop' ? 'Desktop' : 'Mobile'}
            </button>
          ))}
        </div>
        {device === 'mobile' && (
          <div className="flex items-center gap-1.5">
            <select
              aria-label="Largura da tela mobile"
              value={viewportWidth}
              onChange={(event) => onMobileWidthChange(Number(event.target.value))}
              className="h-8 rounded-full border-2 border-purple-200 bg-white px-3 text-xs font-bold text-slate-700"
            >
              {MOBILE_WIDTHS.map((width) => (
                <option key={width} value={width}>
                  {width} px
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={disabled}
              onClick={onResetMobile}
              className="h-8 rounded-full border-2 border-purple-200 bg-purple-50 px-3 text-xs font-black text-purple-800 hover:bg-purple-100"
            >
              Regerar mobile
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!testMode && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="rounded-full border-2 border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-black text-purple-900 shadow-xs transition-all hover:scale-105 hover:bg-purple-100 active:scale-95"
          >
            Selecionar página
          </button>
        )}
        <button
          type="button"
          aria-pressed={testMode}
          onClick={() => setTestMode((current) => !current)}
          className={`rounded-full px-4 py-1.5 text-xs font-black shadow-md transition-all hover:scale-105 active:scale-95 ${
            testMode
              ? 'border-b-3 border-emerald-700 bg-emerald-500 text-white hover:bg-emerald-400'
              : 'border-b-3 border-blue-700 bg-blue-500 text-white hover:bg-blue-400'
          }`}
        >
          {testMode ? 'Voltar a editar' : 'Testar página'}
        </button>
      </div>
    </div>

    <div ref={frameRef} className="uebit-dot-backdrop min-w-0 overflow-hidden p-4">
      <div className="mx-auto" style={{ width: viewportWidth * scale, height: (height + 80) * scale }}>
        <div ref={setNodeRef} aria-label="Página: solte os elementos aqui" data-device={device} className="relative rounded-2xl bg-white shadow-xs" style={{ width: viewportWidth, height: height + 80, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <SitePreview code={code} resizePreview={resizePreview} onLayout={receiveLayout} onSelect={onSelect} onError={setRuntimeError} interactive={!isDragging && !resizePreview} editing={!testMode} className="absolute inset-x-0 top-0 w-full rounded-xl bg-white" style={{ height }} />
          {!testMode && <>
            <SortableContext items={elements.map((element) => element.id)} strategy={rectSortingStrategy}>
              {elements.map((element) => <FlowElement key={element.id} element={element} rects={previewLayout?.blocks ?? []} selectedId={selectedId} onSelect={onSelect} dropPreview={dropPreview} disabled={disabled || Boolean(resizePreview)} />)}
            </SortableContext>
            {selectedRect && !disabled && !isDragging && <ResizeHandles key={`${device}-${selectedId}`} id={selectedId} rect={selectedRect} scale={scale} onPreview={setResizePreview} onCommit={onUpdateLayout} />}
            {elements.length === 0 && (
              <div className="pointer-events-none absolute inset-x-8 top-20 rounded-3xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-8 text-center text-slate-600 shadow-xs">
                <span className="inline-block text-4xl mb-2 select-none">🐸</span>
                <h3 className="text-lg font-black text-purple-950">Sua página começa aqui</h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">Arraste um elemento ou container da paleta para começar a criar.</p>
              </div>
            )}
            <div
              data-page-end
              className={`absolute inset-x-0 bottom-0 flex h-16 items-center justify-center rounded-xl border-2 border-dashed text-xs font-bold transition-colors ${
                dropPreview?.overId === 'canvas'
                  ? 'border-emerald-500 bg-emerald-100/80 text-emerald-900'
                  : 'border-slate-200 bg-slate-50/60 text-slate-400'
              }`}
            >
              Solte aqui para colocar no final da página
            </div>
          </>}
        </div>
      </div>
    </div>
    {runtimeError && <p role="status" className="bg-amber-50 p-3 text-xs text-amber-900">JavaScript: {runtimeError}</p>}
    <p role="status" className="sr-only">{message}</p>
  </>
}

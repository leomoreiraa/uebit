import { useEffect, useRef } from 'react'
import { resizeDimensions } from '../lib/resize'

const handles = [
  ['n', 'superior', 50, 0, 'ns-resize'], ['e', 'direita', 100, 50, 'ew-resize'],
  ['s', 'inferior', 50, 100, 'ns-resize'], ['w', 'esquerda', 0, 50, 'ew-resize'],
  ['ne', 'superior direito', 100, 0, 'nesw-resize'], ['se', 'inferior direito', 100, 100, 'nwse-resize'],
  ['sw', 'inferior esquerdo', 0, 100, 'nesw-resize'], ['nw', 'superior esquerdo', 0, 0, 'nwse-resize'],
]

export default function ResizeHandles({ id, rect, scale, onPreview, onCommit }) {
  const session = useRef(null)
  useEffect(() => {
    function cancel(event) {
      if (event.key === 'Escape' && session.current) {
        event.preventDefault()
        session.current = null
        onPreview(null)
      }
    }
    window.addEventListener('keydown', cancel)
    return () => { window.removeEventListener('keydown', cancel); onPreview(null) }
  }, [onPreview])

  function start(event, direction) {
    if (event.button !== 0) return
    event.preventDefault()
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    session.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, rect, scale, direction, changes: null }
    onPreview({ id, changes: {} })
  }
  function move(event) {
    const current = session.current
    if (!current || event.pointerId !== current.pointerId) return
    event.preventDefault()
    const dx = event.clientX - current.x
    const dy = event.clientY - current.y
    if (!current.changes && Math.hypot(dx, dy) < 2) return
    current.changes = resizeDimensions(current.rect, current.direction, dx, dy, current.scale)
    onPreview({ id, changes: current.changes })
  }
  function finish(event, cancel = false) {
    const current = session.current
    if (!current || current.pointerId !== event.pointerId) return
    session.current = null
    onPreview(null)
    if (!cancel && current.changes) onCommit(id, current.changes)
  }
  return <div data-resize-overlay={id} className="pointer-events-none absolute z-30 outline-2 outline-violet-500" style={{ left: rect.x, top: rect.y, width: rect.width, height: rect.height }}>
    {handles.map(([direction, label, left, top, cursor]) => <button key={direction} type="button" aria-label={`Redimensionar: ${label}`} title="Arraste para redimensionar. Setas ajustam; Shift acelera. Escape cancela o arraste."
      className="pointer-events-auto absolute grid touch-none place-items-center border-0 bg-transparent p-0 focus:outline-2 focus:outline-violet-800"
      style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)', width: 24 / scale, height: 24 / scale, minHeight: 0, cursor, borderRadius: 0 }}
      onPointerDown={(event) => start(event, direction)} onPointerMove={move} onPointerUp={(event) => finish(event)} onPointerCancel={(event) => finish(event, true)} onLostPointerCapture={(event) => finish(event, true)}
      onKeyDown={(event) => {
        if (session.current || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
        const horizontal = event.key === 'ArrowLeft' || event.key === 'ArrowRight'
        if (horizontal ? !/[ew]/.test(direction) : !/[ns]/.test(direction)) return
        event.preventDefault(); event.stopPropagation()
        const delta = (event.shiftKey ? 10 : 1) * (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1)
        onCommit(id, resizeDimensions(rect, horizontal ? (direction.includes('w') ? 'w' : 'e') : (direction.includes('n') ? 'n' : 's'), horizontal ? delta : 0, horizontal ? 0 : delta, 1))
      }}>
      <span aria-hidden="true" className="rounded-sm border-2 border-violet-600 bg-white shadow-sm" style={{ width: 10 / scale, height: 10 / scale }} />
    </button>)}
    <output aria-live="off" className="absolute left-1/2 top-full mt-4 whitespace-nowrap rounded-md bg-violet-700 px-2 py-1 text-xs font-bold text-white" style={{ transform: `translateX(-50%) scale(${1 / scale})`, transformOrigin: 'top center' }}>{Math.round(rect.width)} × {Math.round(rect.height)} px</output>
  </div>
}

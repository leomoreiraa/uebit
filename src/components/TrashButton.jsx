import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Trash2 } from 'lucide-react'

export default function TrashButton({
  selectedElement,
  onRemove,
  isDragging,
  onNotify,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'trash',
  })
  const [hovered, setHovered] = useState(false)
  const hasSelection = Boolean(selectedElement)

  const handleClick = () => {
    if (hasSelection) {
      onRemove(selectedElement.id)
    } else if (onNotify) {
      onNotify('Clique em um componente na página para selecioná-lo e depois na lixeira para apagar.')
    }
  }

  const elementName =
    selectedElement?.name ||
    selectedElement?.text?.slice(0, 20) ||
    selectedElement?.type ||
    'Componente'

  return (
    <aside
      ref={setNodeRef}
      aria-label="Lixeira para apagar componentes"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-5 right-5 xl:right-[308px] z-40 flex items-center gap-2.5 flex-row-reverse select-none"
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label={
          hasSelection
            ? `Excluir ${elementName}`
            : 'Lixeira: selecione ou arraste um componente para apagar'
        }
        title={
          hasSelection
            ? `Excluir ${elementName}`
            : 'Lixeira: selecione um componente ou arraste até aqui para apagar'
        }
        className={`group relative flex size-12 cursor-pointer items-center justify-center rounded-2xl border-2 transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-rose-500 ${
          isOver
            ? 'scale-120 border-rose-400 bg-rose-600 text-white shadow-2xl ring-4 ring-rose-300 ring-offset-2'
            : isDragging
              ? 'scale-110 border-dashed border-rose-400 bg-rose-100 text-rose-700 shadow-xl animate-pulse'
              : hasSelection
                ? 'scale-105 border-rose-300 bg-rose-500 text-white shadow-xl hover:scale-110 hover:bg-rose-600 ring-2 ring-rose-300/60'
                : 'border-purple-200 bg-white/95 text-slate-400 shadow-md backdrop-blur-xs hover:scale-105 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-600'
        }`}
      >
        <Trash2
          className={`size-5 transition-transform duration-200 ${
            isOver
              ? 'rotate-12 scale-120'
              : hasSelection
                ? 'group-hover:rotate-12 group-hover:scale-110'
                : 'group-hover:rotate-6'
          }`}
        />

        {/* Indicador de elemento pronto para exclusão */}
        {hasSelection && !isDragging && (
          <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-rose-600 text-[9px] font-black text-white ring-2 ring-white">
            ×
          </span>
        )}
      </button>

      {/* Rótulo explicativo contextual */}
      {(hasSelection || isDragging || hovered) && (
        <div
          className={`flex flex-col rounded-xl px-3 py-1.5 shadow-md backdrop-blur-xs transition-all duration-150 animate-in fade-in zoom-in-95 ${
            isOver
              ? 'border border-rose-400 bg-rose-600 text-white'
              : isDragging
                ? 'border border-rose-200 bg-white text-rose-700'
                : hasSelection
                  ? 'border border-rose-200 bg-white/95'
                  : 'border border-purple-200 bg-white/95'
          }`}
        >
          {isOver ? (
            <span className="text-xs font-black tracking-wide">
              Solte para apagar!
            </span>
          ) : isDragging ? (
            <span className="text-xs font-bold text-rose-600">
              Arraste até a lixeira para apagar
            </span>
          ) : hasSelection ? (
            <>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                Apagar componente
              </span>
              <span className="max-w-44 truncate text-xs font-black text-slate-800">
                {elementName}
              </span>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lixeira
              </span>
              <span className="text-xs font-semibold text-slate-600">
                Selecione ou arraste um bloco
              </span>
            </>
          )}
        </div>
      )}
    </aside>
  )
}

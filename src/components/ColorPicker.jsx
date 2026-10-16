import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  Triangle,
  Hash,
  Palette,
  Pipette,
  Copy,
  Check,
  ChevronRight,
  RotateCcw,
  X,
} from 'lucide-react'
import {
  hexToRgb,
  rgbToHex,
  rgbToHsv,
  hsvToRgb,
  normalizeColorToHex,
  isValidHex,
  getTriangleVertices,
  pointToBarycentric,
  barycentricToPoint,
  barycentricToRgb,
  colorToBarycentric,
  PREDEFINED_PALETTES,
} from '../lib/colors'

// Amostras rápidas visíveis no topo para seleção imediata
const QUICK_SWATCHES = [
  ['Roxo', '#7145d6'],
  ['Verde', '#21824f'],
  ['Azul', '#2563eb'],
  ['Laranja', '#ea580c'],
  ['Coral', '#d84062'],
  ['Amarelo', '#ffd56a'],
  ['Branco', '#ffffff'],
  ['Escuro', '#1e293b'],
]

const CANVAS_WIDTH = 220
const CANVAS_HEIGHT = 140
const PADDING = 12

export default function ColorPicker({
  label,
  property,
  value = '',
  onChange,
  defaultOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeTab, setActiveTab] = useState('triangle') // 'triangle' | 'hex' | 'presets'
  const [triangleMode, setTriangleMode] = useState('hsv') // 'hsv' | 'rgb'
  const [hue, setHue] = useState(260)
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [coords, setCoords] = useState({ top: 100, right: 310, isLeftFloating: true })

  const triggerRef = useRef(null)
  const canvasRef = useRef(null)
  const normalizedValue = normalizeColorToHex(value) || ''

  // Sincroniza rascunho de texto do HEX quando o valor externo mudar
  const [prevNormalizedValue, setPrevNormalizedValue] = useState(normalizedValue)
  const [hexDraft, setHexDraft] = useState(normalizedValue ? normalizedValue.toUpperCase() : '')

  if (normalizedValue !== prevNormalizedValue) {
    setPrevNormalizedValue(normalizedValue)
    setHexDraft(normalizedValue ? normalizedValue.toUpperCase() : '')
    if (normalizedValue) {
      const rgb = hexToRgb(normalizedValue)
      if (rgb) {
        const { h, s } = rgbToHsv(rgb.r, rgb.g, rgb.b)
        if (s > 0.05) {
          setHue(h)
        }
      }
    }
  }

  // Atualiza coordenadas para flutuar imediatamente à esquerda do menu lateral direito
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const aside = triggerRef.current.closest('aside')
    const asideRect = aside ? aside.getBoundingClientRect() : rect

    const popoverWidth = 288
    const popoverHeight = 410

    // Verifica se há espaço para flutuar à esquerda do menu direito
    const availableLeft = asideRect.left
    const isLeftFloating = availableLeft >= popoverWidth + 12

    let top = rect.top - 8
    top = Math.max(16, Math.min(top, window.innerHeight - popoverHeight - 16))

    if (isLeftFloating) {
      // Posiciona imediatamente à esquerda do menu lateral direito
      const rightDistance = window.innerWidth - asideRect.left + 10
      setCoords({
        top,
        right: rightDistance,
        isLeftFloating: true,
      })
    } else {
      // Telas pequenas / mobile: posiciona abaixo do disparador ou centralizado
      setCoords({
        top: Math.max(16, Math.min(rect.bottom + 8, window.innerHeight - popoverHeight - 16)),
        right: Math.max(12, Math.min(window.innerWidth - rect.right, window.innerWidth - popoverWidth - 12)),
        isLeftFloating: false,
      })
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    updatePosition()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const handleUpdate = () => {
      updatePosition()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleUpdate)
    window.addEventListener('scroll', handleUpdate, true)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleUpdate)
      window.removeEventListener('scroll', handleUpdate, true)
    }
  }, [isOpen, updatePosition])

  // Desenha o triângulo cromático interativo
  const renderTriangle = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    if (canvas.width !== CANVAS_WIDTH * dpr || canvas.height !== CANVAS_HEIGHT * dpr) {
      canvas.width = CANVAS_WIDTH * dpr
      canvas.height = CANVAS_HEIGHT * dpr
    }

    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    const { A, B, C } = getTriangleVertices(CANVAS_WIDTH, CANVAS_HEIGHT, PADDING)

    // Preenche os pixels do triângulo com interpolação baricêntrica
    const imgData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT)
    const data = imgData.data

    const minY = Math.floor(A.y)
    const maxY = Math.ceil(B.y)

    for (let y = minY; y <= maxY; y++) {
      const progress = (y - A.y) / (B.y - A.y || 1)
      const leftX = A.x + (B.x - A.x) * progress
      const rightX = A.x + (C.x - A.x) * progress

      const startX = Math.max(0, Math.floor(leftX))
      const endX = Math.min(CANVAS_WIDTH - 1, Math.ceil(rightX))

      for (let x = startX; x <= endX; x++) {
        const { wA, wB, wC } = pointToBarycentric(x, y, A, B, C)
        const rgb = barycentricToRgb(wA, wB, wC, triangleMode, hue)
        const idx = (y * CANVAS_WIDTH + x) * 4

        data[idx] = rgb.r
        data[idx + 1] = rgb.g
        data[idx + 2] = rgb.b
        data[idx + 3] = 255
      }
    }

    ctx.putImageData(imgData, 0, 0)

    // Contorno suave do triângulo
    ctx.beginPath()
    ctx.moveTo(A.x, A.y)
    ctx.lineTo(B.x, B.y)
    ctx.lineTo(C.x, C.y)
    ctx.closePath()
    ctx.strokeStyle = 'rgba(113, 69, 214, 0.25)'
    ctx.lineWidth = 2
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Rótulos nos vértices
    ctx.font = 'bold 9px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    if (triangleMode === 'hsv') {
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = 'rgba(0,0,0,0.6)'
      ctx.shadowBlur = 3
      ctx.fillText('Matiz', A.x, A.y - 7)
      ctx.fillText('Branco', B.x + 4, B.y + 7)
      ctx.fillText('Preto', C.x - 4, C.y + 7)
    } else {
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = 'rgba(0,0,0,0.6)'
      ctx.shadowBlur = 3
      ctx.fillText('R', A.x, A.y - 7)
      ctx.fillText('G', B.x + 4, B.y + 7)
      ctx.fillText('B', C.x - 4, C.y + 7)
    }
    ctx.shadowBlur = 0

    // Posição do cursor / handle
    let handlePoint = { x: A.x, y: (B.y + A.y) / 2 }
    if (normalizedValue) {
      const bary = colorToBarycentric(normalizedValue, triangleMode)
      handlePoint = barycentricToPoint(bary.wA, bary.wB, bary.wC, A, B, C)
    }

    // Desenha o cursor (alça do seletor)
    ctx.beginPath()
    ctx.arc(handlePoint.x, handlePoint.y, 8, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetY = 1
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0

    ctx.beginPath()
    ctx.arc(handlePoint.x, handlePoint.y, 6, 0, Math.PI * 2)
    ctx.fillStyle = normalizedValue || '#7145d6'
    ctx.fill()
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.restore()
  }, [triangleMode, hue, normalizedValue])

  useEffect(() => {
    if (isOpen && activeTab === 'triangle') {
      renderTriangle()
    }
  }, [isOpen, activeTab, renderTriangle])

  // Trata cliques e arrastes no triângulo
  const handlePointerAction = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH
    const py = ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT

    const { A, B, C } = getTriangleVertices(CANVAS_WIDTH, CANVAS_HEIGHT, PADDING)
    const { wA, wB, wC } = pointToBarycentric(px, py, A, B, C)
    const rgb = barycentricToRgb(wA, wB, wC, triangleMode, hue)
    const nextHex = rgbToHex(rgb.r, rgb.g, rgb.b)

    onChange(property, nextHex)
  }

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    handlePointerAction(e)
  }

  const onPointerMove = (e) => {
    if (isDragging || e.buttons === 1) {
      handlePointerAction(e)
    }
  }

  const onPointerUp = (e) => {
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Ignora se não estiver capturado
    }
  }

  // Manipulação da mudança de matiz no slider
  const handleHueChange = (e) => {
    const nextHue = Number(e.target.value)
    setHue(nextHue)

    if (normalizedValue && triangleMode === 'hsv') {
      const rgb = hexToRgb(normalizedValue)
      if (rgb) {
        const { s, v } = rgbToHsv(rgb.r, rgb.g, rgb.b)
        const updatedRgb = hsvToRgb(nextHue, s, v)
        const updatedHex = rgbToHex(updatedRgb.r, updatedRgb.g, updatedRgb.b)
        onChange(property, updatedHex)
      }
    }
  }

  // Aplicação de código HEX manual
  const handleHexInputChange = (text) => {
    setHexDraft(text)
    if (isValidHex(text)) {
      const normalized = normalizeColorToHex(text)
      onChange(property, normalized)
    }
  }

  const copyHex = async () => {
    if (!normalizedValue) return
    try {
      await navigator.clipboard.writeText(normalizedValue.toUpperCase())
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Falha silenciosa de cópia
    }
  }

  return (
    <div ref={triggerRef} className="w-full min-w-0 rounded-xl border border-purple-100 bg-white p-2.5 shadow-2xs">
      {/* Cabeçalho do seletor no menu lateral */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-purple-700"
          >
            <span>{label}</span>
            <ChevronRight
              size={13}
              className={`transition-transform duration-150 ${isOpen ? 'rotate-90 text-purple-600' : 'text-slate-400'}`}
            />
          </button>

          {/* Chip de amostra com cor atual */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            title={
              normalizedValue
                ? `Cor atual: ${normalizedValue.toUpperCase()} (clique para abrir o seletor flutuante)`
                : 'Padrão (clique para escolher uma cor)'
            }
            className="flex items-center gap-1 rounded-md border border-purple-200 bg-purple-50/70 px-1.5 py-0.5 text-[11px] font-mono font-bold text-purple-900 hover:bg-purple-100 transition-colors"
          >
            <span
              className="size-3.5 rounded-full border border-slate-300 shadow-2xs"
              style={{ backgroundColor: normalizedValue || 'transparent' }}
            />
            <span>{normalizedValue ? normalizedValue.toUpperCase() : 'Padrão'}</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          {normalizedValue && (
            <button
              type="button"
              title="Restaurar cor padrão"
              onClick={() => onChange(property, '')}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-purple-700 hover:bg-purple-50 hover:text-purple-900"
            >
              <RotateCcw size={11} />
              Restaurar
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className={`flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold transition-all ${
              isOpen
                ? 'border-purple-600 bg-purple-600 text-white shadow-2xs'
                : 'border-purple-200 text-purple-800 hover:bg-purple-100'
            }`}
          >
            <Palette size={11} />
            <span>{isOpen ? 'Fechar' : 'Escolher'}</span>
          </button>
        </div>
      </div>

      {/* Amostras Rápidas (sempre visíveis no menu lateral para acesso com 1 clique) */}
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {QUICK_SWATCHES.map(([name, hex]) => {
          const isSelected = normalizedValue === hex
          return (
            <button
              key={hex}
              type="button"
              aria-label={`${label}: ${name}`}
              title={`${name} (${hex})`}
              aria-pressed={isSelected}
              onClick={() => onChange(property, hex)}
              className={`size-5.5 rounded-md border shadow-2xs transition-transform hover:scale-110 ${
                isSelected
                  ? 'border-transparent ring-2 ring-purple-600 ring-offset-1 scale-105'
                  : 'border-slate-300 hover:border-purple-400'
              }`}
              style={{ backgroundColor: hex }}
            />
          )
        })}
      </div>

      {/* Painel Flutuante do Triângulo das Cores (flutuando à esquerda do menu direito) */}
      {isOpen &&
        createPortal(
          <>
            {/* Backdrop invisível para capturar clique fora e fechar */}
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Caixa Flutuante à esquerda do menu direito */}
            <aside
              role="dialog"
              aria-label={`Seletor de cores: ${label}`}
              style={{
                top: `${coords.top}px`,
                right: `${coords.right}px`,
              }}
              onClick={(e) => e.stopPropagation()}
              className="fixed z-50 w-72 rounded-2xl border-2 border-purple-300 bg-white p-3.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Cabeçalho do Popover Flutuante */}
              <div className="mb-2.5 flex items-center justify-between border-b border-purple-100 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-purple-950">
                  <Triangle size={13} className="rotate-180 text-purple-600" />
                  <span>{label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar seletor de cores"
                  className="rounded-lg p-1 text-slate-400 hover:bg-purple-100 hover:text-purple-800 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Navegação de Abas */}
              <div role="tablist" aria-label="Modo de escolha de cor" className="flex rounded-lg bg-purple-100/70 p-0.5">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'triangle'}
                  onClick={() => setActiveTab('triangle')}
                  className={`flex flex-1 items-center justify-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-black transition-all ${
                    activeTab === 'triangle'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'text-purple-900 hover:bg-purple-200/60'
                  }`}
                >
                  <Triangle size={11} className="rotate-180" />
                  <span>Triângulo</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'hex'}
                  onClick={() => setActiveTab('hex')}
                  className={`flex flex-1 items-center justify-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-black transition-all ${
                    activeTab === 'hex'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'text-purple-900 hover:bg-purple-200/60'
                  }`}
                >
                  <Hash size={11} />
                  <span>HEX</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'presets'}
                  onClick={() => setActiveTab('presets')}
                  className={`flex flex-1 items-center justify-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-black transition-all ${
                    activeTab === 'presets'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'text-purple-900 hover:bg-purple-200/60'
                  }`}
                >
                  <Palette size={11} />
                  <span>Paleta</span>
                </button>
              </div>

              {/* Conteúdo Aba 1: Triângulo das Cores */}
              {activeTab === 'triangle' && (
                <div className="mt-2.5 flex flex-col items-center min-w-0">
                  {/* Seletor de modo do triângulo */}
                  <div className="mb-2 flex w-full items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-slate-600">Triângulo Cromático</span>
                    <div className="flex gap-1 text-[9px] font-bold">
                      <button
                        type="button"
                        onClick={() => setTriangleMode('hsv')}
                        title="Matiz e Sombra (HSV)"
                        className={`rounded px-1.5 py-0.5 transition-colors ${
                          triangleMode === 'hsv'
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
                        }`}
                      >
                        HSV
                      </button>
                      <button
                        type="button"
                        onClick={() => setTriangleMode('rgb')}
                        title="Primárias (RGB)"
                        className={`rounded px-1.5 py-0.5 transition-colors ${
                          triangleMode === 'rgb'
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
                        }`}
                      >
                        RGB
                      </button>
                    </div>
                  </div>

                  {/* Canvas do Triângulo */}
                  <div className="relative touch-none cursor-crosshair overflow-hidden rounded-xl border border-purple-200 bg-white shadow-inner">
                    <canvas
                      ref={canvasRef}
                      width={CANVAS_WIDTH}
                      height={CANVAS_HEIGHT}
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerUp}
                      className="block w-[220px] h-[140px]"
                    />
                  </div>

                  {/* Slider de Matiz Arco-íris (quando em modo HSV) */}
                  {triangleMode === 'hsv' && (
                    <div className="mt-2.5 w-full">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                        <span>Ajustar Matiz (Cor base)</span>
                        <span className="font-mono">{hue}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={hue}
                        onChange={handleHueChange}
                        className="mt-1 h-3.5 w-full cursor-pointer appearance-none rounded-lg border border-purple-200 shadow-inner"
                        style={{
                          background:
                            'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
                        }}
                      />
                    </div>
                  )}

                  {/* Pré-visualização rápida do Hex e amostra */}
                  <div className="mt-2.5 flex w-full items-center justify-between rounded-lg border border-purple-200 bg-purple-50/50 p-1.5 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-5 rounded-md border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: normalizedValue || '#ffffff' }}
                      />
                      <span className="font-mono text-xs font-black text-slate-800">
                        {normalizedValue ? normalizedValue.toUpperCase() : 'NENHUMA'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={copyHex}
                      title="Copiar código HEX"
                      className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-bold text-purple-700 hover:bg-purple-100"
                    >
                      {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                      <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Conteúdo Aba 2: Código HEX */}
              {activeTab === 'hex' && (
                <div className="mt-2.5 space-y-2.5 min-w-0">
                  <label className="block text-xs font-bold text-slate-700 min-w-0">
                    Código Hexadecimal (HEX)
                    <div className="mt-1 flex items-center gap-1.5 min-w-0">
                      <div className="relative min-w-0 flex-1">
                        <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-xs font-black text-purple-500">
                          #
                        </span>
                        <input
                          type="text"
                          aria-label="Código HEX"
                          placeholder="7145D6"
                          value={hexDraft.replace(/^#/, '')}
                          onChange={(e) => handleHexInputChange(e.target.value)}
                          className="w-full min-w-0 rounded-lg border border-purple-200 bg-white py-1.5 pl-6 pr-2 font-mono text-xs font-bold uppercase text-slate-800 focus:border-purple-500 focus:outline-hidden"
                        />
                      </div>

                      {/* Amostra visual */}
                      <span
                        className="size-7 shrink-0 rounded-lg border border-slate-300 shadow-xs"
                        style={{ backgroundColor: normalizedValue || '#ffffff' }}
                      />

                      {/* Seletor nativo do sistema */}
                      <label
                        title="Seletor de cor nativo do navegador"
                        className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-purple-200 bg-white text-purple-700 hover:bg-purple-50"
                      >
                        <Pipette size={13} />
                        <input
                          type="color"
                          aria-label="Seletor nativo de cor"
                          value={isValidHex(normalizedValue) ? normalizedValue : '#7145d6'}
                          onChange={(e) => onChange(property, e.target.value)}
                          className="sr-only"
                        />
                      </label>

                      {/* Botão copiar */}
                      <button
                        type="button"
                        onClick={copyHex}
                        title="Copiar código HEX"
                        className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-purple-200 bg-white text-purple-700 hover:bg-purple-50"
                      >
                        {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </label>

                  {/* Informações detalhadas do valor RGB */}
                  {normalizedValue && (
                    <div className="flex items-center justify-between rounded-lg border border-purple-100 bg-purple-50/50 px-2.5 py-1.5 text-[11px] text-slate-600 min-w-0">
                      <span className="font-bold">Valores RGB:</span>
                      <span className="font-mono text-purple-950 font-bold truncate">
                        {(() => {
                          const rgb = hexToRgb(normalizedValue)
                          return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '—'
                        })()}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Conteúdo Aba 3: Pré-definidas */}
              {activeTab === 'presets' && (
                <div className="mt-2.5 max-h-56 space-y-3 overflow-y-auto pr-1 min-w-0">
                  {PREDEFINED_PALETTES.map((palette) => (
                    <div key={palette.name}>
                      <p className="text-[10px] font-black uppercase tracking-wider text-purple-900">
                        {palette.name}
                      </p>
                      <div className="mt-1.5 grid grid-cols-7 gap-1">
                        {palette.colors.map((color) => {
                          const isSelected = normalizedValue === color.hex
                          return (
                            <button
                              key={color.hex}
                              type="button"
                              title={`${color.name} (${color.hex})`}
                              aria-label={`${label}: ${color.name}`}
                              aria-pressed={isSelected}
                              onClick={() => onChange(property, color.hex)}
                              className={`group relative size-6 rounded-md border shadow-2xs transition-transform hover:scale-110 ${
                                isSelected
                                  ? 'border-transparent ring-2 ring-purple-600 ring-offset-1 scale-105'
                                  : 'border-slate-300 hover:border-purple-500'
                              }`}
                              style={{ backgroundColor: color.hex }}
                            >
                              {isSelected && (
                                <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-sm">
                                  <Check size={10} strokeWidth={3} />
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </>,
          document.body,
        )}
    </div>
  )
}

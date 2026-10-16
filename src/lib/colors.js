/**
 * Utilitários de manipulação de cores e matemática do triângulo de cores.
 */

export function clamp(val, min = 0, max = 255) {
  return Math.max(min, Math.min(max, val))
}

export function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null
  let clean = hex.trim().replace(/^#/, '')
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('')
  }
  if (clean.length !== 6) return null
  const num = parseInt(clean, 16)
  if (Number.isNaN(num)) return null
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

export function rgbToHex(r, g, b) {
  const toHex = (c) => clamp(Math.round(c), 0, 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase()
}

export function rgbToHsv(r, g, b) {
  const normR = clamp(r, 0, 255) / 255
  const normG = clamp(g, 0, 255) / 255
  const normB = clamp(b, 0, 255) / 255

  const max = Math.max(normR, normG, normB)
  const min = Math.min(normR, normG, normB)
  const delta = max - min

  let h = 0
  let s = max === 0 ? 0 : delta / max
  let v = max

  if (delta !== 0) {
    if (max === normR) {
      h = ((normG - normB) / delta) % 6
    } else if (max === normG) {
      h = (normB - normR) / delta + 2
    } else {
      h = (normR - normG) / delta + 4
    }
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }

  return { h, s, v }
}

export function hsvToRgb(h, s, v) {
  const hue = ((h % 360) + 360) % 360
  const sat = clamp(s, 0, 1)
  const val = clamp(v, 0, 1)

  const c = val * sat
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = val - c

  let r0 = 0
  let g0 = 0
  let b0 = 0

  if (hue < 60) {
    r0 = c; g0 = x; b0 = 0
  } else if (hue < 120) {
    r0 = x; g0 = c; b0 = 0
  } else if (hue < 180) {
    r0 = 0; g0 = c; b0 = x
  } else if (hue < 240) {
    r0 = 0; g0 = x; b0 = c
  } else if (hue < 300) {
    r0 = x; g0 = 0; b0 = c
  } else {
    r0 = c; g0 = 0; b0 = x
  }

  return {
    r: Math.round((r0 + m) * 255),
    g: Math.round((g0 + m) * 255),
    b: Math.round((b0 + m) * 255),
  }
}

export const NAMED_COLORS = {
  white: '#ffffff',
  black: '#000000',
  red: '#ef4444',
  green: '#21824f',
  blue: '#2563eb',
  yellow: '#ffd56a',
  purple: '#7145d6',
  orange: '#ea580c',
  gray: '#94a3b8',
  transparent: 'transparent',
}

export function normalizeColorToHex(color) {
  if (!color || typeof color !== 'string') return ''
  const trimmed = color.trim().toLowerCase()
  if (!trimmed) return ''
  if (NAMED_COLORS[trimmed]) return NAMED_COLORS[trimmed]

  const rgbMatch = trimmed.match(/^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbMatch) {
    return rgbToHex(Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3]))
  }

  let clean = trimmed.replace(/^#/, '')
  if (/^[0-9a-f]{3}$/i.test(clean)) {
    clean = clean.split('').map((c) => c + c).join('')
  }
  if (/^[0-9a-f]{6}$/i.test(clean)) {
    return `#${clean}`.toLowerCase()
  }
  return trimmed
}

export function isValidHex(hex) {
  if (!hex || typeof hex !== 'string') return false
  const clean = hex.trim().replace(/^#/, '')
  return /^[0-9a-fA-F]{3}$/.test(clean) || /^[0-9a-fA-F]{6}$/.test(clean)
}

/**
 * Geometria e coordenadas baricêntricas do triângulo.
 */
export function getTriangleVertices(width = 220, height = 150, padding = 12) {
  return {
    A: { x: width / 2, y: padding },
    B: { x: padding, y: height - padding },
    C: { x: width - padding, y: height - padding },
  }
}

export function pointToBarycentric(px, py, A, B, C) {
  const det = (B.y - C.y) * (A.x - C.x) + (C.x - B.x) * (A.y - C.y)
  if (Math.abs(det) < 1e-6) {
    return { wA: 1 / 3, wB: 1 / 3, wC: 1 / 3 }
  }

  let wA = ((B.y - C.y) * (px - C.x) + (C.x - B.x) * (py - C.y)) / det
  let wB = ((C.y - A.y) * (px - C.x) + (A.x - C.x) * (py - C.y)) / det
  let wC = 1 - wA - wB

  // Projeção suave caso o clique ocorra fora do triângulo
  if (wA < 0) wA = 0
  if (wB < 0) wB = 0
  if (wC < 0) wC = 0

  const sum = wA + wB + wC
  if (sum > 0) {
    wA /= sum
    wB /= sum
    wC /= sum
  } else {
    wA = 1 / 3
    wB = 1 / 3
    wC = 1 / 3
  }

  return { wA, wB, wC }
}

export function barycentricToPoint(wA, wB, wC, A, B, C) {
  return {
    x: wA * A.x + wB * B.x + wC * C.x,
    y: wA * A.y + wB * B.y + wC * C.y,
  }
}

export function barycentricToRgb(wA, wB, wC, mode = 'hsv', hue = 0) {
  if (mode === 'rgb') {
    // Triângulo de Maxwell (Vermelho, Verde, Azul)
    const r = Math.round(wA * 255)
    const g = Math.round(wB * 255)
    const b = Math.round(wC * 255)
    return { r: clamp(r), g: clamp(g), b: clamp(b) }
  }

  // Modo HSV: A = Matiz puro, B = Branco, C = Preto
  const hueRgb = hsvToRgb(hue, 1, 1)
  const r = Math.round(wA * hueRgb.r + wB * 255)
  const g = Math.round(wA * hueRgb.g + wB * 255)
  const b = Math.round(wA * hueRgb.b + wB * 255)

  return { r: clamp(r), g: clamp(g), b: clamp(b) }
}

export function colorToBarycentric(color, mode = 'hsv') {
  const hex = normalizeColorToHex(color)
  const rgb = hexToRgb(hex) || { r: 113, g: 69, b: 214 }

  if (mode === 'rgb') {
    const sum = rgb.r + rgb.g + rgb.b
    if (sum === 0) {
      return { wA: 1 / 3, wB: 1 / 3, wC: 1 / 3, hue: 0 }
    }
    return {
      wA: rgb.r / sum,
      wB: rgb.g / sum,
      wC: rgb.b / sum,
      hue: 0,
    }
  }

  const { h, s, v } = rgbToHsv(rgb.r, rgb.g, rgb.b)
  const wA = s * v
  const wB = (1 - s) * v
  const wC = 1 - v

  return { wA, wB, wC, hue: h }
}

/**
 * Paletas de cores pré-definidas bem categorizadas.
 */
export const PREDEFINED_PALETTES = [
  {
    name: 'Cores Uebit',
    colors: [
      { name: 'Roxo Uebit', hex: '#7145d6' },
      { name: 'Verde Ação', hex: '#21824f' },
      { name: 'Azul Vivo', hex: '#2563eb' },
      { name: 'Laranja Quente', hex: '#ea580c' },
      { name: 'Coral', hex: '#d84062' },
      { name: 'Amarelo Ouro', hex: '#ffd56a' },
    ],
  },
  {
    name: 'Cores Vivas',
    colors: [
      { name: 'Vermelho', hex: '#ef4444' },
      { name: 'Laranja Solar', hex: '#f97316' },
      { name: 'Âmbar', hex: '#f59e0b' },
      { name: 'Esmeralda', hex: '#10b981' },
      { name: 'Ciano', hex: '#06b6d4' },
      { name: 'Azul Céu', hex: '#3b82f6' },
      { name: 'Índigo', hex: '#6366f1' },
      { name: 'Rosa Choque', hex: '#ec4899' },
    ],
  },
  {
    name: 'Especiais & Neutros',
    colors: [
      { name: 'Transparente', hex: 'transparent' },
      { name: 'Branco Puro', hex: '#ffffff' },
      { name: 'Papel', hex: '#faf9f3' },
      { name: 'Cinza Claro', hex: '#f1f5f9' },
      { name: 'Cinza Médio', hex: '#94a3b8' },
      { name: 'Ardósia', hex: '#475569' },
      { name: 'Grafite Escuro', hex: '#1e293b' },
      { name: 'Preto Absoluto', hex: '#000000' },
    ],
  },
  {
    name: 'Tons Pastéis',
    colors: [
      { name: 'Lavanda', hex: '#ede9fe' },
      { name: 'Menta', hex: '#dcfce7' },
      { name: 'Nuvem', hex: '#e0f2fe' },
      { name: 'Pêssego', hex: '#ffedd5' },
      { name: 'Creme', hex: '#fef9c3' },
      { name: 'Rosa Pastel', hex: '#fce7f3' },
    ],
  },
]

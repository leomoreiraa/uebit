export const SIDES = [['Top', 'Superior'], ['Right', 'Direita'], ['Bottom', 'Inferior'], ['Left', 'Esquerda']]
export const CORNERS = [['TopLeft', 'Superior esquerdo'], ['TopRight', 'Superior direito'], ['BottomRight', 'Inferior direito'], ['BottomLeft', 'Inferior esquerdo']]
export const BOX_PROPERTIES = [
  ...SIDES.flatMap(([side]) => [`margin${side}`, `padding${side}`, `border${side}Width`, `border${side}Style`, `border${side}Color`]),
  ...CORNERS.map(([corner]) => `border${corner}Radius`),
]
export const LENGTH_PROPERTIES = new Set([
  ...SIDES.flatMap(([side]) => [`margin${side}`, `padding${side}`, `border${side}Width`]),
  ...CORNERS.map(([corner]) => `border${corner}Radius`),
  'fontSize',
  'top',
  'right',
  'bottom',
  'left',
])
export const STYLE_PROPERTIES = [
  'color',
  'backgroundColor',
  'backgroundImage',
  'backgroundSize',
  'backgroundPosition',
  'backgroundRepeat',
  'position',
  'top',
  'bottom',
  'left',
  'right',
  'zIndex',
  'display',
  'opacity',
  'fontSize',
  'fontFamily',
  'lineHeight',
  'boxSizing',
  ...BOX_PROPERTIES,
]
export const cssProperty = (property) => property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

export function normalizeStyleValue(property, value) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed) return ''
  if (LENGTH_PROPERTIES.has(property) && /^-?\d+(\.\d+)?$/.test(trimmed)) {
    return `${trimmed}px`
  }
  return trimmed
}

export function validateStyle(property, value) {
  if (!STYLE_PROPERTIES.includes(property)) throw new Error('Propriedade visual inválida.')
  if (value && typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && !CSS.supports(cssProperty(property), value)) {
    throw new Error('Use um valor CSS válido, como 16px, 1rem ou 10%.')
  }
}

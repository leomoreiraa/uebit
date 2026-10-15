export const SIDES = [['Top', 'Superior'], ['Right', 'Direita'], ['Bottom', 'Inferior'], ['Left', 'Esquerda']]
export const CORNERS = [['TopLeft', 'Superior esquerdo'], ['TopRight', 'Superior direito'], ['BottomRight', 'Inferior direito'], ['BottomLeft', 'Inferior esquerdo']]
export const BOX_PROPERTIES = [
  ...SIDES.flatMap(([side]) => [`margin${side}`, `padding${side}`, `border${side}Width`, `border${side}Style`, `border${side}Color`]),
  ...CORNERS.map(([corner]) => `border${corner}Radius`),
]
export const STYLE_PROPERTIES = ['color', 'backgroundColor', 'fontSize', 'fontFamily', 'lineHeight', 'boxSizing', ...BOX_PROPERTIES]
export const cssProperty = (property) => property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

export function validateStyle(property, value) {
  if (!STYLE_PROPERTIES.includes(property)) throw new Error('Propriedade visual inválida.')
  if (value && !CSS.supports(cssProperty(property), value)) throw new Error('Use um valor CSS válido, como 16px, 1rem ou 10%.')
}

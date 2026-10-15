// Pointer movement is measured on screen; layout dimensions use unscaled CSS pixels.
export function resizeDimensions(rect, direction, dx, dy, scale) {
  const changes = { flexShrink: '0' }
  if (direction.includes('e') || direction.includes('w')) {
    const width = Math.min(rect.maxWidth ?? Infinity, Math.max(24, rect.width + dx / scale * (direction.includes('w') ? -1 : 1)))
    changes.width = `${Math.max(0, Math.round(width - (rect.width - rect.cssWidth)))}px`
  }
  if (direction.includes('n') || direction.includes('s')) {
    const height = Math.max(24, rect.height + dy / scale * (direction.includes('n') ? -1 : 1))
    changes.height = `${Math.max(0, Math.round(height - (rect.height - rect.cssHeight)))}px`
    changes.minHeight = '0px'
    changes.maxHeight = 'none'
  }
  return changes
}

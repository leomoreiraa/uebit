const START = '// UEBIT-BLOCKLY:START'
const END = '// UEBIT-BLOCKLY:END'

export function applyBlockCode(js, generated, previous) {
  const start = js.indexOf(START)
  const end = js.indexOf(END)
  const section = generated.trim() ? `${START}\n(() => {\nlet __uebitLoopBudget = 10000;\n${generated}\n})();\n${END}` : ''
  if (start < 0 && end < 0) {
    if (previous) throw new Error('O trecho dos blocos foi removido no JS. Restaure-o antes de reaplicar os blocos.')
    return { js: section ? `${js.trimEnd()}\n\n${section}\n` : js, applied: section }
  }
  if (start < 0 || end < start || js.slice(start, end + END.length) !== previous) {
    throw new Error('O trecho dos blocos foi editado no JS. Copie suas alterações para fora dos marcadores e restaure o trecho original antes de aplicar os blocos.')
  }
  return { js: js.slice(0, start) + section + js.slice(end + END.length), applied: section }
}

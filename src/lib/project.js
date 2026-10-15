import { readCode } from './code-engine.js'
import { MOBILE_WIDTHS } from './responsive.js'
import { findNode } from './tree.js'

export const DEFAULT_PROJECT_NAME = 'Meu primeiro site'
export const projectName = (name) => name.trim() || DEFAULT_PROJECT_NAME
// Control characters are intentionally excluded from downloaded filenames.
// eslint-disable-next-line no-control-regex
export const projectFilename = (name) => `${projectName(name).replace(/[<>:"/\\|?*\u0000-\u001f]/g, '-').replace(/[. ]+$/, '').slice(0, 120) || 'projeto'}.frog`

export function serializeProject(state) {
  return JSON.stringify({ format: 'uebit-frog', version: 2, ...state, name: projectName(state.name) }, null, 2) + '\n'
}

const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const codeFiles = (value) => object(value) && ['html', 'css', 'js'].every((key) => typeof value[key] === 'string')
const treeIdentity = (nodes) => nodes.map((node) => ({ id: node.id, type: node.type, children: treeIdentity(node.children ?? []) }))

export async function parseProject(text) {
  let project
  try { project = JSON.parse(text.replace(/^\uFEFF/, '')) }
  catch { throw new Error('O arquivo .frog não contém um JSON válido.') }
  if (!object(project) || project.format !== 'uebit-frog') throw new Error('Este arquivo não é um projeto Uebit .frog.')
  if (![1, 2].includes(project.version)) throw new Error('Versão de projeto .frog não suportada.')
  const { name, code, draft, elements, blockProject, editor } = project
  if (typeof name !== 'string' || !name.trim() || !codeFiles(code) || !codeFiles(draft) || !Array.isArray(elements)
    || !object(blockProject) || !['generated', 'applied', 'appliedGenerated'].every((key) => typeof blockProject[key] === 'string')
    || (blockProject.workspace != null && !object(blockProject.workspace))
    || !object(editor) || !['visual', 'programming', 'code'].includes(editor.view) || !['html', 'css', 'js', 'blocks'].includes(editor.codeTab)
    || !['styles', 'global', 'blocks', 'code'].includes(editor.panelTab) || !['html', 'css', 'js'].includes(editor.panelFile)
    || typeof editor.stageOpen !== 'boolean' || !['desktop', 'mobile'].includes(editor.device) || !MOBILE_WIDTHS.includes(editor.mobileWidth)
    || (editor.selectedId !== null && typeof editor.selectedId !== 'string')) {
    throw new Error('O projeto .frog está incompleto ou possui dados inválidos.')
  }
  // Preserve authored code rather than regenerating it from the layout snapshot.
  const restoredElements = readCode(code)
  // Derived appearance fields may evolve; older .frog files still use their original HTML/CSS.
  if (JSON.stringify(treeIdentity(restoredElements)) !== JSON.stringify(treeIdentity(elements))) throw new Error('O layout do projeto não corresponde ao código salvo.')
  let codeError = ''
  try { readCode(draft) }
  catch (error) { codeError = error.name === 'CssSyntaxError' ? `CSS, linha ${error.line}: ${error.reason}.` : error.message }
  if (!codeError && ['html', 'css', 'js'].some((key) => draft[key] !== code[key])) throw new Error('O rascunho válido não corresponde ao código salvo.')
  if (blockProject.workspace != null) {
    const { Blockly } = await import('./blockly.js')
    const workspace = new Blockly.Workspace()
    try { Blockly.serialization.workspaces.load(blockProject.workspace, workspace) }
    catch { throw new Error('O workspace Blockly do projeto é inválido ou contém blocos desconhecidos.') }
    finally { workspace.dispose() }
  }
  const view = editor.panelTab === 'blocks' || (editor.view === 'code' && editor.codeTab === 'blocks') ? 'programming' : editor.panelTab === 'code' ? 'code' : editor.view
  const codeTab = editor.panelTab === 'code' ? editor.panelFile : editor.codeTab === 'blocks' ? 'html' : editor.codeTab
  return { ...project, name: projectName(name), elements: restoredElements, codeError,
    editor: { ...editor, view, codeTab, panelFile: 'html', panelTab: editor.panelTab === 'global' ? 'global' : 'styles', selectedId: findNode(restoredElements, editor.selectedId)?.id ?? null } }
}

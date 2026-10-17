import { useEffect, useRef, useState } from 'react'
import { useBlocklyWorkspace } from 'react-blockly'
import {
  Blockly,
  MAGIC_RECIPES,
  insertMagicRecipe,
  javascriptGenerator,
  prepareWorkspace,
  toolbox,
  workspaceConfiguration,
} from '../lib/blockly'
import { Sparkles, Wand2 } from 'lucide-react'

export default function BlocksEditor({ project, targets, onProjectChange, onApply: _onApply, disabled: _disabled, expanded = false, active = true }) {
  const ref = useRef(null)
  const [initial] = useState(project.workspace)
  const callback = useRef(onProjectChange)
  const [generationError, setGenerationError] = useState('')
  const [recipesOpen, setRecipesOpen] = useState(false)

  useEffect(() => { callback.current = onProjectChange }, [onProjectChange])

  const { workspace } = useBlocklyWorkspace({
    ref,
    initialJson: initial,
    toolboxConfiguration: toolbox,
    workspaceConfiguration,
    onInject: (instance) => prepareWorkspace(instance, targets),
    onImportError: (failure) => setGenerationError(failure.message),
  })

  useEffect(() => {
    if (!workspace) return
    prepareWorkspace(workspace, targets)
    let previous = ''
    const changed = (event) => {
      if (event?.isUiEvent) return
      try {
        const saved = Blockly.serialization.workspaces.save(workspace)
        const serialized = JSON.stringify(saved)
        if (previous === serialized) return
        previous = serialized
        const generated = javascriptGenerator.workspaceToCode(workspace)
        callback.current({ workspace: saved, generated })
        setGenerationError('')
      } catch (failure) {
        setGenerationError(failure.message)
      }
    }
    workspace.addChangeListener(changed)
    const observer = new ResizeObserver(() => {
      if (ref.current?.clientWidth && ref.current?.clientHeight) Blockly.svgResize(workspace)
    })
    observer.observe(ref.current)
    changed()
    return () => {
      observer.disconnect()
      workspace.removeChangeListener(changed)
      Blockly.hideChaff()
    }
  }, [workspace, targets])

  useEffect(() => {
    if (!workspace) return
    if (!active) {
      Blockly.hideChaff()
      workspace.getToolbox()?.clearSelection()
      return
    }
    const frame = requestAnimationFrame(() => {
      if (ref.current?.clientWidth && ref.current?.clientHeight) Blockly.svgResize(workspace)
    })
    return () => cancelAnimationFrame(frame)
  }, [workspace, active])

  function handleInsertRecipe(recipeId) {
    if (!workspace) return
    insertMagicRecipe(workspace, recipeId)
    setRecipesOpen(false)
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="flex flex-col gap-2.5 border-b border-purple-200 bg-purple-50/70 px-3.5 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-0.5">
            <p className="text-xs font-bold leading-relaxed text-purple-950">
              Encaixe os blocos para dar vida ao seu site ou criar um jogo! 🎮
            </p>
            {targets.length === 0 && (
              <p className="text-[11px] font-bold text-purple-800">
                Dica: Adicione elementos em Design Visual para escolhê-los nos blocos.
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setRecipesOpen((prev) => !prev)}
              aria-expanded={recipesOpen}
              className="inline-flex h-8 min-h-8 items-center gap-1.5 rounded-full border-b-2 border-amber-600 bg-amber-400 px-3 text-xs font-black text-amber-950 shadow-xs transition-all hover:bg-amber-300 active:translate-y-0.5"
            >
              <Wand2 size={14} aria-hidden="true" />
              <span>Exemplos Mágicos ✨</span>
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-100/80 px-3 py-1 text-xs font-bold text-purple-900 shadow-xs">
              <Sparkles size={13} className="text-purple-600" />
              Lógica Visual
            </span>
          </div>
        </div>

        {recipesOpen && (
          <div
            role="region"
            aria-label="Exemplos mágicos de blocos"
            className="grid grid-cols-1 gap-2 rounded-2xl border-2 border-amber-300 bg-amber-50/90 p-2.5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {MAGIC_RECIPES.map((recipe) => (
              <button
                key={recipe.id}
                type="button"
                onClick={() => handleInsertRecipe(recipe.id)}
                className="flex min-h-0 flex-col items-start gap-1 rounded-xl border border-amber-200 bg-white p-2.5 text-left shadow-2xs transition-all hover:border-purple-400 hover:bg-purple-50/60"
              >
                <span className="text-xs font-black text-slate-900">{recipe.label}</span>
                <span className="text-[11px] font-medium leading-snug text-slate-600">{recipe.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {generationError && (
        <p role="alert" aria-label="Erro nos blocos" className="bg-red-50 p-2.5 text-xs font-bold text-red-700">
          {generationError}
        </p>
      )}
      <div ref={ref} aria-label="Workspace de blocos" className={`uebit-blocks w-full ${expanded ? 'min-h-0 flex-1' : 'h-140'}`} />
    </div>
  )
}

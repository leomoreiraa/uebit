import { useEffect, useRef, useState } from 'react'
import { useBlocklyWorkspace } from 'react-blockly'
import { Blockly, javascriptGenerator, prepareWorkspace, setWorkspaceTargets, toolbox, workspaceConfiguration } from '../lib/blockly'

export default function BlocksEditor({ project, targets, onProjectChange, onApply, disabled, expanded = false }) {
  const ref = useRef(null)
  const [initial] = useState(project.workspace)
  const callback = useRef(onProjectChange)
  const [error, setError] = useState('')
  const [generationError, setGenerationError] = useState('')
  useEffect(() => { callback.current = onProjectChange }, [onProjectChange])
  const { workspace } = useBlocklyWorkspace({ ref, initialJson: initial, toolboxConfiguration: toolbox, workspaceConfiguration, onInject: (instance) => prepareWorkspace(instance, targets), onImportError: (failure) => setGenerationError(failure.message) })

  useEffect(() => {
    if (!workspace) return
    setWorkspaceTargets(workspace, targets)
    let previous = ''
    const changed = (event) => {
      if (event?.isUiEvent) return
      try {
        const saved = Blockly.serialization.workspaces.save(workspace)
        const serialized = JSON.stringify(saved)
        if (previous === serialized) return
        previous = serialized
        callback.current({ workspace: saved })
        const generated = javascriptGenerator.workspaceToCode(workspace)
        callback.current({ workspace: saved, generated })
        setGenerationError('')
      } catch (failure) { setGenerationError(failure.message) }
    }
    workspace.addChangeListener(changed)
    const observer = new ResizeObserver(() => Blockly.svgResize(workspace))
    observer.observe(ref.current)
    changed()
    return () => { observer.disconnect(); workspace.removeChangeListener(changed); Blockly.hideChaff() }
  }, [workspace, targets])

  function apply() {
    try { onApply(); setError('') } catch (failure) { setError(failure.message) }
  }

  return <div className="min-w-0">
    <div className="space-y-2 border-b border-violet-200 bg-violet-50 p-3">
      <p className="text-xs leading-5 text-violet-900">Encaixe suas ações e escolha os elementos pelo nome. Os caminhos mostram em qual container cada elemento está. A categoria “Seletores CSS” mantém as opções avançadas.</p>
      {targets.length === 0 && <p className="text-xs text-violet-900">Adicione elementos em Design Visual para escolhê-los nos blocos.</p>}
      <button type="button" disabled={disabled || Boolean(generationError)} onClick={apply} className="min-h-11 rounded-xl border-b-4 border-violet-800 bg-violet-600 px-4 text-sm font-bold text-white disabled:opacity-50">Aplicar blocos ao site</button>
      <p role="status" className="text-xs text-slate-600">{generationError ? 'Revise os destinos dos blocos antes de aplicar. O site mantém a última versão aplicada.' : project.generated === project.appliedGenerated ? 'Blocos aplicados ao JS e à exportação.' : 'Há alterações nos blocos. Clique em Aplicar para atualizar o site e a exportação.'}</p>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {generationError && <p role="alert" aria-label="Erro nos blocos" className="text-sm text-red-700">{generationError}</p>}
    </div>
    <div ref={ref} aria-label="Workspace de blocos" className={`uebit-blocks w-full ${expanded ? 'h-[max(320px,calc(90dvh-240px))]' : 'h-140'}`} />
  </div>
}

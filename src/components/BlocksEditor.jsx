import { useEffect, useRef, useState } from 'react'
import { useBlocklyWorkspace } from 'react-blockly'
import { Blockly, javascriptGenerator, prepareWorkspace, setWorkspaceTargets, toolbox, workspaceConfiguration } from '../lib/blockly'
import { Sparkles } from 'lucide-react'

export default function BlocksEditor({ project, targets, onProjectChange, onApply: _onApply, disabled: _disabled, expanded = false }) {
  const ref = useRef(null)
  const [initial] = useState(project.workspace)
  const callback = useRef(onProjectChange)
  const [generationError, setGenerationError] = useState('')

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
    setWorkspaceTargets(workspace, targets)
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
    const observer = new ResizeObserver(() => Blockly.svgResize(workspace))
    observer.observe(ref.current)
    changed()
    return () => {
      observer.disconnect()
      workspace.removeChangeListener(changed)
      Blockly.hideChaff()
    }
  }, [workspace, targets])

  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-200 bg-purple-50/70 p-3.5">
        <div className="space-y-1">
          <p className="text-xs font-medium leading-relaxed text-purple-950">
            Encaixe os blocos para dar lógica ao seu site. Ações e eventos são aplicados automaticamente.
          </p>
          {targets.length === 0 && (
            <p className="text-[11px] font-bold text-purple-800">
              Dica: Adicione elementos em Design Visual para escolhê-los como alvos nos blocos.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900 shadow-xs">
            <Sparkles size={13} className="text-emerald-600" />
            Tempo real
          </span>
        </div>
      </div>
      {generationError && (
        <p role="alert" aria-label="Erro nos blocos" className="bg-red-50 p-2.5 text-xs font-bold text-red-700">
          {generationError}
        </p>
      )}
      <div ref={ref} aria-label="Workspace de blocos" className={`uebit-blocks w-full ${expanded ? 'h-[max(320px,calc(90dvh-240px))]' : 'h-140'}`} />
    </div>
  )
}

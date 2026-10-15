// Import authored source through the public project format; Monaco is read-only.
export async function importCodeProject(page, code, editor = {}) {
  const project = await page.evaluate(async ({ code, editor }) => {
    const { createInitialCode, readCode } = await import('/src/lib/code-engine.js')
    const files = { ...createInitialCode(), ...code }
    return { format: 'uebit-frog', version: 2, name: 'Projeto de teste', code: files, draft: files,
      elements: readCode(files), blockProject: { generated: '', applied: '', appliedGenerated: '' },
      editor: { view: 'visual', codeTab: 'html', panelTab: 'styles', panelFile: 'html', stageOpen: false, device: 'desktop', mobileWidth: 390, selectedId: null, ...editor } }
  }, { code, editor })
  await page.getByLabel('Arquivo do projeto .frog', { exact: true }).setInputFiles({ name: 'teste.frog', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(project)) })
  await page.getByText('Projeto “Projeto de teste” importado.', { exact: true }).waitFor()
  return project
}

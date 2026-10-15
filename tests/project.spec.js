import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'

async function save(page) {
  const pending = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Salvar Projeto', exact: true }).click()
  const download = await pending
  return { name: download.suggestedFilename(), buffer: await readFile(await download.path()) }
}

async function load(page, file) {
  await page.getByLabel('Arquivo do projeto .frog', { exact: true }).setInputFiles({ ...file, mimeType: 'application/json' })
}

test('frog restores nested layout, mobile styles, code, selection and Blockly, including unapplied edits', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/editor')
  await page.getByLabel('Nome do projeto', { exact: true }).fill('Minha aula')
  await page.getByRole('button', { name: 'Adicionar container', exact: true }).click()
  await page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true }).click()
  await page.getByLabel('Texto do título', { exact: true }).fill('Aprender criando')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await page.getByRole('button', { name: 'Mobile', exact: true }).click()
  await page.getByLabel('Largura da tela mobile').selectOption('430')
  await page.getByRole('button', { name: 'Altura: Média', exact: true }).click()
  const visual = await save(page)
  expect(visual.name).toBe('Minha aula.frog')
  expect(JSON.parse(visual.buffer).elements[0].children).toHaveLength(1)

  await page.getByRole('button', { name: 'Programação', exact: true }).click()
  await expect(page.locator('.blocklySvg').first()).toBeVisible()
  await page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    Blockly.serialization.workspaces.load({ blocks: { languageVersion: 0, blocks: [{ type: 'site_on_start', x: 80, y: 60,
      inputs: { DO: { block: { type: 'site_message', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Aplicado' } } } } } } } }] } }, Blockly.getMainWorkspace())
  })
  await expect(page.getByText('Há alterações nos blocos.', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Aplicar blocos ao site', exact: true }).click()
  await page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    Blockly.getMainWorkspace().getAllBlocks(false).find((block) => block.type === 'text').setFieldValue('Ainda não aplicado', 'TEXT')
  })
  await expect(page.getByText('Há alterações nos blocos.', { exact: false })).toBeVisible()
  const logic = await save(page)
  const original = JSON.parse(logic.buffer)
  expect(original.blockProject.generated).toContain('Ainda não aplicado')
  expect(original.code.js).toContain('Aplicado')
  expect(original.code.js).not.toContain('Ainda não aplicado')

  // Import while Blockly is mounted, then reopen after a full page reload.
  await load(page, visual)
  await expect(page.getByLabel('Texto do título', { exact: true })).toHaveValue('Aprender criando')
  await expect(page.getByLabel('Largura da tela mobile')).toHaveValue('430')
  await expect(page.frameLocator('iframe').locator('h1')).toHaveCSS('min-height', '160px')
  await page.reload()
  await load(page, logic)
  await expect(page.getByText('Projeto “Minha aula” importado.', { exact: true })).toBeVisible()
  await expect(page.locator('.blocklySvg').first()).toBeVisible()
  await expect(page.getByText('Há alterações nos blocos.', { exact: false })).toBeVisible()
  const restored = JSON.parse((await save(page)).buffer)
  expect(restored).toEqual(original)
  await load(page, logic)
  await expect(page.getByText('Projeto “Minha aula” importado.', { exact: true })).toBeVisible()
  expect(errors).toEqual([])
})

test('invalid projects leave the current work intact and the same file can be retried', async ({ page }) => {
  await page.goto('/editor')
  await page.getByRole('button', { name: 'Adicionar parágrafo', exact: true }).click()
  const file = await save(page)
  const original = JSON.parse(file.buffer)
  const cases = [
    '{broken',
    JSON.stringify({ ...original, version: 99 }),
    JSON.stringify({ ...original, code: null }),
    JSON.stringify({ ...original, blockProject: { ...original.blockProject, workspace: { blocks: { languageVersion: 0, blocks: [{ type: 'unknown_block' }] } } } }),
  ]
  for (const text of cases) {
    await load(page, { name: 'invalido.frog', buffer: Buffer.from(text) })
    await expect(page.getByRole('alert').filter({ hasText: /JSON válido|não suportada|dados inválidos|workspace Blockly/ })).toBeVisible()
    expect(JSON.parse((await save(page)).buffer)).toEqual(original)
  }
  await load(page, file)
  await expect(page.getByText('Projeto “Meu primeiro site” importado.', { exact: true })).toBeVisible()
})

test('saving preserves invalid code drafts and the last valid preview', async ({ page }) => {
  await page.goto('/editor')
  await page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true }).click()
  const initial = await save(page)
  const project = JSON.parse(initial.buffer)
  project.draft.css = 'body {'
  await load(page, { name: initial.name, buffer: Buffer.from(JSON.stringify(project)) })
  await expect(page.getByLabel('Erro no código', { exact: true })).toBeVisible()
  const file = await save(page)
  await page.reload()
  await load(page, file)
  await expect(page.getByLabel('Erro no código', { exact: true })).toBeVisible()
  await expect(page.frameLocator('iframe').locator('h1')).toHaveText('Minha primeira página')
  expect(JSON.parse((await save(page)).buffer)).toEqual(JSON.parse(file.buffer))
  await page.getByRole('button', { name: 'Descartar rascunho e usar última versão válida', exact: true }).click()
  await expect(page.getByLabel('Erro no código', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true })).toBeEnabled()
})

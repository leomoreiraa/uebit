import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { importCodeProject } from './helpers/project.js'

test('three isolated workspaces preserve selection and expose only read-only final code', async ({ page }) => {
  await page.goto('/editor')
  await page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true }).click()
  await page.getByLabel('Texto do título', { exact: true }).fill('Meu projeto visual')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await expect(page.getByRole('complementary')).toHaveCount(2)
  await page.getByRole('button', { name: 'Programação', exact: true }).click()
  await expect(page.locator('.blocklySvg')).toHaveCount(1)
  await expect(page.locator('iframe, .monaco-editor')).toHaveCount(0)
  await expect(page.getByRole('complementary')).toHaveCount(0)
  expect((await page.getByLabel('Workspace de blocos', { exact: true }).boundingBox()).width).toBeGreaterThan(1000)
  await page.getByRole('button', { name: 'Código Gerado', exact: true }).click()
  await expect(page.locator('.blocklySvg, iframe')).toHaveCount(0)
  await expect(page.getByRole('complementary')).toHaveCount(0)
  for (const label of ['HTML', 'CSS', 'JS']) {
    await page.getByRole('button', { name: label, exact: true }).click()
    const editor = page.getByRole('textbox', { name: `Código ${label} — somente leitura`, exact: true })
    await expect(editor).toBeVisible()
    await editor.focus()
    await page.keyboard.press('ControlOrMeta+A')
    await page.keyboard.insertText('NAO_DEVE_SER_GRAVADO')
    await expect(page.locator('.monaco-editor .view-lines')).not.toContainText('NAO_DEVE_SER_GRAVADO')
  }
  const pending = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Salvar Projeto', exact: true }).click()
  const file = await pending
  const buffer = await readFile(await file.path())
  const project = JSON.parse(buffer)
  expect(project.code.html).toContain('Meu projeto visual')
  expect(JSON.stringify(project.code)).not.toContain('NAO_DEVE_SER_GRAVADO')
  await page.reload()
  await page.getByLabel('Arquivo do projeto .frog', { exact: true }).setInputFiles({ name: 'abas.frog', mimeType: 'application/json', buffer })
  await expect(page.getByRole('button', { name: 'Código Gerado', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('button', { name: 'JS', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Design Visual', exact: true }).click()
  await expect(page.getByLabel('Texto do título', { exact: true })).toHaveValue('Meu projeto visual')
})

test('legacy frog tabs migrate into the dedicated workspaces', async ({ page }) => {
  await page.goto('/editor')
  const project = await importCodeProject(page, {})
  project.version = 1
  for (const editor of [
    { view: 'code', codeTab: 'blocks', panelTab: 'styles' },
    { view: 'visual', codeTab: 'html', panelTab: 'blocks' },
    { view: 'visual', codeTab: 'html', panelTab: 'code', panelFile: 'css' },
  ]) {
    project.editor = { ...project.editor, ...editor }
    await page.getByLabel('Arquivo do projeto .frog', { exact: true }).setInputFiles({ name: 'antigo.frog', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(project)) })
    const code = editor.panelTab === 'code'
    await expect(page.getByRole('button', { name: code ? 'Código Gerado' : 'Programação', exact: true })).toHaveAttribute('aria-pressed', 'true')
    if (code) await expect(page.getByRole('button', { name: 'CSS', exact: true })).toHaveAttribute('aria-pressed', 'true')
    else await expect(page.locator('.blocklySvg')).toHaveCount(1)
    await expect(page.getByRole('dialog')).toHaveCount(0)
  }
})

import { test, expect } from '@playwright/test'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import JSZip from 'jszip'

test('named nested Blockly targets survive reparenting and export; removed targets require reselection', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.getByRole('button', { name: 'Adicionar container', exact: true }).click()
  await page.getByRole('button', { name: 'Adicionar container', exact: true }).click()
  const preview = page.frameLocator('iframe')
  const nested = await preview.locator('.container > .container').getAttribute('data-block-id')
  await page.getByRole('button', { name: 'Adicionar botão', exact: true }).click()
  const button = await preview.getByRole('button').getAttribute('data-block-id')
  await page.locator(`[data-tree-id="${nested}"]`).click()
  await page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true }).click()
  const heading = await preview.getByRole('heading').getAttribute('data-block-id')
  await page.getByRole('button', { name: 'Código', exact: true }).click()
  await page.getByRole('button', { name: 'Blocos', exact: true }).click()
  await expect(page.locator('.blocklySvg').first()).toBeVisible()
  await page.evaluate(async ({ heading }) => {
    const { Blockly } = await import('/src/lib/blockly.js')
    Blockly.serialization.workspaces.load({ blocks: { languageVersion: 0, blocks: [{ type: 'site_click_element', id: 'event', x: 20, y: 30, inputs: { DO: { block: { type: 'site_text_element', id: 'action', fields: { TARGET: heading }, inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Ação dentro do container!' } } } } } } } }] } }, Blockly.getMainWorkspace())
  }, { heading })
  await expect(page.getByRole('button', { name: 'Aplicar blocos ao site', exact: true })).toBeDisabled()
  const position = await page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    const rect = Blockly.getMainWorkspace().getBlockById('event').getField('TARGET').getSvgRoot().getBoundingClientRect()
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
  })
  await page.mouse.click(position.x, position.y)
  await page.locator('.blocklyMenuItem').filter({ hasText: 'Container 1 › Container 1 › Botão 1: Saiba mais' }).click()
  await expect(page.getByRole('button', { name: 'Aplicar blocos ao site', exact: true })).toBeEnabled()
  const textOptions = await page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    return Blockly.getMainWorkspace().getBlockById('action').getField('TARGET').getOptions(false)
  })
  expect(textOptions.some(([, id]) => id === nested)).toBe(false)
  await page.getByRole('button', { name: 'Aplicar blocos ao site', exact: true }).click()
  await preview.getByRole('button', { name: 'Saiba mais' }).click()
  await expect(preview.getByRole('heading')).toHaveText('Ação dentro do container!')
  await page.getByRole('button', { name: 'Visual', exact: true }).click()
  await page.locator(`[data-tree-id="${button}"]`).click()
  await page.getByRole('button', { name: 'Sair do container', exact: true }).click()
  await page.getByRole('button', { name: 'Sair do container', exact: true }).click()
  await page.getByRole('button', { name: 'Código', exact: true }).click()
  await page.getByRole('button', { name: 'Blocos', exact: true }).click()
  await expect(page.locator('.blocklySvg').first()).toBeVisible()
  await expect(page.getByRole('button', { name: 'Aplicar blocos ao site', exact: true })).toBeEnabled()
  await preview.getByRole('button', { name: 'Saiba mais' }).click()
  await expect(preview.getByRole('heading')).toHaveText('Ação dentro do container!')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Exportar Site', exact: true }).click()
  const download = await downloadPromise
  const zip = await JSZip.loadAsync(await readFile(await download.path()))
  const folder = testInfo.outputPath('named-target-site')
  await mkdir(folder, { recursive: true })
  for (const name of ['index.html', 'style.css', 'script.js']) await writeFile(`${folder}/${name}`, await zip.file(name).async('string'))
  const exported = await page.context().newPage()
  await exported.goto(pathToFileURL(`${folder}/index.html`).href)
  await exported.getByRole('button', { name: 'Saiba mais' }).click()
  await expect(exported.getByRole('heading')).toHaveText('Ação dentro do container!')
  await page.getByRole('button', { name: 'Visual', exact: true }).click()
  await page.locator(`[data-tree-id="${button}"]`).click()
  await page.getByRole('button', { name: 'Excluir elemento', exact: true }).click()
  await page.getByRole('button', { name: 'Código', exact: true }).click()
  await page.getByRole('button', { name: 'Blocos', exact: true }).click()
  await expect(page.getByRole('alert', { name: 'Erro nos blocos' })).toContainText('destino está vazio ou foi removido')
  await expect(page.getByRole('button', { name: 'Aplicar blocos ao site', exact: true })).toBeDisabled()
  expect(errors).toEqual([])
})

test('manual HTML receives stable targets without replacing written CSS or JS', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Código', exact: true }).click()
  for (const [label, value] of [
    ['HTML', '<main class="site"><section><button>Manual</button></section></main>'],
    ['CSS', '.site { display: flex; padding: 37px; } button { color: rgb(190, 18, 60); }'],
    ['JS', 'window.manualLesson = 123;'],
  ]) {
    await page.getByRole('button', { name: label, exact: true }).click()
    await page.getByRole('textbox', { name: `Editor de ${label}`, exact: true }).focus()
    await page.keyboard.press('ControlOrMeta+A')
    await page.keyboard.insertText(value)
  }
  await page.getByRole('button', { name: 'Blocos', exact: true }).click()
  await expect(page.locator('.blocklySvg').first()).toBeVisible()
  await page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    Blockly.serialization.workspaces.load({ blocks: { languageVersion: 0, blocks: [{ type: 'site_click_element', fields: { TARGET: 'import-2' }, inputs: { DO: { block: { type: 'site_message', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'HTML manual conectado' } } } } } } } }] } }, Blockly.getMainWorkspace())
  })
  await expect(page.getByText('Há alterações nos blocos.', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Aplicar blocos ao site', exact: true }).click()
  const preview = page.frameLocator('iframe')
  await expect(preview.getByRole('button')).toHaveAttribute('data-block-id', 'import-2')
  await expect(preview.locator('main')).toHaveCSS('padding', '37px')
  await expect(preview.getByRole('button')).toHaveCSS('color', 'rgb(190, 18, 60)')
  await preview.getByRole('button', { name: 'Manual' }).click()
  await expect(preview.getByRole('status')).toHaveText('HTML manual conectado')
  expect(await preview.locator('body').evaluate(() => window.manualLesson)).toBe(123)
})

import { test, expect } from '@playwright/test'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import JSZip from 'jszip'

test('Blockly coexists with written JS, persists across views and exports working actions', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.getByRole('button', { name: 'Adicionar botão', exact: true }).click()
  await page.getByRole('button', { name: 'Código', exact: true }).click()
  await page.getByRole('button', { name: 'JS', exact: true }).click()
  await page.getByRole('textbox', { name: 'Editor de JS', exact: true }).focus()
  await page.keyboard.press('ControlOrMeta+A')
  await page.keyboard.insertText('window.manualCode = 42;')
  await page.getByRole('button', { name: 'Blocos', exact: true }).click()
  await expect(page.locator('.blocklySvg').first()).toBeVisible()
  await page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    const workspace = Blockly.getMainWorkspace()
    Blockly.serialization.workspaces.load({ blocks: { languageVersion: 0, blocks: [{ type: 'site_click', x: 40, y: 40, fields: { SELECTOR: '.button' }, inputs: { DO: { block: { type: 'site_message', inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Criei com blocos!' } } } } } } } }] } }, workspace)
  })
  await expect(page.getByText('Há alterações nos blocos.', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Aplicar blocos ao site', exact: true }).click()
  await expect(page.getByText('Blocos aplicados ao JS e à exportação.', { exact: true })).toBeVisible()
  await page.frameLocator('iframe').getByRole('button', { name: 'Saiba mais' }).click()
  await expect(page.frameLocator('iframe').getByRole('status')).toHaveText('Criei com blocos!')
  await expect.poll(() => page.frameLocator('iframe').locator('body').evaluate(() => window.manualCode)).toBe(42)
  await page.getByRole('button', { name: 'HTML', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Editor de HTML', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Play · Abrir palco', exact: true }).click()
  await page.getByRole('button', { name: 'Voltar ao editor', exact: true }).click()
  await page.getByRole('button', { name: 'Blocos', exact: true }).click()
  await expect(page.locator('.blocklySvg').first()).toBeVisible()
  await expect.poll(() => page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    return Blockly.getMainWorkspace().getAllBlocks(false).length
  })).toBe(3)
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Exportar Site', exact: true }).click()
  const download = await downloadPromise
  const zip = await JSZip.loadAsync(await readFile(await download.path()))
  const js = await zip.file('script.js').async('string')
  expect(js).toContain('window.manualCode = 42;')
  expect(js).toContain('Criei com blocos!')
  expect(js.match(/CNA-BLOCKLY:START/g)).toHaveLength(1)
  const folder = testInfo.outputPath('block-site')
  await mkdir(folder, { recursive: true })
  for (const name of ['index.html', 'style.css', 'script.js']) await writeFile(`${folder}/${name}`, await zip.file(name).async('string'))
  const exported = await page.context().newPage()
  await exported.goto(pathToFileURL(`${folder}/index.html`).href)
  await exported.getByRole('button', { name: 'Saiba mais' }).click()
  await expect(exported.getByRole('status')).toHaveText('Criei com blocos!')
  expect(await exported.evaluate(() => window.manualCode)).toBe(42)
  expect(errors).toEqual([])
})

test('a logic block can be dragged from the toolbox into the workspace', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Código', exact: true }).click()
  await page.getByRole('button', { name: 'Blocos', exact: true }).click()
  await page.locator('.blocklyToolboxCategory').filter({ hasText: 'Seletores CSS' }).click()
  const block = page.locator('.blocklyFlyout .blocklyDraggable').first()
  await expect(block).toBeVisible()
  await block.scrollIntoViewIfNeeded()
  const source = await block.boundingBox()
  const target = await page.getByLabel('Workspace de blocos', { exact: true }).boundingBox()
  await page.mouse.move(source.x + 30, source.y + 15)
  await page.mouse.down()
  await page.mouse.move(target.x + target.width - 100, target.y + 250, { steps: 20 })
  await page.mouse.up()
  await expect(page.getByText('Há alterações nos blocos.', { exact: false })).toBeVisible()
  await expect.poll(() => page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    return Blockly.getMainWorkspace().getTopBlocks(false).length
  })).toBe(1)
})

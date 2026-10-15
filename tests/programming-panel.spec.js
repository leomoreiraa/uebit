import { test, expect } from '@playwright/test'

test('programming opens with a visible flyout, supports dragging and preserves blocks on return', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/editor')
  await page.getByRole('button', { name: 'Adicionar botão', exact: true }).click()
  await expect(page.getByRole('complementary', { name: 'Paleta de elementos' }).locator('code')).toHaveCount(0)
  await page.getByRole('button', { name: 'Programação', exact: true }).click()
  const dialog = page.getByRole('main', { name: 'Programação', exact: true })
  await expect(dialog).toBeVisible()
  await dialog.locator('.blocklyToolboxCategory').filter({ hasText: 'Eventos' }).click()
  const block = dialog.locator('.blocklyFlyout .blocklyDraggable').first()
  await expect(block).toBeVisible()
  const source = await block.boundingBox()
  const area = await dialog.getByLabel('Workspace de blocos', { exact: true }).boundingBox()
  expect(source.x).toBeGreaterThanOrEqual(area.x)
  expect(source.x + source.width).toBeLessThanOrEqual(area.x + area.width)
  await page.mouse.move(source.x + 25, source.y + 15)
  await page.mouse.down()
  await page.mouse.move(area.x + area.width - 280, area.y + 150, { steps: 20 })
  await page.mouse.up()
  await expect.poll(() => page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    return Blockly.getMainWorkspace().getTopBlocks(false).length
  })).toBe(1)
  await page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    Blockly.getMainWorkspace().getTopBlocks(false)[0].getField('TARGET').getSvgRoot().setAttribute('data-test-target', 'true')
  })
  await dialog.locator('[data-test-target]').click()
  await expect(page.locator('.blocklyDropDownDiv')).toBeVisible()
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Design Visual', exact: true }).click()
  await expect(dialog).toHaveCount(0)
  await page.getByRole('button', { name: 'Programação', exact: true }).click()
  await expect(dialog).toBeVisible()
  await expect.poll(() => page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    return Blockly.getMainWorkspace()?.getTopBlocks(false).length
  })).toBe(1)
  await page.getByRole('button', { name: 'Código Gerado', exact: true }).click()
  await expect(page.locator('.blocklySvg')).toHaveCount(0)
  await expect(page.locator('iframe')).toHaveCount(0)
  await page.getByRole('button', { name: 'Programação', exact: true }).click()
  await expect(dialog).toBeVisible()
  await expect(page.locator('.blocklySvg')).toHaveCount(1)
  await expect(page.getByRole('complementary')).toHaveCount(0)
  await expect(page.locator('iframe')).toHaveCount(0)
  await expect.poll(() => page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    return Blockly.getMainWorkspace()?.getTopBlocks(false).length
  })).toBe(1)
  expect(errors).toEqual([])
})

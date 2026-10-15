import { test, expect } from '@playwright/test'

test('allows editing the name and HTML ID of items added to the canvas', async ({ page }) => {
  await page.goto('/')

  // Adicionar um cabeçalho
  await page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true }).click()

  // Selecionar o cabeçalho no Canvas / Propriedades
  await expect(page.getByRole('heading', { name: 'Editar cabeçalho' })).toBeVisible()

  // Preencher Nome do item e ID (HTML)
  await page.getByLabel('Nome do item', { exact: true }).fill('Título Principal')
  await page.getByLabel('ID do item', { exact: true }).fill('hero-title')

  // Aplicar alterações
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()

  // Verificar cabeçalho do inspetor atualizado
  await expect(page.getByRole('heading', { name: 'Editar Título Principal' })).toBeVisible()
  await expect(page.getByRole('form').getByText('#hero-title')).toBeVisible()

  // Verificar no iframe se os atributos id e data-name foram gravados no HTML
  const heading = page.frameLocator('iframe').locator('#hero-title')
  await expect(heading).toBeVisible()
  await expect(heading).toHaveAttribute('data-name', 'Título Principal')

  // Verificar na aba Código -> HTML
  await page.getByRole('button', { name: 'Código Gerado', exact: true }).click()
  await page.getByRole('button', { name: 'HTML', exact: true }).click()
  const editor = page.getByRole('textbox', { name: 'Código HTML — somente leitura', exact: true })
  await expect(editor).toBeVisible()

  // Verificar na aba Blocos se o elemento aparece na lista com seu novo nome e ID
  await page.getByRole('button', { name: 'Programação', exact: true }).click()
  await expect(page.locator('.blocklySvg').first()).toBeVisible()
  const targets = await page.evaluate(async () => {
    const { Blockly } = await import('/src/lib/blockly.js')
    const workspace = Blockly.getMainWorkspace()
    const block = workspace.newBlock('site_text_element')
    const field = block.getField('TARGET')
    const options = field.getOptions(false)
    block.dispose()
    return options
  })
  expect(targets.some(([label, id]) => id === 'hero-title' && label.includes('Título Principal') && label.includes('#hero-title'))).toBe(true)

  // Voltar ao Visual e renomear um container
  await page.getByRole('button', { name: 'Design Visual', exact: true }).click()
  await page.getByRole('button', { name: 'Adicionar container', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Editar container' })).toBeVisible()

  await page.getByLabel('Nome do item', { exact: true }).fill('Caixa de Destaque')
  await page.getByLabel('ID do item', { exact: true }).fill('caixa-destaque')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'Editar Caixa de Destaque' })).toBeVisible()
  const container = page.frameLocator('iframe').locator('#caixa-destaque')
  await expect(container).toBeVisible()
  await expect(container).toHaveAttribute('data-name', 'Caixa de Destaque')
})

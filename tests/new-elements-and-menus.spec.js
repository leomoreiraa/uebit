import { test, expect } from '@playwright/test'

test('category menus and HTML elements work without filters or counters', async ({ page }) => {
  await page.goto('/')

  const preview = page.frameLocator('iframe')

  await expect(page.getByRole('tablist', { name: 'Filtrar conjuntos de elementos' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Adicionar imagem', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Adicionar vídeo', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Adicionar áudio', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Adicionar botão', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Adicionar campo de texto', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Adicionar campo de texto', exact: true })).toBeVisible()

  // 2. Testar colapso/expansão de accordion
  const textoHeader = page.getByRole('button', { name: 'Texto', exact: true })
  await textoHeader.click()
  // Deve estar colapsado
  await expect(page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true })).toHaveCount(0)
  // Reabrir
  await textoHeader.click()
  await expect(page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true })).toBeVisible()

  // 3. Adicionar Citação (quote)
  await page.getByRole('button', { name: 'Adicionar citação', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Editar citação' })).toBeVisible()
  await page.getByLabel('Texto da citação', { exact: true }).fill('Penso, logo existo.')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await expect(preview.locator('blockquote')).toHaveText('Penso, logo existo.')

  // 4. Adicionar Lista (list)
  await page.getByRole('button', { name: 'Adicionar lista', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Editar lista' })).toBeVisible()
  await page.getByLabel('Itens da lista', { exact: true }).fill('Aprender HTML\nConstruir páginas\nPublicar no mundo')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await expect(preview.locator('ul li')).toHaveCount(3)
  await expect(preview.locator('ul li').first()).toHaveText('Aprender HTML')

  // 5. Adicionar Campo de texto (input)
  await page.getByRole('button', { name: 'Adicionar campo de texto', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Editar campo de texto' })).toBeVisible()
  await page.getByLabel('Texto de exemplo', { exact: true }).fill('Seu nome completo...')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await expect(preview.locator('input')).toHaveAttribute('placeholder', 'Seu nome completo...')

  // 6. Adicionar Linha divisória (divider / hr)
  await page.getByRole('button', { name: 'Adicionar linha divisória', exact: true }).click()
  await expect(preview.locator('hr')).toHaveCount(1)

  // 7. Adicionar Vídeo (video)
  await page.getByRole('button', { name: 'Adicionar vídeo', exact: true }).click()
  await expect(preview.locator('video')).toHaveCount(1)
  await expect(preview.locator('video')).toHaveAttribute('controls', '')

  // 8. Verificar que o editor de código HTML abre normalmente com os novos blocos
  await page.getByRole('button', { name: 'Código Gerado', exact: true }).click()
  await page.getByRole('button', { name: 'HTML', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Código HTML — somente leitura', exact: true })).toBeVisible()
})

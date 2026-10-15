import { test, expect } from '@playwright/test'

test('landing page renders Hero, 3 Showcase cards, Footer and navigates to editor', async ({ page }) => {
  // Go to root with landing flag so test environment doesn't bypass the landing page
  await page.goto('/?landing=true')

  // 1. Verify Hero Section
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Construa Sites Reais')
  await expect(page.getByText('Web Builder Visual & em Blocos', { exact: false })).toBeVisible()

  // 2. Verify Showcase Section with 3 colored cards
  await expect(page.getByRole('heading', { name: 'Inspire-se: Veja o que Você Pode Criar!', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Quiz & Mini-Game Interativo', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Portfólio de Desenhos & Fotos', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'História Interativa Espacial', exact: true })).toBeVisible()

  // 3. Verify Open Source & Educational Footer
  await expect(page.getByText('Projeto 100% Open Source e Educacional', { exact: false })).toBeVisible()
  await expect(page.getByText('sem rastreadores e sem cobranças', { exact: false })).toBeVisible()

  // 4. Click giant animated CTA "Começar a Criar" and verify navigation to /editor
  const cta = page.getByRole('link', { name: 'Começar a Criar', exact: false }).first()
  await expect(cta).toBeVisible()
  await cta.click()

  // Verify we arrived at /editor with editor tools visible
  await expect(page).toHaveURL(/\/editor/)
  await expect(page.getByRole('button', { name: 'Adicionar container', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Paleta de elementos', exact: true })).toBeVisible()
})

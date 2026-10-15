import { test, expect } from '@playwright/test'

test('template quiz-game loads interactive game with score bar and executes Blockly logic', async ({ page }) => {
  await page.goto('/editor?template=quiz-game')

  // Verify project name
  await expect(page.getByLabel('Nome do projeto')).toHaveValue('Quiz & Mini-Game Interativo')

  // Verify visual elements on preview iframe
  const frame = page.frameLocator('iframe')
  await expect(frame.getByRole('heading', { name: 'Qual é o animal terrestre mais veloz do mundo? 🐆' })).toBeVisible()
  await expect(frame.getByRole('button', { name: '🐢 A) Tartaruga Marinha' })).toBeVisible()
  const correctBtn = frame.getByRole('button', { name: '🐆 B) Guepardo Africano' })
  await expect(correctBtn).toBeVisible()
  await expect(frame.getByRole('button', { name: '🐘 C) Elefante Savana' })).toBeVisible()

  // Put canvas in test mode and click the correct answer
  await page.getByRole('button', { name: 'Testar página', exact: true }).click()
  await correctBtn.click()

  // Verify Blockly logic executed: score increased and feedback shown
  await expect(frame.getByText('⭐ Pontos: 100 (Acertou!)')).toBeVisible()
  await expect(frame.getByRole('heading', { name: '🎉 Resposta Correta!' })).toBeVisible()
})

test('template portfolio loads artist banner, like counter, and flexbox gallery', async ({ page }) => {
  await page.goto('/editor?template=portfolio')

  await expect(page.getByLabel('Nome do projeto')).toHaveValue('Portfólio de Desenhos & Fotos')

  const frame = page.frameLocator('iframe')
  await expect(frame.getByRole('heading', { name: 'Ateliê Criativo da Bia 🎨' })).toBeVisible()
  await expect(frame.getByRole('heading', { name: 'Obras em Destaque 🖼️' })).toBeVisible()
  await expect(frame.getByRole('heading', { name: 'Explosão Cósmica 🌈' })).toBeVisible()
  await expect(frame.getByRole('heading', { name: 'Dimensão Neon 🔮' })).toBeVisible()
  await expect(frame.getByRole('heading', { name: 'Aurora Mágica 🌌' })).toBeVisible()

  // Test interactive like button
  await page.getByRole('button', { name: 'Testar página', exact: true }).click()
  await frame.getByRole('button', { name: '❤️ Curtir Ateliê' }).click()
  await expect(frame.getByText('🎉 Você curtiu o ateliê! Total: 129 curtidas!')).toBeVisible()
})

test('template space-story loads cosmic mission, nebula image, and story choices', async ({ page }) => {
  await page.goto('/editor?template=space-story')

  await expect(page.getByLabel('Nome do projeto')).toHaveValue('História Interativa Espacial')

  const frame = page.frameLocator('iframe')
  await expect(frame.getByRole('heading', { name: 'O Mistério do Asteróide X-99 🪐' })).toBeVisible()
  await expect(frame.getByRole('heading', { name: 'Capitão no Comando! 📡' })).toBeVisible()
  await expect(frame.getByRole('button', { name: '🪐 1. Pousar e Explorar a Cratera' })).toBeVisible()
  await expect(frame.getByRole('button', { name: '🛡️ 2. Acionar Escudos e Escanear' })).toBeVisible()
  await expect(frame.getByRole('button', { name: '⚡ 3. Ativar Salto para o Hiperespaço' })).toBeVisible()

  // Test branch decision in test mode
  await page.getByRole('button', { name: 'Testar página', exact: true }).click()
  await frame.getByRole('button', { name: '🪐 1. Pousar e Explorar a Cratera' }).click()
  await expect(frame.getByRole('heading', { name: '💎 Cristais Energéticos Descobertos!' })).toBeVisible()
  await expect(frame.getByText('📊 Status: Missão Triunfal! Energia Ilimitada Descoberta! 🚀')).toBeVisible()
})

test('templates modal can be opened from header and loads selected project', async ({ page }) => {
  await page.goto('/editor')

  // Open Templates modal
  await page.getByRole('button', { name: 'Modelos de Projeto' }).click()
  await expect(page.getByRole('dialog', { name: 'Modelos de Projetos 🚀' })).toBeVisible()

  // Select "Quiz & Mini-Game Interativo"
  await page.getByRole('button', { name: 'Usar modelo Quiz & Mini-Game Interativo' }).click()

  // Dialog closes and template is loaded
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.getByLabel('Nome do projeto')).toHaveValue('Quiz & Mini-Game Interativo')

  const frame = page.frameLocator('iframe')
  await expect(frame.getByRole('heading', { name: 'Qual é o animal terrestre mais veloz do mundo? 🐆' })).toBeVisible()
})

test('backwards-compatible aliases map to corresponding rich showcase templates', async ({ page }) => {
  await page.goto('/editor?template=gamer')
  await expect(page.getByLabel('Nome do projeto')).toHaveValue('Portfólio de Desenhos & Fotos')

  await page.goto('/editor?template=magic-button')
  await expect(page.getByLabel('Nome do projeto')).toHaveValue('Quiz & Mini-Game Interativo')

  await page.goto('/editor?template=space-blog')
  await expect(page.getByLabel('Nome do projeto')).toHaveValue('História Interativa Espacial')
})

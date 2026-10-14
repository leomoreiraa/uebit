import { test, expect } from '@playwright/test'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import JSZip from 'jszip'

async function clickPreview(page, selector) {
  await expect(page.locator('iframe')).toHaveAttribute('data-ready', 'true')
  await page.locator('iframe').scrollIntoViewIfNeeded()
  const position = await page.frameLocator('iframe').locator(selector).evaluate((node) => {
    const rect = node.getBoundingClientRect()
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
  })
  const frame = await page.locator('iframe').evaluate((node) => {
    const rect = node.getBoundingClientRect()
    return { x: rect.x, y: rect.y, scale: rect.width / node.offsetWidth }
  })
  await page.mouse.click(frame.x + position.x * frame.scale, frame.y + position.y * frame.scale)
}

test.beforeEach(async ({ page }) => { await page.goto('/') })

test('content editing updates text, images and button actions in a three-file offline ZIP', async ({ page }, testInfo) => {
  const preview = page.frameLocator('iframe')
  await expect(page.getByRole('button', { name: 'Adicionar container', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true }).click()
  await page.getByLabel('Texto do título', { exact: true }).fill('Minha aventura na web')
  await page.getByLabel('Nível do título', { exact: true }).selectOption('h2')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await expect(preview.getByRole('heading', { level: 2 })).toHaveText('Minha aventura na web')

  await page.getByRole('button', { name: 'Adicionar parágrafo', exact: true }).click()
  await page.getByLabel('Texto do parágrafo', { exact: true }).fill('Aprendi a criar sites de verdade.')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await expect(preview.getByText('Aprendi a criar sites de verdade.', { exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Adicionar imagem', exact: true }).click()
  await page.getByLabel('Endereço da imagem', { exact: true }).fill('/images/landscape.svg?edited=1')
  await page.getByLabel('Descrição da imagem', { exact: true }).fill('Imagem de teste')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await expect(preview.getByRole('img')).toHaveAttribute('src', '/images/landscape.svg?edited=1')
  await page.getByLabel('Enviar imagem', { exact: true }).setInputFiles({ name: 'quadrado.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80"><rect width="120" height="80" fill="orange"/></svg>') })
  await page.getByLabel('Ajuste da imagem', { exact: true }).selectOption('contain')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await expect(preview.getByRole('img')).toHaveAttribute('src', /^data:image\/svg\+xml;base64,/)
  await expect(preview.getByRole('img')).toHaveCSS('object-fit', 'contain')
  await expect.poll(() => preview.getByRole('img').evaluate((node) => node.complete && node.naturalWidth > 0)).toBe(true)

  await page.getByRole('button', { name: 'Adicionar botão', exact: true }).click()
  await page.getByLabel('Texto do botão', { exact: true }).fill('Mostrar conquista')
  await page.getByLabel('Ação do botão', { exact: true }).selectOption('message')
  await page.getByLabel('Mensagem do botão', { exact: true }).fill('Meu site está pronto!')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  // Editing selects a button instead of executing it.
  await clickPreview(page, 'button')
  await expect(preview.getByRole('status')).toHaveCount(0)
  await page.getByRole('button', { name: 'Testar página', exact: true }).click()
  await clickPreview(page, 'button')
  await expect(preview.getByRole('status')).toHaveText('Meu site está pronto!')

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Exportar Site', exact: true }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('meu-site.zip')
  const zip = await JSZip.loadAsync(await readFile(await download.path()))
  expect(Object.keys(zip.files).sort()).toEqual(['index.html', 'script.js', 'style.css'])
  const html = await zip.file('index.html').async('string')
  expect(html).toContain('Minha aventura na web')
  expect(html).toContain('data:image/svg+xml;base64,')
  expect(html).toContain('href="style.css"')
  expect(html).toContain('src="script.js"')
  expect(html).not.toContain('cna-preview')
  const folder = testInfo.outputPath('exported-site')
  await mkdir(folder, { recursive: true })
  for (const name of Object.keys(zip.files)) await writeFile(`${folder}/${name}`, await zip.file(name).async('string'))
  const exported = await page.context().newPage()
  await exported.goto(pathToFileURL(`${folder}/index.html`).href)
  await expect(exported.getByRole('heading', { level: 2 })).toHaveText('Minha aventura na web')
  await expect.poll(() => exported.getByRole('img').evaluate((node) => node.complete && node.naturalWidth > 0)).toBe(true)
  await exported.getByRole('button', { name: 'Mostrar conquista' }).click()
  await expect(exported.getByRole('status')).toHaveText('Meu site está pronto!')
  await exported.setViewportSize({ width: 390, height: 844 })
  await expect(exported.getByRole('img')).toHaveCSS('width', '342px')
  expect(await exported.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('default assets are embedded and missing local assets produce an actionable error', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const { buildExportFiles } = await import('/src/lib/export-site.js')
    const files = await buildExportFiles({ html: '<h1>Teste</h1><img src="/images/landscape.svg">', css: 'body { background-image: url("/images/landscape.svg"); }', js: 'window.customCode = 42;' })
    let error = ''
    try { await buildExportFiles({ html: '<img src="/missing-file.png">', css: '', js: '' }) } catch (failure) { error = failure.message }
    return { files, error }
  })
  expect(result.files['index.html']).toContain('src="data:image/svg+xml;base64,')
  expect(result.files['style.css']).toContain('url("data:image/svg+xml;base64,')
  expect(result.files['script.js']).toBe('window.customCode = 42;')
  expect(result.error).toContain('Arquivo não encontrado')
})

test('button links, section targets, removal and moving edited blocks work', async ({ page, context }) => {
  await page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true }).click()
  await page.getByLabel('Texto do título', { exact: true }).fill('Seção de destino')
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await page.getByRole('button', { name: 'Adicionar botão', exact: true }).click()
  await page.getByLabel('Ação do botão', { exact: true }).selectOption('scroll')
  await page.getByLabel('Seção de destino', { exact: true }).selectOption({ label: 'Seção de destino' })
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await page.getByRole('button', { name: 'Testar página', exact: true }).click()
  await expect(page.locator('iframe')).toHaveAttribute('data-ready', 'true')
  const preview = page.frameLocator('iframe')
  await preview.getByRole('heading').evaluate((node) => { node.scrollIntoView = () => { node.dataset.scrolled = 'yes' } })
  await clickPreview(page, 'button')
  await expect(preview.getByRole('heading')).toHaveAttribute('data-scrolled', 'yes')
  await page.getByRole('button', { name: 'Voltar a editar', exact: true }).click()
  await page.getByLabel('Ação do botão', { exact: true }).selectOption('link')
  await page.getByLabel('Destino do link', { exact: true }).fill('https://example.test/destino')
  await page.getByLabel('Abrir em nova aba', { exact: true }).check()
  await page.getByRole('button', { name: 'Aplicar alterações', exact: true }).click()
  await page.getByRole('button', { name: 'Mover antes', exact: true }).click()
  await expect(preview.locator('.site > :first-child')).toHaveText('Saiba mais')
  await expect(preview.getByRole('button')).toHaveAttribute('data-site-value', 'https://example.test/destino')
  await context.route('https://example.test/**', (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Destino aberto</h1>' }))
  await page.getByRole('button', { name: 'Testar página', exact: true }).click()
  const popupPromise = context.waitForEvent('page')
  await clickPreview(page, 'button')
  const popup = await popupPromise
  await expect(popup.getByRole('heading')).toHaveText('Destino aberto')
  await popup.close()
  await page.getByRole('button', { name: 'Voltar a editar', exact: true }).click()
  await page.getByRole('button', { name: 'Excluir elemento', exact: true }).click()
  await expect(preview.getByRole('button')).toHaveCount(0)
  await expect(preview.getByRole('heading')).toHaveText('Seção de destino')
})

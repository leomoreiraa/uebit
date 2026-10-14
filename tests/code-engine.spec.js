import { test, expect } from '@playwright/test'

async function replaceCode(page, label, value) {
  await page.getByRole('button', { name: label, exact: true }).click()
  await page.getByRole('textbox', { name: `Editor de ${label}`, exact: true }).focus()
  await page.keyboard.press('ControlOrMeta+A')
  await page.keyboard.insertText(value)
}
test.beforeEach(async ({ page }) => { await page.goto('/') })

test('nested source round-trips, migrates old grid rules and preserves custom content, CSS and JS', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const { readCode, writeVisualCode, updateElementContent, parseHTML } = await import('/src/lib/code-engine.js')
    const { findNode, moveNode, removeNode } = await import('/src/lib/tree.js')
    const original = {
      html: '<main class="site"><div id="outer"><h2 id="title" data-lesson="keep">Título <em>especial</em></h2><div id="inner"><p id="text">Dentro</p></div></div><p id="last">Último</p></main>',
      css: '.site { display: grid; grid-template-columns: repeat(12, 1fr); } #outer { grid-column: 1 / span 6; border: 3px solid teal; } #title { letter-spacing: 2px; }',
      js: 'window.manual = 42;',
    }
    const tree = readCode(original)
    const next = writeVisualCode(original, moveNode(tree, 'last', 'inner', 0))
    const parsed = readCode(next)
    const content = updateElementContent(next, 'text', { ...findNode(parsed, 'text'), text: 'Editado dentro' })
    const removed = writeVisualCode(content, removeNode(readCode(content), 'inner'))
    let duplicateError = false
    try { readCode({ ...original, html: '<main class="site"><div id="same"><p id="same">Duplicado</p></div></main>' }) } catch { duplicateError = true }
    const document = parseHTML(next.html).document
    return { parent: findNode(parsed, 'last').parentId, text: document.querySelector('#title em').textContent,
      attribute: document.querySelector('#title').dataset.lesson, css: next.css, js: next.js,
      edited: content.html.includes('Editado dentro'), remaining: parseHTML(removed.html).nodes.map((node) => node.id), duplicateError }
  })
  expect(result).toMatchObject({ parent: 'inner', text: 'especial', attribute: 'keep', js: 'window.manual = 42;', edited: true, remaining: ['outer', 'title'], duplicateError: true })
  expect(result.css).toContain('display: flex')
  expect(result.css).not.toContain('grid-')
  expect(result.css).toContain('letter-spacing: 2px')
  expect(result.css).toContain('border: 3px solid teal')
})

test('manual nested HTML and JS remain editable; CSS errors preserve the last valid page', async ({ page }) => {
  await page.getByRole('button', { name: 'Código', exact: true }).click()
  await replaceCode(page, 'HTML', '<main class="site"><div id="box"><h1 id="title">Meu título</h1><button id="action">Testar JS</button></div></main>')
  await replaceCode(page, 'CSS', '.site, #box { display: flex; flex-direction: column; gap: 16px; } #title { color: rgb(190,18,60); }')
  await replaceCode(page, 'JS', "document.querySelector('#action').onclick = () => document.querySelector('#title').textContent = 'Funcionou!';")
  await page.frameLocator('iframe').getByRole('button', { name: 'Testar JS' }).click()
  await expect(page.frameLocator('iframe').getByRole('heading')).toHaveText('Funcionou!')
  await page.getByRole('button', { name: 'Visual', exact: true }).click()
  await page.locator('[data-tree-id="title"]').click()
  await page.getByRole('button', { name: 'Largura: Metade', exact: true }).click()
  await expect(page.frameLocator('iframe').getByRole('heading')).toHaveCSS('color', 'rgb(190, 18, 60)')
  await page.getByRole('button', { name: 'Código', exact: true }).click()
  await replaceCode(page, 'CSS', 'body { color: red; invalid-declaration }')
  await expect(page.getByRole('alert', { name: 'Erro no código' })).toBeVisible()
  await expect(page.frameLocator('iframe').getByRole('heading')).toHaveText('Meu título')
  await page.getByRole('button', { name: 'Visual', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Adicionar container', exact: true })).toBeDisabled()
})

test('mobile widths are fluid and preview remains isolated', async ({ page }) => {
  await page.getByRole('button', { name: 'Adicionar imagem', exact: true }).click()
  await page.getByRole('button', { name: 'Mobile', exact: true }).click()
  const preview = page.frameLocator('iframe')
  for (const width of ['320', '390', '430']) {
    await page.getByLabel('Largura da tela mobile', { exact: true }).selectOption(width)
    await expect.poll(() => preview.getByRole('img').evaluate((node) => node.getBoundingClientRect().width)).toBe(Number(width) - 48)
  }
  await expect(page.locator('iframe')).toHaveAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox')
  expect(await preview.locator('body').evaluate(() => { try { return Boolean(parent.document.body) } catch { return false } })).toBe(false)
})

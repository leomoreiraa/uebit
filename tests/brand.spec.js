import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import JSZip from 'jszip'

test('brand gallery renders SVGs and downloads a self-contained kit and individual icons', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/marca')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('dá um salto')
  await expect.poll(() => page.getByRole('img', { name: /Bit, o sapinho/ }).evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true)
  const validation = await page.evaluate(async () => {
    const { BRAND_ASSETS, BRAND_ICONS, brandAsset } = await import('/src/lib/brand-assets.js')
    const svgFiles = BRAND_ASSETS.filter(([file]) => file.endsWith('.svg'))
    const results = await Promise.all(svgFiles.map(async ([file]) => {
      const response = await fetch(brandAsset(file))
      const document = new DOMParser().parseFromString(await response.text(), 'image/svg+xml')
      return { file, ok: response.ok && !document.querySelector('parsererror') && document.documentElement.localName === 'svg' }
    }))
    const sprite = new DOMParser().parseFromString(await (await fetch(brandAsset('icons.svg'))).text(), 'image/svg+xml')
    return { results, iconsValid: BRAND_ICONS.every(([id]) => sprite.getElementById(id)) }
  })
  expect(validation.results.every((result) => result.ok)).toBe(true)
  expect(validation.iconsValid).toBe(true)
  await page.screenshot({ path: testInfo.outputPath('brand-desktop.png') })
  const pending = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Baixar kit de identidade visual', exact: true }).click()
  const download = await pending
  expect(download.suggestedFilename()).toBe('uebit-identidade-visual.zip')
  const zip = await JSZip.loadAsync(await readFile(await download.path()))
  expect(zip.file('uebit-logo.svg')).not.toBeNull()
  expect(zip.file('uebit-mascot.svg')).not.toBeNull()
  expect(zip.file('favicon.svg')).not.toBeNull()
  expect(zip.file('guia.md')).not.toBeNull()
  expect(Object.keys(zip.files).filter((name) => /^icons\/.+\.svg$/.test(name))).toHaveLength(30)
  const icon = page.getByRole('button', { name: 'Baixar ícone Código', exact: true })
  await icon.scrollIntoViewIfNeeded()
  await expect.poll(() => icon.locator('use').evaluate((node) => node.getBBox().width)).toBeGreaterThan(0)
  const next = page.waitForEvent('download')
  await icon.click()
  const single = await next
  expect(single.suggestedFilename()).toBe('uebit-code.svg')
  const svg = await readFile(await single.path(), 'utf8')
  expect(svg).toContain('http://www.w3.org/2000/svg')
  expect(svg).toContain('<path')
  expect(svg).not.toContain('<use')
  expect(svg).toBe(await zip.file('icons/code.svg').async('string'))
  expect(errors).toEqual([])
})

test('brand assets work on the landing and editor at small screen widths', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?landing=true')
  await expect.poll(() => page.getByRole('img', { name: /Bit, o sapinho/ }).evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true)
  await expect(page.locator('.uebit-mascot-float')).toHaveCSS('animation-name', 'none')
  await page.screenshot({ path: testInfo.outputPath('landing-mobile.png') })
  await page.getByRole('link', { name: 'Conheça a identidade visual', exact: true }).click()
  await expect(page).toHaveURL(/\/marca$/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.getByRole('link', { name: 'Abrir editor', exact: false }).click()
  await expect.poll(() => page.getByRole('img', { name: 'Uebit', exact: true }).evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true)
  await expect(page.getByRole('button', { name: 'Adicionar cabeçalho', exact: true })).toBeVisible()
  await expect.poll(() => page.getByRole('button', { name: 'Salvar Projeto', exact: true }).locator('use').evaluate((node) => node.getBBox().width)).toBeGreaterThan(0)
})

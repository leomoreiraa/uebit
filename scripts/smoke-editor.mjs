import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'
import { readFileSync } from 'node:fs'

function chromeBinary() {
  for (const binary of ['google-chrome', 'chromium', 'chromium-browser']) {
    if (spawnSync('which', [binary]).status === 0) return binary
  }
  throw new Error('Chrome/Chromium was not found on the CI runner')
}

const server = spawn('node', ['./node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173'], { stdio: 'pipe' })
let serverErrors = ''
server.stderr.on('data', (data) => { serverErrors += String(data) })

try {
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const r = await fetch('http://127.0.0.1:4173/')
      if (r.ok) break
    } catch { /* not ready yet */ }
    if (attempt === 49) throw new Error('Preview server failed to start: ' + serverErrors)
    await delay(250)
  }
  for (const [url, expected] of [
    ['http://127.0.0.1:4173/#/editor?lesson=primeiros-passos', ['Paleta de elementos', 'Seu primeiro site']],
    ['http://127.0.0.1:4173/#/editor?lesson=primeiros-passos&lang=en', ['Element palette', 'Your first website']],
    ['http://127.0.0.1:4173/#/editor?lesson=primeiros-passos&lang=th', ['ชุดองค์ประกอบ', 'เว็บไซต์แรกของคุณ']],
  ]) {
    const result = spawnSync(chromeBinary(), [
      '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu',
      '--disable-background-networking', '--no-first-run', '--virtual-time-budget=15000',
      '--dump-dom', url
    ], { encoding: 'utf8', timeout: 60000, maxBuffer: 8 * 1024 * 1024 })
    if (result.error) throw result.error
    console.log('Smoke URL:', url, 'exit:', result.status)
    for (const text of expected) {
      if (!result.stdout.includes(text)) {
        console.error('Browser stderr:', result.stderr.slice(-5500))
        console.error('Rendered DOM excerpt:', result.stdout.slice(0, 1800))
        console.error('Rendered DOM tail:', result.stdout.slice(-6000))
        const match = result.stdout.match(new RegExp('assets/(index-[^:]+[.]js):([0-9]+):([0-9]+)'))
        if (match) {
          const [, file, row, col] = match
          const source = readFileSync('dist/assets/' + file, 'utf8').split('\n')[Number(row) - 1]
          console.error('Bundled crash location:', source?.slice(Math.max(0, Number(col) - 400), Number(col) + 400))
        }
        throw new Error('Missing editor text: ' + text)
      }
    }
  }
  console.log('Editor smoke tests passed in English and Thai')
} finally {
  server.kill('SIGTERM')
}

import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

async function waitFor(url, max = 60) {
  for (let i = 0; i < max; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) return await response.json().catch(() => ({}))
    } catch { /* starting */ }
    await sleep(250)
  }
  throw new Error('Timed out loading ' + url)
}

function chromeBinary() {
  for (const binary of ['google-chrome', 'chromium', 'chromium-browser']) {
    if (spawnSync('which', [binary]).status === 0) return binary
  }
  throw new Error('Chrome not installed')
}

const site = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4181'], { stdio: 'ignore' })
let chrome
let socket
try {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch('http://127.0.0.1:4181/')).ok) break } catch { /* starting */ }
    if (i === 59) throw new Error('Vite preview unavailable')
    await sleep(250)
  }

  chrome = spawn(chromeBinary(), [
    '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu',
    '--no-first-run', '--disable-background-networking', '--remote-allow-origins=*',
    '--remote-debugging-port=9234', '--user-data-dir=/tmp/uebit-spotlight-' + process.pid,
    'http://127.0.0.1:4181/#/editor?lesson=primeiros-passos',
  ], { stdio: 'ignore' })
  await waitFor('http://127.0.0.1:9234/json/version')
  const tabs = await waitFor('http://127.0.0.1:9234/json')
  const page = tabs.find((tab) => tab.type === 'page' && tab.webSocketDebuggerUrl)
  assert.ok(page, 'Chrome tab not found')

  socket = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  let seq = 0
  const pending = new Map()
  socket.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data)
    const request = pending.get(msg.id)
    if (!request) return
    pending.delete(msg.id)
    if (msg.error || msg.result?.exceptionDetails) request.reject(new Error(JSON.stringify(msg.error || msg.result.exceptionDetails).slice(0, 2000)))
    else request.resolve(msg.result?.result?.value)
  })

  function evaluate(expression) {
    return new Promise((resolve, reject) => {
      const id = ++seq
      const timeout = setTimeout(() => { pending.delete(id); reject(new Error('Browser command timed out')) }, 20000)
      pending.set(id, {
        resolve: (result) => { clearTimeout(timeout); resolve(result) },
        reject: (error) => { clearTimeout(timeout); reject(error) },
      })
      socket.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression, returnByValue: true, awaitPromise: true } }))
    })
  }

  async function browser(expression) {
    return evaluate(`(async () => { ${expression} })()`)
  }

  const exists = await browser(`
    for (let i = 0; i < 60; i++) {
      if (document.querySelector('[data-testid="start-guided-tour-0"]')) return true;
      await new Promise(r => setTimeout(r, 200));
    }
    return false;
  `)
  assert.equal(exists, true, 'Lesson activities missing from editor')

  let current = await browser(`
    document.querySelector('[data-testid="start-guided-tour-0"]').click();
    await new Promise(r => setTimeout(r, 700));
    const card = document.querySelector('[data-testid="spotlight-card"]');
    return { active: !!card, target: card?.dataset.tourTarget, dimmers: document.querySelectorAll('[data-testid="lesson-spotlight"] > div[aria-hidden="true"]').length };
  `)
  assert.equal(current.active, true, 'Spotlight did not render')
  assert.equal(current.target, 'view-visual', 'Initial step points at wrong control')

  current = await browser(`
    document.querySelector('[data-tour-action="next"]').click();
    await new Promise(r => setTimeout(r, 500));
    return document.querySelector('[data-testid="spotlight-card"]')?.dataset.tourTarget;
  `)
  assert.equal(current, 'palette', 'Second step did not highlight the palette')

  current = await browser(`
    document.querySelector('[data-tour-action="next"]').click();
    await new Promise(r => setTimeout(r, 500));
    return { target: document.querySelector('[data-testid="spotlight-card"]')?.dataset.tourTarget, element: !!document.querySelector('[data-tour-element="heading"]') };
  `)
  assert.equal(current.target, 'element-heading')
  assert.equal(current.element, true)

  const afterClick = await browser(`
    document.querySelector('[data-tour-element="heading"]').click();
    await new Promise(r => setTimeout(r, 700));
    return !!document.querySelector('[data-element-id]');
  `)
  assert.equal(afterClick, true, 'Guided palette click did not add heading')

  const closed = await browser(`
    document.querySelector('[data-tour-action="close"]').click();
    await new Promise(r => setTimeout(r, 150));
    return !document.querySelector('[data-testid="lesson-spotlight"]');
  `)
  assert.equal(closed, true, 'Spotlight could not be closed')

  for (const [lang, label] of [['en', 'Interactive tutorial'], ['th', 'บทเรียนแบบโต้ตอบ']]) {
    const text = await browser(`
      location.hash = '#/editor?lesson=primeiros-passos&lang=${lang}';
      await new Promise(r => setTimeout(r, 550));
      document.querySelector('[data-testid="start-guided-tour-0"]').click();
      await new Promise(r => setTimeout(r, 350));
      const value = document.querySelector('[data-testid="spotlight-card"]')?.innerText || '';
      document.querySelector('[data-tour-action="close"]')?.click();
      return value;
    `)
    assert.ok(text.includes(label), 'Missing localized spotlight: ' + lang)
  }
  console.log('Guided lesson spotlight: click, highlight, navigate, edit, close, EN/TH passed')
} finally {
  if (socket && socket.readyState === WebSocket.OPEN) socket.close()
  if (chrome) chrome.kill('SIGTERM')
  site.kill('SIGTERM')
}

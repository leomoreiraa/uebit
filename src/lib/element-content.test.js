import assert from 'node:assert/strict'
import test from 'node:test'
import { syncActionScript, validateContent, readContent } from './element-content.js'

test('button actions retain manually authored JavaScript without duplicate handlers', () => {
  const document = { querySelector: () => ({}) }
  const original = 'window.lesson = "Preserve este código";'
  const first = syncActionScript(original, document)
  const second = syncActionScript(first, document)
  assert.ok(second.startsWith(original))
  assert.equal((second.match(/UEBIT-ACTIONS:START/g) ?? []).length, 1)
  assert.equal(second, first)
  const cleared = syncActionScript(second, { querySelector: () => null })
  assert.equal(cleared.trim(), original)
})

test('image editing supports uploaded images, local paths and hosted URLs', () => {
  for (const src of ['data:image/png;base64,AA==', '/images/test.svg', 'https://example.com/image.png']) {
    assert.doesNotThrow(() => validateContent('image', { src }))
  }
  assert.throws(() => validateContent('image', { src: '' }))
  assert.throws(() => validateContent('image', { src: 'file:///my-photo.png' }))
})

test('manual changes inside generated action code survive edits and removals', () => {
  const initial = syncActionScript('// Meu código', { querySelector: () => ({}) })
  const customized = initial.replace("background:'#1e293b'", "background:'purple'")
  assert.equal(syncActionScript(customized, { querySelector: () => ({}) }), customized)
  assert.equal(syncActionScript(customized, { querySelector: () => null }), customized)
})

test('button destinations are validated before updating the page', () => {
  assert.doesNotThrow(() => validateContent('button', { action: 'link', actionValue: 'https://example.com' }))
  assert.doesNotThrow(() => validateContent('button', { action: 'scroll', actionValue: '#lesson' }))
  assert.throws(() => validateContent('button', { action: 'link', actionValue: 'javascript:alert(1)' }))
  assert.throws(() => validateContent('button', { action: 'link', actionValue: '  java\nscript:alert(1)' }))
  assert.throws(() => validateContent('button', { action: 'message', actionValue: '' }))
})

test('element IDs are validated for valid HTML and CSS identifier format', () => {
  for (const htmlId of ['header', 'meu-botao', 'secao_1', 'card1']) {
    assert.doesNotThrow(() => validateContent('heading', { htmlId }))
  }
  for (const htmlId of ['123header', 'meu botao', 'id#test', 'card.item']) {
    assert.throws(() => validateContent('heading', { htmlId }))
  }
})

test('video and audio elements require a non-empty source and support data URLs, posters, and playback attributes', () => {
  assert.doesNotThrow(() => validateContent('video', { src: 'https://example.com/video.mp4', poster: 'https://example.com/poster.jpg' }))
  assert.doesNotThrow(() => validateContent('video', { src: 'data:video/mp4;base64,AAAA', poster: 'data:image/png;base64,AA==' }))
  assert.doesNotThrow(() => validateContent('audio', { src: 'https://example.com/audio.mp3' }))
  assert.doesNotThrow(() => validateContent('audio', { src: 'data:audio/mpeg;base64,AAAA' }))
  assert.throws(() => validateContent('video', { src: '' }))
  assert.throws(() => validateContent('video', { src: 'javascript:alert(1)' }))
  assert.throws(() => validateContent('video', { src: 'https://example.com/video.mp4', poster: 'javascript:alert(1)' }))
  assert.throws(() => validateContent('audio', { src: '   ' }))
  assert.throws(() => validateContent('audio', { src: 'javascript:alert(1)' }))

  const videoNode = {
    tagName: 'VIDEO',
    id: 'hero-video',
    style: {
      objectFit: 'cover',
      backgroundImage: 'url("https://example.com/bg.jpg")',
      backgroundSize: 'cover',
      position: 'sticky',
      top: '0px',
      zIndex: '50',
      display: 'none',
    },
    hasAttribute: (attr) => ['controls', 'autoplay', 'loop', 'muted', 'playsinline'].includes(attr),
    getAttribute: (attr) => (attr === 'src' ? 'https://example.com/v.mp4' : attr === 'poster' ? 'https://example.com/p.jpg' : null),
    querySelectorAll: () => [],
    textContent: '',
  }
  const readVideo = readContent(videoNode)
  assert.equal(readVideo.src, 'https://example.com/v.mp4')
  assert.equal(readVideo.poster, 'https://example.com/p.jpg')
  assert.equal(readVideo.controls, true)
  assert.equal(readVideo.autoplay, true)
  assert.equal(readVideo.loop, true)
  assert.equal(readVideo.muted, true)
  assert.equal(readVideo.playsInline, true)
  assert.equal(readVideo.hidden, true)
  assert.equal(readVideo.appearance.backgroundImage, 'url("https://example.com/bg.jpg")')
  assert.equal(readVideo.appearance.position, 'sticky')
  assert.equal(readVideo.appearance.zIndex, '50')
  assert.equal(readVideo.appearance.display, 'none')
})

test('readContent extracts list items and input placeholders', () => {
  const ul = {
    tagName: 'UL',
    id: 'my-list',
    style: {},
    getAttribute: (attr) => (attr === 'data-name' ? 'Lista de Tarefas' : null),
    querySelectorAll: (sel) => (sel === 'li' ? [{ textContent: 'Comprar pão' }, { textContent: 'Estudar' }] : []),
    textContent: 'Comprar pãoEstudar',
  }
  const ulContent = readContent(ul)
  assert.equal(ulContent.name, 'Lista de Tarefas')
  assert.equal(ulContent.htmlId, 'my-list')
  assert.equal(ulContent.text, 'Comprar pão\nEstudar')

  const input = {
    tagName: 'INPUT',
    id: 'user-input',
    style: {},
    getAttribute: (attr) => (attr === 'placeholder' ? 'Digite seu nome' : attr === 'value' ? 'Carlos' : null),
    querySelectorAll: () => [],
    textContent: '',
  }
  const inputContent = readContent(input)
  assert.equal(inputContent.placeholder, 'Digite seu nome')
  assert.equal(inputContent.text, 'Carlos')
})

test('readContent and validateContent support new HTML tags including break, link, textarea, select, checkbox, table and iframe', () => {
  assert.doesNotThrow(() => validateContent('iframe', { src: 'https://example.com' }))
  assert.throws(() => validateContent('iframe', { src: '' }))
  assert.doesNotThrow(() => validateContent('link', { href: 'https://exemplo.com' }))
  assert.doesNotThrow(() => validateContent('link', { href: '#secao' }))
  assert.throws(() => validateContent('link', { href: 'javascript:void(0)' }))

  const select = {
    tagName: 'SELECT',
    id: 'my-select',
    style: {},
    getAttribute: () => null,
    querySelectorAll: (sel) => (sel === 'option' ? [{ textContent: 'Opção 1' }, { textContent: 'Opção 2' }] : []),
    textContent: '',
  }
  assert.equal(readContent(select).text, 'Opção 1\nOpção 2')

  const table = {
    tagName: 'TABLE',
    id: 'my-table',
    style: {},
    getAttribute: () => null,
    querySelectorAll: (sel) => {
      if (sel === 'tr') {
        return [
          { querySelectorAll: () => [{ textContent: 'A' }, { textContent: 'B' }] },
          { querySelectorAll: () => [{ textContent: '1' }, { textContent: '2' }] },
        ]
      }
      return []
    },
    textContent: '',
  }
  assert.equal(readContent(table).text, 'A, B\n1, 2')

  const checkbox = {
    tagName: 'LABEL',
    id: 'my-check',
    style: {},
    getAttribute: () => null,
    querySelectorAll: () => [],
    querySelector: (sel) => (sel === 'input[type="checkbox"]' ? { hasAttribute: () => true } : { textContent: 'Concordo' }),
    textContent: 'Concordo',
  }
  const checkContent = readContent(checkbox)
  assert.equal(checkContent.checked, true)
  assert.equal(checkContent.text, 'Concordo')

  const br = {
    tagName: 'BR',
    id: 'my-break',
    style: {},
    getAttribute: () => null,
    querySelectorAll: () => [],
    textContent: '',
  }
  assert.equal(readContent(br).tagName, 'br')
})


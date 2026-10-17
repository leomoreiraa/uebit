import { useState } from 'react'
import { Paintbrush, Maximize2, Image as ImageIcon, Pin, Layers } from 'lucide-react'
import BoxModelControls from './BoxModelControls'
import ColorPicker from './ColorPicker'

const buttonClass = 'flex min-h-9 flex-1 items-center justify-center rounded-xl border-2 border-purple-200 bg-white px-2.5 text-xs font-bold text-purple-900 shadow-xs transition-all hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40'
const fieldClass = 'min-h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-2 focus:outline-indigo-500'

function extractBgUrl(bgImage = '') {
  const match = bgImage.match(/^url\(['"]?(.*?)['"]?\)$/i)
  return match ? match[1] : ''
}

export default function AppearanceControls({ element, layout = {}, device, disabled, onAppearanceChange, onUpdateLayout }) {
  const appearance = element.appearance ?? {}
  const hasText = ['heading', 'paragraph', 'button', 'quote', 'list', 'ordered-list', 'input', 'textarea', 'link', 'strong', 'em', 'code', 'span', 'select', 'checkbox', 'table', 'custom'].includes(element.type)
  const change = (property, value) => onAppearanceChange(element.id, property, value)
  const [bgError, setBgError] = useState('')

  const bgUrl = extractBgUrl(appearance.backgroundImage)
  const isDataBg = bgUrl.startsWith('data:')

  const applyBgUrl = (rawUrl) => {
    const trimmed = rawUrl.trim()
    setBgError('')
    if (!trimmed) {
      change({
        backgroundImage: '',
        backgroundSize: '',
        backgroundPosition: '',
        backgroundRepeat: '',
      })
      return
    }
    const safeUrl = trimmed.replace(/"/g, '%22')
    change({
      backgroundImage: `url("${safeUrl}")`,
      backgroundSize: appearance.backgroundSize || 'cover',
      backgroundPosition: appearance.backgroundPosition || 'center',
      backgroundRepeat: appearance.backgroundRepeat || 'no-repeat',
    })
  }

  const handleBgFile = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!/^image\/(png|jpe?g|gif|webp|avif|svg\+xml)$/.test(file.type)) {
      setBgError('Escolha uma imagem PNG, JPEG, WebP, GIF, AVIF ou SVG.')
      return
    }
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Não foi possível ler a imagem de fundo.'))
        reader.readAsDataURL(file)
      })
      applyBgUrl(dataUrl)
    } catch (err) {
      setBgError(err.message)
    }
  }

  const currentPinMode =
    appearance.position === 'sticky'
      ? 'sticky-top'
      : appearance.position === 'fixed' && appearance.bottom
        ? 'fixed-bottom'
        : appearance.position === 'fixed'
          ? 'fixed-top'
          : 'normal'

  const applyPinMode = (mode) => {
    if (mode === 'sticky-top') {
      change({ position: 'sticky', top: '0px', bottom: '', left: '', right: '', zIndex: appearance.zIndex || '50' })
    } else if (mode === 'fixed-top') {
      change({ position: 'fixed', top: '0px', bottom: '', left: '0px', right: '0px', zIndex: appearance.zIndex || '50' })
    } else if (mode === 'fixed-bottom') {
      change({ position: 'fixed', bottom: '16px', top: '', right: '16px', left: '', zIndex: appearance.zIndex || '50' })
    } else {
      change({ position: '', top: '', bottom: '', left: '', right: '' })
    }
  }

  return (
    <fieldset disabled={disabled} aria-label="Aparência do elemento" className="mt-4 space-y-4 rounded-2xl border-2 border-purple-200 bg-purple-50/50 p-3.5 shadow-xs disabled:opacity-50">
      <legend className="flex items-center gap-1.5 px-1 text-xs font-black uppercase tracking-wider text-purple-950">
        <Paintbrush aria-hidden="true" size={15} className="text-purple-600" />
        Visual & Estilo
      </legend>

      {/* Cores */}
      <div className="rounded-xl border border-purple-100 bg-white p-3 space-y-3">
        {hasText && <ColorPicker label="Cor do texto" property="color" value={appearance.color} onChange={change} />}
        <ColorPicker label="Cor de fundo" property="backgroundColor" value={appearance.backgroundColor} onChange={change} />
        {element.type === 'image' && <p className="text-[11px] text-slate-500">O fundo aparece se a imagem não preencher todo o bloco.</p>}
      </div>

      {/* Imagem de Fundo */}
      <div className="rounded-xl border border-purple-100 bg-white p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-purple-950">
            <ImageIcon aria-hidden="true" size={14} className="text-purple-600" />
            Imagem de Fundo
          </h3>
          {bgUrl && (
            <button
              type="button"
              onClick={() => applyBgUrl('')}
              className="text-[10px] font-bold text-red-600 underline hover:text-red-800"
            >
              Remover fundo
            </button>
          )}
        </div>
        <label className="block text-[11px] font-bold text-slate-600">
          Endereço da imagem de fundo (URL)
          <input
            type="text"
            aria-label="Endereço da imagem de fundo"
            value={isDataBg ? '' : bgUrl}
            placeholder={isDataBg ? 'Imagem enviada do computador' : 'https://... (.jpg, .png, .webp)'}
            onChange={(event) => applyBgUrl(event.target.value)}
            className={`${fieldClass} mt-1`}
          />
        </label>
        <label className="block text-[11px] font-bold text-slate-600">
          Enviar imagem de fundo do computador
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml"
            onChange={handleBgFile}
            className="mt-1 block w-full text-xs text-slate-500 file:mr-2 file:cursor-pointer file:rounded-lg file:border-0 file:bg-purple-100 file:px-2.5 file:py-1.5 file:font-bold file:text-purple-800 hover:file:bg-purple-200"
          />
        </label>
        {bgError && <p role="alert" className="text-[11px] font-bold text-red-600">{bgError}</p>}
        {bgUrl && (
          <div className="space-y-2 border-t border-purple-100 pt-2">
            <div>
              <span className="text-[11px] font-bold text-slate-600">Ajuste do fundo</span>
              <div className="mt-1 flex gap-1.5">
                {[
                  ['Cobrir', 'cover', 'no-repeat'],
                  ['Inteira', 'contain', 'no-repeat'],
                  ['Repetir', 'auto', 'repeat'],
                ].map(([label, size, repeat]) => {
                  const active = (appearance.backgroundSize || 'cover') === size && (appearance.backgroundRepeat || 'no-repeat') === repeat
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => change({ backgroundSize: size, backgroundRepeat: repeat })}
                      className={`${buttonClass} ${active ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700' : ''}`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-600">Posição do fundo</span>
              <div className="mt-1 flex gap-1.5">
                {[
                  ['Topo', 'top'],
                  ['Centro', 'center'],
                  ['Base', 'bottom'],
                ].map(([label, pos]) => {
                  const active = (appearance.backgroundPosition || 'center') === pos
                  return (
                    <button
                      key={pos}
                      type="button"
                      aria-pressed={active}
                      onClick={() => change('backgroundPosition', pos)}
                      className={`${buttonClass} ${active ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700' : ''}`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixar Menu & Camadas */}
      <div className="rounded-xl border border-purple-100 bg-white p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-purple-950">
            <Pin aria-hidden="true" size={14} className="text-purple-600" />
            Fixar Menu & Camadas
          </h3>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-600">Comportamento na rolagem (Menu Fixo)</span>
          <div className="mt-1 grid grid-cols-2 gap-1.5">
            {[
              ['Normal', 'normal'],
              ['Fixar Topo (Sticky)', 'sticky-top'],
              ['Flutuante Topo', 'fixed-top'],
              ['Flutuante Base', 'fixed-bottom'],
            ].map(([label, mode]) => (
              <button
                key={mode}
                type="button"
                aria-pressed={currentPinMode === mode}
                onClick={() => applyPinMode(mode)}
                className={`${buttonClass} ${
                  currentPinMode === mode
                    ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                    : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
            <Layers aria-hidden="true" size={12} />
            Ordem da camada (z-index)
          </span>
          <div className="mt-1 flex gap-1.5">
            {[
              ['Padrão', ''],
              ['Frente (10)', '10'],
              ['Acima (50)', '50'],
              ['Topo (999)', '999'],
            ].map(([label, z]) => (
              <button
                key={label}
                type="button"
                aria-pressed={(appearance.zIndex || '') === z}
                onClick={() => change('zIndex', z)}
                className={`${buttonClass} ${
                  (appearance.zIndex || '') === z
                    ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                    : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-600">Visibilidade da camada (para JS / Modais)</span>
          <div className="mt-1 flex gap-1.5">
            <button
              type="button"
              aria-pressed={appearance.display !== 'none'}
              onClick={() => change('display', '')}
              className={`${buttonClass} ${
                appearance.display !== 'none'
                  ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                  : ''
              }`}
            >
              Visível na página
            </button>
            <button
              type="button"
              aria-pressed={appearance.display === 'none'}
              onClick={() => change('display', 'none')}
              className={`${buttonClass} ${
                appearance.display === 'none'
                  ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                  : ''
              }`}
            >
              Oculta (exibir via JS)
            </button>
          </div>
        </div>
      </div>

      {/* Tipografia */}
      {hasText && (
        <div className="rounded-xl border border-purple-100 bg-white p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Tamanho do texto</span>
            {appearance.fontSize && (
              <button
                type="button"
                onClick={() => change('fontSize', '')}
                className="text-[10px] font-bold text-purple-700 underline hover:text-purple-900"
              >
                Padrão
              </button>
            )}
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {[
              ['P (16px)', '16px'],
              ['M (24px)', '24px'],
              ['G (36px)', '36px'],
            ].map(([label, size]) => (
              <button
                key={size}
                type="button"
                aria-pressed={appearance.fontSize === size}
                onClick={() => change('fontSize', size)}
                className={`${buttonClass} ${
                  appearance.fontSize === size
                    ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                    : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dimensões do bloco */}
      <div className="rounded-xl border border-purple-100 bg-white p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-xs font-bold text-purple-950">
            <Maximize2 aria-hidden="true" size={14} className="text-purple-600" />
            Dimensões ({device === 'mobile' ? 'Mobile' : 'Desktop'})
          </h3>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-600">Largura</span>
          <div className="mt-1 flex gap-1.5">
            {[
              ['Natural', 'auto'],
              ['Metade', 'calc(50% - 8px)'],
              ['Toda (100%)', '100%'],
            ].map(([label, width]) => (
              <button
                key={width}
                type="button"
                aria-pressed={layout.width === width}
                onClick={() => onUpdateLayout(element.id, { width })}
                className={`${buttonClass} ${
                  layout.width === width
                    ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                    : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-600">Altura mínima</span>
          <div className="mt-1 flex gap-1.5">
            {[
              ['Natural', '0px'],
              ['Média (160)', '160px'],
              ['Alta (320)', '320px'],
            ].map(([label, minHeight]) => (
              <button
                key={minHeight}
                type="button"
                aria-pressed={layout.minHeight === minHeight && (!layout.height || layout.height === 'auto')}
                onClick={() => onUpdateLayout(element.id, { height: 'auto', minHeight })}
                className={`${buttonClass} ${
                  layout.minHeight === minHeight && (!layout.height || layout.height === 'auto')
                    ? 'border-purple-600 bg-purple-600 text-white hover:bg-purple-700'
                    : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Espaçamento e Bordas com BoxModelControls */}
      <div className="rounded-xl border border-purple-100 bg-white p-3">
        <BoxModelControls key={element.id} values={appearance} onChange={change} />
      </div>
    </fieldset>
  )
}

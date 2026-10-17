import { useMemo, useState } from 'react'
import { readGlobalStyles } from '../lib/code-engine'
import BoxModelControls, { StyleField } from './BoxModelControls'
import ColorPicker from './ColorPicker'
import { Paintbrush, Type, LayoutGrid, Image as ImageIcon } from 'lucide-react'

const fontOptions = [
  ['system-ui, sans-serif', 'Sistema (Moderna & Padrão)'],
  ['ui-rounded, "Aptos", sans-serif', 'Arredondada (Amigável)'],
  ['Georgia, serif', 'Clássica (Serifada)'],
  ['ui-monospace, monospace', 'Código (Monoespaçada)'],
  ['Impact, fantasy', 'Impacto (Marcante)'],
]

const fieldClass = 'min-h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-2 focus:outline-indigo-500'
const buttonClass = 'flex min-h-9 flex-1 items-center justify-center rounded-xl border-2 border-purple-200 bg-white px-2.5 text-xs font-bold text-purple-900 shadow-xs transition-all hover:bg-purple-50'

function extractBgUrl(bgImage = '') {
  const match = bgImage.match(/^url\(['"]?(.*?)['"]?\)$/i)
  return match ? match[1] : ''
}

export default function GlobalStylesPanel({ code, disabled, onChange }) {
  const [selector, setSelector] = useState('body')
  const [bgError, setBgError] = useState('')
  const values = useMemo(() => readGlobalStyles(code, selector), [code, selector])
  const change = (property, value) => onChange(selector, property, value)

  const bgUrl = extractBgUrl(values.backgroundImage)
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
      backgroundSize: values.backgroundSize || 'cover',
      backgroundPosition: values.backgroundPosition || 'center',
      backgroundRepeat: values.backgroundRepeat || 'no-repeat',
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

  return (
    <div className="mt-3 space-y-4">
      {/* Alvo do seletor */}
      <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/70 p-3 shadow-xs">
        <span className="block text-xs font-black uppercase tracking-wider text-purple-900">
          Onde aplicar estes estilos?
        </span>
        <div className="mt-2 flex gap-1.5 rounded-xl bg-purple-200/60 p-1">
          <button
            type="button"
            onClick={() => setSelector('body')}
            className={`flex-1 rounded-lg py-1.5 text-xs font-black transition-all ${
              selector === 'body'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Página (body)
          </button>
          <button
            type="button"
            onClick={() => setSelector('*')}
            className={`flex-1 rounded-lg py-1.5 text-xs font-black transition-all ${
              selector === '*'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-900 hover:bg-purple-100'
            }`}
          >
            Todos os blocos (*)
          </button>
        </div>
      </div>

      <fieldset disabled={disabled} className="space-y-4 disabled:opacity-50">
        {/* Cores Globais */}
        <div className="rounded-2xl border-2 border-purple-100 bg-white p-3.5 shadow-xs space-y-3">
          <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-950">
            <Paintbrush size={14} className="text-purple-600" />
            Cores Globais
          </h3>
          <ColorPicker
            label={`Cor de fundo (${selector})`}
            property="backgroundColor"
            value={values.backgroundColor}
            onChange={change}
          />
          <ColorPicker
            label={`Cor do texto (${selector})`}
            property="color"
            value={values.color}
            onChange={change}
          />
        </div>

        {/* Imagem de Fundo da Página */}
        {selector === 'body' && (
          <div className="rounded-2xl border-2 border-purple-100 bg-white p-3.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-950">
                <ImageIcon size={14} className="text-purple-600" />
                Imagem de Fundo da Página
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
                aria-label="Endereço da imagem de fundo da página"
                value={isDataBg ? '' : bgUrl}
                placeholder={isDataBg ? 'Imagem enviada do computador' : 'https://... (.jpg, .png, .webp)'}
                onChange={(event) => applyBgUrl(event.target.value)}
                className={`${fieldClass} mt-1`}
              />
            </label>
            <label className="block text-[11px] font-bold text-slate-600">
              Enviar imagem do computador
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
                      const active = (values.backgroundSize || 'cover') === size && (values.backgroundRepeat || 'no-repeat') === repeat
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
              </div>
            )}
          </div>
        )}

        {/* Tipografia Global */}
        <div className="rounded-2xl border-2 border-purple-100 bg-white p-3.5 shadow-xs space-y-3">
          <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-950">
            <Type size={14} className="text-purple-600" />
            Tipografia Global
          </h3>
          <StyleField
            property="fontFamily"
            label="Família da fonte"
            value={values.fontFamily}
            onChange={change}
            options={fontOptions}
          />
          <div className="grid grid-cols-2 gap-2">
            <StyleField
              property="fontSize"
              label="Tamanho base do texto"
              value={values.fontSize}
              onChange={change}
              options={[
                ['14px', 'Pequeno (14px)'],
                ['16px', 'Normal (16px)'],
                ['18px', 'Médio (18px)'],
                ['20px', 'Grande (20px)'],
              ]}
            />
            <StyleField
              property="lineHeight"
              label="Espaçamento entre linhas"
              value={values.lineHeight}
              onChange={change}
              options={[
                ['1.2', 'Justo (1.2)'],
                ['1.5', 'Normal (1.5)'],
                ['1.75', 'Amplo (1.75)'],
              ]}
            />
          </div>
        </div>

        {/* Espaçamento e Bordas Globais */}
        <div className="rounded-2xl border-2 border-purple-100 bg-white p-3.5 shadow-xs space-y-3">
          <h3 className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-950">
            <LayoutGrid size={14} className="text-purple-600" />
            Espaçamento & Bordas
          </h3>
          <BoxModelControls values={values} onChange={change} />
        </div>
      </fieldset>
    </div>
  )
}

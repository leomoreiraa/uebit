import { useState } from 'react'
import { elementTypes } from '../data/elements'

const fieldClass = 'min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-2 focus:outline-indigo-500'

export default function ElementInspector({ element, elements, onUpdate, onRemove, disabled }) {
  const [content, setContent] = useState(() => ({
    name: element.name ?? '',
    htmlId: element.htmlId ?? '',
    text: '',
    src: '',
    alt: '',
    placeholder: '',
    fit: 'cover',
    headingLevel: 'h1',
    action: 'none',
    actionValue: '',
    newTab: false,
    ...element,
  }))
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  const name = elementTypes.find((item) => item.type === element.type)?.name ?? 'Bloco HTML'
  const change = (key, value) => { setContent((current) => ({ ...current, [key]: value })); setSaved(false); setError('') }

  async function loadImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!/^image\/(png|jpe?g|gif|webp|avif|svg\+xml)$/.test(file.type)) { setError('Escolha um arquivo de imagem PNG, JPEG, WebP, GIF, AVIF ou SVG.'); return }
    setLoadingImage(true)
    try {
      const src = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Não foi possível abrir essa imagem.'))
        reader.readAsDataURL(file)
      })
      change('src', src)
    } catch (error) { setError(error.message) }
    finally { setLoadingImage(false) }
  }

  function submit(event) {
    event.preventDefault()
    try { onUpdate(element.id, content); setSaved(true); setError('') }
    catch (error) { setError(error.message) }
  }

  return (
    <form onSubmit={submit} aria-label={`Editar ${content.name || name.toLowerCase()}`} className="mt-4 border-t-2 border-violet-100 pt-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-violet-900">Editar {content.name ? content.name : name.toLowerCase()}</h2>
        <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-bold text-violet-800">{content.htmlId ? `#${content.htmlId}` : 'Selecionado'}</span>
      </div>
      <fieldset disabled={disabled} className="space-y-4 disabled:opacity-50">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <label className="block text-xs font-bold text-slate-700">Nome do item
            <input type="text" aria-label="Nome do item" placeholder={name} value={content.name} onChange={(event) => change('name', event.target.value)} className={`${fieldClass} mt-1`} />
          </label>
          <label className="block text-xs font-bold text-slate-700">ID (HTML)
            <input type="text" aria-label="ID do item" placeholder="ex: meu-id" value={content.htmlId} onChange={(event) => change('htmlId', event.target.value)} className={`${fieldClass} mt-1`} />
          </label>
        </div>
        {element.type === 'container' && <p className="text-xs leading-5 text-emerald-900">Este container agrupa {element.children.length} elementos. Excluí-lo também remove todo o conteúdo dentro dele.</p>}
        {element.type === 'divider' && <p className="rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">Linha divisória horizontal para separar e organizar seções na página.</p>}
        {['heading', 'paragraph', 'quote', 'button'].includes(element.type) && (
          <label className="block text-xs font-medium text-slate-600">
            {element.type === 'heading' ? 'Texto do título' : element.type === 'paragraph' ? 'Texto do parágrafo' : element.type === 'quote' ? 'Texto da citação' : 'Texto do botão'}
            <textarea
              aria-label={element.type === 'heading' ? 'Texto do título' : element.type === 'paragraph' ? 'Texto do parágrafo' : element.type === 'quote' ? 'Texto da citação' : 'Texto do botão'}
              rows={element.type === 'heading' || element.type === 'button' ? 2 : 4}
              value={content.text}
              onChange={(event) => change('text', event.target.value)}
              className={`${fieldClass} mt-1 resize-y`}
            />
          </label>
        )}
        {element.type === 'list' && (
          <label className="block text-xs font-medium text-slate-600">
            Itens da lista (um por linha)
            <textarea
              aria-label="Itens da lista"
              rows={5}
              value={content.text}
              onChange={(event) => change('text', event.target.value)}
              placeholder="Primeiro item&#10;Segundo item&#10;Terceiro item"
              className={`${fieldClass} mt-1 resize-y font-sans`}
            />
          </label>
        )}
        {element.type === 'input' && (
          <>
            <label className="block text-xs font-medium text-slate-600">
              Texto de exemplo (placeholder)
              <input
                type="text"
                aria-label="Texto de exemplo"
                value={content.placeholder ?? ''}
                onChange={(event) => change('placeholder', event.target.value)}
                placeholder="ex: Digite sua resposta..."
                className={`${fieldClass} mt-1`}
              />
            </label>
            <label className="block text-xs font-medium text-slate-600">
              Texto inicial preenchido (opcional)
              <input
                type="text"
                aria-label="Texto inicial preenchido"
                value={content.text ?? ''}
                onChange={(event) => change('text', event.target.value)}
                className={`${fieldClass} mt-1`}
              />
            </label>
          </>
        )}
        {['video', 'audio'].includes(element.type) && (
          <label className="block text-xs font-medium text-slate-600">
            {element.type === 'video' ? 'Endereço do vídeo (URL)' : 'Endereço do áudio (URL)'}
            <input
              type="text"
              aria-label={element.type === 'video' ? 'Endereço do vídeo' : 'Endereço do áudio'}
              value={content.src ?? ''}
              onChange={(event) => change('src', event.target.value)}
              placeholder={element.type === 'video' ? 'https://... (.mp4, WebM)' : 'https://... (.mp3, OGG, WAV)'}
              className={`${fieldClass} mt-1`}
            />
          </label>
        )}
        {element.type === 'heading' && <label className="block text-xs font-medium text-slate-600">Nível do título
          <select aria-label="Nível do título" value={content.headingLevel} onChange={(event) => change('headingLevel', event.target.value)} className={`${fieldClass} mt-1`}>
            {[1, 2, 3, 4, 5, 6].map((level) => <option key={level} value={`h${level}`}>H{level}{level === 1 ? ' · Título principal' : ' · Subtítulo'}</option>)}
          </select>
        </label>}
        {element.type === 'image' && <>
          <label className="block text-xs font-medium text-slate-600">Endereço da imagem
            <input type="text" value={content.src.startsWith('data:') ? '' : content.src} placeholder={content.src.startsWith('data:') ? 'Imagem enviada do computador' : 'https://...'} onChange={(event) => change('src', event.target.value)} className={`${fieldClass} mt-1`} />
          </label>
          <label className="block text-xs font-medium text-slate-600">Enviar imagem
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml" onChange={loadImage} className="mt-2 block w-full text-xs text-slate-500 file:mr-2 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:font-medium file:text-indigo-700" />
          </label>
          <label className="block text-xs font-medium text-slate-600">Descrição da imagem
            <input type="text" value={content.alt} onChange={(event) => change('alt', event.target.value)} className={`${fieldClass} mt-1`} />
          </label>
          <label className="block text-xs font-medium text-slate-600">Ajuste da imagem
            <select aria-label="Ajuste da imagem" value={content.fit} onChange={(event) => change('fit', event.target.value)} className={`${fieldClass} mt-1`}>
              <option value="cover">Preencher área</option><option value="contain">Mostrar imagem inteira</option>
            </select>
          </label>
        </>}
        {element.type === 'button' && <>
          <label className="block text-xs font-medium text-slate-600">Ação do botão
            <select aria-label="Ação do botão" value={content.action} onChange={(event) => { change('action', event.target.value); change('actionValue', '') }} className={`${fieldClass} mt-1`}>
              <option value="none">Sem ação automática</option><option value="link">Abrir link</option><option value="scroll">Ir para uma seção</option><option value="message">Mostrar mensagem</option>
            </select>
          </label>
          {content.action === 'link' && <>
            <label className="block text-xs font-medium text-slate-600">Destino do link
              <input type="text" placeholder="https://exemplo.com" value={content.actionValue} onChange={(event) => change('actionValue', event.target.value)} className={`${fieldClass} mt-1`} />
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" checked={content.newTab} onChange={(event) => change('newTab', event.target.checked)} />Abrir em nova aba</label>
          </>}
          {content.action === 'scroll' && <label className="block text-xs font-medium text-slate-600">Seção de destino
            <select aria-label="Seção de destino" value={content.actionValue} onChange={(event) => change('actionValue', event.target.value)} className={`${fieldClass} mt-1`}>
              <option value="">Escolha um elemento</option>
              {elements.filter((item) => item.id !== element.id).map((item) => (
                <option key={item.id} value={`#${item.htmlId || item.id}`}>
                  {(item.name ? `${item.name}${item.htmlId ? ` (#${item.htmlId})` : ''}` : (item.text || item.alt || elementTypes.find((type) => type.type === item.type)?.name || 'Bloco HTML')).slice(0, 50)}
                </option>
              ))}
            </select>
          </label>}
          {content.action === 'message' && <label className="block text-xs font-medium text-slate-600">Mensagem do botão
            <textarea aria-label="Mensagem do botão" rows={3} value={content.actionValue} onChange={(event) => change('actionValue', event.target.value)} className={`${fieldClass} mt-1`} />
          </label>}
          <p className="text-xs leading-5 text-slate-500">Use “Testar página” no Canvas para experimentar. Consulte o JavaScript em Código Gerado → JS.</p>
        </>}
        {!elementTypes.some((type) => type.type === element.type) && <p className="text-xs leading-5 text-slate-500">Este bloco veio de um projeto importado. Você pode personalizar sua aparência neste painel.</p>}
        {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
        {saved && <p role="status" className="text-xs text-emerald-700">Alterações aplicadas.</p>}
        {loadingImage && <p role="status" className="text-xs text-slate-500">Carregando imagem…</p>}
        <div className="flex flex-wrap gap-2">
          {elementTypes.some((type) => type.type === element.type) && <button type="submit" disabled={loadingImage} className="min-h-10 rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">Aplicar alterações</button>}
          <button type="button" onClick={() => onRemove(element.id)} className="min-h-10 rounded-lg border border-slate-200 px-3 text-xs text-slate-600 hover:border-red-200 hover:text-red-700">Excluir elemento</button>
        </div>
      </fieldset>
    </form>
  )
}

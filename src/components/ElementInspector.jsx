import { useState } from 'react'
import { elementTypes } from '../data/elements'

const fieldClass = 'min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-2 focus:outline-indigo-500'

export default function ElementInspector({ element, elements, onUpdate, disabled }) {
  const [content, setContent] = useState(() => ({
    name: element.name ?? '',
    htmlId: element.htmlId ?? '',
    tagName: element.tagName ?? '',
    text: '',
    src: '',
    alt: '',
    placeholder: '',
    href: '',
    checked: false,
    fit: 'cover',
    headingLevel: 'h1',
    action: 'none',
    actionValue: '',
    newTab: false,
    ...element,
  }))
  const [idDraft, setIdDraft] = useState(element.htmlId ?? '')
  const [idError, setIdError] = useState('')
  const [currentElementId, setCurrentElementId] = useState(element.id)
  const [justRenamedId, setJustRenamedId] = useState(null)
  const [prevElement, setPrevElement] = useState(element)

  // Quando o elemento selecionado mudar (ex: usuário clicou em outro elemento)
  if (element.id !== currentElementId && element.id !== justRenamedId) {
    setCurrentElementId(element.id)
    setIdDraft(element.htmlId ?? '')
    setIdError('')
  } else if (element.id === justRenamedId) {
    setCurrentElementId(element.id)
    setJustRenamedId(null)
  }

  if (element !== prevElement) {
    setPrevElement(element)
    setContent((prev) => ({
      ...prev,
      ...element,
      name: element.name ?? '',
      htmlId: element.htmlId ?? '',
      tagName: element.tagName ?? '',
    }))
  }
  const [error, setError] = useState('')
  const [loadingImage, setLoadingImage] = useState(false)
  const name = elementTypes.find((item) => item.type === element.type)?.name ?? 'Bloco HTML'

  // Aplica as alterações em TEMPO REAL imediatamente
  const change = (key, value) => {
    const next = { ...content, [key]: value }
    setContent(next)
    try {
      onUpdate(element.id, next)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  // Aplicação segura do ID HTML sem perder foco nem cancelar digitação
  const applyHtmlId = (raw) => {
    const trimmed = (raw ?? idDraft ?? '').trim()
    const currentSavedId = (element.htmlId ?? content.htmlId ?? '').trim()

    if (trimmed === currentSavedId) {
      setIdError('')
      return
    }

    if (trimmed === '') {
      setIdError('')
      change('htmlId', '')
      return
    }

    if (!/^[a-zA-Z][\w-]*$/.test(trimmed)) {
      setIdError('O ID deve começar com uma letra e conter apenas letras, números, hifens ou sublinhados.')
      return
    }

    const conflict = elements.some(
      (item) => item.id !== element.id && (item.htmlId === trimmed || item.id === trimmed)
    )
    if (conflict) {
      setIdError(`Já existe um elemento com o ID "${trimmed}". Escolha outro.`)
      return
    }

    setIdError('')
    setJustRenamedId(trimmed)
    change('htmlId', trimmed)
  }

  async function loadImage(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!/^image\/(png|jpe?g|gif|webp|avif|svg\+xml)$/.test(file.type)) {
      setError('Escolha um arquivo de imagem PNG, JPEG, WebP, GIF, AVIF ou SVG.')
      return
    }
    setLoadingImage(true)
    try {
      const src = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Não foi possível abrir essa imagem.'))
        reader.readAsDataURL(file)
      })
      change('src', src)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingImage(false)
    }
  }

  return (
    <div aria-label={`Editar ${content.name || name.toLowerCase()}`} className="mt-3 border-t-2 border-purple-100 pt-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-black text-purple-950">
          {content.name ? content.name : name}
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-800">
            {content.htmlId ? `#${content.htmlId}` : element.tag || 'Bloco'}
          </span>
        </div>
      </div>

      <fieldset disabled={disabled} className="space-y-3.5 disabled:opacity-50">
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-slate-700">
            Nome do item
            <input
              type="text"
              aria-label="Nome do item"
              placeholder={name}
              value={content.name}
              onChange={(event) => change('name', event.target.value)}
              className={`${fieldClass} mt-1`}
            />
          </label>
          <label className="block text-xs font-bold text-slate-700">
            ID (HTML)
            <div className="relative mt-1">
              <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center font-mono text-xs font-bold text-purple-400">
                #
              </span>
              <input
                type="text"
                aria-label="ID do item"
                placeholder="ex: meu-id"
                value={idDraft}
                onChange={(event) => {
                  setIdDraft(event.target.value)
                  if (idError) setIdError('')
                }}
                onBlur={() => applyHtmlId(idDraft)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    applyHtmlId(idDraft)
                    event.currentTarget.blur()
                  }
                }}
                className={`${fieldClass} pl-6 pr-14 font-mono text-xs ${idError ? 'border-red-400 focus:outline-red-500' : ''}`}
              />
              {idDraft.trim() !== (element.htmlId || '') && (
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    applyHtmlId(idDraft)
                  }}
                  className="absolute inset-y-1.5 right-1.5 flex items-center rounded-md bg-purple-600 px-2 text-[10px] font-bold text-white shadow-2xs hover:bg-purple-700"
                >
                  Salvar
                </button>
              )}
            </div>
            {idError ? (
              <span role="alert" className="mt-1 block text-[11px] font-bold text-red-600">
                {idError}
              </span>
            ) : (
              <span className="mt-0.5 block text-[10px] text-slate-400">
                Enter ou clique fora para salvar
              </span>
            )}
          </label>
        </div>

        {element.type === 'break' && (
          <p className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs leading-5 font-medium text-amber-950">
            Quebra de linha (<code>&lt;br&gt;</code>). Pula imediatamente para a linha seguinte no texto ou layout.
          </p>
        )}

        {element.type === 'container' && (
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Tag semântica do container
              <select
                aria-label="Tag semântica"
                value={content.tagName || element.tagName || 'div'}
                onChange={(event) => change('tagName', event.target.value)}
                className={`${fieldClass} mt-1`}
              >
                <option value="div">&lt;div&gt; · Container genérico</option>
                <option value="section">&lt;section&gt; · Seção temática</option>
                <option value="header">&lt;header&gt; · Cabeçalho estrutural</option>
                <option value="footer">&lt;footer&gt; · Rodapé estrutural</option>
                <option value="nav">&lt;nav&gt; · Barra de navegação</option>
                <option value="article">&lt;article&gt; · Artigo independente</option>
                <option value="aside">&lt;aside&gt; · Conteúdo lateral</option>
                <option value="form">&lt;form&gt; · Formulário de envio</option>
              </select>
            </label>
            <p className="text-xs leading-5 text-emerald-900">
              Este container agrupa {element.children?.length ?? 0} elemento(s).
            </p>
          </div>
        )}

        {element.type === 'divider' && (
          <p className="rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            Linha divisória horizontal (<code>&lt;hr&gt;</code>) para separar e organizar seções na página.
          </p>
        )}

        {['heading', 'paragraph', 'quote', 'button', 'strong', 'em', 'code', 'span'].includes(element.type) && (
          <label className="block text-xs font-medium text-slate-600">
            {element.type === 'heading' ? 'Texto do título' : element.type === 'paragraph' ? 'Texto do parágrafo' : element.type === 'quote' ? 'Texto da citação' : element.type === 'strong' ? 'Texto em negrito' : element.type === 'em' ? 'Texto em itálico' : element.type === 'code' ? 'Trecho de código' : element.type === 'span' ? 'Texto em linha' : 'Texto do botão'}
            <textarea
              aria-label="Texto do elemento"
              rows={['heading', 'button', 'strong', 'em', 'code', 'span'].includes(element.type) ? 2 : 4}
              value={content.text ?? ''}
              onChange={(event) => change('text', event.target.value)}
              className={`${fieldClass} mt-1 resize-y ${element.type === 'code' ? 'font-mono text-xs' : ''}`}
            />
          </label>
        )}

        {element.type === 'link' && (
          <>
            <label className="block text-xs font-medium text-slate-600">
              Texto do link
              <input type="text" value={content.text ?? ''} onChange={(event) => change('text', event.target.value)} placeholder="Clique aqui" className={`${fieldClass} mt-1`} />
            </label>
            <label className="block text-xs font-medium text-slate-600">
              Endereço de destino (URL)
              <input type="text" value={content.href ?? ''} onChange={(event) => change('href', event.target.value)} placeholder="https://exemplo.com ou #secao" className={`${fieldClass} mt-1`} />
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <input type="checkbox" checked={Boolean(content.newTab)} onChange={(event) => change('newTab', event.target.checked)} className="size-4 rounded" />
              Abrir em nova aba (target="_blank")
            </label>
          </>
        )}

        {['list', 'ordered-list'].includes(element.type) && (
          <label className="block text-xs font-medium text-slate-600">
            {element.type === 'ordered-list' ? 'Itens da lista numerada (um por linha)' : 'Itens da lista com marcadores (um por linha)'}
            <textarea
              aria-label="Itens da lista"
              rows={5}
              value={content.text ?? ''}
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

        {element.type === 'textarea' && (
          <>
            <label className="block text-xs font-medium text-slate-600">
              Texto de exemplo (placeholder)
              <input type="text" value={content.placeholder ?? ''} onChange={(event) => change('placeholder', event.target.value)} placeholder="ex: Escreva sua mensagem..." className={`${fieldClass} mt-1`} />
            </label>
            <label className="block text-xs font-medium text-slate-600">
              Texto inicial preenchido (opcional)
              <textarea rows={3} value={content.text ?? ''} onChange={(event) => change('text', event.target.value)} className={`${fieldClass} mt-1 resize-y`} />
            </label>
          </>
        )}

        {element.type === 'select' && (
          <label className="block text-xs font-medium text-slate-600">
            Opções do menu suspenso (uma por linha)
            <textarea rows={5} value={content.text ?? ''} onChange={(event) => change('text', event.target.value)} placeholder="Opção 1&#10;Opção 2&#10;Opção 3" className={`${fieldClass} mt-1 resize-y font-sans`} />
          </label>
        )}

        {element.type === 'checkbox' && (
          <>
            <label className="block text-xs font-medium text-slate-600">
              Texto da opção
              <input type="text" value={content.text ?? ''} onChange={(event) => change('text', event.target.value)} placeholder="ex: Aceito os termos de uso" className={`${fieldClass} mt-1`} />
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <input type="checkbox" checked={Boolean(content.checked)} onChange={(event) => change('checked', event.target.checked)} className="size-4 rounded" />
              Marcado por padrão (checked)
            </label>
          </>
        )}

        {element.type === 'table' && (
          <label className="block text-xs font-medium text-slate-600">
            Linhas da tabela (separe colunas por vírgula)
            <textarea rows={5} value={content.text ?? ''} onChange={(event) => change('text', event.target.value)} placeholder="Nome, Idade, Cidade&#10;Ana, 25, São Paulo&#10;Carlos, 30, Rio" className={`${fieldClass} mt-1 resize-y font-mono text-xs`} />
            <span className="mt-1 block text-[11px] text-slate-500">A primeira linha será usada como cabeçalho (&lt;thead&gt;).</span>
          </label>
        )}

        {['video', 'audio', 'iframe'].includes(element.type) && (
          <label className="block text-xs font-medium text-slate-600">
            {element.type === 'video' ? 'Endereço do vídeo (URL)' : element.type === 'audio' ? 'Endereço do áudio (URL)' : 'Endereço do iframe incorporado (URL)'}
            <input
              type="text"
              aria-label={element.type === 'video' ? 'Endereço do vídeo' : element.type === 'audio' ? 'Endereço do áudio' : 'Endereço da página'}
              value={content.src ?? ''}
              onChange={(event) => change('src', event.target.value)}
              placeholder={element.type === 'video' ? 'https://... (.mp4, WebM)' : element.type === 'audio' ? 'https://... (.mp3, OGG, WAV)' : 'https://exemplo.com'}
              className={`${fieldClass} mt-1`}
            />
          </label>
        )}

        {element.type === 'heading' && (
          <label className="block text-xs font-medium text-slate-600">
            Nível do título
            <select aria-label="Nível do título" value={content.headingLevel} onChange={(event) => change('headingLevel', event.target.value)} className={`${fieldClass} mt-1`}>
              {[1, 2, 3, 4, 5, 6].map((level) => <option key={level} value={`h${level}`}>H{level}{level === 1 ? ' · Título principal' : ' · Subtítulo'}</option>)}
            </select>
          </label>
        )}

        {element.type === 'image' && (
          <>
            <label className="block text-xs font-medium text-slate-600">
              Endereço da imagem
              <input type="text" value={content.src.startsWith('data:') ? '' : content.src} placeholder={content.src.startsWith('data:') ? 'Imagem enviada do computador' : 'https://...'} onChange={(event) => change('src', event.target.value)} className={`${fieldClass} mt-1`} />
            </label>
            <label className="block text-xs font-medium text-slate-600">
              Enviar imagem
              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml" onChange={loadImage} className="mt-2 block w-full text-xs text-slate-500 file:mr-2 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:font-medium file:text-indigo-700" />
            </label>
            <label className="block text-xs font-medium text-slate-600">
              Descrição da imagem
              <input type="text" value={content.alt} onChange={(event) => change('alt', event.target.value)} className={`${fieldClass} mt-1`} />
            </label>
            <label className="block text-xs font-medium text-slate-600">
              Ajuste da imagem
              <select aria-label="Ajuste da imagem" value={content.fit} onChange={(event) => change('fit', event.target.value)} className={`${fieldClass} mt-1`}>
                <option value="cover">Preencher área</option>
                <option value="contain">Mostrar imagem inteira</option>
              </select>
            </label>
          </>
        )}

        {element.type === 'button' && (
          <>
            <label className="block text-xs font-medium text-slate-600">
              Ação do botão
              <select aria-label="Ação do botão" value={content.action} onChange={(event) => { change('action', event.target.value); change('actionValue', '') }} className={`${fieldClass} mt-1`}>
                <option value="none">Sem ação automática</option>
                <option value="link">Abrir link</option>
                <option value="scroll">Ir para uma seção</option>
                <option value="message">Mostrar mensagem</option>
              </select>
            </label>
            {content.action === 'link' && (
              <>
                <label className="block text-xs font-medium text-slate-600">
                  Destino do link
                  <input type="text" placeholder="https://exemplo.com" value={content.actionValue} onChange={(event) => change('actionValue', event.target.value)} className={`${fieldClass} mt-1`} />
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  <input type="checkbox" checked={content.newTab} onChange={(event) => change('newTab', event.target.checked)} />
                  Abrir em nova aba
                </label>
              </>
            )}
            {content.action === 'scroll' && (
              <label className="block text-xs font-medium text-slate-600">
                Seção de destino
                <select aria-label="Seção de destino" value={content.actionValue} onChange={(event) => change('actionValue', event.target.value)} className={`${fieldClass} mt-1`}>
                  <option value="">Escolha um elemento</option>
                  {elements.filter((item) => item.id !== element.id).map((item) => (
                    <option key={item.id} value={`#${item.htmlId || item.id}`}>
                      {(item.name ? `${item.name}${item.htmlId ? ` (#${item.htmlId})` : ''}` : (item.text || item.alt || elementTypes.find((type) => type.type === item.type)?.name || 'Bloco HTML')).slice(0, 50)}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {content.action === 'message' && (
              <label className="block text-xs font-medium text-slate-600">
                Mensagem do botão
                <textarea aria-label="Mensagem do botão" rows={3} value={content.actionValue} onChange={(event) => change('actionValue', event.target.value)} className={`${fieldClass} mt-1`} />
              </label>
            )}
            <p className="text-xs leading-5 text-slate-500">Use “Testar página” no Canvas para experimentar.</p>
          </>
        )}

        {!elementTypes.some((type) => type.type === element.type) && (
          <p className="text-xs leading-5 text-slate-500">Este bloco veio de um projeto importado.</p>
        )}
        {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
        {loadingImage && <p role="status" className="text-xs text-slate-500">Carregando imagem…</p>}
      </fieldset>
    </div>
  )
}

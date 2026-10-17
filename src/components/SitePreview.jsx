import { useEffect, useMemo, useRef, useState } from 'react'
import { createPreviewDocument } from '../lib/preview'

export default function SitePreview({ code, onLayout, onSelect, onEditText, onError, className, style, interactive = true, editing = false, resizePreview = null }) {
  const frameRef = useRef(null)
  const jsKey = editing ? '__editing__' : code.js
  const { token, srcDoc } = useMemo(() => {
    const nextToken = crypto.randomUUID()
    return { token: nextToken, srcDoc: createPreviewDocument(code, nextToken, editing) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, jsKey])
  const [readyToken, setReadyToken] = useState(null)
  useEffect(() => {
    if (readyToken === token) {
      frameRef.current?.contentWindow?.postMessage({ source: 'uebit-editor', token, type: 'update', html: code.html, css: code.css }, '*')
    }
  }, [code.html, code.css, readyToken, token])
  useEffect(() => {
    if (editing && readyToken === token) frameRef.current?.contentWindow.postMessage({ source: 'uebit-editor', token, type: 'resize', preview: resizePreview }, '*')
  }, [resizePreview, editing, readyToken, token])
  useEffect(() => {
    function receive(event) {
      if (event.source !== frameRef.current?.contentWindow || event.data?.source !== 'uebit-preview' || event.data.token !== token) return
      if (event.data.type === 'ready') setReadyToken(token)
      if (event.data.type === 'layout') onLayout?.(event.data)
      if (event.data.type === 'select') onSelect?.(event.data.id)
      if (event.data.type === 'edit-text') onEditText?.(event.data.id, String(event.data.text ?? ''))
      if (event.data.type === 'error') onError?.(String(event.data.message))
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [token, onLayout, onSelect, onEditText, onError])
  return <iframe ref={frameRef} title="Prévia do site" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" srcDoc={srcDoc} data-ready={readyToken === token} aria-busy={readyToken !== token} className={className} style={{ border: 0, pointerEvents: interactive ? 'auto' : 'none', ...style }} />
}

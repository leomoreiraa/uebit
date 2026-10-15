import { useEffect, useMemo, useRef, useState } from 'react'
import { createPreviewDocument } from '../lib/preview'

export default function SitePreview({ code, onLayout, onSelect, onError, className, style, interactive = true, editing = false, resizePreview = null }) {
  const frameRef = useRef(null)
  const { token, srcDoc } = useMemo(() => {
    const token = crypto.randomUUID()
    return { token, srcDoc: createPreviewDocument(code, token, editing) }
  }, [code, editing])
  const [readyToken, setReadyToken] = useState(null)
  useEffect(() => {
    if (editing && readyToken === token) frameRef.current?.contentWindow.postMessage({ source: 'uebit-editor', token, type: 'resize', preview: resizePreview }, '*')
  }, [resizePreview, editing, readyToken, token])
  useEffect(() => {
    function receive(event) {
      if (event.source !== frameRef.current?.contentWindow || event.data?.source !== 'uebit-preview' || event.data.token !== token) return
      if (event.data.type === 'ready') setReadyToken(token)
      if (event.data.type === 'layout') onLayout?.(event.data)
      if (event.data.type === 'select') onSelect?.(event.data.id)
      if (event.data.type === 'error') onError?.(String(event.data.message))
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [token, onLayout, onSelect, onError])
  return <iframe ref={frameRef} title="Prévia do site" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" srcDoc={srcDoc} data-ready={readyToken === token} aria-busy={readyToken !== token} className={className} style={{ border: 0, pointerEvents: interactive ? 'auto' : 'none', ...style }} />
}

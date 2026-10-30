import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const LANGUAGES = [
  { code: 'pt-BR', label: 'Português', short: 'PT' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'th', label: 'ไทย', short: 'TH' },
]
export const LANGUAGE_KEY = 'uebit-language'
export const validLanguage = (lang) => LANGUAGES.some((item) => item.code === lang)

function startingLanguage() {
  const query = window.location.hash.split('?')[1] || ''
  const fromUrl = new URLSearchParams(query).get('lang')
  if (validLanguage(fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY)
    if (validLanguage(saved)) return saved
  } catch { /* Private browsing or blocked storage */ }
  return 'pt-BR'
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(startingLanguage)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const explicit = new URLSearchParams(location.search).get('lang')
    if (validLanguage(explicit)) setLanguageState(explicit)
  }, [location.search])

  useEffect(() => {
    document.documentElement.lang = language
    try { localStorage.setItem(LANGUAGE_KEY, language) }
    catch { /* Continue without persistent preferences */ }
  }, [language])

  function setLanguage(next) {
    if (!validLanguage(next)) return
    setLanguageState(next)
    const params = new URLSearchParams(location.search)
    params.set('lang', next)
    navigate({ pathname: location.pathname, search: '?' + params.toString() }, { replace: true })
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

export function languagePath(path, language) {
  const [pathname, query = ''] = path.split('?')
  const params = new URLSearchParams(query)
  if (language !== 'pt-BR') params.set('lang', language)
  const search = params.toString()
  return pathname + (search ? '?' + search : '')
}

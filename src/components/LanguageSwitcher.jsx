import { Languages } from 'lucide-react'
import { LANGUAGES, useLanguage } from '../i18n/language'
import { message } from '../i18n/messages'

export default function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage } = useLanguage()
  return (
    <label className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border-2 border-purple-200 bg-white px-2.5 text-xs font-bold text-purple-900 shadow-sm">
      <Languages size={16} aria-hidden="true" />
      {!compact && <span className="max-sm:hidden">{message(language, 'language')}</span>}
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label={message(language, 'language')}
        className="min-w-0 max-w-[120px] cursor-pointer bg-transparent text-xs font-black text-purple-900 focus-visible:outline-2"
      >
        {LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
      </select>
    </label>
  )
}

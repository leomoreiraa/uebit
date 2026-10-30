import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'
import { lazy, Suspense } from 'react'
import { useLanguage } from './i18n/language'
import { message } from './i18n/messages'

const BrandPage = lazy(() => import('./pages/BrandPage'))
const LessonsPage = lazy(() => import('./pages/LessonsPage'))

function HomeRoute() {
  return <LandingPage />
}

export default function App() {
  const { language } = useLanguage()
  const t = (key) => message(language, key)
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/aulas" element={<Suspense fallback={<p className="p-8">{t('lessons')}…</p>}><LessonsPage /></Suspense>} />
      <Route path="/marca" element={<Suspense fallback={<p className="p-8">Carregando a marca Uebit…</p>}><BrandPage /></Suspense>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

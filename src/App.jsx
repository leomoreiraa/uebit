import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'
import { lazy, Suspense } from 'react'

const BrandPage = lazy(() => import('./pages/BrandPage'))
const LessonsPage = lazy(() => import('./pages/LessonsPage'))

function HomeRoute() {
  return <LandingPage />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/aulas" element={<Suspense fallback={<p className="p-8">Carregando aulas…</p>}><LessonsPage /></Suspense>} />
      <Route path="/marca" element={<Suspense fallback={<p className="p-8">Carregando a marca Uebit…</p>}><BrandPage /></Suspense>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

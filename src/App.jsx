import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'

function HomeRoute() {
  const [searchParams] = useSearchParams()
  const isE2E = import.meta.env.MODE === 'e2e'
  const forceLanding = searchParams.get('landing') === 'true'

  if (isE2E && !forceLanding) {
    return <EditorPage />
  }

  return <LandingPage />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

import { Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { ChapterPage } from './pages/ChapterPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PracticePage } from './pages/PracticePage'
import { QuizPage } from './pages/QuizPage'

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="chapters/:slug" element={<ChapterPage />} />
        <Route path="chapters/:slug/quiz" element={<QuizPage />} />
        <Route path="chapters/:slug/practice" element={<PracticePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

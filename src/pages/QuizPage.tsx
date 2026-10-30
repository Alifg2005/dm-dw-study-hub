import { useParams } from 'react-router-dom'
import { ChapterHeader } from '../components/chapter/ChapterHeader'
import { QuizRunner } from '../components/quiz/QuizRunner'
import { getChapter } from '../data/registry'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFoundPage } from './NotFoundPage'

export function QuizPage() {
  const { slug } = useParams()
  const chapter = getChapter(slug)
  useDocumentTitle(chapter ? `Quiz: ${chapter.meta.title}` : undefined)

  if (!chapter) return <NotFoundPage message="That chapter is not available." />

  return (
    <>
      <ChapterHeader meta={chapter.meta} />
      <QuizRunner key={chapter.meta.slug} slug={chapter.meta.slug} mcqs={chapter.mcqs} />
    </>
  )
}

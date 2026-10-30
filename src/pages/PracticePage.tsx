import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChapterHeader } from '../components/chapter/ChapterHeader'
import { formatLabels, WrittenCard } from '../components/practice/WrittenCard'
import { getChapter } from '../data/registry'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import type { WrittenFormat } from '../types/chapter'
import { NotFoundPage } from './NotFoundPage'

type Filter = WrittenFormat | 'all'

const FORMAT_ORDER: WrittenFormat[] = ['short', 'definition', 'matching', 'compare', 'fill-blank', 'list', 'explain', 'scenario']

export function PracticePage() {
  const { slug } = useParams()
  const chapter = getChapter(slug)
  const [filter, setFilter] = useState<Filter>('all')
  const [selfTest, setSelfTest] = useState(false)
  useDocumentTitle(chapter ? `Written practice: ${chapter.meta.title}` : undefined)

  if (!chapter) return <NotFoundPage message="That chapter is not available." />

  const available = FORMAT_ORDER.filter((format) => chapter.written.some((question) => question.format === format))
  const filters: { value: Filter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: chapter.written.length },
    ...available.map((format) => ({
      value: format,
      label: formatLabels[format],
      count: chapter.written.filter((question) => question.format === format).length,
    })),
  ]
  const questions = chapter.written.filter((question) => filter === 'all' || question.format === filter)

  return (
    <>
      <ChapterHeader meta={chapter.meta} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by question format">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
              className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-sm font-medium transition-colors ${
                filter === item.value
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink'
              }`}
            >
              {item.label}
              <span className="font-mono text-xs opacity-75">{item.count}</span>
            </button>
          ))}
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={selfTest}
            onChange={(event) => setSelfTest(event.target.checked)}
            className="mt-0.5 size-4 accent-[var(--accent)]"
          />
          <span>
            <span className="font-medium text-ink">Self-test mode.</span> Hide short answers until you choose to reveal them.
          </span>
        </label>

        <ol className="mt-6 space-y-4">
          {questions.map((question) => (
            <WrittenCard key={question.id} question={question} selfTest={selfTest} />
          ))}
        </ol>
      </div>
    </>
  )
}

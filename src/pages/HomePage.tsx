import { ArrowDown, LibraryBig } from 'lucide-react'
import { ChapterCard } from '../components/home/ChapterCard'
import { CuboidLattice } from '../components/home/CuboidLattice'
import { chapters, examScopeLabels } from '../data/registry'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import type { ExamScope } from '../types/chapter'

const SCOPES: ExamScope[] = ['midterm', 'final']

export function HomePage() {
  useDocumentTitle()
  const totalMcqs = chapters.reduce((sum, chapter) => sum + chapter.mcqs.length, 0)
  const totalWritten = chapters.reduce((sum, chapter) => sum + chapter.written.length, 0)

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-20 lg:pt-16">
        <div className="rise">
          <p className="text-lg font-medium text-accent-text">Ali Feras  Alghanim</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.02] tracking-tighter md:text-6xl xl:text-7xl">
            Data Mining & Data Warehouse
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg text-ink-soft">
            Your dedicated study space for understanding concepts, mastering chapters, and preparing for exams.
          </p>
          <a
            href="#chapters"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 font-medium text-accent-ink transition-transform active:scale-[0.98]"
          >
            Browse chapters
            <ArrowDown aria-hidden size={18} strokeWidth={1.75} />
          </a>
        </div>
        <div className="rise rounded-2xl border border-line bg-surface p-5 sm:p-7" style={{ '--i': 2 } as React.CSSProperties}>
          <CuboidLattice />
        </div>
      </section>

      <section id="chapters" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Chapters</h2>
        {chapters.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-line-strong p-10 text-center">
            <LibraryBig aria-hidden className="mx-auto text-ink-faint" size={32} strokeWidth={1.75} />
            <p className="mt-3 font-medium">No chapters available yet</p>
            <p className="mt-1 text-sm text-ink-soft">Chapter data files in src/data/chapters appear here automatically.</p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-ink-soft">
              <span className="font-mono">{chapters.length}</span> chapters with{' '}
              <span className="font-mono">{totalMcqs}</span> quiz questions and{' '}
              <span className="font-mono">{totalWritten}</span> written questions.
            </p>
            {SCOPES.map((scope) => {
              const group = chapters.filter((chapter) => chapter.meta.examScope === scope)
              if (group.length === 0) return null
              return (
                <div key={scope} className="mt-8">
                  <h3 className="mb-4 text-lg font-semibold">{examScopeLabels[scope]} chapters</h3>
                  <div className="grid gap-4">
                    {group.map((chapter, index) => (
                      <ChapterCard key={chapter.meta.slug} chapter={chapter} index={index} />
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </section>
    </>
  )
}

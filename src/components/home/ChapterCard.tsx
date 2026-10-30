import { ArrowUpRight, BookOpen, ListChecks, PencilLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import { examScopeLabels } from '../../data/registry'
import type { Chapter } from '../../types/chapter'

export function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const { meta, sections, mcqs, written } = chapter
  const base = `/chapters/${meta.slug}`
  return (
    <article
      className="rise group relative grid gap-x-8 gap-y-4 rounded-2xl border border-line bg-surface p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-lift md:grid-cols-[6rem_1fr_auto] md:items-center md:p-8"
      style={{ '--i': index } as React.CSSProperties}
    >
      <p
        aria-hidden
        className="font-display text-5xl font-semibold leading-none tracking-tighter text-ink-faint transition-colors group-hover:text-accent-text md:text-7xl"
      >
        {String(meta.number).padStart(2, '0')}
      </p>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent-text">
            {examScopeLabels[meta.examScope]}
          </span>
          <span className="text-xs text-ink-faint">Chapter {meta.number}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl">
          <Link to={base} className="after:absolute after:inset-0 after:rounded-2xl">
            {meta.title}
          </Link>
        </h3>
        <p className="mt-1.5 max-w-[62ch] text-ink-soft">{meta.description}</p>
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft">
          <div className="flex items-center gap-1.5">
            <BookOpen aria-hidden size={15} strokeWidth={1.75} />
            <dd className="font-mono">{sections.length}</dd>
            <dt>review topics</dt>
          </div>
          <div className="flex items-center gap-1.5">
            <ListChecks aria-hidden size={15} strokeWidth={1.75} />
            <dd className="font-mono">{mcqs.length}</dd>
            <dt>quiz questions</dt>
          </div>
          <div className="flex items-center gap-1.5">
            <PencilLine aria-hidden size={15} strokeWidth={1.75} />
            <dd className="font-mono">{written.length}</dd>
            <dt>written questions</dt>
          </div>
        </dl>
      </div>
      <div className="relative flex flex-wrap gap-2 md:flex-col md:items-stretch">
        <Link
          to={base}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-accent px-4 text-sm font-medium text-accent-ink transition-transform active:scale-[0.98]"
        >
          Review
          <ArrowUpRight aria-hidden size={16} strokeWidth={1.75} />
        </Link>
        <Link
          to={`${base}/quiz`}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-line-strong bg-surface px-4 text-sm font-medium transition-colors hover:bg-sunken"
        >
          Quiz
        </Link>
        <Link
          to={`${base}/practice`}
          className="inline-flex h-10 items-center justify-center rounded-xl border border-line-strong bg-surface px-4 text-sm font-medium transition-colors hover:bg-sunken"
        >
          Practice
        </Link>
      </div>
    </article>
  )
}

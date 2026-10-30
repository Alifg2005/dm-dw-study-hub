import { NavLink } from 'react-router-dom'
import { examScopeLabels } from '../../data/registry'
import type { ChapterMeta } from '../../types/chapter'

const tabs = [
  { label: 'Review', suffix: '', end: true },
  { label: 'Quiz', suffix: '/quiz', end: false },
  { label: 'Written practice', suffix: '/practice', end: false },
]

export function ChapterHeader({ meta }: { meta: ChapterMeta }) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 md:pt-12">
        <p className="text-sm text-ink-soft">
          <span className="font-medium text-accent-text">Chapter {meta.number}</span>
          {' '}
          for the {examScopeLabels[meta.examScope].toLowerCase()}
        </p>
        <h1 className="mt-1 max-w-4xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {meta.title}
        </h1>
        <nav aria-label="Chapter sections" className="-mb-px mt-6 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <NavLink
              key={tab.label}
              to={`/chapters/${meta.slug}${tab.suffix}`}
              end={tab.end}
              className={({ isActive }) =>
                `whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-accent text-accent-text'
                    : 'border-transparent text-ink-soft hover:border-line-strong hover:text-ink'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

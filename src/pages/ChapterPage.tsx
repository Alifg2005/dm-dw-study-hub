import { ArrowLeft, ArrowRight, ListChecks, PencilLine } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChapterHeader } from '../components/chapter/ChapterHeader'
import { buildToc, ReviewContent } from '../components/chapter/ReviewContent'
import { getAdjacentChapters, getChapter } from '../data/registry'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFoundPage } from './NotFoundPage'

export function ChapterPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const chapter = getChapter(slug)
  useDocumentTitle(chapter?.meta.title)

  if (!chapter) return <NotFoundPage message="That chapter is not available." />

  const { meta } = chapter
  const toc = buildToc(chapter)
  const { previous, next } = getAdjacentChapters(chapter)

  return (
    <>
      <ChapterHeader meta={meta} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 lg:py-12">
        <aside>
          <div className="lg:sticky lg:top-24">
            <label className="block lg:hidden">
              <span className="mb-1.5 block text-sm font-medium">Jump to a section</span>
              <select
                className="h-11 w-full rounded-xl border border-line-strong bg-surface px-3"
                defaultValue=""
                onChange={(event) => {
                  if (event.target.value) navigate(`#${event.target.value}`)
                }}
              >
                <option value="" disabled>
                  Choose a section
                </option>
                {toc.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.title}
                  </option>
                ))}
              </select>
            </label>
            <nav aria-label="On this page" className="hidden max-h-[calc(100dvh-8rem)] overflow-y-auto lg:block">
              <p className="mb-2 text-sm font-semibold">On this page</p>
              <ul className="space-y-0.5 border-l border-line text-sm">
                {toc.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className="-ml-px block border-l border-transparent py-1 pl-3 text-ink-soft transition-colors hover:border-accent hover:text-ink"
                    >
                      {entry.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="min-w-0">
          <ReviewContent chapter={chapter} />

          <section className="mt-12 grid gap-3 rounded-2xl bg-accent p-6 text-accent-ink md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Test what you reviewed</h2>
              <p className="mt-1 opacity-90">
                {chapter.mcqs.length} quiz questions and {chapter.written.length} written questions on this chapter.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="quiz"
                relative="path"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-bg px-5 font-medium text-ink transition-transform active:scale-[0.98]"
              >
                <ListChecks aria-hidden size={18} strokeWidth={1.75} />
                Start quiz
              </Link>
              <Link
                to="practice"
                relative="path"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-accent-ink/50 px-5 font-medium transition-transform active:scale-[0.98]"
              >
                <PencilLine aria-hidden size={18} strokeWidth={1.75} />
                Written practice
              </Link>
            </div>
          </section>

          <nav aria-label="Other chapters" className="mt-8 flex flex-wrap justify-between gap-3 text-sm font-medium">
            {previous ? (
              <Link to={`/chapters/${previous.meta.slug}`} className="inline-flex items-center gap-2 text-ink-soft hover:text-ink">
                <ArrowLeft aria-hidden size={16} strokeWidth={1.75} />
                Chapter {previous.meta.number}: {previous.meta.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/chapters/${next.meta.slug}`} className="inline-flex items-center gap-2 text-ink-soft hover:text-ink">
                Chapter {next.meta.number}: {next.meta.title}
                <ArrowRight aria-hidden size={16} strokeWidth={1.75} />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}

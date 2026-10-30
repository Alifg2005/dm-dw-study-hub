import { Check, Target } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Chapter } from '../../types/chapter'
import { ContentBlocks } from '../content/ContentBlocks'
import { DataTableView } from '../content/DataTableView'
import { RichText } from '../content/RichText'

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export interface TocEntry {
  id: string
  title: string
}

export function buildToc(chapter: Chapter): TocEntry[] {
  const entries: (TocEntry & { show: boolean })[] = [
    { id: 'overview', title: 'Chapter overview', show: true },
    { id: 'objectives', title: 'Learning objectives', show: true },
    { id: 'key-concepts', title: 'Key concepts', show: chapter.keyConcepts.length > 0 },
    { id: 'definitions', title: 'Important definitions', show: chapter.definitions.length > 0 },
    ...chapter.sections.map((section) => ({ id: section.id, title: section.title, show: true })),
    { id: 'comparisons', title: 'Important comparisons', show: chapter.comparisons.length > 0 },
    { id: 'examples', title: 'Worked examples', show: chapter.examples.length > 0 },
    { id: 'takeaways', title: 'Key takeaways', show: true },
    { id: 'exam-notes', title: 'Exam-focused notes', show: chapter.examNotes.length > 0 },
  ]
  return entries.filter((entry) => entry.show)
}

export function ReviewContent({ chapter }: { chapter: Chapter }) {
  return (
    <div className="space-y-10">
      <Section id="overview" title="Chapter overview">
        <div className="max-w-[68ch] space-y-3 text-lg text-ink-soft">
          {chapter.overview.map((paragraph, index) => (
            <p key={index}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>
      </Section>

      <Section id="objectives" title="Learning objectives">
        <ul className="grid gap-3 md:grid-cols-2">
          {chapter.objectives.map((objective, index) => (
            <li key={index} className="flex gap-3 text-ink-soft">
              <Target aria-hidden size={18} strokeWidth={1.75} className="mt-1 shrink-0 text-accent-text" />
              <span>
                <RichText text={objective} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {chapter.keyConcepts.length > 0 && (
        <Section id="key-concepts" title="Key concepts">
          <dl className="grid gap-3 md:grid-cols-2">
            {chapter.keyConcepts.map((concept) => (
              <div key={concept.term} className="rounded-2xl bg-accent-soft p-5">
                <dt className="font-display text-lg font-semibold tracking-tight">{concept.term}</dt>
                <dd className="mt-1 text-ink-soft">
                  <RichText text={concept.summary} />
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {chapter.definitions.length > 0 && (
        <Section id="definitions" title="Important definitions">
          <dl className="grid gap-x-10 gap-y-4 lg:grid-cols-2">
            {chapter.definitions.map((item) => (
              <div key={item.term} className="border-l-2 border-line-strong pl-4">
                <dt className="font-semibold">{item.term}</dt>
                <dd className="mt-0.5 text-ink-soft">
                  <RichText text={item.definition} />
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {chapter.sections.map((section) => (
        <Section key={section.id} id={section.id} title={section.title}>
          <ContentBlocks blocks={section.blocks} />
        </Section>
      ))}

      {chapter.comparisons.length > 0 && (
        <Section id="comparisons" title="Important comparisons">
          <div className="space-y-8">
            {chapter.comparisons.map((comparison) => (
              <div key={comparison.id}>
                <h3 className="font-semibold">{comparison.title}</h3>
                {comparison.intro && (
                  <p className="mt-1 max-w-[68ch] text-ink-soft">
                    <RichText text={comparison.intro} />
                  </p>
                )}
                <div className="mt-3">
                  <DataTableView table={comparison.table} />
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {chapter.examples.length > 0 && (
        <Section id="examples" title="Worked examples">
          <div className="space-y-5">
            {chapter.examples.map((example) => (
              <article key={example.id} className="rounded-2xl border border-line bg-surface p-5 md:p-6">
                <h3 className="font-display text-lg font-semibold tracking-tight">{example.title}</h3>
                <p className="mt-2 text-ink-soft">
                  <RichText text={example.scenario} />
                </p>
                {example.table && (
                  <div className="mt-4">
                    <DataTableView table={example.table} />
                  </div>
                )}
                <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-ink-soft marker:font-mono marker:text-ink-faint">
                  {example.steps.map((step, index) => (
                    <li key={index}>
                      <RichText text={step} />
                    </li>
                  ))}
                </ol>
                <p className="mt-4 rounded-xl bg-accent-soft px-4 py-3 font-medium">
                  <RichText text={example.result} />
                </p>
              </article>
            ))}
          </div>
        </Section>
      )}

      <Section id="takeaways" title="Key takeaways">
        <ul className="space-y-2.5">
          {chapter.takeaways.map((takeaway, index) => (
            <li key={index} className="flex max-w-[68ch] gap-3 text-ink-soft">
              <Check aria-hidden size={18} strokeWidth={1.75} className="mt-1 shrink-0 text-accent-text" />
              <span>
                <RichText text={takeaway} />
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {chapter.examNotes.length > 0 && (
        <Section id="exam-notes" title="Exam-focused notes">
          <ol className="grid gap-3 md:grid-cols-2">
            {chapter.examNotes.map((note, index) => (
              <li key={index} className="rounded-2xl border border-line bg-surface p-5 text-ink-soft">
                <RichText text={note} />
              </li>
            ))}
          </ol>
        </Section>
      )}
    </div>
  )
}

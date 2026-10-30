import type { QuizAnswers } from '../../lib/quiz'
import type { Mcq } from '../../types/chapter'

interface Props {
  mcqs: Mcq[]
  answers: QuizAnswers
  currentIndex: number
  onSelect: (index: number) => void
  onSubmit: () => void
}

export function QuestionNavigator({ mcqs, answers, currentIndex, onSelect, onSubmit }: Props) {
  return (
    <nav aria-label="Question overview" className="rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-24">
      <h2 className="font-semibold">Questions</h2>
      <ol className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(2.5rem,1fr))] gap-1.5">
        {mcqs.map((mcq, index) => {
          const answered = answers[mcq.id] !== undefined
          const current = index === currentIndex
          return (
            <li key={mcq.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={current ? 'step' : undefined}
                aria-label={`Question ${index + 1}, ${answered ? 'answered' : 'unanswered'}`}
                className={`h-10 w-full rounded-xl border font-mono text-sm transition-colors ${
                  answered ? 'border-transparent bg-accent-soft text-accent-text' : 'border-line text-ink-soft hover:bg-sunken'
                } ${current ? 'ring-2 ring-accent ring-offset-2 ring-offset-surface' : ''}`}
              >
                {index + 1}
              </button>
            </li>
          )
        })}
      </ol>
      <dl className="mt-4 flex gap-4 text-xs text-ink-faint">
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded bg-accent-soft ring-1 ring-accent/40" />
          <dt>Answered</dt>
        </div>
        <div className="flex items-center gap-1.5">
          <span aria-hidden className="size-3 rounded border border-line-strong" />
          <dt>Unanswered</dt>
        </div>
      </dl>
      <button
        type="button"
        onClick={onSubmit}
        className="mt-4 h-11 w-full rounded-xl border border-line-strong font-medium transition-colors hover:bg-sunken"
      >
        Finish and submit
      </button>
    </nav>
  )
}

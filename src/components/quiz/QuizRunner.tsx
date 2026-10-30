import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { loadAttempt, newAttempt, saveAttempt, type QuizAttempt } from '../../lib/quiz'
import type { Mcq } from '../../types/chapter'
import { QuestionCard } from './QuestionCard'
import { QuestionNavigator } from './QuestionNavigator'
import { QuizResults } from './QuizResults'
import { SubmitDialog } from './SubmitDialog'

interface Props {
  slug: string
  mcqs: Mcq[]
}

export function QuizRunner({ slug, mcqs }: Props) {
  const [attempt, setAttempt] = useState<QuizAttempt>(() => loadAttempt(slug, mcqs))
  const [confirming, setConfirming] = useState(false)
  const questionHeading = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  useEffect(() => saveAttempt(slug, attempt), [slug, attempt])

  // Move keyboard and screen-reader focus to the new question.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    questionHeading.current?.focus()
  }, [attempt.currentIndex])

  if (attempt.submitted) {
    return (
      <QuizResults
        slug={slug}
        mcqs={mcqs}
        attempt={attempt}
        onRetry={() => {
          window.scrollTo({ top: 0, behavior: 'instant' })
          setAttempt(newAttempt(mcqs))
        }}
      />
    )
  }

  const current = mcqs[attempt.currentIndex]
  const answeredCount = mcqs.filter((mcq) => attempt.answers[mcq.id] !== undefined).length
  const isLast = attempt.currentIndex === mcqs.length - 1
  const goTo = (index: number) => setAttempt((state) => ({ ...state, currentIndex: index }))

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:py-12">
      <div className="min-w-0">
        <div className="mb-6 flex items-center gap-3 font-mono text-sm text-ink-soft">
          <span>
            {attempt.currentIndex + 1} / {mcqs.length}
          </span>
          <div
            className="h-1 flex-1 overflow-hidden rounded-full bg-sunken"
            role="progressbar"
            aria-label="Questions answered"
            aria-valuemin={0}
            aria-valuemax={mcqs.length}
            aria-valuenow={answeredCount}
          >
            <div
              className="h-full origin-left rounded-full bg-accent transition-transform duration-300"
              style={{ transform: `scaleX(${answeredCount / mcqs.length})` }}
            />
          </div>
          <span>{answeredCount} answered</span>
        </div>

        <QuestionCard
          key={current.id}
          ref={questionHeading}
          number={attempt.currentIndex + 1}
          mcq={current}
          order={attempt.optionOrder[current.id]}
          selected={attempt.answers[current.id]}
          onSelect={(option) =>
            setAttempt((state) => ({ ...state, answers: { ...state.answers, [current.id]: option } }))
          }
        />

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={attempt.currentIndex === 0}
            onClick={() => goTo(attempt.currentIndex - 1)}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-line-strong bg-surface px-4 font-medium transition-colors hover:bg-sunken disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ArrowLeft aria-hidden size={18} strokeWidth={1.75} />
            Previous
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 font-medium text-accent-ink transition-transform active:scale-[0.98]"
            >
              Submit quiz
              <Send aria-hidden size={17} strokeWidth={1.75} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => goTo(attempt.currentIndex + 1)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 font-medium text-accent-ink transition-transform active:scale-[0.98]"
            >
              Next
              <ArrowRight aria-hidden size={18} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      <aside>
        <QuestionNavigator
          mcqs={mcqs}
          answers={attempt.answers}
          currentIndex={attempt.currentIndex}
          onSelect={goTo}
          onSubmit={() => setConfirming(true)}
        />
      </aside>

      <SubmitDialog
        open={confirming}
        unanswered={mcqs.length - answeredCount}
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false)
          window.scrollTo({ top: 0, behavior: 'instant' })
          setAttempt((state) => ({ ...state, submitted: true }))
        }}
      />
    </div>
  )
}

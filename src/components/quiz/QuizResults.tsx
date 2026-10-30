import { ArrowLeft, Check, CircleSlash, RotateCcw, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { scoreMessage, scoreQuiz, type QuizAttempt } from '../../lib/quiz'
import type { Mcq } from '../../types/chapter'
import { RichText } from '../content/RichText'

interface Props {
  slug: string
  mcqs: Mcq[]
  attempt: QuizAttempt
  onRetry: () => void
}

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ScoreRing({ correct, total, percent }: { correct: number; total: number; percent: number }) {
  return (
    <div className="relative size-40 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="var(--surface-sunken)" strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="font-display text-4xl font-semibold leading-none tracking-tight">
          {correct}
          <span className="text-xl text-ink-faint">/{total}</span>
        </p>
        <p className="mt-1 font-mono text-sm text-ink-soft">{percent}%</p>
      </div>
    </div>
  )
}

function ReviewItem({ mcq, number, selected }: { mcq: Mcq; number: number; selected?: number }) {
  const isCorrect = selected === mcq.correctIndex
  const status =
    selected === undefined
      ? { label: 'Not answered', icon: CircleSlash, className: 'bg-sunken text-ink-soft' }
      : isCorrect
        ? { label: 'Correct', icon: Check, className: 'bg-success-soft text-success' }
        : { label: 'Incorrect', icon: X, className: 'bg-danger-soft text-danger' }
  const StatusIcon = status.icon

  return (
    <li className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-sm text-ink-faint">Question {number}</p>
        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-sm font-medium ${status.className}`}>
          <StatusIcon aria-hidden size={14} strokeWidth={2} />
          {status.label}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug">
        <RichText text={mcq.question} />
      </h3>
      <dl className="mt-4 grid gap-2">
        {selected !== undefined && !isCorrect && (
          <div className="rounded-xl bg-danger-soft px-4 py-2.5">
            <dt className="text-xs font-medium text-danger">Your answer</dt>
            <dd>
              <RichText text={mcq.options[selected]} />
            </dd>
          </div>
        )}
        <div className="rounded-xl bg-success-soft px-4 py-2.5">
          <dt className="text-xs font-medium text-success">{isCorrect ? 'Your answer, correct' : 'Correct answer'}</dt>
          <dd>
            <RichText text={mcq.options[mcq.correctIndex]} />
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-ink-soft">
        <RichText text={mcq.explanation} />
      </p>
    </li>
  )
}

export function QuizResults({ slug, mcqs, attempt, onRetry }: Props) {
  const [onlyMissed, setOnlyMissed] = useState(false)
  const score = scoreQuiz(mcqs, attempt.answers)
  const items = mcqs
    .map((mcq, index) => ({ mcq, number: index + 1 }))
    .filter(({ mcq }) => !onlyMissed || attempt.answers[mcq.id] !== mcq.correctIndex)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <section className="rise flex flex-col gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center md:gap-10 md:p-8">
        <ScoreRing correct={score.correct} total={score.total} percent={score.percent} />
        <div className="min-w-0">
          <h2 className="font-display text-3xl font-semibold tracking-tight">{scoreMessage(score.percent)}</h2>
          <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            <div className="flex gap-1.5">
              <dd className="font-mono font-medium text-success">{score.correct}</dd>
              <dt className="text-ink-soft">correct</dt>
            </div>
            <div className="flex gap-1.5">
              <dd className="font-mono font-medium text-danger">{score.incorrect}</dd>
              <dt className="text-ink-soft">incorrect</dt>
            </div>
            {score.unanswered > 0 && (
              <div className="flex gap-1.5">
                <dd className="font-mono font-medium">{score.unanswered}</dd>
                <dt className="text-ink-soft">not answered</dt>
              </div>
            )}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 font-medium text-accent-ink transition-transform active:scale-[0.98]"
            >
              <RotateCcw aria-hidden size={17} strokeWidth={1.75} />
              Retry quiz
            </button>
            <Link
              to={`/chapters/${slug}`}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-line-strong px-4 font-medium transition-colors hover:bg-sunken"
            >
              <ArrowLeft aria-hidden size={17} strokeWidth={1.75} />
              Back to chapter
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Answer review</h2>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={onlyMissed}
              onChange={(event) => setOnlyMissed(event.target.checked)}
              className="size-4 accent-[var(--accent)]"
            />
            Show only missed questions
          </label>
        </div>
        {items.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line-strong p-8 text-center text-ink-soft">
            You did not miss any questions.
          </p>
        ) : (
          <ol className="mt-5 space-y-4">
            {items.map(({ mcq, number }) => (
              <ReviewItem key={mcq.id} mcq={mcq} number={number} selected={attempt.answers[mcq.id]} />
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

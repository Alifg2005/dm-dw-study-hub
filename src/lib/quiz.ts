import type { Mcq } from '../types/chapter'

/** Selected answers as original option indexes, keyed by question id. */
export type QuizAnswers = Record<string, number>

export interface QuizScore {
  total: number
  correct: number
  incorrect: number
  unanswered: number
  percent: number
}

export interface QuizAttempt {
  /** Display order of original option indexes, keyed by question id. */
  optionOrder: Record<string, number[]>
  answers: QuizAnswers
  currentIndex: number
  submitted: boolean
}

export function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function newAttempt(mcqs: Mcq[]): QuizAttempt {
  return {
    optionOrder: Object.fromEntries(mcqs.map((mcq) => [mcq.id, shuffled([0, 1, 2, 3])])),
    answers: {},
    currentIndex: 0,
    submitted: false,
  }
}

export function scoreQuiz(mcqs: Mcq[], answers: QuizAnswers): QuizScore {
  const total = mcqs.length
  const correct = mcqs.filter((mcq) => answers[mcq.id] === mcq.correctIndex).length
  const unanswered = mcqs.filter((mcq) => answers[mcq.id] === undefined).length
  return {
    total,
    correct,
    unanswered,
    incorrect: total - correct - unanswered,
    percent: total === 0 ? 0 : Math.round((correct / total) * 100),
  }
}

export function scoreMessage(percent: number): string {
  if (percent >= 90) return 'Excellent command of this chapter.'
  if (percent >= 75) return 'Strong result. Review the questions you missed.'
  if (percent >= 50) return 'A fair start. Revisit the review, then try again.'
  return 'Work through the chapter review, then try again.'
}

function storageKey(slug: string) {
  return `quiz:${slug}`
}

function isValidAttempt(value: unknown, mcqs: Mcq[]): value is QuizAttempt {
  if (!value || typeof value !== 'object') return false
  const attempt = value as Partial<QuizAttempt>
  return (
    typeof attempt.currentIndex === 'number' &&
    attempt.currentIndex >= 0 &&
    attempt.currentIndex < mcqs.length &&
    typeof attempt.submitted === 'boolean' &&
    typeof attempt.answers === 'object' &&
    attempt.answers !== null &&
    mcqs.every((mcq) => attempt.optionOrder?.[mcq.id]?.length === 4)
  )
}

/** Restores an attempt after an accidental refresh, within the same browser tab. */
export function loadAttempt(slug: string, mcqs: Mcq[]): QuizAttempt {
  try {
    const raw = sessionStorage.getItem(storageKey(slug))
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (isValidAttempt(parsed, mcqs)) return parsed
  } catch {
    // Fall through to a fresh attempt.
  }
  return newAttempt(mcqs)
}

export function saveAttempt(slug: string, attempt: QuizAttempt) {
  try {
    sessionStorage.setItem(storageKey(slug), JSON.stringify(attempt))
  } catch {
    // Persistence is a convenience. The quiz works without it.
  }
}

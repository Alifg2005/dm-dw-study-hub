import { useState } from 'react'
import type { WrittenFormat, WrittenQuestion } from '../../types/chapter'
import { RichText } from '../content/RichText'
import { AnswerPanel } from './AnswerPanel'
import { FillBlankExercise } from './FillBlankExercise'
import { MatchingExercise } from './MatchingExercise'

export const formatLabels: Record<WrittenFormat, string> = {
  short: 'Short answer',
  definition: 'Definition',
  matching: 'Matching',
  compare: 'Compare and contrast',
  'fill-blank': 'Fill in the blanks',
  list: 'Listing',
  explain: 'Explain and discuss',
  scenario: 'Scenario',
}

export function WrittenCard({ question, selfTest }: { question: WrittenQuestion; selfTest: boolean }) {
  const [revealed, setRevealed] = useState(false)
  const interactive = question.format === 'matching' || question.format === 'fill-blank'
  const showAnswer = revealed || (!interactive && !selfTest)
  const reveal = () => setRevealed(true)

  return (
    <li className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent-text">
          {formatLabels[question.format]}
        </span>
        <span className="text-xs text-ink-faint">{question.topic}</span>
      </div>
      <h2 className="mt-3 text-lg font-semibold leading-snug">
        <RichText text={question.prompt} />
      </h2>

      {question.format === 'matching' && <MatchingExercise question={question} onChecked={reveal} />}
      {question.format === 'fill-blank' && <FillBlankExercise question={question} onChecked={reveal} />}

      {showAnswer ? (
        <AnswerPanel question={question} />
      ) : (
        <button
          type="button"
          onClick={reveal}
          className="mt-4 h-10 rounded-xl border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-sunken"
        >
          Show answer
        </button>
      )}
    </li>
  )
}

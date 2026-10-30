import { Check, X } from 'lucide-react'
import { useState } from 'react'
import { shuffled } from '../../lib/quiz'
import type { MatchingQuestion } from '../../types/chapter'
import { RichText } from '../content/RichText'

interface Props {
  question: MatchingQuestion
  onChecked: () => void
}

export function MatchingExercise({ question, onChecked }: Props) {
  const [definitions] = useState(() => shuffled(question.pairs))
  const [terms] = useState(() => shuffled(question.pairs.map((pair) => pair.term)))
  const [choices, setChoices] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState(false)

  const correctCount = question.pairs.filter((pair) => choices[pair.term] === pair.term).length

  return (
    <div className="mt-4">
      <ul className="space-y-3">
        {definitions.map((pair, index) => {
          const choice = choices[pair.term] ?? ''
          const right = choice === pair.term
          const selectId = `${question.id}-${index}`
          return (
            <li key={pair.term} className="grid gap-2 rounded-xl border border-line p-3 md:grid-cols-[1fr_14rem] md:items-center">
              <label htmlFor={selectId} className="text-ink-soft">
                <RichText text={pair.definition} />
              </label>
              <div className="flex items-center gap-2">
                <select
                  id={selectId}
                  value={choice}
                  onChange={(event) => {
                    setChecked(false)
                    setChoices((state) => ({ ...state, [pair.term]: event.target.value }))
                  }}
                  className="h-10 min-w-0 flex-1 rounded-xl border border-line-strong bg-surface px-2 text-sm"
                >
                  <option value="">Choose a term</option>
                  {terms.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
                {checked && (
                  <span className={right ? 'text-success' : 'text-danger'}>
                    {right ? (
                      <Check aria-label="Correct" size={18} strokeWidth={2} />
                    ) : (
                      <X aria-label={`Incorrect. Correct term: ${pair.term}`} size={18} strokeWidth={2} />
                    )}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setChecked(true)
            onChecked()
          }}
          className="h-10 rounded-xl bg-accent px-4 text-sm font-medium text-accent-ink transition-transform active:scale-[0.98]"
        >
          Check matches
        </button>
        <button
          type="button"
          onClick={() => {
            setChoices({})
            setChecked(false)
          }}
          className="h-10 rounded-xl border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-sunken"
        >
          Reset
        </button>
        {checked && (
          <p role="status" className="font-mono text-sm">
            {correctCount} / {question.pairs.length} correct
          </p>
        )}
      </div>
    </div>
  )
}

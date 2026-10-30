import { Fragment, useState } from 'react'
import type { FillBlankQuestion } from '../../types/chapter'

interface Props {
  question: FillBlankQuestion
  onChecked: () => void
}

function normalize(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function FillBlankExercise({ question, onChecked }: Props) {
  const parts = question.sentence.split('___')
  const [values, setValues] = useState<string[]>(() => question.blanks.map(() => ''))
  const [checked, setChecked] = useState(false)

  const isRight = (index: number) => question.blanks[index].some((answer) => normalize(answer) === normalize(values[index]))
  const correctCount = question.blanks.filter((_, index) => isRight(index)).length

  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault()
        setChecked(true)
        onChecked()
      }}
    >
      <p className="leading-[2.6]">
        {parts.map((part, index) => (
          <Fragment key={index}>
            {part}
            {index < question.blanks.length && (
              <input
                aria-label={`Blank ${index + 1}`}
                value={values[index]}
                autoComplete="off"
                onChange={(event) => {
                  setChecked(false)
                  setValues((state) => state.map((value, i) => (i === index ? event.target.value : value)))
                }}
                className={`mx-1 h-9 w-36 max-w-full rounded-lg border bg-surface px-2 text-base ${
                  !checked ? 'border-line-strong' : isRight(index) ? 'border-success bg-success-soft' : 'border-danger bg-danger-soft'
                }`}
              />
            )}
          </Fragment>
        ))}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="h-10 rounded-xl bg-accent px-4 text-sm font-medium text-accent-ink transition-transform active:scale-[0.98]"
        >
          Check answers
        </button>
        {checked && (
          <p role="status" className="font-mono text-sm">
            {correctCount} / {question.blanks.length} correct
          </p>
        )}
      </div>
    </form>
  )
}

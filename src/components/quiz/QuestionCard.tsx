import type { Ref } from 'react'
import type { Mcq } from '../../types/chapter'
import { RichText } from '../content/RichText'

interface Props {
  ref?: Ref<HTMLHeadingElement>
  number: number
  mcq: Mcq
  order: number[]
  selected?: number
  onSelect: (originalIndex: number) => void
}

const LETTERS = ['A', 'B', 'C', 'D']

export function QuestionCard({ ref, number, mcq, order, selected, onSelect }: Props) {
  return (
    <fieldset className="rise min-w-0">
      <legend className="sr-only">Question {number}</legend>
      <p className="text-sm text-ink-faint">{mcq.topic}</p>
      <h2
        ref={ref}
        tabIndex={-1}
        className="mt-1 font-display text-2xl font-semibold leading-snug tracking-tight outline-none md:text-[1.7rem]"
      >
        <RichText text={mcq.question} />
      </h2>
      <div className="mt-6 grid gap-3">
        {order.map((originalIndex, position) => {
          const isSelected = selected === originalIndex
          return (
            <label
              key={originalIndex}
              className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition-[background-color,border-color,transform] duration-150 active:scale-[0.995] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                isSelected ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:border-line-strong'
              }`}
            >
              <input
                type="radio"
                name={`question-${mcq.id}`}
                checked={isSelected}
                onChange={() => onSelect(originalIndex)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`grid size-7 shrink-0 place-items-center rounded-lg font-mono text-sm ${
                  isSelected ? 'bg-accent text-accent-ink' : 'bg-sunken text-ink-soft'
                }`}
              >
                {LETTERS[position]}
              </span>
              <span className="pt-0.5">
                <RichText text={mcq.options[originalIndex]} />
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

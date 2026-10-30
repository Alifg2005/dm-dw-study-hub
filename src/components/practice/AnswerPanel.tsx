import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import type { WrittenQuestion } from '../../types/chapter'
import { DataTableView } from '../content/DataTableView'
import { RichText } from '../content/RichText'

export function AnswerPanel({ question }: { question: WrittenQuestion }) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()

  return (
    <div className="mt-4">
      <div className="rounded-xl bg-sunken px-4 py-3">
        <p className="text-xs font-semibold text-ink-soft">Short answer</p>
        <p className="mt-1">
          <RichText text={question.shortAnswer} />
        </p>
      </div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
        className="mt-2 inline-flex h-10 items-center gap-1.5 rounded-xl px-2 text-sm font-medium text-accent-text transition-colors hover:bg-accent-soft"
      >
        {expanded ? 'Hide Detailed Answer' : 'Show Detailed Answer'}
        <ChevronDown
          aria-hidden
          size={16}
          strokeWidth={1.75}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <div id={panelId} hidden={!expanded} className="mt-2 space-y-3 border-l-2 border-accent pl-4 text-ink-soft">
        {question.detailedAnswer.map((paragraph, index) => (
          <p key={index}>
            <RichText text={paragraph} />
          </p>
        ))}
        {question.answerTable && <DataTableView table={question.answerTable} />}
      </div>
    </div>
  )
}

import { ArrowDown, ArrowRight, BookmarkCheck, FileWarning, Lightbulb } from 'lucide-react'
import { Fragment } from 'react'
import type { CalloutTone, ContentBlock } from '../../types/chapter'
import { DataTableView } from './DataTableView'
import { RichText } from './RichText'

const calloutStyles: Record<CalloutTone, { label: string; icon: typeof Lightbulb; className: string }> = {
  key: { label: 'Key point', icon: BookmarkCheck, className: 'border-accent bg-accent-soft' },
  supplement: { label: 'Beyond the slides', icon: Lightbulb, className: 'border-line-strong bg-sunken' },
  'source-note': { label: 'Note on the source', icon: FileWarning, className: 'border-danger bg-danger-soft' },
}

function Callout({ tone, title, text }: { tone: CalloutTone; title?: string; text: string }) {
  const { label, icon: Icon, className } = calloutStyles[tone]
  return (
    <aside className={`rounded-r-2xl border-l-4 px-5 py-4 ${className}`}>
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Icon aria-hidden size={16} strokeWidth={1.75} />
        {title ?? label}
      </p>
      <p className="mt-1.5 text-ink-soft">
        <RichText text={text} />
      </p>
    </aside>
  )
}

function Flow({ steps }: { steps: { label: string; detail?: string }[] }) {
  return (
    <ol className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-stretch">
      {steps.map((step, index) => (
        <Fragment key={step.label}>
          <li className="rounded-xl border border-line bg-surface px-4 py-2.5 md:max-w-56 md:flex-1 md:basis-40">
            <span className="font-medium">{step.label}</span>
            {step.detail && (
              <span className="mt-0.5 block text-sm text-ink-soft">
                <RichText text={step.detail} />
              </span>
            )}
          </li>
          {index < steps.length - 1 && (
            <li aria-hidden className="grid place-items-center text-ink-faint">
              <ArrowDown size={16} strokeWidth={1.75} className="md:hidden" />
              <ArrowRight size={16} strokeWidth={1.75} className="hidden md:block" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="max-w-[68ch] text-ink-soft">
          <RichText text={block.text} />
        </p>
      )
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <div className="max-w-[68ch]">
          {block.title && <p className="mb-2 font-semibold">{block.title}</p>}
          <Tag
            className={`space-y-1.5 pl-5 text-ink-soft marker:text-ink-faint ${block.ordered ? 'list-decimal' : 'list-disc'}`}
          >
            {block.items.map((item, index) => (
              <li key={index}>
                <RichText text={item} />
              </li>
            ))}
          </Tag>
        </div>
      )
    }
    case 'formula':
      return (
        <div className="rounded-2xl border border-line bg-surface px-5 py-4">
          {block.label && <p className="text-sm font-medium text-ink-soft">{block.label}</p>}
          <p className="mt-1 overflow-x-auto whitespace-nowrap pb-1 font-mono text-[0.95rem] text-accent-text">
            <RichText text={block.expression} />
          </p>
          {block.note && (
            <p className="mt-1 text-sm text-ink-faint">
              <RichText text={block.note} />
            </p>
          )}
        </div>
      )
    case 'table':
      return <DataTableView table={block.table} />
    case 'callout':
      return <Callout tone={block.tone} title={block.title} text={block.text} />
    case 'flow':
      return <Flow steps={block.steps} />
  }
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  )
}

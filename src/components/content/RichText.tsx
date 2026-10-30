import type { ReactNode } from 'react'

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|_\{[^}]+\}|\^\{[^}]+\})/g

function parse(text: string): ReactNode[] {
  return text
    .split(TOKEN)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-ink">
            {parse(part.slice(2, -2))}
          </strong>
        )
      }
      if (part.startsWith('`')) {
        return (
          <code key={index} className="rounded-md bg-sunken px-1.5 py-0.5 font-mono text-[0.88em]">
            {part.slice(1, -1)}
          </code>
        )
      }
      if (part.startsWith('_{')) return <sub key={index}>{part.slice(2, -1)}</sub>
      if (part.startsWith('^{')) return <sup key={index}>{part.slice(2, -1)}</sup>
      return part
    })
}

export function RichText({ text }: { text: string }) {
  return <>{parse(text)}</>
}

import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFoundPage({ message = 'That page does not exist.' }: { message?: string }) {
  useDocumentTitle('Not found')
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <Compass aria-hidden className="mx-auto text-accent-text" size={40} strokeWidth={1.75} />
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">Nothing here</h1>
      <p className="mt-3 text-ink-soft">{message}</p>
      <Link
        to="/#chapters"
        className="mt-8 inline-flex h-11 items-center rounded-xl bg-accent px-5 font-medium text-accent-ink transition-transform active:scale-[0.98]"
      >
        See all chapters
      </Link>
    </section>
  )
}

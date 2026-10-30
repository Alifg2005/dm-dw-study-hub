import { ChevronDown, Box } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { chapters } from '../../data/registry'
import { ThemeToggle } from './ThemeToggle'

function ChapterMenu() {
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={container} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="chapter-menu"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-sunken hover:text-ink"
      >
        Chapters
        <ChevronDown
          aria-hidden
          size={16}
          strokeWidth={1.75}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <nav
          id="chapter-menu"
          aria-label="Chapters"
          className="absolute right-0 top-12 z-20 w-[min(21rem,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-2 shadow-lift"
        >
          {chapters.map(({ meta }) => (
            <NavLink
              key={meta.slug}
              to={`/chapters/${meta.slug}`}
              className={({ isActive }) =>
                `flex items-baseline gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-sunken ${
                  isActive ? 'bg-accent-soft text-accent-text' : 'text-ink'
                }`
              }
            >
              <span className="w-5 shrink-0 font-mono text-xs text-ink-faint">{meta.number}</span>
              {meta.title}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 rounded-lg font-display font-semibold tracking-tight">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-ink">
            <Box aria-hidden size={18} strokeWidth={1.75} />
          </span>
          <span className="hidden truncate sm:block">Data Mining & Data Warehouse</span>
          <span className="sm:hidden">DM & DW</span>
        </Link>
        <div className="flex items-center gap-1">
          <ChapterMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

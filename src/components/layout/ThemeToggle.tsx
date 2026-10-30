import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const Icon = theme === 'dark' ? Sun : Moon
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid size-10 place-items-center rounded-xl text-ink-soft transition-colors hover:bg-sunken hover:text-ink active:scale-95"
    >
      <Icon aria-hidden size={18} strokeWidth={1.75} />
    </button>
  )
}

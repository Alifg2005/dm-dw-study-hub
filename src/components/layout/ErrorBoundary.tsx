import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className="mx-auto max-w-xl px-6 py-24">
        <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-ink-soft">This page could not be displayed. Reload to try again.</p>
        <a className="mt-6 inline-block font-medium text-accent-text underline" href="/">
          Return to the home page
        </a>
      </main>
    )
  }
}

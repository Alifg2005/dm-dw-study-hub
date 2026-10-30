import { useEffect, useRef } from 'react'

interface Props {
  open: boolean
  unanswered: number
  onCancel: () => void
  onConfirm: () => void
}

export function SubmitDialog({ open, unanswered, onCancel, onConfirm }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal()
    if (!open && dialog.current?.open) dialog.current.close()
  }, [open])

  return (
    <dialog
      ref={dialog}
      onCancel={onCancel}
      aria-labelledby="submit-title"
      className="m-auto w-[min(28rem,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-6 text-ink shadow-lift"
    >
      <h2 id="submit-title" className="font-display text-2xl font-semibold tracking-tight">
        Submit your quiz?
      </h2>
      <p className="mt-2 text-ink-soft">
        {unanswered > 0
          ? `You have ${unanswered} unanswered ${unanswered === 1 ? 'question' : 'questions'}. Unanswered questions score zero.`
          : 'You answered every question. Answers cannot be changed after submitting.'}
      </p>
      <div className="mt-6 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 rounded-xl border border-line-strong px-4 font-medium transition-colors hover:bg-sunken"
        >
          Keep working
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="h-11 rounded-xl bg-accent px-5 font-medium text-accent-ink transition-transform active:scale-[0.98]"
        >
          Submit now
        </button>
      </div>
    </dialog>
  )
}

import type { ReactNode } from 'react'
import { FeedbackIcon } from '@/components/feedback/FeedbackIcon'
import type { FeedbackVariant } from '@/components/feedback/types'

export type AlertProps = {
  variant?: FeedbackVariant
  title: string
  description: ReactNode
  actionLabel?: string
  onAction?: () => void
  onClose?: () => void
}

const variantClasses: Record<FeedbackVariant, string> = {
  success: 'border-emerald-200 border-l-emerald-700 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 border-l-red-700 bg-red-50 text-red-900',
  warning: 'border-amber-200 border-l-amber-600 bg-amber-50 text-amber-950',
  info: 'border-blue-200 border-l-blue-700 bg-blue-50 text-blue-900',
}

const iconClasses: Record<FeedbackVariant, string> = {
  success: 'text-emerald-700',
  error: 'text-red-700',
  warning: 'text-amber-700',
  info: 'text-blue-700',
}

export function Alert({
  variant = 'info',
  title,
  description,
  actionLabel,
  onAction,
  onClose,
}: AlertProps) {
  const isUrgent = variant === 'error' || variant === 'warning'

  return (
    <section
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
      className={`relative flex gap-3 rounded-lg border border-l-4 px-4 py-3 ${variantClasses[variant]}`}
    >
      <FeedbackIcon
        variant={variant}
        className={`mt-0.5 h-4 w-4 shrink-0 ${iconClasses[variant]}`}
      />
      <div className='min-w-0 flex-1 pr-5'>
        <h2 className='text-sm font-semibold'>{title}</h2>
        <div className='mt-0.5 text-sm leading-5 opacity-80'>{description}</div>
        {actionLabel && onAction ? (
          <button
            type='button'
            onClick={onAction}
            className='mt-2 text-sm font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current'
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
      {onClose ? (
        <button
          type='button'
          aria-label='Fechar aviso'
          onClick={onClose}
          className='absolute right-3 top-3 text-current opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current'
        >
          <svg
            viewBox='0 0 24 24'
            aria-hidden='true'
            className='h-4 w-4'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          >
            <path d='m6 6 12 12M18 6 6 18' />
          </svg>
        </button>
      ) : null}
    </section>
  )
}

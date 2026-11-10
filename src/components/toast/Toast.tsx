'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { FeedbackIcon } from '@/components/feedback/FeedbackIcon'
import type { FeedbackVariant } from '@/components/feedback/types'

export type ToastProps = {
  variant?: FeedbackVariant
  title: string
  description: ReactNode
  actionLabel?: string
  onAction?: () => void
  onClose: () => void
  duration?: number
}

const DEFAULT_DURATION = 5000

const iconClasses: Record<FeedbackVariant, string> = {
  success: 'bg-emerald-300 text-emerald-900',
  error: 'bg-red-400 text-red-950',
  warning: 'bg-yellow-300 text-yellow-950',
  info: 'bg-blue-300 text-blue-950',
}

const progressClasses: Record<FeedbackVariant, string> = {
  success: 'bg-emerald-300',
  error: 'bg-red-400',
  warning: 'bg-yellow-300',
  info: 'bg-blue-300',
}

export function Toast({
  variant = 'success',
  title,
  description,
  actionLabel,
  onAction,
  onClose,
  duration = DEFAULT_DURATION,
}: ToastProps) {
  const [visible, setVisible] = useState(true)
  const onCloseRef = useRef(onClose)
  const closeToast = useCallback(() => {
    setVisible(false)
    onCloseRef.current()
  }, [])
  const isUrgent = variant === 'error' || variant === 'warning'

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const timeout = window.setTimeout(closeToast, duration)
    return () => window.clearTimeout(timeout)
  }, [closeToast, duration])

  if (!visible) {
    return null
  }

  return (
    <div className='pointer-events-none fixed bottom-5 right-5 z-50 w-[min(20rem,calc(100vw-2.5rem))]'>
      <section
        role={isUrgent ? 'alert' : 'status'}
        aria-live={isUrgent ? 'assertive' : 'polite'}
        aria-atomic='true'
        className='pointer-events-auto relative overflow-hidden rounded-xl bg-[#06343b] px-3 py-3 text-white shadow-[0_12px_30px_-10px_rgba(6,52,59,0.65)]'
      >
        <div className='flex items-center gap-2.5'>
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${iconClasses[variant]}`}
          >
            <FeedbackIcon variant={variant} className='h-3.5 w-3.5' />
          </span>
          <div className='min-w-0 flex-1 pr-1'>
            <h2 className='text-xs font-semibold leading-4'>{title}</h2>
            <div className='mt-0.5 text-[11px] leading-4 text-white/75'>
              {description}
            </div>
          </div>
          {actionLabel && onAction ? (
            <button
              type='button'
              onClick={onAction}
              className='shrink-0 px-1 text-xs font-semibold text-yellow-300 hover:text-yellow-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300'
            >
              {actionLabel}
            </button>
          ) : null}
          <button
            type='button'
            aria-label='Fechar notificação'
            onClick={closeToast}
            className='shrink-0 text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
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
        </div>
        <div
          aria-hidden='true'
          className={`absolute inset-x-0 bottom-0 h-[3px] origin-left ${progressClasses[variant]} animate-[toast-progress_linear_forwards]`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </section>
    </div>
  )
}

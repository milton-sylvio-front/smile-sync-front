import type { FeedbackVariant } from './types'

type FeedbackIconProps = {
  variant: FeedbackVariant
  className?: string
}

export function FeedbackIcon({ variant, className }: FeedbackIconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {variant === 'success' ? (
        <>
          <circle cx='12' cy='12' r='9' />
          <path d='m8 12 2.5 2.5L16 9' />
        </>
      ) : null}
      {variant === 'error' ? (
        <>
          <circle cx='12' cy='12' r='9' />
          <path d='m9 9 6 6m0-6-6 6' />
        </>
      ) : null}
      {variant === 'warning' ? (
        <>
          <path d='M10.3 3.9 2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z' />
          <path d='M12 9v4m0 3h.01' />
        </>
      ) : null}
      {variant === 'info' ? (
        <>
          <circle cx='12' cy='12' r='9' />
          <path d='M12 11v5m0-8h.01' />
        </>
      ) : null}
    </svg>
  )
}

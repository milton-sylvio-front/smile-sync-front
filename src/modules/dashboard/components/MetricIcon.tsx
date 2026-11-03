import type { MetricIcon as MetricIconName } from '@/modules/dashboard/types/dashboard'

const common = {
  viewBox: '0 0 24 24',
  'aria-hidden': true as const,
  className: 'h-5 w-5',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
}

export function MetricIcon({ name }: { name: MetricIconName }) {
  if (name === 'calendar') {
    return (
      <svg {...common}>
        <rect x='3.5' y='5' width='17' height='15' rx='2' />
        <path strokeLinecap='round' d='M8 3.5v3M16 3.5v3M3.5 10h17' />
      </svg>
    )
  }

  if (name === 'revenue') {
    return (
      <svg {...common}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16M16.5 7.5c0-1.4-2-2.5-4.5-2.5S7.5 6.1 7.5 7.5 9.5 10 12 10s4.5 1.1 4.5 2.5-2 2.5-4.5 2.5-4.5-1.1-4.5-2.5' />
      </svg>
    )
  }

  if (name === 'reactivation') {
    return (
      <svg {...common}>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 3.8 13.2 8l4.3.1-3.4 2.6 1.2 4.1L12 12.6 8.7 14.8 9.9 10.7 6.5 8.1 10.8 8 12 3.8Z'
        />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <circle cx='9' cy='9' r='2.6' />
      <circle cx='16' cy='10' r='2.1' />
      <path strokeLinecap='round' d='M4.5 18.5c.6-2.8 2.4-4.2 4.5-4.2s3.9 1.4 4.5 4.2M15 14.5c1.5-.2 2.9.4 3.9 1.7.5.7.8 1.4.9 2.3' />
    </svg>
  )
}

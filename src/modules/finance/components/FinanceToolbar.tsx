'use client'

import { Button } from '@/components/button/Button'
import { useFinance } from '@/modules/finance/state/FinanceProvider'

function DownloadIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v10m0 0 3.5-3.5M12 14.5 8.5 11' />
      <path strokeLinecap='round' d='M5 18.5h14' />
    </svg>
  )
}

export function FinanceToolbar() {
  const { content, period, setPeriod, exportReport } = useFinance()

  return (
    <div className='flex flex-wrap items-center justify-end gap-2 sm:gap-3'>
      <div role='group' aria-label='Período' className='inline-flex items-center gap-1'>
        {content.periods.map((item) => {
          const selected = item.id === period

          return (
            <button
              key={item.id}
              type='button'
              aria-pressed={selected}
              onClick={() => setPeriod(item.id)}
              className={`rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                selected
                  ? 'bg-white font-semibold text-ink shadow-sm'
                  : 'font-medium text-slate-500 hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <Button type='button' size='sm' onClick={exportReport}>
        <DownloadIcon />
        {content.exportLabel}
      </Button>
    </div>
  )
}

'use client'

import { Button } from '@/components/button/Button'
import { useSchedule } from '@/modules/schedule/state/ScheduleProvider'

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d={direction === 'left' ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'}
      />
    </svg>
  )
}

function CalendarPlusIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <rect x='3.5' y='5' width='17' height='15' rx='2' />
      <path strokeLinecap='round' d='M8 3.5v3M16 3.5v3M3.5 10h17M12 13.2v4.6M9.7 15.5h4.6' />
    </svg>
  )
}

export function ScheduleToolbar() {
  const { content, view, setView, rangeLabel, goPrevious, goNext, setComposerOpen } =
    useSchedule()

  return (
    <div className='flex w-full min-w-0 flex-wrap items-center gap-3'>
      <h1 className='shrink-0 text-xl font-bold tracking-tight text-primary sm:text-2xl'>
        {content.title}
      </h1>

      <div
        role='group'
        aria-label='Visualização da agenda'
        className='inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5'
      >
        {content.views.map((item) => {
          const selected = item.id === view
          return (
            <button
              key={item.id}
              type='button'
              aria-pressed={selected}
              onClick={() => setView(item.id)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                selected
                  ? 'bg-slate-100 font-semibold text-ink'
                  : 'font-medium text-slate-500 hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className='ml-auto flex flex-wrap items-center gap-2 sm:gap-3'>
        <div className='flex items-center gap-1 text-sm font-semibold text-slate-600'>
          <button
            type='button'
            className='inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            aria-label={content.previousLabel}
            onClick={goPrevious}
          >
            <ChevronIcon direction='left' />
          </button>
          <p className='min-w-44 text-center whitespace-nowrap'>{rangeLabel}</p>
          <button
            type='button'
            className='inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            aria-label={content.nextLabel}
            onClick={goNext}
          >
            <ChevronIcon direction='right' />
          </button>
        </div>

        <Button type='button' size='sm' onClick={() => setComposerOpen(true)}>
          <CalendarPlusIcon />
          {content.scheduleAction}
        </Button>
      </div>
    </div>
  )
}

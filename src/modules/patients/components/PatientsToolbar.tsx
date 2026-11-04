'use client'

import Link from 'next/link'
import { usePatients } from '@/modules/patients/state/PatientsProvider'

function SearchIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <circle cx='11' cy='11' r='6.5' />
      <path strokeLinecap='round' d='m16 16 4 4' />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path strokeLinecap='round' d='M12 5v14M5 12h14' />
    </svg>
  )
}

export function PatientsToolbar() {
  const { content, query, setQuery } = usePatients()

  return (
    <div className='flex w-full min-w-0 flex-wrap items-center gap-3'>
      <h1 className='shrink-0 text-xl font-bold tracking-tight text-primary sm:text-2xl'>
        {content.title}
      </h1>
      <label className='relative w-full max-w-md min-w-[200px] flex-1'>
        <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'>
          <SearchIcon />
        </span>
        <input
          type='search'
          value={query}
          placeholder={content.searchPlaceholder}
          aria-label={content.searchPlaceholder}
          onChange={(event) => setQuery(event.target.value)}
          className='h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15'
        />
      </label>
      <Link
        href={content.newPatientHref}
        className='ml-auto inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      >
        <PlusIcon />
        {content.newPatientLabel}
      </Link>
    </div>
  )
}

'use client'

import Link from 'next/link'
import type { BreadcrumbItem } from '@/modules/patients/types/patients'

function ChatIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-5 w-5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7 16.5 4.5 19V6.5A1.5 1.5 0 0 1 6 5h12a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 18 16H7Z'
      />
    </svg>
  )
}

export function PatientBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label='Trilha' className='flex w-full min-w-0 items-center gap-3'>
      <ol className='flex min-w-0 flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase'>
        {items.map((item, index) => (
          <li key={item.label} className='flex items-center gap-2'>
            {index > 0 ? (
              <span aria-hidden='true' className='text-slate-300'>
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className='transition-colors hover:text-primary'>
                {item.label}
              </Link>
            ) : (
              <span aria-current='page' className='text-primary'>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <button
        type='button'
        className='ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        aria-label='Precisa de ajuda?'
        onClick={() => window.dispatchEvent(new CustomEvent('smilesync:help'))}
      >
        <ChatIcon />
      </button>
    </nav>
  )
}

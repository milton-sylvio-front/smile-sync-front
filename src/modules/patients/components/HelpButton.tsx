'use client'

import { useEffect, useState } from 'react'
import type { NewPatientContent } from '@/modules/patients/types/patients'

function ChatIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-6 w-6'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7 17 4.5 19.5V6.8A1.8 1.8 0 0 1 6.3 5h11.4A1.8 1.8 0 0 1 19.5 6.8v7.4a1.8 1.8 0 0 1-1.8 1.8H7Z'
      />
    </svg>
  )
}

export function HelpButton({ help }: { help: NewPatientContent['help'] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function openHelp() {
      setOpen(true)
    }

    window.addEventListener('smilesync:help', openHelp)
    return () => window.removeEventListener('smilesync:help', openHelp)
  }, [])

  return (
    <div className='fixed right-4 bottom-5 z-30 flex flex-col items-end gap-3'>
      {open ? (
        <div className='w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)]'>
          <p className='text-sm font-semibold text-ink'>{help.greeting}</p>
          <p className='mt-1 text-sm leading-5 text-slate-500'>{help.description}</p>
        </div>
      ) : (
        <p className='rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)]'>
          {help.greeting}
        </p>
      )}
      <button
        type='button'
        aria-expanded={open}
        aria-label={help.label}
        onClick={() => setOpen((current) => !current)}
        className='inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_24px_-12px_rgba(16,185,129,0.9)] transition-colors hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'
      >
        <ChatIcon />
      </button>
    </div>
  )
}

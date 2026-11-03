function ClockIcon() {
  return (
    <svg
      viewBox='0 0 48 48'
      aria-hidden='true'
      className='h-11 w-11 text-primary'
    >
      <circle
        cx='24'
        cy='24'
        r='13'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeDasharray='2.4 2.6'
        strokeLinecap='round'
      />
      <path
        d='M24 24V14.5'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <path
        d='M24 24.2 30.5 28'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <circle cx='24' cy='24' r='1.6' fill='currentColor' />
    </svg>
  )
}

export function NotFoundMark() {
  return (
    <div
      className='relative mx-auto h-40 w-72 sm:h-48 sm:w-80'
      aria-hidden='true'
    >
      <p className='absolute inset-0 flex select-none items-center justify-center text-[7.5rem] font-bold leading-none tracking-tight text-[#e7edf1] sm:text-[9rem]'>
        404
      </p>
      <div className='absolute left-1/2 top-[54%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8eef2]/80' />
      <div className='absolute rotate-72 left-1/2 top-[52%] flex h-[5.25rem] w-[5.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.35rem] bg-secondary shadow-[0_14px_28px_-12px_rgba(6,52,59,0.45)]'>
        <ClockIcon />
      </div>
    </div>
  )
}

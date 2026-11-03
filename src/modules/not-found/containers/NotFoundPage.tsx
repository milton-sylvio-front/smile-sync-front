import Link from 'next/link'
import { NotFoundMark } from '@/modules/not-found/components/NotFoundMark'
import { PreviousPageButton } from '@/modules/not-found/components/PreviousPageButton'
import type { NotFoundContent } from '@/modules/not-found/types/not-found'

type NotFoundPageProps = {
  content: NotFoundContent
}

function HomeIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='currentColor'
    >
      <path d='M12 3.1 3.2 10.4V20a1.2 1.2 0 0 0 1.2 1.2h4.8v-6.1h5.6v6.1h4.8A1.2 1.2 0 0 0 20.8 20v-9.6L12 3.1Z' />
    </svg>
  )
}

export function NotFoundPage({ content }: NotFoundPageProps) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-[#f7f9fb] px-4 py-16 text-center'>
      <NotFoundMark />
      <h1 className='mt-2 text-2xl font-bold tracking-tight text-primary sm:text-[1.7rem]'>
        {content.title}
      </h1>
      <p className='mt-3 max-w-sm text-sm leading-6 text-[#8b97a3]'>
        {content.description}
      </p>
      <div className='mt-8 flex w-full max-w-[320px] flex-col gap-3'>
        <Link
          href={content.home.href}
          className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          <HomeIcon />
          {content.home.label}
        </Link>
        <PreviousPageButton label={content.back.label} />
      </div>
      <p className='mt-10 text-[11px] font-medium uppercase tracking-[0.14em] text-[#9aa6ae]'>
        <Link
          href={content.support.href}
          className='transition-colors hover:text-primary'
        >
          {content.support.label}
        </Link>
        <span aria-hidden='true' className='mx-2 text-[#c5ced4]'>
          ·
        </span>
        <Link
          href={content.report.href}
          className='transition-colors hover:text-primary'
        >
          {content.report.label}
        </Link>
      </p>
    </main>
  )
}

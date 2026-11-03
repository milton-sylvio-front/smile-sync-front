import Link from 'next/link'
import { Logotype } from '@/components/logotype/Logotype'
import { PasswordRecoveryForm } from '@/modules/password-recovery/components/PasswordRecoveryForm'
import type { PasswordRecoveryContent } from '@/modules/password-recovery/types/password-recovery'

type PasswordRecoveryPageProps = {
  content: PasswordRecoveryContent
}

function ArrowLeftIcon() {
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
        d='M19 12H5m6-7-7 7 7 7'
      />
    </svg>
  )
}

export function PasswordRecoveryPage({ content }: PasswordRecoveryPageProps) {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4 py-12'>
      <div className='flex w-full max-w-[420px] flex-col items-center'>
        <Logotype name={content.brandName} />
        <h1 className='mt-8 text-center text-[1.7rem] font-bold tracking-tight text-ink'>
          {content.title}
        </h1>
        <p className='mt-2 max-w-sm text-center text-sm leading-6 text-slate-500'>
          {content.subtitle}
        </p>

        <section className='mt-8 w-full rounded-2xl border border-slate-200/80 bg-white px-6 py-7 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)] sm:px-8'>
          <PasswordRecoveryForm content={content} />
          <div className='my-6 border-t border-slate-100' />
          <Link
            href={content.back.href}
            className='inline-flex w-full items-center justify-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80'
          >
            <ArrowLeftIcon />
            {content.back.label}
          </Link>
        </section>

        <footer className='mt-8 space-y-1 text-center text-xs leading-5 text-slate-400'>
          <p>{content.copyright}</p>
          <p>{content.securityNote}</p>
        </footer>
      </div>
    </main>
  )
}

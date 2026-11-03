import Link from 'next/link'
import { Logotype } from '@/components/logotype/Logotype'
import { LoginForm } from '@/modules/login/components/LoginForm'
import type { LoginContent } from '@/modules/login/types/login'

type LoginPageProps = {
  content: LoginContent
}

export function LoginPage({ content }: LoginPageProps) {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4 py-12'>
      <div className='flex w-full max-w-[420px] flex-col items-center'>
        <Logotype name={content.brandName} />
        <h1 className='mt-8 text-center text-[1.7rem] font-bold tracking-tight text-ink'>
          {content.title}
        </h1>
        <p className='mt-2 text-center text-sm text-slate-500'>
          {content.subtitle}
        </p>

        <section className='mt-8 w-full rounded-2xl border border-slate-200/80 bg-white px-6 py-7 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)] sm:px-8'>
          <LoginForm content={content} />
          <div className='my-6 border-t border-slate-100' />
          <p className='text-center text-sm text-slate-500'>
            {content.registerPrompt}{' '}
            <Link
              href={content.register.href}
              className='whitespace-nowrap font-semibold text-primary hover:underline'
            >
              {content.register.label}
            </Link>
          </p>
        </section>

        <footer className='mt-8 space-y-1 text-center text-xs leading-5 text-slate-400'>
          <p>{content.copyright}</p>
          <p>{content.securityNote}</p>
        </footer>
      </div>
    </main>
  )
}

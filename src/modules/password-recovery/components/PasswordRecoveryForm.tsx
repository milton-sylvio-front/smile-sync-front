'use client'

import { FormEvent, useState } from 'react'
import type { PasswordRecoveryContent } from '@/modules/password-recovery/types/password-recovery'

type PasswordRecoveryFormProps = {
  content: PasswordRecoveryContent
}

function MailIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <rect x='3.5' y='5.5' width='17' height='13' rx='2' />
      <path strokeLinecap='round' strokeLinejoin='round' d='m4 7 8 6 8-6' />
    </svg>
  )
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const fieldClassName =
  'h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/15'

export function PasswordRecoveryForm({ content }: PasswordRecoveryFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setSubmitted(false)
      setError('Informe o endereço de e-mail.')
      return
    }

    if (!isEmail(trimmedEmail)) {
      setSubmitted(false)
      setError('Informe um e-mail válido.')
      return
    }

    setError(undefined)
    setSubmitted(true)
  }

  return (
    <form className='flex flex-col' noValidate onSubmit={handleSubmit}>
      {submitted ? (
        <p
          role='status'
          className='mb-4 rounded-lg bg-primary/5 px-3 py-2.5 text-sm leading-5 text-primary'
        >
          {content.successMessage}
        </p>
      ) : null}

      <div>
        <label
          htmlFor='email'
          className='mb-1.5 block text-sm font-medium text-ink'
        >
          {content.email.label}
        </label>
        <div className='relative'>
          <span className='pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400'>
            <MailIcon />
          </span>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder={content.email.placeholder}
            value={email}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'email-erro' : undefined}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
          />
        </div>
        {error ? (
          <p id='email-erro' className='mt-1.5 text-sm text-red-700'>
            {error}
          </p>
        ) : null}
      </div>

      <button
        type='submit'
        className='mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      >
        {content.submitLabel}
      </button>
    </form>
  )
}

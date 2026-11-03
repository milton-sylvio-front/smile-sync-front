'use client'

import { FormEvent, useState } from 'react'
import { LegalModal } from '@/modules/register/components/LegalModal'
import type {
  LegalDocument,
  RegisterContent,
} from '@/modules/register/types/register'

type RegisterFormProps = {
  content: RegisterContent
}

type FieldErrors = {
  fullName?: string
  birthDate?: string
  document?: string
  phone?: string
  email?: string
  password?: string
  terms?: string
}

const fieldClassName =
  'h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/15'

function digits(value: string) {
  return value.replace(/\D/g, '')
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function formatDocument(value: string) {
  const numbers = digits(value).slice(0, 14)

  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  return numbers
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

function formatPhone(value: string) {
  const numbers = digits(value).slice(0, 13)
  const local = numbers.startsWith('55') ? numbers.slice(2) : numbers
  const country = numbers.startsWith('55') ? '+55 ' : ''
  const area = local.slice(0, 2)
  const subscriber = local.slice(2)

  if (!area) {
    return country.trim()
  }

  const formattedSubscriber =
    subscriber.length > 5
      ? `${subscriber.slice(0, subscriber.length - 4)}-${subscriber.slice(-4)}`
      : subscriber

  return `${country}(${area})${formattedSubscriber ? ` ${formattedSubscriber}` : ''}`
}

function formatBirthDate(value: string) {
  const numbers = digits(value).slice(0, 8)
  const day = numbers.slice(0, 2)
  const month = numbers.slice(2, 4)
  const year = numbers.slice(4, 8)

  return [day, month, year].filter(Boolean).join('/')
}

function isValidBirthDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)

  if (!match) {
    return false
  }

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    year >= 1900 &&
    date < today
  )
}

function CalendarIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <rect x='4' y='5' width='16' height='15' rx='2' />
      <path strokeLinecap='round' d='M8 3.5V7M16 3.5V7M4 10h16' />
    </svg>
  )
}

export function RegisterForm({ content }: RegisterFormProps) {
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [document, setDocument] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [openDocument, setOpenDocument] = useState<LegalDocument | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: FieldErrors = {}
    const trimmedName = fullName.trim()
    const trimmedEmail = email.trim()
    const documentDigits = digits(document)
    const phoneDigits = digits(phone)

    if (trimmedName.length < 3) {
      nextErrors.fullName = 'Informe o nome completo.'
    }

    if (!birthDate) {
      nextErrors.birthDate = 'Informe a data de nascimento.'
    } else if (!isValidBirthDate(birthDate)) {
      nextErrors.birthDate = 'Informe uma data de nascimento válida.'
    }

    if (!documentDigits) {
      nextErrors.document = 'Informe o CPF ou CNPJ.'
    } else if (documentDigits.length !== 11 && documentDigits.length !== 14) {
      nextErrors.document = 'Informe um CPF ou CNPJ válido.'
    }

    if (!phoneDigits) {
      nextErrors.phone = 'Informe o celular.'
    } else if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      nextErrors.phone = 'Informe um celular válido.'
    }

    if (!trimmedEmail) {
      nextErrors.email = 'Informe o endereço de e-mail.'
    } else if (!isEmail(trimmedEmail)) {
      nextErrors.email = 'Informe um e-mail válido.'
    }

    if (!password) {
      nextErrors.password = 'Crie uma senha.'
    } else if (password.length < 8) {
      nextErrors.password = 'A senha precisa ter pelo menos 8 caracteres.'
    }

    if (!acceptedTerms) {
      nextErrors.terms = 'Aceite os termos para criar a conta.'
    }

    setErrors(nextErrors)
  }

  return (
    <form className='flex flex-col' noValidate onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor='nome'
          className='mb-1.5 block text-sm font-medium text-ink'
        >
          {content.fullName.label}
        </label>
        <input
          id='nome'
          name='fullName'
          type='text'
          autoComplete='name'
          placeholder={content.fullName.placeholder}
          value={fullName}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={errors.fullName ? 'nome-erro' : undefined}
          onChange={(event) => setFullName(event.target.value)}
          className={fieldClassName}
        />
        {errors.fullName ? (
          <p id='nome-erro' className='mt-1.5 text-sm text-red-700'>
            {errors.fullName}
          </p>
        ) : null}
      </div>

      <div className='mt-4 grid gap-4 sm:grid-cols-2'>
        <div>
          <label
            htmlFor='nascimento'
            className='mb-1.5 block text-sm font-medium text-ink'
          >
            {content.birthDate.label}
          </label>
          <div className='relative'>
            <input
              id='nascimento'
              name='birthDate'
              type='text'
              inputMode='numeric'
              autoComplete='bday'
              placeholder={content.birthDate.placeholder}
              value={birthDate}
              aria-invalid={errors.birthDate ? true : undefined}
              aria-describedby={
                errors.birthDate ? 'nascimento-erro' : undefined
              }
              onChange={(event) =>
                setBirthDate(formatBirthDate(event.target.value))
              }
              className={`${fieldClassName} pr-10`}
            />
            <span className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400'>
              <CalendarIcon />
            </span>
            <input
              type='date'
              tabIndex={-1}
              aria-label='Abrir calendário'
              onChange={(event) => {
                const [year, month, day] = event.target.value.split('-')
                if (year && month && day) {
                  setBirthDate(`${day}/${month}/${year}`)
                }
              }}
              className='absolute inset-y-0 right-0 w-10 cursor-pointer opacity-0'
            />
          </div>
          {errors.birthDate ? (
            <p id='nascimento-erro' className='mt-1.5 text-sm text-red-700'>
              {errors.birthDate}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor='documento'
            className='mb-1.5 block text-sm font-medium text-ink'
          >
            {content.document.label}
          </label>
          <input
            id='documento'
            name='document'
            type='text'
            inputMode='numeric'
            autoComplete='off'
            placeholder={content.document.placeholder}
            value={document}
            aria-invalid={errors.document ? true : undefined}
            aria-describedby={errors.document ? 'documento-erro' : undefined}
            onChange={(event) =>
              setDocument(formatDocument(event.target.value))
            }
            className={fieldClassName}
          />
          {errors.document ? (
            <p id='documento-erro' className='mt-1.5 text-sm text-red-700'>
              {errors.document}
            </p>
          ) : null}
        </div>
      </div>

      <div className='mt-4 grid gap-4 sm:grid-cols-2'>
        <div>
          <label
            htmlFor='celular'
            className='mb-1.5 block text-sm font-medium text-ink'
          >
            {content.phone.label}
          </label>
          <input
            id='celular'
            name='phone'
            type='tel'
            autoComplete='tel'
            placeholder={content.phone.placeholder}
            value={phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? 'celular-erro' : undefined}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
            className={fieldClassName}
          />
          {errors.phone ? (
            <p id='celular-erro' className='mt-1.5 text-sm text-red-700'>
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor='email'
            className='mb-1.5 block text-sm font-medium text-ink'
          >
            {content.email.label}
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder={content.email.placeholder}
            value={email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-erro' : undefined}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
          />
          {errors.email ? (
            <p id='email-erro' className='mt-1.5 text-sm text-red-700'>
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className='mt-4'>
        <label
          htmlFor='senha'
          className='mb-1.5 block text-sm font-medium text-ink'
        >
          {content.password.label}
        </label>
        <input
          id='senha'
          name='password'
          type='password'
          autoComplete='new-password'
          placeholder={content.password.placeholder}
          value={password}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? 'senha-erro' : undefined}
          onChange={(event) => setPassword(event.target.value)}
          className={fieldClassName}
        />
        {errors.password ? (
          <p id='senha-erro' className='mt-1.5 text-sm text-red-700'>
            {errors.password}
          </p>
        ) : null}
      </div>

      <div className='mt-4'>
        <label className='flex items-start gap-2 text-sm text-ink/80'>
          <input
            type='checkbox'
            name='terms'
            checked={acceptedTerms}
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? 'termos-erro' : undefined}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className='mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 accent-primary'
          />
          <span>
            {content.termsLabel}{' '}
            <button
              type='button'
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setOpenDocument(content.terms)
              }}
              className='font-semibold text-primary hover:underline cursor-pointer'
            >
              {content.terms.label} Teste
            </button>{' '}
            {content.termsConjunction}{' '}
            <button
              type='button'
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setOpenDocument(content.privacy)
              }}
              className='font-semibold text-primary hover:underline cursor-pointer'
            >
              {content.privacy.label}
            </button>
            {'.'}
          </span>
        </label>
        {errors.terms ? (
          <p id='termos-erro' className='mt-1.5 text-sm text-red-700'>
            {errors.terms}
          </p>
        ) : null}
      </div>

      <button
        type='submit'
        className='mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      >
        {content.submitLabel}
      </button>
      {openDocument ? (
        <LegalModal
          document={openDocument}
          onClose={() => setOpenDocument(null)}
        />
      ) : null}
    </form>
  )
}

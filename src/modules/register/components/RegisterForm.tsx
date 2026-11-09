'use client'

import { FormEvent, useState } from 'react'
import { Button } from '@/components/button/Button'
import { LegalModal } from '@/modules/register/components/LegalModal'
import { useRegister } from '@/modules/register/hooks/useRegister'
import type {
  LegalDocument,
  RegisterContent,
} from '@/modules/register/types/register'

type RegisterFormProps = {
  content: RegisterContent
}

type FieldErrors = {
  clinicName?: string
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
  const [clinicName, setClinicName] = useState('')
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [document, setDocument] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRules, setShowPasswordRules] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [openDocument, setOpenDocument] = useState<LegalDocument | null>(null)
  const registerMutation = useRegister()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: FieldErrors = {}
    const trimmedClinicName = clinicName.trim()
    const trimmedName = fullName.trim()
    const trimmedEmail = email.trim()
    const documentDigits = digits(document)
    const phoneDigits = digits(phone)

    if (trimmedClinicName.length < 2) {
      nextErrors.clinicName = 'Informe o nome da clínica.'
    }

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
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      nextErrors.password =
        'Use pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.'
    }

    if (!acceptedTerms) {
      nextErrors.terms = 'Aceite os termos para criar a conta.'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      registerMutation.reset()
      return
    }

    registerMutation.mutate({
      clinicName: trimmedClinicName,
      name: trimmedName,
      email: trimmedEmail,
      password,
    })
  }

  return (
    <form className='flex flex-col' noValidate onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor='nome-clinica'
          className='mb-1.5 block text-sm font-medium text-ink'
        >
          {content.clinicName.label}
        </label>
        <input
          id='nome-clinica'
          name='clinicName'
          type='text'
          autoComplete='organization'
          placeholder={content.clinicName.placeholder}
          value={clinicName}
          aria-invalid={errors.clinicName ? true : undefined}
          aria-describedby={
            errors.clinicName ? 'nome-clinica-erro' : undefined
          }
          onChange={(event) => setClinicName(event.target.value)}
          className={fieldClassName}
        />
        {errors.clinicName ? (
          <p id='nome-clinica-erro' className='mt-1.5 text-sm text-red-700'>
            {errors.clinicName}
          </p>
        ) : null}
      </div>

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
        <div className='mb-1.5 flex items-center justify-between'>
          <label htmlFor='senha' className='text-sm font-medium text-ink'>
            {content.password.label}
          </label>
          <div className='group relative'>
            <button
              type='button'
              aria-label='Regras da senha'
              aria-expanded={showPasswordRules}
              aria-describedby='senha-regras'
              onClick={() => setShowPasswordRules((visible) => !visible)}
              className='flex h-5 w-5 items-center justify-center rounded-full text-slate-500 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            >
              <svg
                viewBox='0 0 24 24'
                aria-hidden='true'
                className='h-3.5 w-3.5'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
              >
                <circle cx='12' cy='12' r='9' />
                <path strokeLinecap='round' d='M12 11v5m0-8h.01' />
              </svg>
            </button>
            <div
              id='senha-regras'
              role='tooltip'
              className={`absolute bottom-full right-0 z-10 mb-2 w-56 rounded-md bg-primary px-3 py-2 text-xs leading-4 text-white shadow-lg transition-opacity ${
                showPasswordRules
                  ? 'visible opacity-100'
                  : 'invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'
              }`}
            >
              <p className='mb-1 font-semibold'>A senha deve conter</p>
              <ul className='list-inside list-disc'>
                <li>No mínimo 8 caracteres</li>
                <li>Pelo menos 1 letra maiúscula</li>
                <li>Pelo menos 1 número</li>
                <li>Pelo menos 1 caractere especial</li>
              </ul>
              <span
                aria-hidden='true'
                className='absolute -bottom-1 right-2 h-2 w-2 rotate-45 bg-primary'
              />
            </div>
          </div>
        </div>
        <div className='relative'>
          <input
            id='senha'
            name='password'
            type={showPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder={content.password.placeholder}
            value={password}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? 'senha-erro senha-regras' : 'senha-regras'}
            onChange={(event) => setPassword(event.target.value)}
            className={`${fieldClassName} bg-slate-50 pr-12`}
          />
          <button
            type='button'
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            aria-controls='senha'
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
            className='absolute inset-y-0 right-3 flex items-center justify-center text-slate-500 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            <svg
              viewBox='0 0 24 24'
              aria-hidden='true'
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
            >
              {showPassword ? (
                <>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.9 5.2A10.8 10.8 0 0112 5c5.5 0 9 7 9 7a15.7 15.7 0 01-3 3.8M6.2 6.2C4.1 7.7 3 12 3 12s3.5 7 9 7a10.7 10.7 0 004.1-.8'
                  />
                </>
              ) : (
                <>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z'
                  />
                  <circle cx='12' cy='12' r='2.5' />
                </>
              )}
            </svg>
          </button>
        </div>
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
            <Button
              variant='link'
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setOpenDocument(content.terms)
              }}
            >
              {content.terms.label}
            </Button>{' '}
            {content.termsConjunction}{' '}
            <Button
              variant='link'
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setOpenDocument(content.privacy)
              }}
            >
              {content.privacy.label}
            </Button>
            {'.'}
          </span>
        </label>
        {errors.terms ? (
          <p id='termos-erro' className='mt-1.5 text-sm text-red-700'>
            {errors.terms}
          </p>
        ) : null}
      </div>

      {registerMutation.isError ? (
        <p role='alert' className='mt-4 text-sm text-red-700'>
          {registerMutation.error.message}
        </p>
      ) : null}
      {registerMutation.isSuccess ? (
        <p role='status' className='mt-4 text-sm text-green-700'>
          Conta criada com sucesso. Você já pode fazer login.
        </p>
      ) : null}
      <Button
        type='submit'
        size='lg'
        fullWidth
        className='mt-5'
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? 'Criando conta...' : content.submitLabel}
      </Button>
      {openDocument ? (
        <LegalModal
          document={openDocument}
          onClose={() => setOpenDocument(null)}
        />
      ) : null}
    </form>
  )
}

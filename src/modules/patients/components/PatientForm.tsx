'use client'

import { useRef, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { HelpButton } from '@/modules/patients/components/HelpButton'
import {
  digits,
  formatBirthDate,
  formatCep,
  formatCpf,
  formatPhone,
  isEmail,
  isValidBirthDate,
} from '@/modules/patients/lib/patient'
import type { NewPatientContent, PatientDraft } from '@/modules/patients/types/patients'

type FieldKey = keyof PatientDraft | 'photo'

type PatientFormProps = {
  content: NewPatientContent
  initial: PatientDraft
  recordNumber: string
  showRecordValue: boolean
  title: string
  onSubmit: (draft: PatientDraft) => void
}

const fieldClass =
  'h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:bg-slate-100 disabled:text-slate-500 aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/15'

function CameraIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='1.8'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M4 8.5h3l1.5-2h7L17 8.5h3V18H4V8.5Z' />
      <circle cx='12' cy='13' r='2.6' />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-10 w-10 text-slate-300' fill='none' stroke='currentColor' strokeWidth='1.6'>
      <circle cx='12' cy='9' r='3' />
      <path strokeLinecap='round' d='M6.5 18.5c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4' />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='1.8'>
      <rect x='4' y='5' width='16' height='15' rx='2' />
      <path strokeLinecap='round' d='M8 3.5V7M16 3.5V7M4 10h16' />
    </svg>
  )
}

function Field({
  label,
  optional,
  optionalLabel,
  htmlFor,
  error,
  className = '',
  children,
}: {
  label: string
  optional?: boolean
  optionalLabel: string
  htmlFor?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className='flex items-baseline justify-between gap-3'>
        <span className='text-[11px] font-semibold tracking-[0.08em] text-slate-500 uppercase'>
          {label}
        </span>
        {optional ? (
          <span className='text-[11px] font-normal text-slate-400'>{optionalLabel}</span>
        ) : null}
      </label>
      <div className='mt-1.5'>{children}</div>
      {error ? <p className='mt-1 text-xs text-red-600'>{error}</p> : null}
    </div>
  )
}

function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.45)] sm:p-6'>
      {title ? <h2 className='text-base font-semibold text-ink'>{title}</h2> : null}
      <div className={title ? 'mt-5' : ''}>{children}</div>
    </section>
  )
}

export function PatientForm({
  content,
  initial,
  recordNumber,
  showRecordValue,
  title,
  onSubmit,
}: PatientFormProps) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const cepRequest = useRef(0)
  const [draft, setDraft] = useState(initial)
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [cepStatus, setCepStatus] = useState('')
  const fields = content.fields

  function setField<K extends keyof PatientDraft>(key: K, value: PatientDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current))
  }

  function lookupCep(cep: string) {
    const request = ++cepRequest.current
    setCepStatus(content.cepLoading)

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data: { erro?: boolean; logradouro?: string; bairro?: string; localidade?: string; uf?: string }) => {
        if (request !== cepRequest.current) {
          return
        }

        if (data.erro) {
          setCepStatus('')
          setErrors((current) => ({ ...current, zipCode: content.errors.cepNotFound }))
          return
        }

        setErrors((current) => ({ ...current, zipCode: undefined }))
        setCepStatus('')
        setDraft((current) => ({
          ...current,
          street: data.logradouro || current.street,
          district: data.bairro || current.district,
          city: data.localidade || current.city,
          state: data.uf || current.state,
        }))
      })
      .catch(() => {
        if (request === cepRequest.current) {
          setCepStatus('')
        }
      })
  }

  function updateZipCode(value: string) {
    const formatted = formatCep(value)
    setField('zipCode', formatted)
    const cep = digits(formatted)

    if (cep.length === 8) {
      lookupCep(cep)
      return
    }

    cepRequest.current += 1
    setCepStatus('')
  }

  function onPhoto(file: File | undefined) {
    if (!file) {
      return
    }

    const allowed = ['image/png', 'image/jpeg', 'image/svg+xml']

    if (!allowed.includes(file.type)) {
      setErrors((current) => ({ ...current, photo: content.photo.errorType }))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((current) => ({ ...current, photo: content.photo.errorSize }))
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setField('photo', String(reader.result ?? ''))
      setErrors((current) => ({ ...current, photo: undefined }))
    }
    reader.readAsDataURL(file)
  }

  function validate() {
    const nextErrors: Partial<Record<FieldKey, string>> = {}

    if (draft.name.trim().length < 3) {
      nextErrors.name = content.errors.name
    }

    if (draft.birthDate && !isValidBirthDate(draft.birthDate)) {
      nextErrors.birthDate = content.errors.birthDate
    }

    const documentDigits = digits(draft.document)

    if (documentDigits && documentDigits.length !== 11) {
      nextErrors.document = content.errors.document
    }

    const mobileDigits = digits(draft.mobile)

    if (mobileDigits && (mobileDigits.length < 10 || mobileDigits.length > 11)) {
      nextErrors.mobile = content.errors.mobile
    }

    const phoneDigits = digits(draft.phone)

    if (phoneDigits && (phoneDigits.length < 10 || phoneDigits.length > 11)) {
      nextErrors.phone = content.errors.phone
    }

    if (draft.email.trim() && !isEmail(draft.email.trim())) {
      nextErrors.email = content.errors.email
    }

    const cepDigits = digits(draft.zipCode)

    if (cepDigits && cepDigits.length !== 8) {
      nextErrors.zipCode = content.errors.zipCode
    }

    if (draft.hasGuardian && draft.guardianName.trim().length < 3) {
      nextErrors.guardianName = content.errors.guardianName
    }

    return nextErrors
  }

  const optional = content.optional

  return (
    <>
      <form
        className='mx-auto flex w-full max-w-5xl flex-col gap-4 pb-24'
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          const nextErrors = validate()
          setErrors(nextErrors)

          if (Object.values(nextErrors).some(Boolean)) {
            return
          }

          onSubmit({ ...draft, name: draft.name.trim(), email: draft.email.trim() })
        }}
      >
        <h1 className='text-xl font-bold tracking-tight text-primary'>{title}</h1>

        <Card>
          <div className='flex flex-col items-center py-2'>
            <span className='flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-dashed border-slate-300 bg-slate-50'>
              {draft.photo ? (
                <img src={draft.photo} alt={content.photo.alt} className='h-full w-full object-cover' />
              ) : (
                <UserIcon />
              )}
            </span>
            <button
              type='button'
              onClick={() => fileRef.current?.click()}
              className='mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            >
              <CameraIcon />
              {draft.photo ? content.photo.change : content.photo.add}
            </button>
            <p className='mt-3 text-center text-[11px] font-medium tracking-[0.08em] text-slate-400 uppercase'>
              {content.photo.hint}
            </p>
            {errors.photo ? <p className='mt-2 text-xs text-red-600'>{errors.photo}</p> : null}
            <input
              ref={fileRef}
              type='file'
              accept='image/png,image/jpeg,image/svg+xml'
              className='sr-only'
              onChange={(event) => onPhoto(event.target.files?.[0])}
            />
          </div>
        </Card>

        <Card title={content.sections.data}>
          <div className='grid gap-4 sm:grid-cols-6'>
            <Field
              className='sm:col-span-4'
              label={fields.name}
              optionalLabel={optional}
              htmlFor='paciente-nome'
              error={errors.name}
            >
              <input
                id='paciente-nome'
                name='name'
                value={draft.name}
                placeholder={fields.namePlaceholder}
                aria-invalid={errors.name ? true : undefined}
                aria-required='true'
                onChange={(event) => setField('name', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field
              className='sm:col-span-2'
              label={fields.birthDate}
              optional
              optionalLabel={optional}
              htmlFor='paciente-nascimento'
              error={errors.birthDate}
            >
              <div className='relative'>
                <input
                  id='paciente-nascimento'
                  inputMode='numeric'
                  placeholder={fields.birthDatePlaceholder}
                  value={draft.birthDate}
                  aria-invalid={errors.birthDate ? true : undefined}
                  onChange={(event) => setField('birthDate', formatBirthDate(event.target.value))}
                  className={`${fieldClass} pr-10`}
                />
                <input
                  ref={dateRef}
                  type='date'
                  tabIndex={-1}
                  className='sr-only'
                  onChange={(event) => {
                    const [year, month, day] = event.target.value.split('-')
                    if (year && month && day) {
                      setField('birthDate', `${day}/${month}/${year}`)
                    }
                  }}
                />
                <button
                  type='button'
                  aria-label={fields.birthDate}
                  onClick={() => {
                  const input = dateRef.current

                  if (!input || typeof input.showPicker !== 'function') {
                    return
                  }

                  try {
                    input.showPicker()
                  } catch {
                    input.focus()
                  }
                }}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-slate-400'
                >
                  <CalendarIcon />
                </button>
              </div>
            </Field>
            <Field className='sm:col-span-2' label={fields.document} optional optionalLabel={optional} htmlFor='paciente-cpf' error={errors.document}>
              <input
                id='paciente-cpf'
                inputMode='numeric'
                placeholder={fields.documentPlaceholder}
                value={draft.document}
                aria-invalid={errors.document ? true : undefined}
                onChange={(event) => setField('document', formatCpf(event.target.value))}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-2' label={fields.rg} optional optionalLabel={optional} htmlFor='paciente-rg'>
              <input
                id='paciente-rg'
                placeholder={fields.rgPlaceholder}
                value={draft.rg}
                onChange={(event) => setField('rg', event.target.value.slice(0, 20))}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-2' label={fields.rgIssuer} optional optionalLabel={optional} htmlFor='paciente-emissor'>
              <input
                id='paciente-emissor'
                placeholder={fields.rgIssuerPlaceholder}
                value={draft.rgIssuer}
                onChange={(event) => setField('rgIssuer', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-3' label={fields.sex} optional optionalLabel={optional} htmlFor='paciente-sexo'>
              <select
                id='paciente-sexo'
                value={draft.sex}
                onChange={(event) => setField('sex', event.target.value)}
                className={fieldClass}
              >
                <option value=''>{content.selectPlaceholder}</option>
                {content.options.sex.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field className='sm:col-span-3' label={fields.maritalStatus} optional optionalLabel={optional} htmlFor='paciente-civil'>
              <select
                id='paciente-civil'
                value={draft.maritalStatus}
                onChange={(event) => setField('maritalStatus', event.target.value)}
                className={fieldClass}
              >
                <option value=''>{content.selectPlaceholder}</option>
                {content.options.maritalStatus.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field className='sm:col-span-3' label={fields.occupation} optional optionalLabel={optional} htmlFor='paciente-profissao'>
              <select
                id='paciente-profissao'
                value={draft.occupation}
                onChange={(event) => setField('occupation', event.target.value)}
                className={fieldClass}
              >
                <option value=''>{content.selectPlaceholder}</option>
                {content.options.occupation.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field className='sm:col-span-3' label={fields.plan} optional optionalLabel={optional} htmlFor='paciente-plano'>
              <input
                id='paciente-plano'
                placeholder={fields.planPlaceholder}
                value={draft.plan}
                onChange={(event) => setField('plan', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-3' label={fields.planNumber} optional optionalLabel={optional} htmlFor='paciente-plano-numero'>
              <input
                id='paciente-plano-numero'
                placeholder={fields.planNumberPlaceholder}
                value={draft.planNumber}
                onChange={(event) => setField('planNumber', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-3' label={fields.recordNumber} optional optionalLabel={optional} htmlFor='paciente-prontuario'>
              <input
                id='paciente-prontuario'
                value={showRecordValue ? recordNumber : ''}
                placeholder={content.recordPlaceholder}
                disabled
                readOnly
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-6' label={fields.reference} optional optionalLabel={optional} htmlFor='paciente-referencia'>
              <input
                id='paciente-referencia'
                placeholder={fields.referencePlaceholder}
                value={draft.reference}
                onChange={(event) => setField('reference', event.target.value)}
                className={fieldClass}
              />
            </Field>
          </div>
        </Card>

        <Card title={content.sections.contact}>
          <div className='grid gap-4 sm:grid-cols-6'>
            <Field className='sm:col-span-3' label={fields.mobile} optional optionalLabel={optional} htmlFor='paciente-celular' error={errors.mobile}>
              <input
                id='paciente-celular'
                inputMode='tel'
                placeholder={fields.mobilePlaceholder}
                value={draft.mobile}
                aria-invalid={errors.mobile ? true : undefined}
                onChange={(event) => setField('mobile', formatPhone(event.target.value))}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-3' label={fields.phone} optional optionalLabel={optional} htmlFor='paciente-telefone' error={errors.phone}>
              <input
                id='paciente-telefone'
                inputMode='tel'
                placeholder={fields.phonePlaceholder}
                value={draft.phone}
                aria-invalid={errors.phone ? true : undefined}
                onChange={(event) => setField('phone', formatPhone(event.target.value))}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-6' label={fields.email} optional optionalLabel={optional} htmlFor='paciente-email' error={errors.email}>
              <input
                id='paciente-email'
                type='email'
                placeholder={fields.emailPlaceholder}
                value={draft.email}
                aria-invalid={errors.email ? true : undefined}
                onChange={(event) => setField('email', event.target.value)}
                className={fieldClass}
              />
            </Field>
          </div>
        </Card>

        <Card title={content.sections.address}>
          <div className='grid gap-4 sm:grid-cols-6'>
            <Field className='sm:col-span-2' label={fields.zipCode} optional optionalLabel={optional} htmlFor='paciente-cep' error={errors.zipCode}>
              <input
                id='paciente-cep'
                inputMode='numeric'
                placeholder={fields.zipCodePlaceholder}
                value={draft.zipCode}
                aria-invalid={errors.zipCode ? true : undefined}
                onChange={(event) => updateZipCode(event.target.value)}
                className={fieldClass}
              />
              {cepStatus ? <p className='mt-1 text-xs text-slate-400'>{cepStatus}</p> : null}
            </Field>
            <Field className='sm:col-span-4' label={fields.street} optional optionalLabel={optional} htmlFor='paciente-logradouro'>
              <input
                id='paciente-logradouro'
                placeholder={fields.streetPlaceholder}
                value={draft.street}
                onChange={(event) => setField('street', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-2' label={fields.number} optional optionalLabel={optional} htmlFor='paciente-numero'>
              <input
                id='paciente-numero'
                placeholder={fields.numberPlaceholder}
                value={draft.number}
                onChange={(event) => setField('number', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-4' label={fields.complement} optional optionalLabel={optional} htmlFor='paciente-complemento'>
              <input
                id='paciente-complemento'
                placeholder={fields.complementPlaceholder}
                value={draft.complement}
                onChange={(event) => setField('complement', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-2' label={fields.district} optional optionalLabel={optional} htmlFor='paciente-bairro'>
              <input
                id='paciente-bairro'
                placeholder={fields.districtPlaceholder}
                value={draft.district}
                onChange={(event) => setField('district', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-2' label={fields.city} optional optionalLabel={optional} htmlFor='paciente-cidade'>
              <input
                id='paciente-cidade'
                placeholder={fields.cityPlaceholder}
                value={draft.city}
                onChange={(event) => setField('city', event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field className='sm:col-span-2' label={fields.state} optional optionalLabel={optional} htmlFor='paciente-estado'>
              <select
                id='paciente-estado'
                value={draft.state}
                onChange={(event) => setField('state', event.target.value)}
                className={fieldClass}
              >
                <option value=''>{content.selectPlaceholder}</option>
                {content.options.states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <Card title={content.sections.guardian}>
          <fieldset>
            <legend className='sr-only'>{content.sections.guardian}</legend>
            <div className='flex gap-6 text-sm text-ink'>
              <label className='inline-flex items-center gap-2'>
                <input
                  type='radio'
                  name='responsavel'
                  checked={draft.hasGuardian}
                  onChange={() => setField('hasGuardian', true)}
                  className='h-4 w-4 accent-primary'
                />
                {content.yes}
              </label>
              <label className='inline-flex items-center gap-2'>
                <input
                  type='radio'
                  name='responsavel'
                  checked={!draft.hasGuardian}
                  onChange={() => setField('hasGuardian', false)}
                  className='h-4 w-4 accent-primary'
                />
                {content.no}
              </label>
            </div>
          </fieldset>
          {draft.hasGuardian ? (
            <div className='mt-4 grid gap-4 sm:grid-cols-6'>
              <Field className='sm:col-span-2' label={fields.guardianName} optionalLabel={optional} htmlFor='responsavel-nome' error={errors.guardianName}>
                <input
                  id='responsavel-nome'
                  value={draft.guardianName}
                  placeholder={fields.guardianNamePlaceholder}
                  aria-invalid={errors.guardianName ? true : undefined}
                  onChange={(event) => setField('guardianName', event.target.value)}
                  className={fieldClass}
                />
              </Field>
              <Field className='sm:col-span-2' label={fields.guardianRelationship} optional optionalLabel={optional} htmlFor='responsavel-parentesco'>
                <select
                  id='responsavel-parentesco'
                  value={draft.guardianRelationship}
                  onChange={(event) => setField('guardianRelationship', event.target.value)}
                  className={fieldClass}
                >
                  <option value=''>{content.selectPlaceholder}</option>
                  {content.options.relationship.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field className='sm:col-span-2' label={fields.guardianPhone} optional optionalLabel={optional} htmlFor='responsavel-celular'>
                <input
                  id='responsavel-celular'
                  inputMode='tel'
                  placeholder={fields.guardianPhonePlaceholder}
                  value={draft.guardianPhone}
                  onChange={(event) => setField('guardianPhone', formatPhone(event.target.value))}
                  className={fieldClass}
                />
              </Field>
            </div>
          ) : null}
        </Card>

        <div className='flex justify-end gap-3 pr-16'>
          <button
            type='button'
            onClick={() => router.push('/pacientes')}
            className='inline-flex h-11 items-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary'
          >
            {content.cancel}
          </button>
          <button
            type='submit'
            className='inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            {content.save}
          </button>
        </div>
      </form>
      <HelpButton help={content.help} />
    </>
  )
}

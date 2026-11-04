'use client'

import { useRef, useState, type RefObject } from 'react'
import Link from 'next/link'
import { PatientAvatar } from '@/modules/patients/components/PatientAvatar'
import { SignaturePad } from '@/modules/patients/components/SignaturePad'
import { isZeroBalance, teethInTreatments } from '@/modules/patients/lib/patient'
import { usePatients } from '@/modules/patients/state/PatientsProvider'
import type { Patient, PatientTabId } from '@/modules/patients/types/patients'

const upperRight = ['18', '17', '16', '15', '14', '13', '12', '11']
const upperLeft = ['21', '22', '23', '24', '25', '26', '27', '28']
const lowerRight = ['48', '47', '46', '45', '44', '43', '42', '41']
const lowerLeft = ['31', '32', '33', '34', '35', '36', '37', '38']

function CakeIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='1.8'>
      <path strokeLinecap='round' d='M4 13h16v6H4zM4 16h16M8 13v-2a4 4 0 0 1 8 0v2' />
      <path strokeLinecap='round' d='M12 4v3' />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='1.8'>
      <rect x='3.5' y='5' width='17' height='14' rx='2' />
      <path strokeLinecap='round' d='M8 10h5M8 14h8' />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-3.5 w-3.5' fill='none' stroke='currentColor' strokeWidth='2'>
      <path strokeLinecap='round' d='M12 5v14M5 12h14' />
    </svg>
  )
}

function PenIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='1.8'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M4 20h4l10-10-4-4L4 16v4Z' />
      <path strokeLinecap='round' d='m12 6 4 4' />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='1.8'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 16V6m0 0-3.5 3.5M12 6l3.5 3.5' />
      <path strokeLinecap='round' d='M5 18.5h14' />
    </svg>
  )
}

function FileIcon({ kind }: { kind: 'image' | 'pdf' }) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-6 w-6' fill='none' stroke='currentColor' strokeWidth='1.6'>
      <path strokeLinecap='round' strokeLinejoin='round' d='M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z' />
      {kind === 'pdf' ? (
        <path strokeLinecap='round' d='M8.5 13h7M8.5 16.5h5' />
      ) : (
        <path strokeLinecap='round' strokeLinejoin='round' d='m8 15 2.2-2.2 1.6 1.6L15.5 11 18 13.5' />
      )}
    </svg>
  )
}

function alertValue(value: string) {
  const normalized = value.trim().toLowerCase()
  return normalized !== '—' && normalized !== 'nenhuma' && normalized !== 'nenhum'
}

export function PatientDetail({ patient }: { patient: Patient }) {
  const { content, addEvolution, addFile, sign } = usePatients()
  const [tab, setTab] = useState<PatientTabId>('record')
  const [anamnesisOpen, setAnamnesisOpen] = useState(false)
  const [evolutionOpen, setEvolutionOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [evolutionError, setEvolutionError] = useState<{ title?: string; description?: string }>({})
  const [tooth, setTooth] = useState<string | null>(null)
  const [padKey, setPadKey] = useState(0)
  const [hasInk, setHasInk] = useState(false)
  const [justSigned, setJustSigned] = useState(false)
  const [signatureError, setSignatureError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const highlighted = teethInTreatments(patient)

  function saveEvolution() {
    const nextTitle = title.trim() || (tooth ? `Tratamento - Dente #${tooth}` : '')
    const nextDescription = description.trim()
    const nextError: { title?: string; description?: string } = {}

    if (!nextTitle) {
      nextError.title = content.evolutionForm.titleError
    }

    if (!nextDescription) {
      nextError.description = content.evolutionForm.descriptionError
    }

    setEvolutionError(nextError)

    if (nextError.title || nextError.description) {
      return
    }

    addEvolution(patient.id, { title: nextTitle, description: nextDescription })
    setTitle('')
    setDescription('')
    setEvolutionOpen(false)
    setTab('record')
  }

  function uploadFiles(list: FileList | null) {
    if (!list) {
      return
    }

    Array.from(list).forEach((file) => {
      addFile(patient.id, {
        name: file.name,
        kind: file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
      })
    })
  }

  function finishSignature() {
    if (!hasInk) {
      setSignatureError(content.signature.emptyError)
      return
    }

    sign(patient.id)
    setHasInk(false)
    setJustSigned(true)
    setSignatureError('')
    setPadKey((current) => current + 1)
  }

  return (
    <div className='min-w-0 space-y-4'>
      <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex min-w-0 items-center gap-4'>
            <PatientAvatar
              name={patient.name}
              photo={patient.photo}
              active={patient.status === 'active'}
              size='lg'
            />
            <div className='min-w-0'>
              <h2 className='text-2xl font-bold tracking-tight text-ink'>{patient.name}</h2>
              <div className='mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500'>
                <span className='inline-flex items-center gap-1.5'>
                  <CakeIcon />
                  {patient.birthLabel
                    ? `${patient.birthLabel}${patient.age != null ? ` (${patient.age} anos)` : ''}`
                    : 'Data de nascimento não informada'}
                </span>
                <span className='inline-flex items-center gap-1.5'>
                  <CardIcon />
                  {patient.document || 'Sem CPF'}
                </span>
              </div>
            </div>
          </div>
          <div className='flex shrink-0 flex-wrap gap-2'>
            <button
              type='button'
              aria-expanded={anamnesisOpen}
              onClick={() => setAnamnesisOpen((open) => !open)}
              className='inline-flex h-10 items-center rounded-lg bg-secondary px-4 text-sm font-semibold text-primary transition-colors hover:bg-secondary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            >
              {content.anamnesisLabel}
            </button>
            <Link
              href={`/pacientes/${patient.id}/editar`}
              className='inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            >
              {content.editProfileLabel}
            </Link>
          </div>
        </div>
      </section>

      <div role='tablist' aria-label='Prontuário do paciente' className='flex gap-5 overflow-x-auto px-1'>
        {content.tabs.map((item) => {
          const selected = tab === item.id

          return (
            <button
              key={item.id}
              type='button'
              role='tab'
              id={`aba-${item.id}`}
              aria-selected={selected}
              aria-controls={`painel-${item.id}`}
              onClick={() => setTab(item.id)}
              className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                selected ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div
        role='tabpanel'
        id={`painel-${tab}`}
        aria-labelledby={`aba-${tab}`}
      >
        {tab === 'record' ? (
          <div className='grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_240px]'>
            <div className='space-y-4'>
              {anamnesisOpen ? (
                <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
                  <h3 className='text-base font-bold text-primary'>{content.anamnesisTitle}</h3>
                  {patient.anamnesis.length === 0 ? (
                    <p className='mt-3 text-sm text-slate-500'>{content.emptyAnamnesis}</p>
                  ) : (
                    <dl className='mt-4 grid gap-3 sm:grid-cols-2'>
                      {patient.anamnesis.map((item) => (
                        <div key={item.label} className='rounded-xl bg-surface px-3 py-2.5'>
                          <dt className='text-xs text-slate-500'>{item.label}</dt>
                          <dd className='mt-1 text-sm font-semibold text-ink'>{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </section>
              ) : null}

              <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-base font-bold text-primary'>{content.historyTitle}</h3>
                  <button
                    type='button'
                    aria-expanded={evolutionOpen}
                    onClick={() => setEvolutionOpen((open) => !open)}
                    className='inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.12em] text-primary uppercase'
                  >
                    <PlusIcon />
                    {content.addEvolutionLabel}
                  </button>
                </div>

                {evolutionOpen ? (
                  <form
                    className='mt-4 rounded-xl border border-slate-200 bg-surface p-4'
                    onSubmit={(event) => {
                      event.preventDefault()
                      saveEvolution()
                    }}
                  >
                    <p className='text-sm font-semibold text-ink'>{content.evolutionForm.title}</p>
                    <label className='mt-3 block text-xs font-medium text-slate-500' htmlFor='evolucao-titulo'>
                      {content.evolutionForm.titleLabel}
                    </label>
                    <input
                      id='evolucao-titulo'
                      value={title}
                      placeholder={
                        tooth
                          ? `Tratamento - Dente #${tooth}`
                          : content.evolutionForm.titlePlaceholder
                      }
                      aria-invalid={evolutionError.title ? true : undefined}
                      onChange={(event) => setTitle(event.target.value)}
                      className='mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15'
                    />
                    {evolutionError.title ? (
                      <p className='mt-1 text-xs text-red-600'>{evolutionError.title}</p>
                    ) : null}
                    <label className='mt-3 block text-xs font-medium text-slate-500' htmlFor='evolucao-descricao'>
                      {content.evolutionForm.descriptionLabel}
                    </label>
                    <textarea
                      id='evolucao-descricao'
                      value={description}
                      rows={3}
                      placeholder={content.evolutionForm.descriptionPlaceholder}
                      aria-invalid={evolutionError.description ? true : undefined}
                      onChange={(event) => setDescription(event.target.value)}
                      className='mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15'
                    />
                    {evolutionError.description ? (
                      <p className='mt-1 text-xs text-red-600'>{evolutionError.description}</p>
                    ) : null}
                    <div className='mt-3 flex justify-end gap-2'>
                      <button
                        type='button'
                        onClick={() => setEvolutionOpen(false)}
                        className='inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-ink'
                      >
                        {content.evolutionForm.cancel}
                      </button>
                      <button
                        type='submit'
                        className='inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-semibold text-white'
                      >
                        {content.evolutionForm.save}
                      </button>
                    </div>
                  </form>
                ) : null}

                {patient.treatments.length === 0 ? (
                  <p className='mt-4 text-sm text-slate-500'>{content.emptyHistory}</p>
                ) : (
                  <ol className='mt-5 space-y-5'>
                    {patient.treatments.map((entry, index) => (
                      <li key={entry.id} className='relative pl-6'>
                        {index < patient.treatments.length - 1 ? (
                          <span className='absolute top-4 bottom-[-22px] left-[5px] w-px bg-slate-200' />
                        ) : null}
                        <span
                          className={`absolute top-1 left-0 h-3 w-3 rounded-full ${
                            index === 0 ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}
                        />
                        <div className='flex flex-wrap items-center justify-between gap-2'>
                          <p className='text-xs text-slate-400'>
                            {entry.date} · {entry.time}
                          </p>
                          <p className='text-xs font-medium text-slate-400'>{entry.author}</p>
                        </div>
                        <h4 className='mt-1 text-sm font-bold text-ink'>{entry.title}</h4>
                        <p className='mt-1 text-sm leading-6 text-slate-500'>{entry.description}</p>
                      </li>
                    ))}
                  </ol>
                )}
              </section>

              {patient.signaturePending ? (
                <section className='rounded-2xl border border-dashed border-[#e4d48a] bg-[#fbf8e6] px-5 py-6 text-center'>
                  <span className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_20px_-12px_rgba(15,23,42,0.8)]'>
                    <PenIcon />
                  </span>
                  <h3 className='mt-3 text-base font-bold text-primary'>{content.signature.title}</h3>
                  <p className='mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500'>
                    {content.signature.description}
                  </p>
                  <div className='relative mx-auto mt-4 h-36 max-w-xl'>
                    <div className='h-full overflow-hidden rounded-xl border border-slate-200 bg-white'>
                      <SignaturePad
                        key={padKey}
                        label={content.signature.placeholder}
                        onDraw={() => {
                          setHasInk(true)
                          setSignatureError('')
                        }}
                      />
                    </div>
                    {hasInk ? null : (
                      <p className='pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-sm text-slate-400 italic'>
                        {content.signature.placeholder}
                      </p>
                    )}
                  </div>
                  {signatureError ? (
                    <p className='mt-2 text-xs text-red-600'>{signatureError}</p>
                  ) : null}
                  <div className='mt-4 flex flex-wrap items-center justify-center gap-2'>
                    <button
                      type='button'
                      onClick={finishSignature}
                      className='inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-white'
                    >
                      {content.signature.submit}
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        setPadKey((current) => current + 1)
                        setHasInk(false)
                        setSignatureError('')
                      }}
                      className='inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-ink'
                    >
                      {content.signature.clear}
                    </button>
                  </div>
                </section>
              ) : null}

              {!patient.signaturePending && justSigned ? (
                <section className='rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-5'>
                  <h3 className='text-base font-bold text-emerald-800'>{content.signature.doneTitle}</h3>
                  <p className='mt-1 text-sm text-emerald-700'>{content.signature.doneDescription}</p>
                </section>
              ) : null}
            </div>

            <div className='space-y-4'>
              <QuickInfo patient={patient} />
              <FilesCard patient={patient} fileRef={fileRef} onUpload={uploadFiles} />
            </div>
          </div>
        ) : null}

        {tab === 'odontogram' ? (
          <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
            <h3 className='text-base font-bold text-primary'>{content.odontogram.title}</h3>
            <p className='mt-1 text-sm text-slate-500'>{content.odontogram.hint}</p>
            <div className='mt-6 space-y-3 overflow-x-auto'>
              <div className='flex min-w-max justify-center gap-4'>
                <ToothRow teeth={upperRight} highlighted={highlighted} selected={tooth} onSelect={setTooth} />
                <ToothRow teeth={upperLeft} highlighted={highlighted} selected={tooth} onSelect={setTooth} />
              </div>
              <div className='mx-auto h-px w-full max-w-3xl bg-slate-200' />
              <div className='flex min-w-max justify-center gap-4'>
                <ToothRow teeth={lowerRight} highlighted={highlighted} selected={tooth} onSelect={setTooth} />
                <ToothRow teeth={lowerLeft} highlighted={highlighted} selected={tooth} onSelect={setTooth} />
              </div>
            </div>
            {tooth ? (
              <p className='mt-4 text-sm font-medium text-primary'>
                {content.odontogram.selected}: {tooth}
              </p>
            ) : null}
          </section>
        ) : null}

        {tab === 'visits' ? (
          <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
            <h3 className='text-base font-bold text-primary'>{content.visitsTitle}</h3>
            {patient.visits.length === 0 ? (
              <p className='mt-3 text-sm text-slate-500'>{content.emptyVisits}</p>
            ) : (
              <ul className='mt-4 space-y-3'>
                {patient.visits.map((visit) => (
                  <li key={visit.id} className='flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 px-4 py-3'>
                    <div className='min-w-24'>
                      <p className='text-sm font-bold text-ink'>{visit.time}</p>
                      <p className='text-xs text-slate-400'>{visit.date}</p>
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='text-sm font-semibold text-ink'>{visit.procedure}</p>
                      <p className='text-xs text-slate-500'>{visit.professional}</p>
                    </div>
                    <span className='rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700'>
                      {visit.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        {tab === 'files' ? (
          <FilesCard patient={patient} fileRef={fileRef} onUpload={uploadFiles} expanded />
        ) : null}

        {tab === 'finance' ? (
          <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
            <div className='flex items-center justify-between gap-3'>
              <h3 className='text-base font-bold text-primary'>{content.financeTitle}</h3>
              <p className='text-sm text-slate-500'>
                {content.balanceLabel}:{' '}
                <span className={isZeroBalance(patient.balance) ? 'font-bold text-emerald-600' : 'font-bold text-rose-600'}>
                  {patient.balance}
                </span>
              </p>
            </div>
            {patient.ledger.length === 0 ? (
              <p className='mt-3 text-sm text-slate-500'>{content.emptyLedger}</p>
            ) : (
              <ul className='mt-4 divide-y divide-slate-100'>
                {patient.ledger.map((entry) => (
                  <li key={entry.id} className='flex items-center justify-between gap-3 py-3'>
                    <div>
                      <p className='text-sm font-semibold text-ink'>{entry.description}</p>
                      <p className='text-xs text-slate-400'>{entry.date}</p>
                    </div>
                    <span className={entry.pending ? 'text-sm font-bold text-rose-600' : 'text-sm font-bold text-emerald-600'}>
                      {entry.amount}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}
      </div>
    </div>
  )
}

function QuickInfo({ patient }: { patient: Patient }) {
  const { content } = usePatients()
  const rows = [
    {
      label: content.quickFields.bloodType,
      value: patient.bloodType,
      className: alertValue(patient.bloodType) ? 'text-rose-600' : 'text-ink',
    },
    {
      label: content.quickFields.allergies,
      value: patient.allergies,
      className: alertValue(patient.allergies) ? 'text-rose-600' : 'text-ink',
    },
    {
      label: content.quickFields.lastVisit,
      value: patient.lastVisit,
      className: 'text-ink',
    },
    {
      label: content.quickFields.balance,
      value: patient.balance,
      className: isZeroBalance(patient.balance) ? 'text-emerald-600' : 'text-rose-600',
    },
  ]

  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
      <h3 className='text-base font-bold text-primary'>{content.quickInfoTitle}</h3>
      <dl className='mt-4 space-y-3'>
        {rows.map((row) => (
          <div key={row.label} className='flex items-start justify-between gap-3 text-sm'>
            <dt className='text-slate-500'>{row.label}</dt>
            <dd className={`text-right font-semibold ${row.className}`}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function FilesCard({
  patient,
  fileRef,
  onUpload,
  expanded = false,
}: {
  patient: Patient
  fileRef: RefObject<HTMLInputElement | null>
  onUpload: (list: FileList | null) => void
  expanded?: boolean
}) {
  const { content } = usePatients()

  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
      <h3 className='text-base font-bold text-primary'>{content.filesTitle}</h3>
      {patient.files.length === 0 ? (
        <p className='mt-3 text-sm text-slate-500'>{content.emptyFiles}</p>
      ) : (
        <ul className={`mt-4 grid gap-3 ${expanded ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
          {patient.files.map((file) => (
            <li key={file.id}>
              <div className='flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 text-slate-400'>
                <FileIcon kind={file.kind} />
                <span className='line-clamp-2 text-center text-[11px] text-slate-500'>{file.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <input
        ref={fileRef}
        type='file'
        accept='image/*,.pdf,application/pdf'
        multiple
        className='sr-only'
        onChange={(event) => {
          onUpload(event.target.files)
          event.target.value = ''
        }}
      />
      <button
        type='button'
        onClick={() => fileRef.current?.click()}
        className='mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 text-sm font-medium text-slate-500 transition-colors hover:border-primary hover:text-primary'
      >
        <UploadIcon />
        {content.uploadLabel}
      </button>
    </section>
  )
}

function ToothRow({
  teeth,
  highlighted,
  selected,
  onSelect,
}: {
  teeth: string[]
  highlighted: Set<string>
  selected: string | null
  onSelect: (tooth: string) => void
}) {
  return (
    <div className='flex gap-1.5'>
      {teeth.map((item) => {
        const active = highlighted.has(item)
        const current = selected === item

        return (
          <button
            key={item}
            type='button'
            aria-pressed={current}
            onClick={() => onSelect(item)}
            className={`h-9 w-9 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            } ${current ? 'ring-2 ring-secondary ring-offset-2' : ''}`}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

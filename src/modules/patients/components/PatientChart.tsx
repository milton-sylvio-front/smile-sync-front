'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Odontogram } from '@/modules/patients/components/odontogram/Odontogram'
import {
  formatTarget,
  toggleTarget,
  type ChartFilter,
  type ChartTarget,
  type Dentition,
  type ProcedureStatus,
} from '@/modules/patients/lib/odontogram'
import type { Patient } from '@/modules/patients/types/patients'

type ChartTab =
  | 'chart'
  | 'anamnesis'
  | 'evolutions'
  | 'quotes'
  | 'finance'
  | 'documents'
  | 'files'
  | 'visits'

type Procedure = {
  id: string
  name: string
  targets: ChartTarget[]
  status: ProcedureStatus
}

type Note = {
  id: string
  text: string
}

const tabs: { id: ChartTab; label: string }[] = [
  { id: 'chart', label: 'Ficha clínica' },
  { id: 'anamnesis', label: 'Anamnese' },
  { id: 'evolutions', label: 'Evoluções' },
  { id: 'quotes', label: 'Orçamentos' },
  { id: 'finance', label: 'Financeiro' },
  { id: 'documents', label: 'Documentos' },
  { id: 'files', label: 'Arquivos' },
  { id: 'visits', label: 'Consultas' },
]

const filters: { id: ChartFilter; label: string }[] = [
  { id: 'all', label: 'Ficha geral' },
  { id: 'planned', label: 'A realizar' },
  { id: 'done', label: 'Realizado' },
  { id: 'existing', label: 'Pré-existente' },
]

const statusLabel: Record<ProcedureStatus, string> = {
  planned: 'A realizar',
  done: 'Realizado',
  existing: 'Pré-existente',
}

function PlusIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-3.5 w-3.5'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path strokeLinecap='round' d='M12 5v14M5 12h14' />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-3.5 w-3.5'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <circle cx='12' cy='12' r='8' />
      <path strokeLinecap='round' d='M12 8v4.5l3 2' />
    </svg>
  )
}

function ChartAvatar({ name, photo }: { name: string; photo: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || '?'

  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        className='h-14 w-14 rounded-full object-cover'
      />
    )
  }

  return (
    <span className='flex h-14 w-14 items-center justify-center rounded-full bg-[#e6eef2] text-xl font-bold text-primary'>
      {letter}
    </span>
  )
}

function summaryLine(patient: Patient) {
  const birth = patient.draft.birthDate || patient.birthLabel
  const age = patient.age != null ? `${patient.age} anos` : ''
  const birthText = birth ? (age ? `(${birth})` : birth) : ''
  const identity = [age, birthText].filter(Boolean).join(' ')
  const phone = patient.phone || patient.draft.mobile || 'Sem telefone'

  return [identity, phone].filter(Boolean).join(' | ')
}

export function PatientChart({ patient }: { patient: Patient }) {
  const [tab, setTab] = useState<ChartTab>('chart')
  const [dentition, setDentition] = useState<Dentition>('permanent')
  const [filter, setFilter] = useState<ChartFilter>('all')
  const [selected, setSelected] = useState<ChartTarget[]>([])
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [procedureOpen, setProcedureOpen] = useState(false)
  const [procedureName, setProcedureName] = useState('')
  const [procedureStatus, setProcedureStatus] =
    useState<ProcedureStatus>('planned')
  const [procedureError, setProcedureError] = useState('')
  const [selectionHint, setSelectionHint] = useState('')
  const [notes, setNotes] = useState<Note[]>([])
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [noteError, setNoteError] = useState('')
  const [analysisNote, setAnalysisNote] = useState(
    'Nenhuma análise de crédito foi realizada.',
  )

  const visibleProcedures = procedures.filter(
    (item) => filter === 'all' || item.status === filter,
  )
  const marks = procedures.flatMap((item) =>
    item.targets.map((target) => ({ ...target, status: item.status })),
  )
  const selectionText = selected
    .map((target) => formatTarget(target, dentition))
    .join(', ')

  function changeDentition(next: Dentition) {
    setDentition(next)
    setSelected([])
    setSelectionHint('')
  }

  function openProcedure() {
    if (selected.length === 0) {
      setSelectionHint('Selecione um dente ou uma face do odontograma.')
      setProcedureOpen(false)
      return
    }

    setSelectionHint('')
    setProcedureError('')
    setProcedureStatus(filter === 'all' ? 'planned' : filter)
    setProcedureOpen(true)
  }

  function saveProcedure() {
    const name = procedureName.trim()

    if (!name) {
      setProcedureError('Informe o procedimento.')
      return
    }

    if (selected.length === 0) {
      setProcedureError('Selecione um dente ou uma face.')
      return
    }

    setProcedures((current) => [
      {
        id: crypto.randomUUID(),
        name,
        targets: selected,
        status: procedureStatus,
      },
      ...current,
    ])
    setProcedureName('')
    setProcedureError('')
    setProcedureOpen(false)
    setSelected([])
  }

  function saveNote() {
    const text = noteText.trim()

    if (!text) {
      setNoteError('Escreva a anotação.')
      return
    }

    setNotes((current) => [{ id: crypto.randomUUID(), text }, ...current])
    setNoteText('')
    setNoteError('')
    setNoteOpen(false)
  }

  return (
    <div className='space-y-4'>
      <nav aria-label='Trilha' className='text-sm text-slate-400'>
        <ol className='flex flex-wrap items-center gap-1.5'>
          <li>
            <Link
              href='/painel'
              className='transition-colors hover:text-primary'
            >
              Início
            </Link>
          </li>
          <li aria-hidden='true'>›</li>
          <li>
            <Link
              href='/pacientes'
              className='transition-colors hover:text-primary'
            >
              Pacientes
            </Link>
          </li>
          <li aria-hidden='true'>›</li>
          <li aria-current='page' className='text-slate-600'>
            {patient.name}
          </li>
        </ol>
      </nav>

      <section className='rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='flex min-w-0 items-center gap-4'>
            <ChartAvatar name={patient.name} photo={patient.photo} />
            <div className='min-w-0'>
              <h2 className='truncate text-xl font-bold tracking-tight text-ink sm:text-2xl'>
                {patient.name}
              </h2>
              <p className='mt-1 text-sm text-slate-500'>
                {summaryLine(patient)}
              </p>
              <p className='mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#f7f3d4] px-2.5 py-1 text-xs text-slate-600'>
                <ClockIcon />
                {patient.anamnesis.length === 0
                  ? 'Nenhuma anamnese feita'
                  : 'Anamnese preenchida'}
              </p>
            </div>
          </div>
          <div className='flex flex-col items-start gap-3 lg:items-end'>
            <p className='text-xs text-slate-400'>{analysisNote}</p>
            <div className='flex flex-wrap gap-2'>
              <button
                type='button'
                onClick={() => setTab('anamnesis')}
                className='inline-flex h-9 items-center rounded-lg bg-secondary px-4 text-sm font-semibold text-primary transition-colors hover:bg-secondary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              >
                Anamnese
              </button>
              <Link
                href={`/pacientes/${patient.id}/editar`}
                className='inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              >
                Editar perfil
              </Link>
              <button
                type='button'
                onClick={() =>
                  setAnalysisNote(
                    'A análise de crédito ainda não está disponível nesta ficha.',
                  )
                }
                className='inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              >
                Nova análise
              </button>
            </div>
          </div>
        </div>
      </section>

      <div
        role='tablist'
        aria-label='Ficha do paciente'
        className='flex gap-5 overflow-x-auto px-1'
      >
        {tabs.map((item) => {
          const active = tab === item.id

          return (
            <button
              key={item.id}
              type='button'
              role='tab'
              id={`aba-${item.id}`}
              aria-selected={active}
              aria-controls={`painel-${item.id}`}
              onClick={() => setTab(item.id)}
              className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                active
                  ? 'border-primary text-ink'
                  : 'border-transparent text-slate-400 hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div role='tabpanel' id={`painel-${tab}`} aria-labelledby={`aba-${tab}`}>
        {tab === 'chart' ? (
          <div className='grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_280px]'>
            <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
              <h3 className='text-base font-bold text-ink'>Odontograma</h3>
              <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
                <button
                  type='button'
                  onClick={openProcedure}
                  className='inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                >
                  <PlusIcon />
                  Novo procedimento
                </button>
                <div
                  role='group'
                  aria-label='Dentição'
                  className='inline-flex items-center gap-1'
                >
                  <button
                    type='button'
                    aria-pressed={dentition === 'permanent'}
                    onClick={() => changeDentition('permanent')}
                    className={`h-9 rounded-full px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      dentition === 'permanent'
                        ? 'bg-primary text-white'
                        : 'text-slate-500 hover:text-ink'
                    }`}
                  >
                    Permanente
                  </button>
                  <button
                    type='button'
                    aria-pressed={dentition === 'deciduous'}
                    onClick={() => changeDentition('deciduous')}
                    className={`h-9 rounded-full px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      dentition === 'deciduous'
                        ? 'bg-primary text-white'
                        : 'text-slate-500 hover:text-ink'
                    }`}
                  >
                    Decídua
                  </button>
                </div>
              </div>

              {selectionHint ? (
                <p className='mt-3 text-sm text-rose-600'>{selectionHint}</p>
              ) : null}

              {procedureOpen ? (
                <form
                  className='mt-4 rounded-xl border border-slate-200 bg-surface p-4'
                  onSubmit={(event) => {
                    event.preventDefault()
                    saveProcedure()
                  }}
                >
                  <label
                    className='block text-xs font-medium text-slate-500'
                    htmlFor='procedimento-nome'
                  >
                    Procedimento
                  </label>
                  <input
                    id='procedimento-nome'
                    value={procedureName}
                    aria-invalid={procedureError ? true : undefined}
                    onChange={(event) => setProcedureName(event.target.value)}
                    className='mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15'
                  />
                  <p className='mt-3 text-sm text-slate-600'>
                    Dente:{' '}
                    <span className='font-semibold text-ink'>
                      {selectionText}
                    </span>
                  </p>
                  <label
                    className='mt-3 block text-xs font-medium text-slate-500'
                    htmlFor='procedimento-estado'
                  >
                    Estado
                  </label>
                  <select
                    id='procedimento-estado'
                    value={procedureStatus}
                    onChange={(event) =>
                      setProcedureStatus(event.target.value as ProcedureStatus)
                    }
                    className='mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15'
                  >
                    <option value='planned'>A realizar</option>
                    <option value='done'>Realizado</option>
                    <option value='existing'>Pré-existente</option>
                  </select>
                  {procedureError ? (
                    <p className='mt-2 text-xs text-rose-600'>
                      {procedureError}
                    </p>
                  ) : null}
                  <div className='mt-3 flex justify-end gap-2'>
                    <button
                      type='button'
                      onClick={() => setProcedureOpen(false)}
                      className='inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-ink'
                    >
                      Cancelar
                    </button>
                    <button
                      type='submit'
                      className='inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-semibold text-white'
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              ) : null}

              <div className='mt-6'>
                <Odontogram
                  dentition={dentition}
                  selected={selected}
                  marks={marks}
                  filter={filter}
                  onToggleTooth={(tooth) => {
                    setSelected((current) =>
                      toggleTarget(current, { tooth, face: null }),
                    )
                    setSelectionHint('')
                  }}
                  onToggleFace={(tooth, face) => {
                    setSelected((current) =>
                      toggleTarget(current, { tooth, face }),
                    )
                    setSelectionHint('')
                  }}
                />
              </div>

              <p
                className='mt-4 min-h-5 text-sm text-primary'
                aria-live='polite'
              >
                {selectionText ? `Selecionado: ${selectionText}` : ''}
              </p>

              <div
                role='radiogroup'
                aria-label='Filtrar ficha'
                className='mt-2 flex flex-wrap gap-2'
              >
                {filters.map((item) => {
                  const active = filter === item.id

                  return (
                    <button
                      key={item.id}
                      type='button'
                      role='radio'
                      aria-checked={active}
                      onClick={() => setFilter(item.id)}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                        active
                          ? 'border-slate-300 bg-white font-semibold text-ink'
                          : 'border-slate-200 bg-white text-slate-500 hover:text-ink'
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full border ${
                          active
                            ? 'border-primary bg-primary'
                            : 'border-slate-400 bg-white'
                        }`}
                      />
                      {item.label}
                    </button>
                  )
                })}
              </div>

              <div className='mt-6'>
                <h4 className='text-base font-bold text-ink'>Ficha geral</h4>
                <div className='mt-3 overflow-x-auto rounded-xl bg-[#f4f7f8]'>
                  <div className='grid min-w-[520px] grid-cols-[1.4fr_1fr_0.8fr_auto] px-4 py-3 text-sm font-semibold text-slate-600'>
                    <span>Procedimento</span>
                    <span>Dente</span>
                    <span>Estado</span>
                    <span>Ações</span>
                  </div>
                </div>
                {visibleProcedures.length === 0 ? (
                  <p className='px-6 py-8 text-center text-sm text-slate-400'>
                    Adicione procedimentos para facilitar o acompanhamento dos
                    tratamentos do seu paciente.
                  </p>
                ) : (
                  <ul className='divide-y divide-slate-100'>
                    {visibleProcedures.map((item) => (
                      <li
                        key={item.id}
                        className='grid min-w-[520px] grid-cols-[1.4fr_1fr_0.8fr_auto] items-center gap-3 px-4 py-3 text-sm'
                      >
                        <span className='font-semibold text-ink'>
                          {item.name}
                        </span>
                        <span className='text-slate-600'>
                          {item.targets
                            .map((target) => formatTarget(target, dentition))
                            .join(', ')}
                        </span>
                        <span className='text-slate-600'>
                          {statusLabel[item.status]}
                        </span>
                        <button
                          type='button'
                          onClick={() =>
                            setProcedures((current) =>
                              current.filter((entry) => entry.id !== item.id),
                            )
                          }
                          className='text-sm font-semibold text-primary hover:underline'
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            <NotesPanel
              notes={notes}
              open={noteOpen}
              text={noteText}
              error={noteError}
              onOpen={() => {
                setNoteError('')
                setNoteOpen((current) => !current)
              }}
              onText={setNoteText}
              onSave={saveNote}
              onCancel={() => setNoteOpen(false)}
              onRemove={(id) =>
                setNotes((current) => current.filter((note) => note.id !== id))
              }
            />
          </div>
        ) : (
          <OtherPanel tab={tab} patient={patient} />
        )}
      </div>
    </div>
  )
}

function NotesPanel({
  notes,
  open,
  text,
  error,
  onOpen,
  onText,
  onSave,
  onCancel,
  onRemove,
}: {
  notes: Note[]
  open: boolean
  text: string
  error: string
  onOpen: () => void
  onText: (value: string) => void
  onSave: () => void
  onCancel: () => void
  onRemove: (id: string) => void
}) {
  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
      <h3 className='text-base font-bold text-ink'>Anotações</h3>
      {notes.length === 0 ? (
        <p className='mt-3 text-sm leading-6 text-slate-500'>
          O paciente não possui anotações adicionadas.
        </p>
      ) : (
        <ul className='mt-3 space-y-2'>
          {notes.map((note) => (
            <li key={note.id} className='rounded-xl bg-surface px-3 py-2.5'>
              <p className='text-sm text-ink'>{note.text}</p>
              <button
                type='button'
                onClick={() => onRemove(note.id)}
                className='mt-1 text-xs font-semibold text-primary hover:underline'
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
      {open ? (
        <form
          className='mt-4'
          onSubmit={(event) => {
            event.preventDefault()
            onSave()
          }}
        >
          <label className='sr-only' htmlFor='anotacao'>
            Anotação
          </label>
          <textarea
            id='anotacao'
            value={text}
            rows={3}
            aria-invalid={error ? true : undefined}
            onChange={(event) => onText(event.target.value)}
            className='w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15'
          />
          {error ? <p className='mt-1 text-xs text-rose-600'>{error}</p> : null}
          <div className='mt-2 flex justify-end gap-2'>
            <button
              type='button'
              onClick={onCancel}
              className='inline-flex h-9 items-center rounded-lg border border-slate-200 px-3 text-sm font-semibold text-ink'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-semibold text-white'
            >
              Salvar
            </button>
          </div>
        </form>
      ) : (
        <button
          type='button'
          onClick={onOpen}
          className='mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary'
        >
          <PlusIcon />
          Adicionar anotação
        </button>
      )}
    </section>
  )
}

function OtherPanel({
  tab,
  patient,
}: {
  tab: Exclude<ChartTab, 'chart'>
  patient: Patient
}) {
  if (tab === 'anamnesis') {
    return (
      <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
        <h3 className='text-base font-bold text-ink'>Anamnese</h3>
        {patient.anamnesis.length === 0 ? (
          <p className='mt-3 text-sm text-slate-500'>Nenhuma anamnese feita.</p>
        ) : (
          <dl className='mt-4 grid gap-3 sm:grid-cols-2'>
            {patient.anamnesis.map((item) => (
              <div
                key={item.label}
                className='rounded-xl bg-surface px-3 py-2.5'
              >
                <dt className='text-xs text-slate-500'>{item.label}</dt>
                <dd className='mt-1 text-sm font-semibold text-ink'>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    )
  }

  if (tab === 'evolutions') {
    return (
      <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
        <h3 className='text-base font-bold text-ink'>Evoluções</h3>
        {patient.treatments.length === 0 ? (
          <p className='mt-3 text-sm text-slate-500'>
            Nenhuma evolução registrada.
          </p>
        ) : (
          <ul className='mt-4 space-y-4'>
            {patient.treatments.map((entry) => (
              <li key={entry.id}>
                <p className='text-xs text-slate-400'>
                  {entry.date} · {entry.time}
                </p>
                <h4 className='mt-1 text-sm font-bold text-ink'>
                  {entry.title}
                </h4>
                <p className='mt-1 text-sm text-slate-500'>
                  {entry.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  }

  if (tab === 'finance') {
    return (
      <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
        <h3 className='text-base font-bold text-ink'>Financeiro</h3>
        <p className='mt-1 text-sm text-slate-500'>Saldo: {patient.balance}</p>
        {patient.ledger.length === 0 ? (
          <p className='mt-3 text-sm text-slate-500'>
            Nenhum lançamento financeiro.
          </p>
        ) : (
          <ul className='mt-4 divide-y divide-slate-100'>
            {patient.ledger.map((entry) => (
              <li
                key={entry.id}
                className='flex items-center justify-between gap-3 py-3 text-sm'
              >
                <span>
                  <span className='block font-semibold text-ink'>
                    {entry.description}
                  </span>
                  <span className='text-xs text-slate-400'>{entry.date}</span>
                </span>
                <span className='font-bold text-ink'>{entry.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  }

  if (tab === 'files') {
    return (
      <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
        <h3 className='text-base font-bold text-ink'>Arquivos</h3>
        {patient.files.length === 0 ? (
          <p className='mt-3 text-sm text-slate-500'>Nenhum arquivo enviado.</p>
        ) : (
          <ul className='mt-4 grid gap-3 sm:grid-cols-3'>
            {patient.files.map((file) => (
              <li
                key={file.id}
                className='rounded-xl border border-slate-200 px-3 py-4 text-sm text-ink'
              >
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  }

  if (tab === 'visits') {
    return (
      <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
        <h3 className='text-base font-bold text-ink'>Consultas</h3>
        {patient.visits.length === 0 ? (
          <p className='mt-3 text-sm text-slate-500'>
            Nenhuma consulta registrada.
          </p>
        ) : (
          <ul className='mt-4 space-y-3'>
            {patient.visits.map((visit) => (
              <li
                key={visit.id}
                className='rounded-xl border border-slate-200 px-4 py-3'
              >
                <p className='text-sm font-semibold text-ink'>
                  {visit.procedure}
                </p>
                <p className='text-xs text-slate-500'>
                  {visit.date} · {visit.time} · {visit.professional}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  }

  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
      <h3 className='text-base font-bold text-ink'>
        {tab === 'quotes' ? 'Orçamentos' : 'Documentos'}
      </h3>
      <p className='mt-3 text-sm text-slate-500'>
        {tab === 'quotes'
          ? 'Nenhum orçamento registrado.'
          : 'Nenhum documento registrado.'}
      </p>
    </section>
  )
}

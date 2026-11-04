'use client'

import { useMemo, useState } from 'react'
import type {
  ReactivationContent,
  ReactivationPatient,
  ReactivationPortrait,
  ReactivationSort,
} from '@/modules/reactivation/types/reactivation'

type ReactivationPageProps = {
  content: ReactivationContent
}

function BoltIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4' fill='currentColor'>
      <path d='M13.2 2.5 4.8 13.2h6.1l-1.1 8.3 8.4-11.2h-6.2l1.2-7.8Z' />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4' fill='currentColor'>
      <path d='M6 3.5h1.2v17H6v-17Zm2 1.2h10.2L16 8.2l2.2 3.4H8V4.7Z' />
    </svg>
  )
}

function BulbIcon() {
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
        d='M9 16.5h6M9.5 18.5h5M12 4a5.5 5.5 0 0 0-3.2 10c.4.3.7.8.7 1.3V16h5v-.7c0-.5.3-1 .7-1.3A5.5 5.5 0 0 0 12 4Z'
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-3.5 w-3.5' fill='none' stroke='currentColor' strokeWidth='2.4'>
      <path strokeLinecap='round' strokeLinejoin='round' d='m5 12 5 5 9-10' />
    </svg>
  )
}

function Portrait({ variant }: { variant: ReactivationPortrait }) {
  const hair = variant === 'amanda' ? '#d7b07a' : variant === 'jessica' ? '#6b4634' : '#2a211c'
  const beard = variant === 'david'

  return (
    <svg viewBox='0 0 64 64' aria-hidden='true' className='h-full w-full'>
      <circle cx='32' cy='32' r='32' fill='#e7eef2' />
      <path d='M8 58c4-16 12-24 24-24s20 8 24 24' fill='#12343c' />
      <circle cx='32' cy='28' r='12' fill='#f0cbbd' />
      <path d='M18 30c2-16 8-22 14-22s13 6 16 18c-4 3-9 6-15 6s-12-1-15-2Z' fill={hair} />
      {beard ? <path d='M22 34c2 10 6 14 10 14s8-4 10-14c-3 3-7 4-10 4s-7-1-10-4Z' fill={hair} /> : null}
    </svg>
  )
}

function PatientAvatar({ patient }: { patient: ReactivationPatient }) {
  if (patient.portrait) {
    return (
      <span className='h-11 w-11 shrink-0 overflow-hidden rounded-full'>
        <Portrait variant={patient.portrait} />
      </span>
    )
  }

  const initials = patient.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d9efe8] text-sm font-bold text-primary'>
      {initials}
    </span>
  )
}

function orderPatients(patients: ReactivationPatient[], sort: ReactivationSort) {
  const list = [...patients]

  if (sort === 'revenue') {
    list.sort((a, b) => b.revenue - a.revenue || a.name.localeCompare(b.name, 'pt-BR'))
  } else if (sort === 'inactivity') {
    list.sort(
      (a, b) => b.monthsInactive - a.monthsInactive || a.name.localeCompare(b.name, 'pt-BR'),
    )
  } else {
    list.sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name, 'pt-BR'))
  }

  return list
}

export function ReactivationPage({ content }: ReactivationPageProps) {
  const [sort, setSort] = useState<ReactivationSort>(content.list.defaultSort)
  const [expanded, setExpanded] = useState(false)
  const [launched, setLaunched] = useState(false)
  const [selected, setSelected] = useState<string[]>(() =>
    content.patients.filter((patient) => patient.selected).map((patient) => patient.id),
  )
  const ordered = useMemo(() => orderPatients(content.patients, sort), [content.patients, sort])
  const visible = expanded ? ordered : ordered.slice(0, content.list.previewCount)
  const selectedCount = selected.length
  const showAllLabel = content.list.showAllLabel.replace('{count}', String(content.patients.length))
  const launchedMessage = content.hub.launchedMessage.replace('{count}', String(selectedCount))

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function launch() {
    if (launched || selectedCount === 0) return
    setLaunched(true)
  }

  return (
    <div className='flex flex-col gap-4'>
      <section className='overflow-hidden rounded-3xl bg-[linear-gradient(115deg,#0f6a72_0%,#0a5560_42%,#08343c_100%)] px-5 py-6 text-white shadow-[0_18px_40px_-28px_rgba(8,52,60,0.9)] sm:px-7 sm:py-7'>
        <div className='grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,320px)]'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>{content.hub.title}</h2>
            <p className='mt-3 max-w-xl text-sm leading-6 text-white/80'>
              {content.hub.leadPrefix}{' '}
              <strong className='font-semibold text-secondary'>{content.hub.records}</strong>{' '}
              {content.hub.leadMiddle}{' '}
              <strong className='font-semibold text-secondary'>{content.hub.opportunities}</strong>{' '}
              {content.hub.leadSuffix}
            </p>

            <dl className='mt-5 grid max-w-xl gap-3 sm:grid-cols-2'>
              <div className='rounded-2xl border border-white/10 bg-white/10 px-4 py-3'>
                <dt className='text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60'>
                  {content.hub.potentialLabel}
                </dt>
                <dd className='mt-1 text-2xl font-bold tracking-tight'>{content.hub.potentialValue}</dd>
              </div>
              <div className='rounded-2xl border border-white/10 bg-white/10 px-4 py-3'>
                <dt className='text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60'>
                  {content.hub.targetLabel}
                </dt>
                <dd className='mt-1 text-2xl font-bold tracking-tight'>{content.hub.targetValue}</dd>
              </div>
            </dl>

            <button
              type='button'
              onClick={launch}
              disabled={launched || selectedCount === 0}
              className='mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-secondary px-5 text-sm font-bold text-primary shadow-[0_10px_24px_-16px_rgba(249,240,126,0.9)] transition-colors hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:cursor-not-allowed disabled:opacity-70'
            >
              <BoltIcon />
              {launched ? content.hub.launchedLabel : content.hub.launchLabel}
            </button>
            {launched ? (
              <p role='status' className='mt-3 text-sm text-secondary'>
                {launchedMessage}
              </p>
            ) : null}
          </div>

          <div className='rounded-2xl bg-white px-4 py-4 text-ink shadow-[0_16px_30px_-24px_rgba(0,0,0,0.45)] sm:px-5'>
            <p className='flex items-center gap-2 text-sm font-semibold text-primary'>
              <span className='text-secondary'>
                <FlagIcon />
              </span>
              {content.hub.previewTitle}
            </p>
            <blockquote className='mt-3 text-sm leading-6 text-slate-600'>
              “{content.hub.previewMessage}”
            </blockquote>
            <p className='mt-4 text-[11px] leading-4 text-slate-400'>{content.hub.previewFootnote}</p>
          </div>
        </div>
      </section>

      <div className='grid items-start gap-4 lg:grid-cols-[minmax(0,1.85fr)_minmax(260px,300px)]'>
        <section className='rounded-2xl border border-slate-200/80 bg-white px-4 py-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] sm:px-5'>
          <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-2'>
            <h2 className='text-base font-bold text-primary sm:text-lg'>{content.list.title}</h2>
            <label className='ml-auto flex items-center gap-2 text-sm text-slate-500'>
              <span>{content.list.sortLabel}:</span>
              <select
                aria-label={content.list.sortLabel}
                value={sort}
                onChange={(event) => setSort(event.target.value as ReactivationSort)}
                className='rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              >
                {content.list.sorts.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <ul className='mt-2 divide-y divide-slate-100'>
            {visible.map((patient) => {
              const checked = selected.includes(patient.id)

              return (
                <li key={patient.id} className='flex items-center gap-3 py-4'>
                  <PatientAvatar patient={patient} />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-semibold text-ink'>{patient.name}</p>
                    <p className='mt-0.5 text-xs leading-5 text-slate-400'>
                      {content.list.lastVisitPrefix} {patient.lastVisit} • {patient.procedure}
                    </p>
                  </div>
                  <div className='shrink-0 text-right'>
                    <p className='text-sm font-bold text-emerald-600'>{patient.revenueLabel}</p>
                    <p className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400'>
                      {content.list.revenueCaption}
                    </p>
                  </div>
                  <button
                    type='button'
                    role='checkbox'
                    aria-checked={checked}
                    aria-label={`Incluir ${patient.name} na sequência`}
                    disabled={launched}
                    onClick={() => toggle(patient.id)}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 ${
                      checked
                        ? 'border-primary bg-primary text-white'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <CheckIcon />
                  </button>
                </li>
              )
            })}
          </ul>

          <div className='border-t border-slate-100 pt-3 text-center'>
            <button
              type='button'
              onClick={() => setExpanded((value) => !value)}
              className='text-sm font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
            >
              {expanded ? content.list.showLessLabel : showAllLabel}
            </button>
          </div>
        </section>

        <div className='flex flex-col gap-4'>
          <section className='rounded-2xl border border-slate-200/80 bg-white px-5 py-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
            <h2 className='text-lg font-bold text-primary'>{content.performance.title}</h2>
            <dl className='mt-4 space-y-4'>
              <div className='flex items-end justify-between gap-3'>
                <dt className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'>
                  {content.performance.conversionLabel}
                </dt>
                <dd className='text-2xl font-bold text-emerald-600'>
                  {content.performance.conversionValue}
                </dd>
              </div>
              <div>
                <div className='flex items-end justify-between gap-3'>
                  <dt className='max-w-[9rem] text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'>
                    {content.performance.scheduledLabel}
                  </dt>
                  <dd className='shrink-0 whitespace-nowrap text-right'>
                    <span className='text-2xl font-bold text-ink'>
                      {content.performance.scheduledValue}
                    </span>
                    <span className='text-xs text-slate-400'> {content.performance.scheduledGoal}</span>
                  </dd>
                </div>
                <div
                  className='mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100'
                  role='meter'
                  aria-label={content.performance.scheduledLabel}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={content.performance.scheduledPercent}
                >
                  <span
                    className='block h-full rounded-full bg-secondary'
                    style={{ width: `${content.performance.scheduledPercent}%` }}
                  />
                </div>
              </div>
              <div className='flex items-end justify-between gap-3'>
                <dt className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'>
                  {content.performance.roiLabel}
                </dt>
                <dd className='text-2xl font-bold text-ink'>{content.performance.roiValue}</dd>
              </div>
            </dl>
          </section>

          <section className='rounded-2xl bg-[#f3f6df] px-5 py-5'>
            <h2 className='flex items-center gap-2 text-sm font-bold text-primary'>
              <span className='text-[#7d8f2a]'>
                <BulbIcon />
              </span>
              {content.tip.title}
            </h2>
            <p className='mt-2 text-sm leading-6 text-slate-600'>
              {content.tip.before} <strong className='text-ink'>{content.tip.emphasis}</strong>{' '}
              {content.tip.after}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

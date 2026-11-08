'use client'

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePatients } from '@/modules/patients/state/PatientsProvider'
import type { Patient } from '@/modules/patients/types/patients'

type PatientListProps = {
  patients: Patient[]
  onDelete: (id: string) => void
}

function SearchIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <circle cx='11' cy='11' r='6.5' />
      <path strokeLinecap='round' d='m16 16 4 4' />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path strokeLinecap='round' d='M12 5v14M5 12h14' />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4' fill='currentColor'>
      <circle cx='12' cy='5' r='1.4' />
      <circle cx='12' cy='12' r='1.4' />
      <circle cx='12' cy='19' r='1.4' />
    </svg>
  )
}

function stopRowClick(event: MouseEvent) {
  event.stopPropagation()
}

const statusClass = {
  active: 'bg-[#e8f6ec] text-[#1c8a45]',
  inactive: 'bg-[#fde8ea] text-[#c45b66]',
} as const

export function PatientList({ patients, onDelete }: PatientListProps) {
  const router = useRouter()
  const { content, query, setQuery } = usePatients()
  const { list } = content
  const [draft, setDraft] = useState(query)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [menuId, setMenuId] = useState<string | null>(null)
  const menuRef = useRef<HTMLTableCellElement>(null)
  const selectAllRef = useRef<HTMLInputElement>(null)
  const visibleIds = patients.map((patient) => patient.id)
  const selectedVisible = visibleIds.filter((id) => selectedIds.includes(id))
  const allSelected = visibleIds.length > 0 && selectedVisible.length === visibleIds.length

  useEffect(() => {
    setDraft(query)
  }, [query])

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedVisible.length > 0 && !allSelected
    }
  }, [allSelected, selectedVisible.length])

  useEffect(() => {
    if (!menuId) {
      return
    }

    function onPointerDown(event: globalThis.MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuId(null)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuId(null)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuId])

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setQuery(draft.trim())
  }

  function toggleAll() {
    setSelectedIds((current) => {
      if (allSelected) {
        return current.filter((id) => !visibleIds.includes(id))
      }

      return [...new Set([...current, ...visibleIds])]
    })
  }

  function toggleOne(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white px-4 py-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.45)] sm:px-6 lg:min-h-[36rem]'>
      <h2 className='border-b border-slate-100 pb-4 text-lg font-bold text-primary'>
        {list.title} ({patients.length})
      </h2>

      <form onSubmit={search} className='mt-4 flex flex-wrap items-center gap-3'>
        <div className='flex min-w-0 flex-1 items-center gap-3'>
          <label className='relative min-w-0 flex-1'>
            <input
              type='search'
              value={draft}
              placeholder={content.searchPlaceholder}
              aria-label={content.searchPlaceholder}
              onChange={(event) => setDraft(event.target.value)}
              className='h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white pr-10 pl-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15'
            />
            <span className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400'>
              <SearchIcon />
            </span>
          </label>
          <button
            type='submit'
            className='inline-flex h-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            {list.searchAction}
          </button>
        </div>
        <div className='flex shrink-0 flex-wrap items-center gap-4'>
          <button
            type='button'
            className='text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            {list.migrateLabel}
          </button>
          <Link
            href={content.newPatientHref}
            className='inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            <PlusIcon />
            {content.newPatientLabel}
          </Link>
        </div>
      </form>

      <div className='mt-5 overflow-x-auto lg:overflow-visible'>
        <table className='w-full min-w-[860px] border-separate border-spacing-0 text-left text-sm'>
          <thead>
            <tr className='bg-[#f4f7f8] text-slate-500'>
              <th scope='col' className='w-12 rounded-l-xl py-3 pl-4 font-medium'>
                <input
                  ref={selectAllRef}
                  type='checkbox'
                  checked={allSelected}
                  disabled={patients.length === 0}
                  aria-label={list.selectAll}
                  onChange={toggleAll}
                  className='h-4 w-4 rounded border-slate-300 accent-primary'
                />
              </th>
              <th scope='col' className='py-3 pr-4 font-medium'>
                {list.columns.name}
              </th>
              <th scope='col' className='py-3 pr-4 font-medium'>
                {list.columns.document}
              </th>
              <th scope='col' className='py-3 pr-4 font-medium'>
                {list.columns.phone}
              </th>
              <th scope='col' className='py-3 pr-4 font-medium'>
                {list.columns.record}
              </th>
              <th scope='col' className='py-3 pr-4 font-medium'>
                {list.columns.since}
              </th>
              <th scope='col' className='py-3 pr-4 font-medium'>
                {list.columns.status}
              </th>
              <th scope='col' className='w-24 rounded-r-xl py-3 pr-4 text-center font-medium'>
                {list.columns.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan={8} className='px-4 py-10 text-center text-sm text-slate-500'>
                  {content.emptyList}
                </td>
              </tr>
            ) : (
              patients.map((patient) => {
                const menuOpen = menuId === patient.id

                return (
                  <tr
                    key={patient.id}
                    onClick={() => router.push(`/pacientes/${patient.id}`)}
                    className={`cursor-pointer transition-colors hover:bg-[#e5f3f4] ${
                      menuOpen ? 'relative z-20' : ''
                    }`}
                  >
                    <td className='border-b border-slate-100 py-4 pl-4' onClick={stopRowClick}>
                      <input
                        type='checkbox'
                        checked={selectedIds.includes(patient.id)}
                        aria-label={`${list.selectPatient} ${patient.name}`}
                        onChange={() => toggleOne(patient.id)}
                        className='h-4 w-4 rounded border-slate-300 accent-primary'
                      />
                    </td>
                    <td className='border-b border-slate-100 py-4 pr-4'>
                      <Link
                        href={`/pacientes/${patient.id}`}
                        onClick={stopRowClick}
                        className='font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                      >
                        {patient.name}
                      </Link>
                    </td>
                    <td className='border-b border-slate-100 py-4 pr-4 text-slate-700'>
                      {patient.document || '—'}
                    </td>
                    <td className='border-b border-slate-100 py-4 pr-4 whitespace-nowrap text-slate-700'>
                      {patient.phone || content.missingPhone}
                    </td>
                    <td className='border-b border-slate-100 py-4 pr-4 text-slate-700'>
                      {patient.recordNumber}
                    </td>
                    <td className='border-b border-slate-100 py-4 pr-4 whitespace-nowrap text-slate-700'>
                      {patient.registeredAt}
                    </td>
                    <td className='border-b border-slate-100 py-4 pr-4'>
                      <span
                        className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold tracking-wide ${statusClass[patient.status]}`}
                      >
                        {content.status[patient.status]}
                      </span>
                    </td>
                    <td
                      ref={menuOpen ? menuRef : undefined}
                      className='relative border-b border-slate-100 py-3 pr-4 text-center'
                      onClick={stopRowClick}
                    >
                      <button
                        type='button'
                        aria-haspopup='menu'
                        aria-expanded={menuOpen}
                        aria-label={`${list.actionsMenu} ${patient.name}`}
                        onClick={() => setMenuId((current) => (current === patient.id ? null : patient.id))}
                        className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                      >
                        <DotsIcon />
                      </button>
                      {menuOpen ? (
                        <div
                          role='menu'
                          aria-label={`${list.actionsMenu} ${patient.name}`}
                          className='absolute right-4 z-30 mt-1 w-48 rounded-xl border border-slate-200 bg-white py-1 text-left shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)]'
                        >
                          <Link
                            role='menuitem'
                            href={`/pacientes/${patient.id}/editar`}
                            className='block px-3 py-2 text-sm text-ink transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary'
                            onClick={() => setMenuId(null)}
                          >
                            {list.editPatient}
                          </Link>
                          <button
                            type='button'
                            role='menuitem'
                            className='block w-full px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary'
                            onClick={() => {
                              onDelete(patient.id)
                              setMenuId(null)
                              setSelectedIds((current) => current.filter((id) => id !== patient.id))
                            }}
                          >
                            {list.deletePatient}
                          </button>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

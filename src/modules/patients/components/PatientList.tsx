'use client'

import { PatientAvatar } from '@/modules/patients/components/PatientAvatar'
import type { Patient, PatientsContent } from '@/modules/patients/types/patients'

type PatientListProps = {
  content: PatientsContent
  patients: Patient[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const badgeClass = {
  active: 'bg-[#f6f0b8] text-[#8a7420]',
  inactive: 'bg-[#fde8ea] text-[#c45b66]',
} as const

export function PatientList({ content, patients, selectedId, onSelect }: PatientListProps) {
  return (
    <section
      aria-label='Lista de pacientes'
      className='rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'
    >
      {patients.length === 0 ? (
        <p className='px-3 py-8 text-center text-sm text-slate-500'>{content.emptyList}</p>
      ) : (
        <ul className='space-y-1'>
          {patients.map((patient) => {
            const selected = patient.id === selectedId

            return (
              <li key={patient.id}>
                <button
                  type='button'
                  onClick={() => onSelect(patient.id)}
                  aria-current={selected ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    selected ? 'bg-[#f7f6ef]' : 'hover:bg-slate-50'
                  }`}
                >
                  <PatientAvatar
                    name={patient.name}
                    photo={patient.photo}
                    active={patient.status === 'active'}
                  />
                  <span className='min-w-0 flex-1'>
                    <span className='block truncate text-sm font-semibold text-ink'>
                      {patient.name}
                    </span>
                    <span className='mt-0.5 block text-xs text-slate-400'>
                      {content.idPrefix} {patient.recordNumber} ·{' '}
                      {patient.phone || content.missingPhone}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold tracking-wide ${badgeClass[patient.status]}`}
                  >
                    {content.status[patient.status]}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

'use client'

import { PatientDetail } from '@/modules/patients/components/PatientDetail'
import { PatientList } from '@/modules/patients/components/PatientList'
import { filterPatients } from '@/modules/patients/lib/patient'
import { usePatients } from '@/modules/patients/state/PatientsProvider'

export function PatientsPage() {
  const { content, patients, query, selectedId, select } = usePatients()
  const filtered = filterPatients(patients, query)
  const selected = filtered.find((patient) => patient.id === selectedId) ?? null

  return (
    <div className='grid items-start gap-4 xl:grid-cols-[320px_minmax(0,1fr)]'>
      <PatientList
        content={content}
        patients={filtered}
        selectedId={selected?.id ?? null}
        onSelect={select}
      />
      {selected ? (
        <PatientDetail key={selected.id} patient={selected} />
      ) : (
        <section className='rounded-2xl border border-slate-200/80 bg-white px-6 py-10 text-sm text-slate-500 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
          {filtered.length === 0 ? content.emptyList : content.emptySelection}
        </section>
      )}
    </div>
  )
}

'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { PatientChart } from '@/modules/patients/components/PatientChart'
import { usePatients } from '@/modules/patients/state/PatientsProvider'

function ChartFallback() {
  return (
    <section aria-hidden='true' className='animate-pulse rounded-2xl border border-slate-200/80 bg-white p-8'>
      <div className='h-6 w-48 rounded bg-slate-200' />
      <div className='mt-6 h-64 rounded-xl bg-slate-100' />
    </section>
  )
}

export function PatientChartPage() {
  return (
    <Suspense fallback={<ChartFallback />}>
      <PatientChartContent />
    </Suspense>
  )
}

function PatientChartContent() {
  const params = useParams<{ id?: string | string[] }>()
  const rawId = params?.id
  const patientId = Array.isArray(rawId) ? rawId[0] : rawId
  const { patients, formContent } = usePatients()
  const patient = patients.find((item) => item.id === patientId)

  if (!patient) {
    return (
      <section className='rounded-2xl border border-slate-200/80 bg-white p-8'>
        <h1 className='text-xl font-bold text-primary'>Paciente</h1>
        <p className='mt-2 text-sm text-slate-500'>{formContent.notFound}</p>
        <Link
          href='/pacientes'
          className='mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-white'
        >
          {formContent.back}
        </Link>
      </section>
    )
  }

  return <PatientChart key={patient.id} patient={patient} />
}

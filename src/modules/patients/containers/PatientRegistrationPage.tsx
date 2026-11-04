'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { PatientForm } from '@/modules/patients/components/PatientForm'
import { emptyDraft } from '@/modules/patients/lib/patient'
import { usePatients } from '@/modules/patients/state/PatientsProvider'

type PatientRegistrationPageProps = {
  mode: 'create' | 'edit'
}

export function PatientRegistrationPage({ mode }: PatientRegistrationPageProps) {
  const router = useRouter()
  const params = useParams<{ id?: string | string[] }>()
  const rawId = params?.id
  const patientId = Array.isArray(rawId) ? rawId[0] : rawId
  const { patients, formContent, addPatient, updatePatient, nextRecordNumber } = usePatients()
  const patient = mode === 'edit' ? patients.find((item) => item.id === patientId) : undefined

  if (mode === 'edit' && !patient) {
    return (
      <section className='mx-auto max-w-5xl rounded-2xl border border-slate-200/80 bg-white p-8'>
        <h1 className='text-xl font-bold text-primary'>{formContent.editTitle}</h1>
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

  return (
    <PatientForm
      key={patient?.id ?? 'novo'}
      content={formContent}
      initial={patient?.draft ?? emptyDraft}
      recordNumber={patient?.recordNumber ?? nextRecordNumber}
      showRecordValue={mode === 'edit'}
      title={mode === 'edit' ? formContent.editTitle : formContent.title}
      onSubmit={(draft) => {
        if (patient) {
          updatePatient(patient.id, draft)
        } else {
          addPatient(draft)
        }

        router.push('/pacientes')
      }}
    />
  )
}

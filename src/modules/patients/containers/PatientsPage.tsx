'use client'

import { PatientList } from '@/modules/patients/components/PatientList'
import { filterPatients } from '@/modules/patients/lib/patient'
import { usePatients } from '@/modules/patients/state/PatientsProvider'

export function PatientsPage() {
  const { patients, query, removePatient } = usePatients()
  const filtered = filterPatients(patients, query)

  return <PatientList patients={filtered} onDelete={removePatient} />
}

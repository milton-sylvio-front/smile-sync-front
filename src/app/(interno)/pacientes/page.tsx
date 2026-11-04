import type { Metadata } from 'next'
import { PatientsPage } from '@/modules/patients/containers/PatientsPage'

export const metadata: Metadata = {
  title: 'Pacientes | SmileSync',
  description: 'Prontuários, histórico de tratamento e cadastro dos pacientes da clínica.',
}

export default function Patients() {
  return <PatientsPage />
}

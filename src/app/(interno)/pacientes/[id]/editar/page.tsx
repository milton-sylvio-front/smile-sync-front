import type { Metadata } from 'next'
import { PatientRegistrationPage } from '@/modules/patients/containers/PatientRegistrationPage'

export const metadata: Metadata = {
  title: 'Editar paciente | SmileSync',
  description: 'Atualize os dados cadastrais do paciente.',
}

export default function EditPatient() {
  return <PatientRegistrationPage mode='edit' />
}

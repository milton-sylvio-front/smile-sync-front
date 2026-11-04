import type { Metadata } from 'next'
import { PatientRegistrationPage } from '@/modules/patients/containers/PatientRegistrationPage'

export const metadata: Metadata = {
  title: 'Novo paciente | SmileSync',
  description: 'Cadastre um novo paciente com dados pessoais, contato e endereço.',
}

export default function NewPatient() {
  return <PatientRegistrationPage mode='create' />
}

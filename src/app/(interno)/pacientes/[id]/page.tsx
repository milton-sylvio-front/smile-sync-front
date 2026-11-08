import type { Metadata } from 'next'
import { PatientChartPage } from '@/modules/patients/containers/PatientChartPage'

export const metadata: Metadata = {
  title: 'Ficha do paciente | SmileSync',
  description: 'Ficha clínica, odontograma e acompanhamento do paciente.',
}

export default function PatientChartRoute() {
  return <PatientChartPage />
}

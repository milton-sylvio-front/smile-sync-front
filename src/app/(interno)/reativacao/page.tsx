import type { Metadata } from 'next'
import { reactivationContent } from '@/mocks/reactivation'
import { ReactivationPage } from '@/modules/reactivation/containers/ReactivationPage'

export const metadata: Metadata = {
  title: 'Reativação com IA | SmileSync',
  description:
    'Converta registros inativos em novas consultas com a sequência de reativação da SmileSync IA.',
}

export default function Reactivation() {
  return <ReactivationPage content={reactivationContent} />
}

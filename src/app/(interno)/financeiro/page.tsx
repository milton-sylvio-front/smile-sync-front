import type { Metadata } from 'next'
import { FinancePage } from '@/modules/finance/containers/FinancePage'

export const metadata: Metadata = {
  title: 'Financeiro | SmileSync',
  description:
    'Acompanhe a lucratividade, o fluxo de caixa e as transações da clínica.',
}

export default function Financeiro() {
  return <FinancePage />
}

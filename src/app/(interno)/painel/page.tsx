import type { Metadata } from 'next'
import { DashboardPage } from '@/modules/dashboard/containers/DashboardPage'
import { dashboardContent } from '@/mocks/dashboard'

export const metadata: Metadata = {
  title: 'Painel | SmileSync',
  description:
    'Visão geral da clínica: consultas do dia, receita, reativações por IA e próximas consultas.',
}

export default function Dashboard() {
  return <DashboardPage content={dashboardContent} />
}

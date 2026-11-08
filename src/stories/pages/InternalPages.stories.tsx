import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { dashboardContent } from '@/mocks/dashboard'
import { reactivationContent } from '@/mocks/reactivation'
import { DashboardPage } from '@/modules/dashboard/containers/DashboardPage'
import { FinancePage } from '@/modules/finance/containers/FinancePage'
import { PatientChartPage } from '@/modules/patients/containers/PatientChartPage'
import { PatientRegistrationPage } from '@/modules/patients/containers/PatientRegistrationPage'
import { PatientsPage } from '@/modules/patients/containers/PatientsPage'
import { ReactivationPage } from '@/modules/reactivation/containers/ReactivationPage'
import { SchedulePage } from '@/modules/schedule/containers/SchedulePage'
import {
  internalParameters,
  withInternalShell,
} from '@/stories/with-internal-shell'

const meta = {
  title: 'Telas/Internas',
  decorators: [withInternalShell],
  parameters: {
    ...internalParameters('/painel'),
    docs: {
      description: {
        component:
          'Área da clínica com o menu lateral. Pacientes, agenda e financeiro usam os mesmos providers do layout interno.',
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Painel: Story = {
  render: () => <DashboardPage content={dashboardContent} />,
}

export const Agendamentos: Story = {
  parameters: internalParameters('/agendamentos'),
  render: () => <SchedulePage />,
}

export const Pacientes: Story = {
  parameters: internalParameters('/pacientes'),
  render: () => <PatientsPage />,
}

export const FichaPaciente: Story = {
  parameters: internalParameters('/pacientes/sarah-johnson', [['id', 'sarah-johnson']]),
  render: () => <PatientChartPage />,
}

export const NovoPaciente: Story = {
  parameters: internalParameters('/pacientes/novo'),
  render: () => <PatientRegistrationPage mode='create' />,
}

export const EditarPaciente: Story = {
  parameters: internalParameters('/pacientes/sarah-johnson/editar', [
    ['id', 'sarah-johnson'],
  ]),
  render: () => <PatientRegistrationPage mode='edit' />,
}

export const Financeiro: Story = {
  parameters: internalParameters('/financeiro'),
  render: () => <FinancePage />,
}

export const Reativacao: Story = {
  parameters: internalParameters('/reativacao'),
  render: () => <ReactivationPage content={reactivationContent} />,
}

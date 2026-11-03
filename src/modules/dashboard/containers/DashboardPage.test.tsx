import { fireEvent, render, screen } from '@testing-library/react'
import { DashboardPage } from '@/modules/dashboard/containers/DashboardPage'
import { dashboardContent } from '@/mocks/dashboard'

describe('DashboardPage', () => {
  it('mostra indicadores, consultas e o alerta da IA a partir do mock', () => {
    render(<DashboardPage content={dashboardContent} />)

    for (const metric of dashboardContent.metrics) {
      expect(screen.getByText(metric.label)).toBeInTheDocument()
      expect(screen.getByText(metric.value)).toBeInTheDocument()
      expect(screen.getByText(metric.trend)).toBeInTheDocument()
    }

    expect(
      screen.getByRole('heading', { name: dashboardContent.financial.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(dashboardContent.financial.description)).toBeInTheDocument()
    expect(screen.getAllByText('Jan').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dez').length).toBeGreaterThan(0)

    for (const item of dashboardContent.appointments.items) {
      expect(screen.getByText(item.patient)).toBeInTheDocument()
      expect(screen.getByText(item.procedure)).toBeInTheDocument()
    }

    expect(
      screen.getByRole('link', { name: dashboardContent.appointments.action.label }),
    ).toHaveAttribute('href', dashboardContent.appointments.action.href)
    expect(screen.getByText(dashboardContent.insight.description)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: dashboardContent.insight.action.label }),
    ).toHaveAttribute('href', dashboardContent.insight.action.href)
  })

  it('alterna o gráfico entre um ano e seis meses', () => {
    render(<DashboardPage content={dashboardContent} />)

    fireEvent.click(screen.getByRole('button', { name: '6 Meses' }))

    expect(screen.queryAllByText('Jan')).toHaveLength(0)
    expect(screen.getAllByText('Jul').length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: '6 Meses' })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByRole('button', { name: '1 Ano' }))

    expect(screen.getAllByText('Jan').length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: '1 Ano' })).toHaveAttribute('aria-pressed', 'true')
  })
})

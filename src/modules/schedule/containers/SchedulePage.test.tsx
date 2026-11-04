import { fireEvent, render, screen, within } from '@testing-library/react'
import { scheduleContent } from '@/mocks/schedule'
import { ScheduleToolbar } from '@/modules/schedule/components/ScheduleToolbar'
import { SchedulePage } from '@/modules/schedule/containers/SchedulePage'
import { ScheduleProvider } from '@/modules/schedule/state/ScheduleProvider'

function renderSchedule() {
  return render(
    <ScheduleProvider content={scheduleContent}>
      <ScheduleToolbar />
      <SchedulePage />
    </ScheduleProvider>,
  )
}

describe('SchedulePage', () => {
  it('mostra a semana, os lembretes e o painel lateral', () => {
    renderSchedule()

    expect(screen.getByRole('heading', { name: scheduleContent.title })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Semana' })).toHaveAttribute('aria-pressed', 'true')

    const week = screen.getByRole('region', { name: '21 - 27 de Outubro, 2024' })
    expect(within(week).getByText('Sarah Johnson')).toBeInTheDocument()
    expect(within(week).getByText('Limpeza')).toBeInTheDocument()
    expect(within(week).getByText('Robert Brown')).toBeInTheDocument()
    expect(within(week).getByText('Michael Chen')).toBeInTheDocument()
    expect(within(week).getByText('Emily Davis')).toBeInTheDocument()
    expect(within(week).getAllByText(scheduleContent.lunchLabel).length).toBeGreaterThan(0)

    expect(screen.getByText(scheduleContent.reminders[0].detail)).toBeInTheDocument()
    expect(screen.getByText(scheduleContent.reminders[1].detail)).toBeInTheDocument()
    expect(screen.getByText(scheduleContent.optimization.description)).toBeInTheDocument()
  })

  it('alterna o dia, o mês e o período exibido', () => {
    renderSchedule()

    fireEvent.click(screen.getByRole('button', { name: 'Dia' }))

    const day = screen.getByRole('region', { name: '22 de Outubro, 2024' })
    expect(within(day).getByText('Sarah Johnson')).toBeInTheDocument()
    expect(within(day).queryByText('Robert Brown')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Mês' }))
    expect(screen.getByRole('region', { name: 'Outubro de 2024' })).toBeInTheDocument()
    expect(screen.getByText('Emily Davis')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Semana' }))
    fireEvent.click(screen.getByRole('button', { name: scheduleContent.nextLabel }))

    const nextWeek = screen.getByRole('region', { name: '28 de Outubro - 3 de Novembro, 2024' })
    expect(within(nextWeek).queryByText('Sarah Johnson')).not.toBeInTheDocument()
  })

  it('agenda uma consulta, reenvia o lembrete, preenche o horário e salva a espera', () => {
    renderSchedule()

    fireEvent.click(screen.getByRole('button', { name: scheduleContent.scheduleAction }))
    fireEvent.change(screen.getByLabelText(scheduleContent.dialog.patientLabel), {
      target: { value: 'Ana Lima' },
    })
    fireEvent.change(screen.getByLabelText(scheduleContent.dialog.procedureLabel), {
      target: { value: 'Avaliação' },
    })
    fireEvent.click(screen.getByRole('button', { name: scheduleContent.dialog.confirm }))

    expect(screen.getByText('Ana Lima')).toBeInTheDocument()
    expect(screen.getByText('Avaliação')).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: scheduleContent.reminders[1].resendLabel }))
    expect(screen.getByText(scheduleContent.reminders[1].sentLabel)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: scheduleContent.reminders[1].resendLabel }),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: scheduleContent.optimization.action }))
    expect(screen.getByText(scheduleContent.optimization.done)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: scheduleContent.optimization.action }),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: scheduleContent.quickAccess.action }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(scheduleContent.quickAccess.nameLabel), {
      target: { value: 'João Souza' },
    })
    fireEvent.change(screen.getByLabelText(scheduleContent.quickAccess.phoneLabel), {
      target: { value: '11999999999' },
    })
    fireEvent.click(screen.getByRole('button', { name: scheduleContent.quickAccess.action }))

    expect(screen.getByRole('status')).toHaveTextContent(scheduleContent.quickAccess.success)
    expect(screen.getByLabelText(scheduleContent.quickAccess.nameLabel)).toHaveValue('')
  })
})

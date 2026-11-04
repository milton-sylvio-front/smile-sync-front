import { fireEvent, render, screen, within } from '@testing-library/react'
import { ReactivationPage } from '@/modules/reactivation/containers/ReactivationPage'
import { reactivationContent } from '@/mocks/reactivation'

function renderPage() {
  return render(<ReactivationPage content={reactivationContent} />)
}

describe('ReactivationPage', () => {
  it('mostra o hub, a prévia da mensagem, a prioridade e a performance', () => {
    renderPage()
    const { hub, list, performance, tip } = reactivationContent

    expect(screen.getByRole('heading', { name: hub.title })).toBeInTheDocument()
    expect(screen.getByText(hub.records)).toBeInTheDocument()
    expect(screen.getByText(hub.opportunities)).toBeInTheDocument()
    expect(screen.getByText(hub.potentialValue)).toBeInTheDocument()
    expect(screen.getByText(hub.targetValue)).toBeInTheDocument()
    expect(screen.getByText(hub.previewTitle)).toBeInTheDocument()
    expect(screen.getByText(`“${hub.previewMessage}”`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: hub.launchLabel })).toBeEnabled()

    for (const patient of reactivationContent.patients.slice(0, list.previewCount)) {
      expect(screen.getByText(patient.name)).toBeInTheDocument()
      expect(screen.getByText(new RegExp(patient.procedure))).toBeInTheDocument()
    }

    expect(screen.queryByText(reactivationContent.patients[3].name)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: performance.title })).toBeInTheDocument()
    expect(screen.getByText(performance.conversionValue)).toBeInTheDocument()
    expect(screen.getByText(performance.roiValue)).toBeInTheDocument()
    expect(screen.getByText(tip.emphasis)).toBeInTheDocument()
  })

  it('reordena a lista, expande os inativos e lança a sequência dos selecionados', () => {
    renderPage()
    const { hub, list, patients } = reactivationContent

    fireEvent.change(screen.getByRole('combobox', { name: list.sortLabel }), {
      target: { value: 'revenue' },
    })

    const checks = screen.getAllByRole('checkbox')
    expect(checks[0]).toHaveAccessibleName(`Incluir ${patients[2].name} na sequência`)

    fireEvent.click(
      screen.getByRole('button', {
        name: list.showAllLabel.replace('{count}', String(patients.length)),
      }),
    )

    expect(screen.getByText(patients[3].name)).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(patients.length)

    const amanda = screen.getByRole('checkbox', {
      name: `Incluir ${patients[0].name} na sequência`,
    })
    fireEvent.click(amanda)
    expect(amanda).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(screen.getByRole('button', { name: hub.launchLabel }))

    expect(screen.getByRole('button', { name: hub.launchedLabel })).toBeDisabled()
    expect(
      screen.getByRole('status'),
    ).toHaveTextContent(
      hub.launchedMessage.replace('{count}', String(patients.length - 1)),
    )
    expect(within(screen.getByRole('status')).getByText(/WhatsApp/)).toBeInTheDocument()
  })
})

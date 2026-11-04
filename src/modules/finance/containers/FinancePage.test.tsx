import { fireEvent, render, screen, within } from '@testing-library/react'
import { financeContent } from '@/mocks/finance'
import { FinanceToolbar } from '@/modules/finance/components/FinanceToolbar'
import { FinancePage } from '@/modules/finance/containers/FinancePage'
import { FinanceProvider } from '@/modules/finance/state/FinanceProvider'

function renderFinance() {
  return render(
    <FinanceProvider content={financeContent}>
      <FinanceToolbar />
      <FinancePage />
    </FinanceProvider>,
  )
}

describe('FinancePage', () => {
  it('mostra os indicadores, o fluxo de caixa, as despesas e as transações do mês', () => {
    renderFinance()
    const month = financeContent.periodsData['this-month']

    expect(screen.getByRole('button', { name: 'Este Mês' })).toHaveAttribute('aria-pressed', 'true')

    for (const card of month.summary) {
      expect(screen.getByText(card.label)).toBeInTheDocument()
      expect(screen.getByText(card.value)).toBeInTheDocument()
      expect(screen.getByText(card.trend)).toBeInTheDocument()
    }

    expect(screen.getByRole('heading', { name: financeContent.cashFlowTitle })).toBeInTheDocument()
    expect(screen.getAllByText('Jul').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Out').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: financeContent.distributionTitle })).toBeInTheDocument()

    for (const slice of month.expenses) {
      expect(screen.getByText(slice.amount)).toBeInTheDocument()
    }

    expect(screen.getByText('Retorno Canal')).toBeInTheDocument()
    expect(screen.getByText('Pedido de Insumos #882')).toBeInTheDocument()
    expect(screen.getByText('Consulta e Raio X')).toBeInTheDocument()
    expect(screen.queryByText('Reposição de anestésicos')).not.toBeInTheDocument()
  })

  it('alterna o período e revela o restante das transações', () => {
    renderFinance()

    fireEvent.click(screen.getByRole('button', { name: 'Mês Passado' }))

    expect(screen.getByText('R$ 28.120,00')).toBeInTheDocument()
    expect(screen.getAllByText('Mar').length).toBeGreaterThan(0)
    expect(screen.queryByText('Retorno Canal')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mês Passado' })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Este Mês' }))
    fireEvent.click(screen.getByRole('button', { name: financeContent.seeAllLabel }))

    expect(screen.getByText('Limpeza de Rotina')).toBeInTheDocument()
    expect(screen.getByText('Reposição de anestésicos')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: financeContent.seeLessLabel })).toBeInTheDocument()
  })

  it('filtra por status, adiciona uma transação e exporta o relatório', async () => {
    const createObjectURL = jest.fn<string, [Blob]>(() => 'blob:financeiro')
    const revokeObjectURL = jest.fn()
    Object.defineProperty(URL, 'createObjectURL', { writable: true, value: createObjectURL })
    Object.defineProperty(URL, 'revokeObjectURL', { writable: true, value: revokeObjectURL })

    renderFinance()

    fireEvent.click(screen.getByRole('button', { name: financeContent.filterLabel }))
    const filter = screen.getByRole('dialog', { name: financeContent.filter.title })
    fireEvent.click(within(filter).getByRole('button', { name: 'Pendente' }))

    expect(screen.queryByText('Retorno Canal')).not.toBeInTheDocument()
    expect(screen.getByText('Consulta e Raio X')).toBeInTheDocument()

    fireEvent.click(within(filter).getByRole('button', { name: financeContent.filter.clear }))
    expect(screen.getByText('Retorno Canal')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: financeContent.addLabel }))
    const dialog = screen.getByRole('dialog', { name: financeContent.dialog.title })
    fireEvent.change(within(dialog).getByLabelText(financeContent.dialog.descriptionLabel), {
      target: { value: 'Manutenção do raio-x' },
    })
    fireEvent.change(within(dialog).getByLabelText(financeContent.dialog.detailLabel), {
      target: { value: 'Fornecedor: Oficina Local' },
    })
    fireEvent.change(within(dialog).getByLabelText(financeContent.dialog.amountLabel), {
      target: { value: '99,50' },
    })
    fireEvent.change(within(dialog).getByLabelText(financeContent.dialog.kindLabel), {
      target: { value: 'expense' },
    })
    fireEvent.click(within(dialog).getByRole('button', { name: financeContent.dialog.confirm }))

    expect(screen.getByText('Manutenção do raio-x')).toBeInTheDocument()
    expect(screen.getByText('Fornecedor: Oficina Local')).toBeInTheDocument()
    expect(screen.getByText('- R$ 99,50')).toBeInTheDocument()

    jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    fireEvent.click(screen.getByRole('button', { name: financeContent.exportLabel }))

    expect(createObjectURL).toHaveBeenCalled()
    const blob = createObjectURL.mock.calls[0][0]
    const csv = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(reader.error)
      reader.readAsText(blob)
    })
    expect(csv).toContain('Receita Total')
    expect(csv).toContain('Manutenção do raio-x')
    expect(revokeObjectURL).toHaveBeenCalled()
  })
})

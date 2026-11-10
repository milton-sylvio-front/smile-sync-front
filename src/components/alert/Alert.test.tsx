import { fireEvent, render, screen } from '@testing-library/react'
import { Alert } from '@/components/alert/Alert'

describe('Alert', () => {
  it('exibe o alerta com título, descrição e ação', () => {
    const onAction = jest.fn()

    render(
      <Alert
        variant='success'
        title='Paciente salvo com sucesso'
        description='Os dados foram atualizados.'
        actionLabel='Ver prontuário'
        onAction={onAction}
      />,
    )

    expect(screen.getByRole('status')).toHaveTextContent(
      'Paciente salvo com sucesso',
    )
    expect(screen.getByText('Os dados foram atualizados.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Ver prontuário' }))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('usa o papel de alerta e permite fechar mensagens de erro', () => {
    const onClose = jest.fn()

    render(
      <Alert
        variant='error'
        title='Não foi possível salvar'
        description='Verifique sua conexão e tente novamente.'
        onClose={onClose}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível salvar')
    fireEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

import { act, fireEvent, render, screen } from '@testing-library/react'
import { Toast } from '@/components/toast/Toast'

describe('Toast', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('fecha automaticamente após cinco segundos', () => {
    jest.useFakeTimers()
    const onClose = jest.fn()

    render(
      <Toast
        title='Conta criada com sucesso'
        description='Você já pode fazer login.'
        onClose={onClose}
      />,
    )

    expect(screen.getByRole('status')).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('permite fechar manualmente', () => {
    const onClose = jest.fn()

    render(
      <Toast
        variant='error'
        title='Não foi possível salvar'
        description='Tente novamente.'
        onClose={onClose}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Fechar notificação' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

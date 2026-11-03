import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from '@/components/button/Button'

describe('Button', () => {
  it('renderiza um botão primário com type button', () => {
    render(<Button>Salvar</Button>)

    const button = screen.getByRole('button', { name: 'Salvar' })

    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveClass('bg-primary', 'text-white')
  })

  it('aceita type submit e dispara o clique', () => {
    const onClick = jest.fn()

    render(
      <Button type='submit' onClick={onClick}>
        Entrar
      </Button>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveAttribute(
      'type',
      'submit',
    )
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('aplica variante, tamanho e largura total', () => {
    render(
      <Button variant='outline' size='lg' fullWidth>
        Voltar
      </Button>,
    )

    expect(screen.getByRole('button', { name: 'Voltar' })).toHaveClass(
      'border-primary',
      'h-12',
      'w-full',
    )
  })

  it('desabilita a interação', () => {
    render(<Button disabled>Aguarde</Button>)

    expect(screen.getByRole('button', { name: 'Aguarde' })).toBeDisabled()
  })

  it('usa link interno para rotas do app', () => {
    render(<Button href='/cadastre-se'>Teste Grátis</Button>)

    expect(screen.getByRole('link', { name: 'Teste Grátis' })).toHaveAttribute(
      'href',
      '/cadastre-se',
    )
  })

  it('usa âncora para links da mesma página', () => {
    render(
      <Button href='#demonstracao' variant='secondary'>
        Ver Demonstração
      </Button>,
    )

    const link = screen.getByRole('link', { name: 'Ver Demonstração' })

    expect(link).toHaveAttribute('href', '#demonstracao')
    expect(link).toHaveClass('border-slate-300', 'text-ink')
  })
})

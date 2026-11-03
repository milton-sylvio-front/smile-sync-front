import { fireEvent, render, screen } from '@testing-library/react'
import { LoginPage } from '@/modules/login/containers/LoginPage'
import { loginContent } from '@/mocks/login'

const push = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: (...args: unknown[]) => push(...args),
  }),
}))

function renderLogin() {
  return render(<LoginPage content={loginContent} />)
}

describe('LoginPage', () => {
  beforeEach(() => {
    push.mockClear()
  })

  it('mostra o acesso à clínica com os textos do mock', () => {
    renderLogin()

    expect(
      screen.getByRole('heading', { name: loginContent.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(loginContent.subtitle)).toBeInTheDocument()
    expect(screen.getByLabelText(loginContent.email.label)).toHaveAttribute(
      'placeholder',
      loginContent.email.placeholder,
    )
    expect(screen.getByLabelText(loginContent.password.label)).toHaveAttribute(
      'type',
      'password',
    )
    expect(
      screen.getByRole('link', { name: loginContent.forgotPassword.label }),
    ).toHaveAttribute('href', loginContent.forgotPassword.href)
    expect(
      screen.getByRole('link', { name: loginContent.register.label }),
    ).toHaveAttribute('href', loginContent.register.href)
    expect(
      screen.getByRole('button', { name: loginContent.submitLabel }),
    ).toBeInTheDocument()
    expect(screen.getByText(loginContent.copyright)).toBeInTheDocument()
    expect(screen.getByText(loginContent.securityNote)).toBeInTheDocument()
  })

  it('pede e-mail e senha antes de enviar', () => {
    renderLogin()

    fireEvent.click(
      screen.getByRole('button', { name: loginContent.submitLabel }),
    )

    expect(
      screen.getByText('Informe o endereço de e-mail.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Informe a senha.')).toBeInTheDocument()
    expect(push).not.toHaveBeenCalled()
  })

  it('aceita credenciais e a opção de lembrar o acesso', () => {
    renderLogin()

    fireEvent.change(screen.getByLabelText(loginContent.email.label), {
      target: { value: 'doutor.silva@exemplo.com' },
    })
    fireEvent.change(screen.getByLabelText(loginContent.password.label), {
      target: { value: 'clinica-segura' },
    })
    fireEvent.click(screen.getByLabelText(loginContent.rememberLabel))
    fireEvent.click(
      screen.getByRole('button', { name: loginContent.submitLabel }),
    )

    expect(screen.getByLabelText(loginContent.rememberLabel)).toBeChecked()
    expect(
      screen.queryByText('Informe o endereço de e-mail.'),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Informe a senha.')).not.toBeInTheDocument()
    expect(push).toHaveBeenCalledWith(loginContent.redirectHref)
  })
})

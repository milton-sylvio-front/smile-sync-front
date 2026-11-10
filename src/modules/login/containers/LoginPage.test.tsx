import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { loginContent } from '@/mocks/login'
import { accessTokenStorageKey, readAccessToken } from '@/modules/auth/session'
import { LoginPage } from '@/modules/login/containers/LoginPage'

const push = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: (...args: unknown[]) => push(...args),
  }),
}))

function renderLogin() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <LoginPage content={loginContent} />
    </QueryClientProvider>,
  )
}

function mockSuccessfulLogin() {
  return jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({
      accessToken: 'access-token',
      user: {
        id: 'user-id',
        clinicId: 'clinic-id',
        name: 'Dr. Silva',
        email: 'doutor.silva@exemplo.com',
        role: 'OWNER',
      },
    }),
  } as Response)
}

describe('LoginPage', () => {
  beforeEach(() => {
    push.mockClear()
    sessionStorage.clear()
    localStorage.clear()
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
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

  it('entra com e-mail e senha e abre o painel', async () => {
    const fetchMock = mockSuccessfulLogin()
    renderLogin()

    fireEvent.change(screen.getByLabelText(loginContent.email.label), {
      target: { value: 'doutor.silva@exemplo.com' },
    })
    fireEvent.change(screen.getByLabelText(loginContent.password.label), {
      target: { value: 'clinica-segura' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: loginContent.submitLabel }),
    )

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3333/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'doutor.silva@exemplo.com',
            password: 'clinica-segura',
          }),
        }),
      )
    })
    expect(sessionStorage.getItem(accessTokenStorageKey)).toBe('access-token')
    expect(localStorage.getItem(accessTokenStorageKey)).toBeNull()
    expect(push).toHaveBeenCalledWith(loginContent.redirectHref)
  })

  it('guarda o token no navegador quando a opção de lembrar o acesso está marcada', async () => {
    mockSuccessfulLogin()
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

    await waitFor(() => {
      expect(localStorage.getItem(accessTokenStorageKey)).toBe('access-token')
    })
    expect(sessionStorage.getItem(accessTokenStorageKey)).toBeNull()
    expect(readAccessToken()).toBe('access-token')
    expect(screen.getByLabelText(loginContent.rememberLabel)).toBeChecked()
  })

  it('mostra a mensagem de erro retornada pela API', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'E-mail ou senha inválidos.' }),
    } as Response)
    renderLogin()

    fireEvent.change(screen.getByLabelText(loginContent.email.label), {
      target: { value: 'doutor.silva@exemplo.com' },
    })
    fireEvent.change(screen.getByLabelText(loginContent.password.label), {
      target: { value: 'senha-errada' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: loginContent.submitLabel }),
    )

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'E-mail ou senha inválidos.',
    )
    expect(push).not.toHaveBeenCalled()
    expect(readAccessToken()).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }))
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})

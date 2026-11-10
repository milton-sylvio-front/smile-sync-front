import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import { RequireSession } from '@/modules/auth/components/RequireSession'
import { readAccessToken, saveAccessToken } from '@/modules/auth/session'

const redirectToLogin = jest.fn()

jest.mock('@/modules/auth/session', () => {
  const actual = jest.requireActual('@/modules/auth/session')

  return {
    ...actual,
    redirectToLogin: () => redirectToLogin(),
  }
})

function renderSession() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <RequireSession token='access-token'>
        <p>Área da clínica</p>
      </RequireSession>
    </QueryClientProvider>,
  )
}

describe('RequireSession', () => {
  beforeEach(() => {
    redirectToLogin.mockClear()
    sessionStorage.clear()
    localStorage.clear()
    document.cookie = 'smile-sync.accessToken=; Path=/; Max-Age=0'
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('mostra a área interna quando o token está ativo', async () => {
    saveAccessToken('access-token', false)
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        userId: 'user-id',
        clinicId: 'clinic-id',
        name: 'Dra. Ana Silva',
        role: 'OWNER',
      }),
    } as Response)

    renderSession()

    expect(await screen.findByText('Área da clínica')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3333/api/auth/me',
      expect.objectContaining({
        headers: { Authorization: 'Bearer access-token' },
      }),
    )
    expect(redirectToLogin).not.toHaveBeenCalled()
  })

  it('redireciona para o login quando o token não é aceito', async () => {
    saveAccessToken('access-token', true)
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Token de acesso inválido ou expirado.' }),
    } as Response)

    renderSession()

    await waitFor(() => {
      expect(redirectToLogin).toHaveBeenCalled()
    })
    expect(readAccessToken()).toBeNull()
    expect(screen.queryByText('Área da clínica')).not.toBeInTheDocument()
  })
})

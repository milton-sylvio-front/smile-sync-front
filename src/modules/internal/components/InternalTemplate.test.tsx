import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { internalContent } from '@/mocks/internal'
import { reactivationContent } from '@/mocks/reactivation'
import { readAccessToken, saveAccessToken } from '@/modules/auth/session'
import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'

let mockPathname = '/painel'

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}))

const sessionUser = {
  userId: 'user-id',
  clinicId: 'clinic-id',
  name: 'Dra. Ana Silva',
  role: 'OWNER',
}

function renderTemplate() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <InternalTemplate content={internalContent}>
        <p>Conteúdo da página</p>
      </InternalTemplate>
    </QueryClientProvider>,
  )
}

describe('InternalTemplate', () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
    saveAccessToken('access-token', false)
    global.fetch = jest.fn()
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => sessionUser,
    } as Response)
  })

  afterEach(() => {
    mockPathname = '/painel'
    jest.restoreAllMocks()
  })

  it('mostra o menu da clínica, o usuário da sessão e o título da rota atual', async () => {
    renderTemplate()
    const painel = internalContent.navigation[0]

    expect(screen.getByRole('heading', { name: painel.title })).toBeInTheDocument()
    expect(screen.getByText(painel.description)).toBeInTheDocument()
    expect(await screen.findByText(sessionUser.name)).toBeInTheDocument()
    expect(screen.getByText('Diretor clínico')).toBeInTheDocument()
    expect(screen.queryByText(internalContent.user.name)).not.toBeInTheDocument()
    expect(screen.queryByText(internalContent.user.role)).not.toBeInTheDocument()
    expect(screen.getByText(internalContent.plan.usageLabel)).toBeInTheDocument()
    expect(screen.getByText('Conteúdo da página')).toBeInTheDocument()

    for (const item of internalContent.navigation) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', item.href)
    }

    expect(screen.getByRole('link', { name: painel.label })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: internalContent.logout.label })).toHaveAttribute(
      'href',
      internalContent.logout.href,
    )
  })

  it('encerra a sessão ao sair', () => {
    saveAccessToken('access-token', true)
    renderTemplate()

    fireEvent.click(screen.getByRole('link', { name: internalContent.logout.label }))

    expect(readAccessToken()).toBeNull()
  })

  it('recolhe o menu e abre as notificações', () => {
    renderTemplate()

    fireEvent.click(screen.getByRole('button', { name: 'Recolher menu' }))

    expect(screen.getByRole('button', { name: 'Expandir menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )

    fireEvent.click(screen.getByRole('button', { name: internalContent.notifications.label }))

    expect(screen.getByText(internalContent.notifications.items[0].title)).toBeInTheDocument()
  })

  it('mostra o motor de IA no lugar das notificações na reativação', () => {
    mockPathname = '/reativacao'
    renderTemplate()
    const reactivation = internalContent.navigation.find((item) => item.href === '/reativacao')

    expect(screen.getByRole('heading', { name: reactivation?.title })).toBeInTheDocument()
    expect(screen.getByText(reactivationContent.engine.label)).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: internalContent.notifications.label }),
    ).not.toBeInTheDocument()
  })
})

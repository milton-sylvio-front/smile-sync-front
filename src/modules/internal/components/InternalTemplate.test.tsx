import { fireEvent, render, screen } from '@testing-library/react'
import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'
import { internalContent } from '@/mocks/internal'
import { reactivationContent } from '@/mocks/reactivation'

let mockPathname = '/painel'

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}))

function renderTemplate() {
  return render(
    <InternalTemplate content={internalContent}>
      <p>Conteúdo da página</p>
    </InternalTemplate>,
  )
}

describe('InternalTemplate', () => {
  afterEach(() => {
    mockPathname = '/painel'
  })

  it('mostra o menu da clínica, o usuário e o título da rota atual', () => {
    renderTemplate()
    const painel = internalContent.navigation[0]

    expect(screen.getByRole('heading', { name: painel.title })).toBeInTheDocument()
    expect(screen.getByText(painel.description)).toBeInTheDocument()
    expect(screen.getByText(internalContent.user.name)).toBeInTheDocument()
    expect(screen.getByText(internalContent.user.role)).toBeInTheDocument()
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

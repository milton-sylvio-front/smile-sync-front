import { fireEvent, render, screen } from '@testing-library/react'
import { InternalTemplate } from '@/modules/internal/components/InternalTemplate'
import { internalContent } from '@/mocks/internal'

jest.mock('next/navigation', () => ({
  usePathname: () => '/painel',
}))

function renderTemplate() {
  return render(
    <InternalTemplate content={internalContent}>
      <p>Conteúdo da página</p>
    </InternalTemplate>,
  )
}

describe('InternalTemplate', () => {
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
})

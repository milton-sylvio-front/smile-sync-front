import { fireEvent, render, screen } from '@testing-library/react'
import { PasswordRecoveryPage } from '@/modules/password-recovery/containers/PasswordRecoveryPage'
import { passwordRecoveryContent } from '@/mocks/password-recovery'

function renderPasswordRecovery() {
  return render(<PasswordRecoveryPage content={passwordRecoveryContent} />)
}

describe('PasswordRecoveryPage', () => {
  it('mostra a recuperação de senha com os textos do mock', () => {
    renderPasswordRecovery()

    expect(
      screen.getByRole('heading', { name: passwordRecoveryContent.title }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(passwordRecoveryContent.subtitle),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(passwordRecoveryContent.email.label),
    ).toHaveAttribute('placeholder', passwordRecoveryContent.email.placeholder)
    expect(
      screen.getByRole('button', { name: passwordRecoveryContent.submitLabel }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: passwordRecoveryContent.back.label }),
    ).toHaveAttribute('href', passwordRecoveryContent.back.href)
  })

  it('pede um e-mail válido antes de enviar o link', () => {
    renderPasswordRecovery()

    fireEvent.click(
      screen.getByRole('button', { name: passwordRecoveryContent.submitLabel }),
    )

    expect(
      screen.getByText('Informe o endereço de e-mail.'),
    ).toBeInTheDocument()

    fireEvent.change(
      screen.getByLabelText(passwordRecoveryContent.email.label),
      { target: { value: 'doutor.silva' } },
    )
    fireEvent.click(
      screen.getByRole('button', { name: passwordRecoveryContent.submitLabel }),
    )

    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument()
    expect(
      screen.queryByRole('status'),
    ).not.toBeInTheDocument()
  })

  it('confirma o envio quando o e-mail é válido', () => {
    renderPasswordRecovery()

    fireEvent.change(
      screen.getByLabelText(passwordRecoveryContent.email.label),
      { target: { value: 'doutor.silva@exemplo.com' } },
    )
    fireEvent.click(
      screen.getByRole('button', { name: passwordRecoveryContent.submitLabel }),
    )

    expect(
      screen.getByRole('status'),
    ).toHaveTextContent(passwordRecoveryContent.successMessage)
    expect(
      screen.queryByText('Informe o endereço de e-mail.'),
    ).not.toBeInTheDocument()
  })
})

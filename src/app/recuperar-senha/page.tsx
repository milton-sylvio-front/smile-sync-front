import type { Metadata } from 'next'
import { passwordRecoveryContent } from '@/mocks/password-recovery'
import { PasswordRecoveryPage } from '@/modules/password-recovery/containers/PasswordRecoveryPage'

export const metadata: Metadata = {
  title: 'Recuperar senha | SmileSync',
  description:
    'Insira seu e-mail e receba um link para redefinir a senha da sua clínica no SmileSync.',
}

export default function PasswordRecovery() {
  return <PasswordRecoveryPage content={passwordRecoveryContent} />
}

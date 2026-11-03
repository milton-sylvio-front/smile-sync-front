import type { PasswordRecoveryContent } from '@/modules/password-recovery/types/password-recovery'
import { globalContent } from '@/mocks/global'

export const passwordRecoveryContent: PasswordRecoveryContent = {
  brandName: 'SmileSync',
  title: 'Recuperar sua senha',
  subtitle: 'Insira seu e-mail e enviaremos um link para redefinir sua senha.',
  email: {
    label: 'Endereço de E-mail',
    placeholder: 'doutor.silva@exemplo.com',
  },
  submitLabel: 'Enviar Link de Redefinição',
  back: {
    label: 'Voltar para o login',
    href: '/entrar',
  },
  successMessage:
    'Se houver uma conta com esse e-mail, enviaremos um link para redefinir a senha.',
  copyright: globalContent.copyright,
  securityNote: globalContent.securityNote,
}

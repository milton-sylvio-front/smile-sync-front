import type { Metadata } from 'next'
import { LoginPage } from '@/modules/login/containers/LoginPage'
import { loginContent } from '@/mocks/login'

export const metadata: Metadata = {
  title: 'Entrar | SmileSync',
  description: 'Insira suas credenciais para acessar sua clínica no SmileSync.',
}

export default function Login() {
  return <LoginPage content={loginContent} />
}

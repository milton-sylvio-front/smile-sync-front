import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EmptyData } from '@/components/empty-data/EmptyData'
import { emptyDataContent } from '@/mocks/empty-data'
import { homeContent } from '@/mocks/home'
import { loginContent } from '@/mocks/login'
import { notFoundContent } from '@/mocks/not-found'
import { passwordRecoveryContent } from '@/mocks/password-recovery'
import { registerContent } from '@/mocks/register'
import { HomePage } from '@/modules/home/containers/HomePage'
import { LoginPage } from '@/modules/login/containers/LoginPage'
import { NotFoundPage } from '@/modules/not-found/containers/NotFoundPage'
import { PasswordRecoveryPage } from '@/modules/password-recovery/containers/PasswordRecoveryPage'
import { RegisterPage } from '@/modules/register/containers/RegisterPage'

const meta = {
  title: 'Telas/Públicas',
  component: HomePage,
  parameters: {
    docs: {
      description: {
        component:
          'Landing, entrada, cadastro, recuperação de senha, página não encontrada e o estado vazio de relatórios.',
      },
    },
  },
} satisfies Meta<typeof HomePage>

export default meta

type Story = StoryObj<typeof meta>

export const Inicio: Story = {
  args: { content: homeContent },
}

export const Entrar: Story = {
  render: () => <LoginPage content={loginContent} />,
}

export const Cadastro: Story = {
  render: () => <RegisterPage content={registerContent} />,
}

export const RecuperarSenha: Story = {
  render: () => <PasswordRecoveryPage content={passwordRecoveryContent} />,
}

export const NaoEncontrada: Story = {
  render: () => <NotFoundPage content={notFoundContent} />,
}

export const Relatorios: Story = {
  render: () => (
    <main className='flex min-h-screen items-center justify-center bg-[#f7f9fb]'>
      <EmptyData content={emptyDataContent} />
    </main>
  ),
}

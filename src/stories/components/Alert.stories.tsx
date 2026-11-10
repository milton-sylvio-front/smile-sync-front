import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Alert } from '@/components/alert/Alert'

const meta = {
  title: 'Componentes/Alert',
  component: Alert,
  args: {
    variant: 'success',
    title: 'Paciente salvo com sucesso',
    description:
      'As informações do paciente foram atualizadas corretamente.',
    actionLabel: 'Ver prontuário',
    onAction: () => undefined,
    onClose: () => undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Sucesso: Story = {}

export const Erro: Story = {
  args: {
    variant: 'error',
    title: 'Não foi possível salvar',
    description: 'Verifique sua conexão com a internet e tente novamente.',
    actionLabel: 'Tentar novamente',
  },
}

export const Aviso: Story = {
  args: {
    variant: 'warning',
    title: 'Anamnese pendente',
    description: 'Este paciente ainda não possui uma anamnese assinada.',
    actionLabel: 'Fazer anamnese',
  },
}

export const Informacao: Story = {
  args: {
    variant: 'info',
    title: 'Nova atualização disponível',
    description: 'O odontograma agora permite marcar as faces de cada dente.',
    actionLabel: 'Saiba mais',
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Toast } from '@/components/toast/Toast'

const meta = {
  title: 'Componentes/Toast',
  component: Toast,
  args: {
    variant: 'success',
    title: 'Paciente salvo com sucesso',
    description:
      'As informações do paciente foram atualizadas corretamente.',
    actionLabel: 'Ver',
    onAction: () => undefined,
    onClose: () => undefined,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    duration: {
      control: { type: 'number', min: 1000, step: 1000 },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Toast>

export default meta

type Story = StoryObj<typeof meta>

export const Sucesso: Story = {}

export const Erro: Story = {
  args: {
    variant: 'error',
    title: 'Não foi possível salvar',
    description: 'Verifique sua conexão com a internet e tente novamente.',
    actionLabel: 'Tentar',
  },
}

export const Aviso: Story = {
  args: {
    variant: 'warning',
    title: 'Anamnese pendente',
    description: 'Este paciente ainda não possui uma anamnese assinada.',
    actionLabel: 'Fazer',
  },
}

export const Informacao: Story = {
  args: {
    variant: 'info',
    title: 'Nova atualização disponível',
    description: 'O odontograma agora permite marcar as faces de cada dente.',
    actionLabel: 'Saiba',
  },
}

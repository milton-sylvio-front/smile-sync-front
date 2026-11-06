import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EmptyData } from '@/components/empty-data/EmptyData'
import { emptyDataContent } from '@/mocks/empty-data'

const meta = {
  title: 'Componentes/Estado vazio',
  component: EmptyData,
  args: {
    content: emptyDataContent,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Estado usado quando uma listagem não tem registros, como a tela de relatórios.',
      },
    },
  },
} satisfies Meta<typeof EmptyData>

export default meta

type Story = StoryObj<typeof meta>

export const Relatorios: Story = {}

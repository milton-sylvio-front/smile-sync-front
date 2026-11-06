import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Skeleton,
  SkeletonDashboard,
  SkeletonPatientList,
  SkeletonShapes,
  SkeletonText,
} from '@/components/skeleton/Skeleton'

const meta = {
  title: 'Componentes/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Placeholders de carregamento. A barra base aceita altura, largura e o raio das bordas. Os outros blocos montam textos, cartões e listas.',
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Barra: Story = {
  args: { className: 'h-4 w-64', rounded: 'lg' },
}

export const Texto: Story = {
  render: () => (
    <div className='max-w-md'>
      <SkeletonText />
    </div>
  ),
}

export const Formas: Story = {
  render: () => (
    <div className='max-w-sm'>
      <SkeletonShapes />
    </div>
  ),
}

export const Painel: Story = {
  render: () => <SkeletonDashboard />,
}

export const Pacientes: Story = {
  render: () => (
    <div className='max-w-lg'>
      <SkeletonPatientList rows={4} />
    </div>
  ),
}

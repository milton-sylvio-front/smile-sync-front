import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Logotype } from '@/components/logotype/Logotype'

const meta = {
  title: 'Componentes/Logotipo',
  component: Logotype,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Marca com o ícone do dente e o nome. O tom inverse é o usado em fundos escuros, como o rodapé.',
      },
    },
  },
  args: {
    name: 'SmileSync',
    href: '/',
    tone: 'default',
  },
} satisfies Meta<typeof Logotype>

export default meta

type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

export const Inverso: Story = {
  args: { tone: 'inverse' },
  decorators: [
    (Story) => (
      <div className='rounded-xl bg-footer p-8'>
        <Story />
      </div>
    ),
  ],
}

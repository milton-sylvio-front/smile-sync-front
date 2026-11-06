import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from '@/components/button/Button'

const meta = {
  title: 'Componentes/Botão',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botão compartilhado. Sem href renderiza um button. Com href interno usa next/link; com âncora (# ou URL externa) usa a tag a.',
      },
    },
  },
  args: {
    children: 'Salvar',
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primario: Story = {}

export const Secundario: Story = {
  args: { variant: 'secondary', children: 'Ver demonstração' },
}

export const Contorno: Story = {
  args: { variant: 'outline', children: 'Voltar' },
}

export const Fantasma: Story = {
  args: { variant: 'ghost', children: 'Cancelar' },
}

export const Link: Story = {
  args: { variant: 'link', children: 'Esqueceu a senha?' },
}

export const Desabilitado: Story = {
  args: { children: 'Aguarde', disabled: true },
}

export const LarguraTotal: Story = {
  args: { children: 'Entrar', fullWidth: true, size: 'lg' },
  decorators: [
    (Story) => (
      <div className='w-80'>
        <Story />
      </div>
    ),
  ],
}

export const RotaInterna: Story = {
  args: { href: '/cadastre-se', children: 'Teste grátis' },
}

export const Ancora: Story = {
  args: { href: '#demonstracao', variant: 'secondary', children: 'Ver demonstração' },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tooltip } from '@/components/tooltip/Tooltip'

const meta = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dica contextual exibida ao passar o mouse ou focar o elemento filho. A prop open controla a exibição. A prop position define o lado: top (padrão), right, bottom ou left. Em top e bottom o balão fica alinhado à direita do gatilho; em left e right, centralizado na vertical.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='flex items-center justify-center p-32'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
  },
  args: {
    id: 'tooltip-exemplo',
    position: 'top',
    children: (
      <button
        type='button'
        aria-label='Mais informações'
        className='flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-600'
      >
        i
      </button>
    ),
    content: (
      <>
        <p className='mb-1 font-semibold'>Informação adicional</p>
        <p>Este é um exemplo de tooltip global.</p>
      </>
    ),
  },
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const AoPassarOuFocar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'O balão aparece ao passar o mouse ou ao focar o botão. A posição padrão é top.',
      },
    },
  },
}

export const Visivel: Story = {
  args: {
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A prop open mantém o tooltip visível, independente do mouse e do foco.',
      },
    },
  },
}

export const Acima: Story = {
  args: {
    open: true,
    position: 'top',
  },
  parameters: {
    docs: {
      description: {
        story: 'position="top". O balão fica acima do gatilho, alinhado à direita.',
      },
    },
  },
}

export const Direita: Story = {
  args: {
    open: true,
    position: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'position="right". O balão fica à direita, centralizado na vertical.',
      },
    },
  },
}

export const Abaixo: Story = {
  args: {
    open: true,
    position: 'bottom',
  },
  parameters: {
    docs: {
      description: {
        story: 'position="bottom". O balão fica abaixo do gatilho, alinhado à direita.',
      },
    },
  },
}

export const Esquerda: Story = {
  args: {
    open: true,
    position: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'position="left". O balão fica à esquerda, centralizado na vertical.',
      },
    },
  },
}

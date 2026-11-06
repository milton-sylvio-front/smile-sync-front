import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const colors = [
  { name: 'primary', hex: '#004953', className: 'bg-primary' },
  { name: 'secondary', hex: '#F9F07E', className: 'bg-secondary' },
  { name: 'ink', hex: '#06343b', className: 'bg-ink' },
  { name: 'muted', hex: '#5c6b70', className: 'bg-muted' },
  { name: 'surface', hex: '#f4f7f7', className: 'bg-surface' },
  { name: 'cream', hex: '#fbf6df', className: 'bg-cream' },
  { name: 'footer', hex: '#0c2429', className: 'bg-footer' },
]

function Foundations() {
  return (
    <div className='mx-auto max-w-3xl space-y-10 p-8'>
      <section>
        <h2 className='text-lg font-bold text-primary'>Cores</h2>
        <ul className='mt-4 grid gap-3 sm:grid-cols-2'>
          {colors.map((color) => (
            <li
              key={color.name}
              className='flex items-center gap-3 rounded-xl border border-slate-200 p-3'
            >
              <span
                className={`h-12 w-12 shrink-0 rounded-lg border border-black/5 ${color.className}`}
              />
              <span>
                <span className='block text-sm font-semibold text-ink'>
                  {color.name}
                </span>
                <span className='block text-xs text-muted'>{color.hex}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className='text-lg font-bold text-primary'>Tipografia</h2>
        <p className='mt-1 text-sm text-muted'>Montserrat, pesos 400 a 700.</p>
        <div className='mt-4 space-y-3 text-ink'>
          <p className='text-3xl font-bold'>Título da clínica</p>
          <p className='text-xl font-semibold'>Seção e cartão</p>
          <p className='text-sm'>
            Texto de interface, formulários e descrições.
          </p>
          <p className='text-xs font-medium uppercase tracking-[0.16em] text-muted'>
            Rótulo
          </p>
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: 'Fundamentos/Identidade',
  component: Foundations,
  parameters: {
    docs: {
      description: {
        component:
          'Tokens definidos em tailwind.config.js. A fonte é a Montserrat, a mesma do layout da aplicação.',
      },
    },
  },
} satisfies Meta<typeof Foundations>

export default meta

type Story = StoryObj<typeof meta>

export const Padrao: Story = {}

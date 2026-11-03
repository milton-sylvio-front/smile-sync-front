import {
  SkeletonDashboard,
  SkeletonPatientList,
  SkeletonShapes,
  SkeletonText,
} from '@/components/skeleton/Skeleton'

const baseOptions = [
  { utility: 'bg-slate-100', label: 'Cor base' },
  { utility: 'animate-pulse', label: 'Animação' },
  { utility: 'rounded-lg', label: 'Bordas arredondadas' },
  { utility: 'h-4', label: 'Altura variável' },
]

function ExampleCard({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className='rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-18px_rgba(6,52,59,0.35)]'>
      <p className='mb-5 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400'>
        {label}
      </p>
      {children}
    </section>
  )
}

export default function SkeletonPage() {
  return (
    <main className='min-h-full bg-[#f6f7fb] px-6 py-10 text-ink sm:px-10'>
      <div className='mx-auto max-w-5xl'>
        <header className='border-b border-slate-200 pb-6'>
          <h1 className='font-heading text-3xl font-bold text-primary'>Componente Skeleton</h1>
          <p className='mt-2 text-sm text-muted'>
            Estados de carregamento (loading states) utilizando animações pulsantes para o SmileSync.
          </p>
        </header>

        <section className='mt-8'>
          <h2 className='text-lg font-semibold'>Variantes Básicas</h2>
          <div className='mt-4 grid gap-5 md:grid-cols-2'>
            <ExampleCard label='Textos e títulos'>
              <SkeletonText />
            </ExampleCard>
            <ExampleCard label='Formas e avatares'>
              <SkeletonShapes />
            </ExampleCard>
          </div>
        </section>

        <section className='mt-10'>
          <h2 className='text-lg font-semibold'>Componentes Complexos</h2>
          <div className='mt-4 space-y-5'>
            <ExampleCard label='Card de dashboard'>
              <SkeletonDashboard />
            </ExampleCard>
            <ExampleCard label='Lista de pacientes / tabela'>
              <SkeletonPatientList />
            </ExampleCard>
          </div>
        </section>

        <section className='mt-8 rounded-2xl bg-primary px-6 py-6 text-white sm:px-7'>
          <h2 className='flex items-center gap-2 text-lg font-semibold'>
            <span aria-hidden='true' className='font-mono text-secondary'>
              {'</>'}
            </span>
            Como utilizar
          </h2>
          <p className='mt-2 text-sm text-white/80'>
            Utilize as classes do Tailwind CSS abaixo para criar seus próprios estados de carregamento:
          </p>
          <ul className='mt-5 grid gap-3 sm:grid-cols-2'>
            {baseOptions.map((option) => (
              <li
                key={option.utility}
                className='rounded-lg bg-[#06343b] px-4 py-3 text-sm'
              >
                <code className='font-mono text-secondary'>{option.utility}</code>
                <span className='text-white/75'> - {option.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

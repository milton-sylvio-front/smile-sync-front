import { render, screen } from '@testing-library/react'
import {
  Skeleton,
  SkeletonDashboard,
  SkeletonPatientList,
  SkeletonShapes,
  SkeletonText,
} from '@/components/skeleton/Skeleton'

describe('Skeleton', () => {
  it('aplica as opções base de cor, animação, borda e altura', () => {
    const { container } = render(<Skeleton />)
    const bone = container.firstChild as HTMLElement

    expect(bone).toHaveClass('bg-slate-100', 'animate-pulse', 'rounded-lg', 'h-4')
    expect(bone).toHaveAttribute('aria-hidden', 'true')
  })

  it('troca a altura e o arredondamento quando recebe outras opções', () => {
    const { container } = render(<Skeleton rounded='full' className='h-12 w-12' />)

    expect(container.firstChild).toHaveClass('rounded-full', 'h-12', 'w-12', 'bg-slate-100', 'animate-pulse')
    expect(container.firstChild).not.toHaveClass('h-4', 'rounded-lg')
  })

  it('monta as variantes de texto, formas, painel e pacientes', () => {
    render(
      <>
        <SkeletonText />
        <SkeletonShapes />
        <SkeletonDashboard />
        <SkeletonPatientList />
      </>,
    )

    expect(screen.getAllByRole('status', { name: 'Carregando' })).toHaveLength(2)
    expect(screen.getByRole('status', { name: 'Carregando painel' })).toBeInTheDocument()
    expect(screen.getByRole('status', { name: 'Carregando pacientes' })).toBeInTheDocument()
  })
})

import { fireEvent, render, screen } from '@testing-library/react'
import { patientsContent } from '@/mocks/patients'
import { PatientChart } from '@/modules/patients/components/PatientChart'
import { describeTooth, faceSlots } from '@/modules/patients/lib/odontogram'

const sarah = patientsContent.patients[0]

describe('PatientChart', () => {
  it('seleciona o dente e cada face do polígono', () => {
    render(<PatientChart patient={sarah} />)

    expect(screen.getByRole('heading', { name: sarah.name })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dente 18' })).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(screen.getByRole('button', { name: 'Dente 18' }))
    fireEvent.click(screen.getByRole('button', { name: 'Dente 16, face oclusal' }))

    expect(screen.getByRole('button', { name: 'Dente 18' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Dente 16, face oclusal' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Selecionado: 18, 16 O')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Dente 16, face oclusal' }))
    expect(screen.getByRole('button', { name: 'Dente 16, face oclusal' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('mostra a dentição decídua', () => {
    render(<PatientChart patient={sarah} />)

    fireEvent.click(screen.getByRole('button', { name: 'Decídua' }))

    expect(screen.getByRole('button', { name: 'Dente 55' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dente 51, face incisal' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Dente 18' })).not.toBeInTheDocument()
  })

  it('coloca vestibular para fora e mesial em direção à linha média', () => {
    const upperRight = faceSlots(describeTooth('18', 'permanent'))
    const lowerLeft = faceSlots(describeTooth('36', 'permanent'))

    expect(upperRight.find((item) => item.face === 'vestibular')?.slot).toBe('top')
    expect(upperRight.find((item) => item.face === 'mesial')?.slot).toBe('right')
    expect(lowerLeft.find((item) => item.face === 'vestibular')?.slot).toBe('bottom')
    expect(lowerLeft.find((item) => item.face === 'lingual')?.slot).toBe('top')
    expect(lowerLeft.find((item) => item.face === 'mesial')?.slot).toBe('left')
  })
})

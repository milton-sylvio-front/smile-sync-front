import {
  faceLabel,
  faceSlots,
  type FaceId,
  type FaceSlot,
  type ProcedureStatus,
  type ToothSpec,
} from '@/modules/patients/lib/odontogram'

const slotPoints: Record<FaceSlot, string> = {
  top: '1,1 21,1 16,6 6,6',
  right: '21,1 21,21 16,16 16,6',
  bottom: '21,21 1,21 6,16 16,16',
  left: '1,21 1,1 6,6 6,16',
  center: '6,6 16,6 16,16 6,16',
}

const statusFill: Record<ProcedureStatus, string> = {
  planned: '#F9F07E',
  done: '#b7ddd6',
  existing: '#d5e0e4',
}

type ToothFacesProps = {
  tooth: ToothSpec
  selected: FaceId[]
  marks: Partial<Record<FaceId, ProcedureStatus>>
  onToggle: (face: FaceId) => void
}

export function ToothFaces({ tooth, selected, marks, onToggle }: ToothFacesProps) {
  return (
    <svg viewBox='0 0 22 22' className='h-[22px] w-[22px]' aria-hidden={false}>
      {faceSlots(tooth).map(({ face, slot }) => {
        const pressed = selected.includes(face)
        const status = marks[face]
        const name = `Dente ${tooth.number}, face ${faceLabel(face, tooth).toLowerCase()}`

        return (
          <polygon
            key={face}
            points={slotPoints[slot]}
            role='button'
            tabIndex={0}
            aria-label={name}
            aria-pressed={pressed}
            fill={pressed ? '#F9F07E' : status ? statusFill[status] : '#ffffff'}
            stroke='none'
            className='cursor-pointer outline-none hover:fill-[#e7f3f1] focus-visible:fill-[#e7f3f1]'
            onClick={() => onToggle(face)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onToggle(face)
              }
            }}
          >
            <title>{faceLabel(face, tooth)}</title>
          </polygon>
        )
      })}
      <g fill='none' stroke='#004953' strokeWidth='1.4' strokeLinejoin='round' strokeLinecap='round' pointerEvents='none'>
        <rect x='1' y='1' width='20' height='20' rx='3' />
        <rect x='6' y='6' width='10' height='10' />
        <path d='M2 2l4 4M20 2l-4 4M2 20l4-4M20 20l-4-4' />
      </g>
    </svg>
  )
}

import { ToothFaces } from '@/modules/patients/components/odontogram/ToothFaces'
import { ToothGlyph } from '@/modules/patients/components/odontogram/ToothGlyph'
import {
  archTeeth,
  targetKey,
  type ChartFilter,
  type ChartTarget,
  type Dentition,
  type FaceId,
  type ProcedureStatus,
  type ToothSpec,
} from '@/modules/patients/lib/odontogram'

type OdontogramProps = {
  dentition: Dentition
  selected: ChartTarget[]
  marks: Array<ChartTarget & { status: ProcedureStatus }>
  filter: ChartFilter
  onToggleTooth: (tooth: string) => void
  onToggleFace: (tooth: string, face: FaceId) => void
}

function visibleMark(status: ProcedureStatus | undefined, filter: ChartFilter) {
  if (!status || (filter !== 'all' && status !== filter)) {
    return undefined
  }

  return status
}

function ToothColumn({
  tooth,
  dentition,
  lead,
  selected,
  marks,
  filter,
  onToggleTooth,
  onToggleFace,
}: {
  tooth: ToothSpec
  dentition: Dentition
  lead: boolean
  selected: ChartTarget[]
  marks: OdontogramProps['marks']
  filter: ChartFilter
  onToggleTooth: (tooth: string) => void
  onToggleFace: (tooth: string, face: FaceId) => void
}) {
  const toothSelected = selected.some((item) => item.tooth === tooth.number && item.face == null)
  const selectedFaces = selected
    .filter((item) => item.tooth === tooth.number && item.face)
    .map((item) => item.face as FaceId)
  const faceMarks: Partial<Record<FaceId, ProcedureStatus>> = {}
  let toothMarked = false

  marks.forEach((mark) => {
    if (mark.tooth !== tooth.number) {
      return
    }

    const status = visibleMark(mark.status, filter)

    if (!status) {
      return
    }

    if (mark.face) {
      faceMarks[mark.face] = status
      return
    }

    toothMarked = true
  })

  const glyph = (
    <button
      type='button'
      aria-pressed={toothSelected}
      aria-label={`Dente ${tooth.number}`}
      onClick={() => onToggleTooth(tooth.number)}
      className='rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
    >
      <ToothGlyph
        kind={tooth.kind}
        arch={tooth.arch}
        selected={toothSelected}
        marked={toothMarked}
      />
    </button>
  )
  const number = (
    <span className={`text-[11px] font-semibold ${toothSelected ? 'text-primary' : 'text-[#1c6c76]'}`}>
      {tooth.number}
    </span>
  )
  const faces = (
    <ToothFaces
      tooth={tooth}
      selected={selectedFaces}
      marks={faceMarks}
      onToggle={(face) => onToggleFace(tooth.number, face)}
    />
  )
  return (
    <div
      data-dentition={dentition}
      data-target={targetKey({ tooth: tooth.number, face: null })}
      className={`flex w-9 shrink-0 flex-col items-center gap-1 ${lead ? 'ml-3' : ''}`}
    >
      {tooth.arch === 'upper' ? (
        <>
          {glyph}
          {number}
          {faces}
        </>
      ) : (
        <>
          {faces}
          {number}
          {glyph}
        </>
      )}
    </div>
  )
}

export function Odontogram({
  dentition,
  selected,
  marks,
  filter,
  onToggleTooth,
  onToggleFace,
}: OdontogramProps) {
  const arches = archTeeth(dentition)
  const label = dentition === 'permanent' ? 'Odontograma permanente' : 'Odontograma decíduo'

  return (
    <div className='overflow-x-auto pb-1' role='group' aria-label={label}>
      <div className='mx-auto flex w-max flex-col gap-3'>
        {(['upper', 'lower'] as const).map((arch) => (
          <div key={arch} className='flex'>
            {arches[arch].map((tooth, index) => (
              <ToothColumn
                key={tooth.number}
                tooth={tooth}
                dentition={dentition}
                lead={index === arches.midline}
                selected={selected}
                marks={marks}
                filter={filter}
                onToggleTooth={onToggleTooth}
                onToggleFace={onToggleFace}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

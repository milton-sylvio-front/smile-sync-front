export type Dentition = 'permanent' | 'deciduous'
export type Arch = 'upper' | 'lower'
export type ToothKind = 'incisor' | 'canine' | 'premolar' | 'molar'
export type FaceId = 'vestibular' | 'mesial' | 'distal' | 'lingual' | 'occlusal'
export type FaceSlot = 'top' | 'right' | 'bottom' | 'left' | 'center'
export type ProcedureStatus = 'planned' | 'done' | 'existing'
export type ChartFilter = 'all' | ProcedureStatus

export type ToothSpec = {
  number: string
  kind: ToothKind
  arch: Arch
  quadrant: number
  mesialOnRight: boolean
}

export type ChartTarget = {
  tooth: string
  face: FaceId | null
}

const permanentUpper = ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28']
const permanentLower = ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38']
const deciduousUpper = ['55', '54', '53', '52', '51', '61', '62', '63', '64', '65']
const deciduousLower = ['85', '84', '83', '82', '81', '71', '72', '73', '74', '75']

export function toothKind(number: string, dentition: Dentition): ToothKind {
  const position = Number(number[1])

  if (dentition === 'deciduous') {
    if (position >= 4) {
      return 'molar'
    }

    return position === 3 ? 'canine' : 'incisor'
  }

  if (position >= 6) {
    return 'molar'
  }

  if (position >= 4) {
    return 'premolar'
  }

  return position === 3 ? 'canine' : 'incisor'
}

export function describeTooth(number: string, dentition: Dentition): ToothSpec {
  const quadrant = Number(number[0])
  const arch: Arch = quadrant === 1 || quadrant === 2 || quadrant === 5 || quadrant === 6 ? 'upper' : 'lower'

  return {
    number,
    kind: toothKind(number, dentition),
    arch,
    quadrant,
    mesialOnRight: quadrant === 1 || quadrant === 4 || quadrant === 5 || quadrant === 8,
  }
}

export function archTeeth(dentition: Dentition) {
  const upper = dentition === 'permanent' ? permanentUpper : deciduousUpper
  const lower = dentition === 'permanent' ? permanentLower : deciduousLower

  return {
    upper: upper.map((number) => describeTooth(number, dentition)),
    lower: lower.map((number) => describeTooth(number, dentition)),
    midline: dentition === 'permanent' ? 8 : 5,
  }
}

export function faceLabel(face: FaceId, tooth: ToothSpec) {
  if (face === 'lingual') {
    return tooth.arch === 'upper' ? 'Palatina' : 'Lingual'
  }

  if (face === 'occlusal') {
    return tooth.kind === 'incisor' || tooth.kind === 'canine' ? 'Incisal' : 'Oclusal'
  }

  if (face === 'vestibular') {
    return 'Vestibular'
  }

  if (face === 'mesial') {
    return 'Mesial'
  }

  return 'Distal'
}

export function faceShort(face: FaceId, tooth: ToothSpec) {
  if (face === 'lingual') {
    return tooth.arch === 'upper' ? 'P' : 'L'
  }

  if (face === 'occlusal') {
    return tooth.kind === 'incisor' || tooth.kind === 'canine' ? 'I' : 'O'
  }

  if (face === 'vestibular') {
    return 'V'
  }

  if (face === 'mesial') {
    return 'M'
  }

  return 'D'
}

export function faceSlots(tooth: ToothSpec): { face: FaceId; slot: FaceSlot }[] {
  const mesial: FaceSlot = tooth.mesialOnRight ? 'right' : 'left'
  const distal: FaceSlot = tooth.mesialOnRight ? 'left' : 'right'
  const vestibular: FaceSlot = tooth.arch === 'upper' ? 'top' : 'bottom'
  const lingual: FaceSlot = tooth.arch === 'upper' ? 'bottom' : 'top'

  return [
    { face: 'vestibular', slot: vestibular },
    { face: 'lingual', slot: lingual },
    { face: 'mesial', slot: mesial },
    { face: 'distal', slot: distal },
    { face: 'occlusal', slot: 'center' },
  ]
}

export function sameTarget(left: ChartTarget, right: ChartTarget) {
  return left.tooth === right.tooth && left.face === right.face
}

export function toggleTarget(targets: ChartTarget[], target: ChartTarget) {
  if (targets.some((item) => sameTarget(item, target))) {
    return targets.filter((item) => !sameTarget(item, target))
  }

  return [...targets, target]
}

export function targetKey(target: ChartTarget) {
  return `${target.tooth}:${target.face ?? 'tooth'}`
}

export function formatTarget(target: ChartTarget, dentition: Dentition) {
  if (!target.face) {
    return target.tooth
  }

  return `${target.tooth} ${faceShort(target.face, describeTooth(target.tooth, dentition))}`
}

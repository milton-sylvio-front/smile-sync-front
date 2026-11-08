import type { Arch, ToothKind } from '@/modules/patients/lib/odontogram'

const paths: Record<ToothKind, string> = {
  molar:
    'M5 36c-2-4-1-9 1-13 1-5 0-10 2-17 3 1 4 7 5 12 1-4 2-9 4-12 2 3 3 8 4 12 1-5 2-11 5-12 2 7 1 12 2 17 2 4 3 9 1 13-4 3-20 3-24 0z',
  premolar:
    'M11 36c-3-3-3-8-2-13 1-5 4-13 9-17 5 4 8 12 9 17 1 5 1 10-2 13-4 2-10 2-14 0z',
  canine:
    'M11 37c-3-3-4-8-3-13 1-8 6-19 10-23 4 4 9 15 10 23 1 5 0 10-3 13-4 2-10 2-14 0z',
  incisor:
    'M12 37c-3-2-3-7-2-12 1-7 5-18 8-22 3 4 7 15 8 22 1 5 1 10-2 12-4 2-8 2-12 0z',
}

type ToothGlyphProps = {
  kind: ToothKind
  arch: Arch
  selected: boolean
  marked: boolean
}

export function ToothGlyph({ kind, arch, selected, marked }: ToothGlyphProps) {
  return (
    <svg
      viewBox='0 0 36 40'
      aria-hidden='true'
      className='h-10 w-9'
      fill={selected ? '#F9F07E' : marked ? '#d7eeea' : 'none'}
      stroke='#004953'
      strokeWidth='1.4'
      strokeLinejoin='round'
      strokeLinecap='round'
    >
      <path
        d={paths[kind]}
        transform={arch === 'lower' ? 'translate(0 40) scale(1 -1)' : undefined}
      />
    </svg>
  )
}

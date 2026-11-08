import Image from 'next/image'

const palettes = [
  'bg-[#d9efe8] text-primary',
  'bg-[#f8e7c9] text-[#8a5a12]',
  'bg-[#e4e7f7] text-[#3d4a86]',
  'bg-[#f8dfdf] text-[#8d3d45]',
]

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function palette(name: string) {
  const index = name
    .split('')
    .reduce((total, char) => total + char.charCodeAt(0), 0)
  return palettes[index % palettes.length]
}

type PatientAvatarProps = {
  name: string
  photo?: string
  active?: boolean
  size?: 'md' | 'lg'
}

export function PatientAvatar({
  name,
  photo,
  active = false,
  size = 'md',
}: PatientAvatarProps) {
  const dimension = size === 'lg' ? 'h-16 w-16 text-lg' : 'h-11 w-11 text-sm'

  return (
    <span className={`relative inline-flex shrink-0 ${dimension}`}>
      {photo ? (
        <Image
          src={photo}
          alt={name}
          className='h-full w-full rounded-full object-cover'
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center rounded-full font-bold ${palette(name)}`}
        >
          {initials(name) || '?'}
        </span>
      )}
      {active ? (
        <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500' />
      ) : null}
    </span>
  )
}

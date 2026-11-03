type SkeletonRounded = 'lg' | 'md' | 'full' | 'none'

type SkeletonProps = {
  className?: string
  rounded?: SkeletonRounded
}

const roundedClass: Record<SkeletonRounded, string> = {
  lg: 'rounded-lg',
  md: 'rounded-md',
  full: 'rounded-full',
  none: 'rounded-none',
}

export function Skeleton({
  className = 'h-4 w-full',
  rounded = 'lg',
}: SkeletonProps) {
  return (
    <div
      aria-hidden='true'
      className={`animate-pulse bg-slate-100 ${roundedClass[rounded]} ${className}`}
    />
  )
}

export function SkeletonText() {
  return (
    <div role='status' aria-label='Carregando' className='space-y-3'>
      <Skeleton className='h-4 w-2/5' />
      <Skeleton className='h-3 w-full' />
      <Skeleton className='h-3 w-full' />
      <Skeleton className='h-3 w-full' />
      <Skeleton className='h-3 w-4/5' />
    </div>
  )
}

export function SkeletonShapes() {
  return (
    <div role='status' aria-label='Carregando' className='space-y-5'>
      <div className='flex items-center gap-3'>
        <Skeleton rounded='full' className='h-14 w-14 shrink-0' />
        <div className='space-y-2'>
          <Skeleton className='h-3 w-28' />
          <Skeleton className='h-3 w-16' />
        </div>
      </div>
      <div className='flex gap-3'>
        <Skeleton className='h-11 w-11' />
        <Skeleton className='h-11 w-11' />
        <Skeleton className='h-11 w-11' />
      </div>
    </div>
  )
}

export function SkeletonDashboard() {
  return (
    <div
      role='status'
      aria-label='Carregando painel'
      className='grid grid-cols-2 gap-4 lg:grid-cols-4'
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className='space-y-3 rounded-xl border border-slate-100 p-4'
        >
          <Skeleton className='h-9 w-9' />
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-2/3' />
        </div>
      ))}
    </div>
  )
}

type SkeletonPatientListProps = {
  rows?: number
}

export function SkeletonPatientList({ rows = 3 }: SkeletonPatientListProps) {
  return (
    <div role='status' aria-label='Carregando pacientes' className='divide-y divide-slate-100'>
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className='flex items-center gap-4 py-4 first:pt-0 last:pb-0'>
          <Skeleton rounded='full' className='h-11 w-11 shrink-0' />
          <div className='min-w-0 flex-1 space-y-2'>
            <Skeleton className='h-3 w-40 max-w-full' />
            <Skeleton className='h-3 w-28 max-w-full' />
          </div>
          <Skeleton rounded='full' className='h-6 w-16 shrink-0' />
        </div>
      ))}
    </div>
  )
}

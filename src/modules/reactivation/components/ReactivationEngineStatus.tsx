import { reactivationContent } from '@/mocks/reactivation'

export function ReactivationEngineStatus() {
  return (
    <p className='inline-flex items-center gap-2 rounded-full bg-[#e8f6ec] px-3 py-1.5 text-xs font-semibold text-[#1c8a45]'>
      <span className='h-2 w-2 rounded-full bg-[#22a34a]' aria-hidden='true' />
      {reactivationContent.engine.label}
    </p>
  )
}

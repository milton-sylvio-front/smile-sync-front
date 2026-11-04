import type { ExpenseSlice } from '@/modules/finance/types/finance'

type ExpenseDonutProps = {
  title: string
  slices: ExpenseSlice[]
}

const colors: Record<ExpenseSlice['color'], string> = {
  teal: '#123f3c',
  yellow: '#F5DE4A',
  gray: '#E4E9ED',
}

function donutBackground(slices: ExpenseSlice[]) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0) || 1
  let cursor = 0
  const stops = slices.map((slice) => {
    const start = cursor
    cursor += (slice.value / total) * 100
    return `${colors[slice.color]} ${start}% ${cursor}%`
  })

  return `conic-gradient(from 210deg, ${stops.join(', ')})`
}

export function ExpenseDonut({ title, slices }: ExpenseDonutProps) {
  const description = slices.map((slice) => `${slice.label} ${slice.amount}`).join(', ')

  return (
    <section className='flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] sm:p-6'>
      <h2 className='text-base font-bold text-ink'>{title}</h2>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <div
          className='relative mt-6 h-52 w-52'
          role='img'
          aria-label={`${title}. ${description}`}
        >
          <div
            className='h-full w-full rounded-full'
            style={{ background: donutBackground(slices) }}
          />
          <div className='absolute top-1/2 left-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white' />
        </div>
        <ul className='mt-8 w-full space-y-3'>
          {slices.map((slice) => (
            <li key={slice.id} className='flex items-center justify-between gap-4 text-sm'>
              <span className='min-w-0 text-slate-600'>
                <span className='inline-flex items-center gap-2'>
                  <span
                    className='h-2.5 w-2.5 shrink-0 rounded-full'
                    style={{ backgroundColor: colors[slice.color] }}
                  />
                  {slice.label}
                </span>
              </span>
              <span className='shrink-0 font-semibold whitespace-nowrap text-ink'>{slice.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

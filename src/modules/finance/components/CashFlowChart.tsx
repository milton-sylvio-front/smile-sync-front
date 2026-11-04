import type { CashFlowPoint } from '@/modules/finance/types/finance'
import { formatBRL } from '@/modules/finance/lib/money'

type CashFlowChartProps = {
  title: string
  revenueLabel: string
  expensesLabel: string
  points: CashFlowPoint[]
}

const chart = {
  width: 640,
  height: 280,
  padTop: 16,
  padRight: 12,
  padBottom: 32,
  padLeft: 40,
}

function axisMax(peak: number) {
  return Math.max(5000, Math.ceil(peak / 5000) * 5000)
}

function formatAxis(value: number) {
  if (value === 0) return '0'
  return `${value / 1000}k`
}

function smoothPath(points: { x: number; y: number }[], minY: number, maxY: number) {
  if (points.length === 0) return ''

  const clamp = (value: number) => Math.min(maxY, Math.max(minY, value))
  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index]
    const current = points[index]
    const next = points[index + 1]
    const after = points[index + 2] ?? next
    const controlStartX = current.x + (next.x - previous.x) / 6
    const controlStartY = clamp(current.y + (next.y - previous.y) / 6)
    const controlEndX = next.x - (after.x - current.x) / 6
    const controlEndY = clamp(next.y - (after.y - current.y) / 6)
    path += ` C ${controlStartX} ${controlStartY}, ${controlEndX} ${controlEndY}, ${next.x} ${next.y}`
  }

  return path
}

export function CashFlowChart({ title, revenueLabel, expensesLabel, points }: CashFlowChartProps) {
  const peak = Math.max(...points.flatMap((point) => [point.revenue, point.expenses]), 0)
  const max = axisMax(peak)
  const innerWidth = chart.width - chart.padLeft - chart.padRight
  const innerHeight = chart.height - chart.padTop - chart.padBottom
  const ticks = Array.from({ length: max / 5000 }, (_, index) => index * 5000)
  const yFor = (value: number) => chart.padTop + innerHeight - (value / max) * innerHeight
  const xFor = (index: number) => {
    if (points.length <= 1) return chart.padLeft + innerWidth / 2
    const inset = innerWidth * 0.06
    return chart.padLeft + inset + (index / (points.length - 1)) * (innerWidth - inset * 2)
  }
  const plotTop = chart.padTop
  const plotBottom = chart.padTop + innerHeight
  const revenueLine = points.map((point, index) => ({ x: xFor(index), y: yFor(point.revenue) }))
  const expensesLine = points.map((point, index) => ({ x: xFor(index), y: yFor(point.expenses) }))

  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] sm:p-6'>
      <h2 className='text-base font-bold text-ink'>{title}</h2>
      <figure className='mt-4'>
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          role='img'
          aria-label={title}
          className='h-auto w-full font-sans'
        >
          {ticks.map((tick) => {
            const y = yFor(tick)

            return (
              <g key={tick}>
                <line
                  x1={chart.padLeft}
                  x2={chart.width - chart.padRight}
                  y1={y}
                  y2={y}
                  stroke='#e8edf1'
                  strokeWidth='1'
                />
                <text x={chart.padLeft - 8} y={y + 4} textAnchor='end' fill='#94a3b8' fontSize='12'>
                  {formatAxis(tick)}
                </text>
              </g>
            )
          })}

          <path
            d={smoothPath(revenueLine, plotTop, plotBottom)}
            fill='none'
            stroke='#004953'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d={smoothPath(expensesLine, plotTop, plotBottom)}
            fill='none'
            stroke='#E3C84A'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          {points.map((point, index) => (
            <text
              key={point.label}
              x={xFor(index)}
              y={chart.height - 8}
              textAnchor='middle'
              fill='#64748b'
              fontSize='12'
            >
              {point.label}
            </text>
          ))}
        </svg>
        <table className='sr-only'>
          <caption>{title}</caption>
          <thead>
            <tr>
              <th scope='col'>Mês</th>
              <th scope='col'>{revenueLabel}</th>
              <th scope='col'>{expensesLabel}</th>
            </tr>
          </thead>
          <tbody>
            {points.map((point) => (
              <tr key={point.label}>
                <th scope='row'>{point.label}</th>
                <td>{formatBRL(point.revenue)}</td>
                <td>{formatBRL(point.expenses)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption className='mt-2 flex items-center justify-center gap-6 text-xs text-slate-500'>
          <span className='inline-flex items-center gap-2'>
            <span className='h-0.5 w-4 rounded-full bg-primary' />
            {revenueLabel}
          </span>
          <span className='inline-flex items-center gap-2'>
            <span className='h-0.5 w-4 rounded-full bg-[#E3C84A]' />
            {expensesLabel}
          </span>
        </figcaption>
      </figure>
    </section>
  )
}

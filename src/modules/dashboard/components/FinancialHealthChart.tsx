'use client'

import { useState } from 'react'
import type {
  DashboardContent,
  FinancialPeriod,
  FinancialPoint,
} from '@/modules/dashboard/types/dashboard'

type FinancialHealthChartProps = {
  financial: DashboardContent['financial']
}

const chart = {
  width: 640,
  height: 280,
  padTop: 12,
  padRight: 8,
  padBottom: 28,
  padLeft: 36,
}

function formatCurrency(value: number) {
  const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `R$ ${formatted}`
}

function formatAxis(value: number) {
  if (value === 0) return '0'
  return `${value / 1000}k`
}

function niceMax(points: FinancialPoint[]) {
  const peak = Math.max(...points.flatMap((point) => [point.expenses, point.revenue]), 0)
  return Math.max(5000, Math.ceil(peak / 5000) * 5000)
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

export function FinancialHealthChart({ financial }: FinancialHealthChartProps) {
  const [period, setPeriod] = useState<FinancialPeriod>(financial.defaultPeriod)
  const points = financial.series[period]
  const max = niceMax(points)
  const innerWidth = chart.width - chart.padLeft - chart.padRight
  const innerHeight = chart.height - chart.padTop - chart.padBottom
  const ticks = Array.from({ length: max / 5000 + 1 }, (_, index) => index * 5000)
  const yFor = (value: number) => chart.padTop + innerHeight - (value / max) * innerHeight
  const xFor = (index: number) =>
    chart.padLeft + ((index + 0.5) / points.length) * innerWidth
  const slot = innerWidth / points.length
  const barWidth = Math.min(22, slot * 0.42)
  const linePoints = points.map((point, index) => ({
    x: xFor(index),
    y: yFor(point.revenue),
  }))
  const plotTop = chart.padTop
  const plotBottom = chart.padTop + innerHeight

  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] sm:p-6'>
      <div className='grid items-start gap-3 sm:grid-cols-[minmax(0,1fr)_auto]'>
        <div>
          <h2 className='text-lg font-bold text-primary'>{financial.title}</h2>
          <p className='mt-1 text-sm text-slate-500'>{financial.description}</p>
        </div>
        <div
          role='group'
          aria-label='Período'
          className='inline-flex rounded-lg bg-slate-100 p-1'
        >
          {financial.periods.map((item) => {
            const selected = item.id === period

            return (
              <button
                key={item.id}
                type='button'
                aria-pressed={selected}
                onClick={() => setPeriod(item.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selected ? 'bg-primary text-white' : 'text-slate-500 hover:text-ink'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <figure className='mt-4'>
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          role='img'
          aria-label={`${financial.title}, ${financial.periods.find((item) => item.id === period)?.label}`}
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
                  stroke='#e6ebef'
                  strokeWidth='1'
                />
                <text
                  x={chart.padLeft - 8}
                  y={y + 4}
                  textAnchor='end'
                  fill='#94a3b8'
                  fontSize='11'
                >
                  {formatAxis(tick)}
                </text>
              </g>
            )
          })}

          {points.map((point, index) => {
            const x = xFor(index)
            const y = yFor(point.expenses)
            const height = plotBottom - y

            return (
              <g key={point.label}>
                <rect
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={height}
                  rx='3'
                  fill='#F6E98A'
                />
                <text
                  x={x}
                  y={chart.height - 8}
                  textAnchor='middle'
                  fill='#64748b'
                  fontSize='11'
                >
                  {point.label}
                </text>
              </g>
            )
          })}

          <path
            d={smoothPath(linePoints, plotTop, plotBottom)}
            fill='none'
            stroke='#004953'
            strokeWidth='2.5'
            strokeLinejoin='round'
            strokeLinecap='round'
          />
        </svg>
        <table className='sr-only'>
          <caption>
            {financial.title}.{' '}
            {financial.periods.find((item) => item.id === period)?.label}.
          </caption>
          <thead>
            <tr>
              <th scope='col'>Mês</th>
              <th scope='col'>{financial.expensesLabel}</th>
              <th scope='col'>{financial.revenueLabel}</th>
            </tr>
          </thead>
          <tbody>
            {points.map((point) => (
              <tr key={point.label}>
                <th scope='row'>{point.label}</th>
                <td>{formatCurrency(point.expenses)}</td>
                <td>{formatCurrency(point.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <figcaption className='mt-2 flex items-center justify-center gap-5 text-xs text-slate-500'>
          <span className='inline-flex items-center gap-2'>
            <span className='h-2.5 w-2.5 rounded-sm bg-[#F6E98A]' />
            {financial.expensesLabel}
          </span>
          <span className='inline-flex items-center gap-2'>
            <span className='h-0.5 w-4 rounded-full bg-primary' />
            {financial.revenueLabel}
          </span>
        </figcaption>
      </figure>
    </section>
  )
}

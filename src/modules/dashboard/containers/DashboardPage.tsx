import Link from 'next/link'
import { Button } from '@/components/button/Button'
import { FinancialHealthChart } from '@/modules/dashboard/components/FinancialHealthChart'
import { MetricIcon } from '@/modules/dashboard/components/MetricIcon'
import type {
  AppointmentStatus,
  DashboardContent,
  MetricTone,
} from '@/modules/dashboard/types/dashboard'

type DashboardPageProps = {
  content: DashboardContent
}

const toneClasses: Record<MetricTone, string> = {
  blue: 'bg-sky-50 text-sky-600',
  green: 'bg-emerald-50 text-emerald-600',
  orange: 'bg-orange-50 text-orange-500',
  purple: 'bg-violet-50 text-violet-500',
}

const statusClasses: Record<AppointmentStatus, string> = {
  done: 'bg-emerald-50 text-emerald-600',
  scheduled: 'bg-slate-100 text-slate-400',
  new: 'bg-emerald-50 text-emerald-600',
}

function StatusIcon({ status }: { status: AppointmentStatus }) {
  const className = 'h-4 w-4'
  const common = {
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
  }

  if (status === 'done') {
    return (
      <svg {...common}>
        <path strokeLinecap='round' strokeLinejoin='round' d='m6 12 4 4 8-8' />
      </svg>
    )
  }

  if (status === 'scheduled') {
    return (
      <svg {...common}>
        <circle cx='12' cy='12' r='7.5' />
        <path strokeLinecap='round' d='M12 8.5V12l2.5 1.5' />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <circle cx='12' cy='9' r='2.4' />
      <path strokeLinecap='round' d='M7.5 17.5c.5-2.3 2.1-3.5 4.5-3.5s4 1.2 4.5 3.5' />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-6 w-6'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M14.7 6.3a4 4 0 0 0-5.4 5.4L4.5 16.5 7.5 19.5l4.8-4.8a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7Z'
      />
    </svg>
  )
}

export function DashboardPage({ content }: DashboardPageProps) {
  return (
    <div className='flex flex-col gap-4'>
      <section aria-label='Indicadores'>
        <dl className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {content.metrics.map((metric) => (
            <div
              key={metric.id}
              className='rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'
            >
              <div className='flex items-start justify-between gap-3'>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[metric.tone]}`}
                >
                  <MetricIcon name={metric.icon} />
                </span>
                <span
                  className={`text-sm font-semibold ${
                    metric.trendTone === 'positive' ? 'text-emerald-600' : 'text-orange-500'
                  }`}
                >
                  {metric.trend}
                </span>
              </div>
              <dt className='mt-4 text-sm text-slate-500'>{metric.label}</dt>
              <dd className='mt-1 text-[1.7rem] font-bold leading-none tracking-tight text-ink'>
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className='grid items-start gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(260px,0.9fr)]'>
        <FinancialHealthChart financial={content.financial} />

        <section className='rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
          <h2 className='text-lg font-bold text-primary'>{content.appointments.title}</h2>
          <ul className='mt-4 space-y-3'>
            {content.appointments.items.map((item) => (
              <li
                key={item.id}
                className='flex items-center gap-3 rounded-xl border border-slate-200/80 px-3 py-3'
              >
                <div className='w-12 shrink-0'>
                  <p className='text-sm font-bold leading-none text-ink'>{item.time}</p>
                  <p className='mt-1 text-[11px] font-medium text-slate-400'>{item.period}</p>
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-semibold text-ink'>{item.patient}</p>
                  <p className='text-xs text-slate-500'>{item.procedure}</p>
                </div>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${statusClasses[item.status]}`}
                >
                  <StatusIcon status={item.status} />
                  <span className='sr-only'>{item.statusLabel}</span>
                </span>
              </li>
            ))}
          </ul>
          <Button
            href={content.appointments.action.href}
            variant='secondary'
            fullWidth
            className='mt-4 rounded-xl'
          >
            {content.appointments.action.label}
          </Button>
        </section>
      </div>

      <section className='flex flex-col gap-4 rounded-2xl bg-[#e7eef2] px-5 py-4 sm:flex-row sm:items-center sm:px-6'>
        <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-secondary'>
          <WrenchIcon />
        </span>
        <div className='min-w-0 flex-1'>
          <h2 className='text-base font-bold text-primary'>{content.insight.title}</h2>
          <p className='mt-1 text-sm leading-6 text-slate-600'>{content.insight.description}</p>
        </div>
        <Link
          href={content.insight.action.href}
          className='inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          {content.insight.action.label}
        </Link>
      </section>
    </div>
  )
}

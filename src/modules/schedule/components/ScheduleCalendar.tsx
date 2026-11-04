'use client'

import { formatISODate, isSameDay, monthGrid, parseISODate, weekDays } from '@/modules/schedule/lib/schedule'
import { useSchedule } from '@/modules/schedule/state/ScheduleProvider'
import type { AppointmentTone } from '@/modules/schedule/types/schedule'

const toneClasses: Record<AppointmentTone, string> = {
  blue: 'border-sky-300 bg-[#e7f1fb] text-[#24507a]',
  sage: 'border-slate-300 bg-[#e7eeea] text-[#3d5348]',
  green: 'border-emerald-300 bg-[#ddf6e7] text-[#1c6a43]',
  purple: 'border-violet-300 bg-[#f3e8fb] text-[#6b3b84]',
}

function weekdayIndex(date: Date) {
  return date.getDay() === 0 ? 6 : date.getDay() - 1
}

const cardClass =
  'overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'

export function ScheduleCalendar() {
  const { content, view, anchor, appointments, rangeLabel } = useSchedule()
  const today = parseISODate(content.today)

  if (view === 'month') {
    const cells = monthGrid(anchor)

    return (
      <section aria-label={rangeLabel} className={cardClass}>
        <div className='grid grid-cols-7'>
          {content.weekdayLabels.map((label) => (
            <div
              key={label}
              className='px-2 py-3 text-center text-[11px] font-semibold tracking-[0.14em] text-slate-400'
            >
              {label}
            </div>
          ))}
          {cells.map(({ date, inMonth }, index) => {
            const iso = formatISODate(date)
            const items = appointments.filter((item) => item.date === iso)
            const current = isSameDay(date, today)

            return (
              <div
                key={iso}
                className={`min-h-24 border-t border-slate-100 p-2 ${
                  index % 7 === 0 ? '' : 'border-l'
                } ${inMonth ? 'bg-white' : 'bg-slate-50'}`}
              >
                <p
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                    current
                      ? 'bg-[#fbf6df] text-ink'
                      : inMonth
                        ? 'text-slate-700'
                        : 'text-slate-300'
                  }`}
                >
                  {date.getDate()}
                </p>
                <div className='mt-1 space-y-1'>
                  {items.slice(0, 2).map((item) => (
                    <p
                      key={item.id}
                      className={`truncate rounded px-1.5 py-0.5 text-[11px] font-semibold ${toneClasses[item.tone]}`}
                    >
                      {item.patient}
                    </p>
                  ))}
                  {items.length > 2 ? (
                    <p className='text-[11px] font-medium text-slate-400'>+{items.length - 2}</p>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  const days =
    view === 'day'
      ? [new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate())]
      : weekDays(anchor, 5)

  return (
    <section aria-label={rangeLabel} className={cardClass}>
      <div className='overflow-x-auto'>
        <div
          className={view === 'week' ? 'grid min-w-[760px]' : 'grid'}
          style={{ gridTemplateColumns: `92px repeat(${days.length}, minmax(0, 1fr))` }}
        >
          <div className='flex items-end px-4 pt-4 pb-3 text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase'>
            {content.hourColumnLabel}
          </div>
          {days.map((day) => {
            const current = isSameDay(day, today)
            return (
              <div
                key={formatISODate(day)}
                className={`px-2 py-3 text-center ${current ? 'bg-[#fbf6df]' : 'bg-white'}`}
              >
                <p className='text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase'>
                  {content.weekdayLabels[weekdayIndex(day)]}
                </p>
                <p className='mt-0.5 text-xl font-semibold text-slate-700'>{day.getDate()}</p>
              </div>
            )
          })}
          {content.hours.flatMap((slot) => [
            <div
              key={`${slot.hour}-label`}
              className='flex items-center border-t border-slate-100 px-4 text-xs font-medium text-slate-400'
            >
              {slot.label}
            </div>,
            ...days.map((day) => {
              const iso = formatISODate(day)
              const current = isSameDay(day, today)
              const matches = appointments.filter(
                (item) => item.date === iso && item.hour === slot.hour,
              )

              return (
                <div
                  key={`${iso}-${slot.hour}`}
                  className={`min-h-[92px] border-t border-l border-slate-100 p-1.5 ${
                    slot.lunch ? 'flex items-center justify-center bg-[#f4f6f8]' : current ? 'bg-[#fbf6df]' : 'bg-white'
                  }`}
                >
                  {slot.lunch ? (
                    <p className='text-center text-[10px] font-semibold tracking-[0.08em] whitespace-nowrap text-slate-400 uppercase'>
                      {content.lunchLabel}
                    </p>
                  ) : (
                    <div className='space-y-1'>
                      {matches.map((item) => (
                        <article
                          key={item.id}
                          className={`rounded-md border-l-[3px] px-2.5 py-2 ${toneClasses[item.tone]}`}
                        >
                          <p className='text-xs font-semibold leading-tight'>{item.patient}</p>
                          <p className='mt-0.5 text-[11px] leading-tight opacity-75'>{item.procedure}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )
            }),
          ])}
        </div>
      </div>
    </section>
  )
}

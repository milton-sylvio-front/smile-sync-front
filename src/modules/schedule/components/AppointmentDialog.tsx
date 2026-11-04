'use client'

import { type FormEvent } from 'react'
import { Button } from '@/components/button/Button'
import { formatISODate } from '@/modules/schedule/lib/schedule'
import { useSchedule } from '@/modules/schedule/state/ScheduleProvider'

const fieldClass =
  'mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15'

export function AppointmentDialog() {
  const { content, anchor, addAppointment, setComposerOpen } = useSchedule()
  const bookable = content.hours.filter((slot) => !slot.lunch)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    addAppointment({
      patient: String(data.get('patient') ?? ''),
      procedure: String(data.get('procedure') ?? ''),
      date: String(data.get('date') ?? ''),
      hour: Number(data.get('hour')),
    })
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4'
      onClick={() => setComposerOpen(false)}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='nova-consulta-titulo'
        className='w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)]'
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id='nova-consulta-titulo' className='text-lg font-bold text-primary'>
          {content.dialog.title}
        </h2>
        <form className='mt-4 space-y-3' onSubmit={onSubmit}>
          <label className='block text-sm font-medium text-slate-600'>
            {content.dialog.patientLabel}
            <input name='patient' required className={fieldClass} />
          </label>
          <label className='block text-sm font-medium text-slate-600'>
            {content.dialog.procedureLabel}
            <input name='procedure' required className={fieldClass} />
          </label>
          <div className='grid gap-3 sm:grid-cols-2'>
            <label className='block text-sm font-medium text-slate-600'>
              {content.dialog.dateLabel}
              <input
                type='date'
                name='date'
                required
                defaultValue={formatISODate(anchor)}
                className={fieldClass}
              />
            </label>
            <label className='block text-sm font-medium text-slate-600'>
              {content.dialog.hourLabel}
              <select name='hour' defaultValue={String(bookable[0]?.hour ?? 9)} className={fieldClass}>
                {bookable.map((slot) => (
                  <option key={slot.hour} value={slot.hour}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='flex justify-end gap-2 pt-2'>
            <Button type='button' variant='secondary' size='sm' onClick={() => setComposerOpen(false)}>
              {content.dialog.cancel}
            </Button>
            <Button type='submit' size='sm'>
              {content.dialog.confirm}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

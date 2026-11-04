'use client'

import { type FormEvent, useState } from 'react'
import { Button } from '@/components/button/Button'
import { useSchedule } from '@/modules/schedule/state/ScheduleProvider'
import type { ReminderIcon } from '@/modules/schedule/types/schedule'

function WhatsAppIcon() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className='h-4 w-4 text-emerald-500' fill='currentColor'>
      <path d='M12 3.2A8.7 8.7 0 0 0 4.4 16.3L3.2 20.8l4.6-1.2A8.8 8.8 0 1 0 12 3.2Zm4.3 12.3c-.2.5-1 .9-1.4 1-.4.1-.8.1-1.3-.1-.3-.1-.7-.2-1.2-.5-2.1-1.1-3.5-3.1-3.6-3.2-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .4-.1.2-.2.3-.3.5l-.2.3c-.1.1-.2.2-.1.4.1.2.6 1 1.3 1.6.9.8 1.6 1 1.8 1.1.2.1.3.1.4-.1l.5-.6c.1-.2.3-.1.5-.1l1.1.5c.2.1.3.2.4.3.1.2.1.7-.1 1.2Z' />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4 text-slate-400'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <circle cx='12' cy='12' r='7.5' />
      <path strokeLinecap='round' d='M12 8.5V12l2.4 1.5' />
    </svg>
  )
}

const reminderIcons: Record<ReminderIcon, typeof WhatsAppIcon> = {
  whatsapp: WhatsAppIcon,
  clock: ClockIcon,
}

const fieldClass =
  'mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-[#f7f8fa] px-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15'

export function ScheduleSidebar() {
  const {
    content,
    reminders,
    resendReminder,
    optimizationDone,
    fillWithAi,
    waitlistSaved,
    saveWaitlist,
  } = useSchedule()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  function onWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextName = name.trim()
    const nextPhone = phone.trim()
    if (!nextName || !nextPhone) return
    saveWaitlist({ name: nextName, phone: nextPhone })
    setName('')
    setPhone('')
  }

  return (
    <aside className='flex flex-col gap-4' aria-label='Painel da agenda'>
      <section>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='text-base font-bold text-ink'>{content.remindersTitle}</h2>
          <span className='rounded-md bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase'>
            {content.liveLabel}
          </span>
        </div>
        <ul className='mt-3 space-y-3'>
          {reminders.map((reminder) => {
            const Icon = reminderIcons[reminder.icon]
            return (
              <li
                key={reminder.id}
                className='rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'
              >
                <div className='flex items-start justify-between gap-3'>
                  <p className='text-[11px] font-semibold tracking-wide text-slate-400 uppercase'>
                    {reminder.when}
                  </p>
                  <Icon />
                </div>
                <p className='mt-2 text-sm font-semibold text-ink'>{reminder.patient}</p>
                <p className='mt-0.5 text-xs text-slate-500'>{reminder.detail}</p>
                {reminder.status === 'sent' ? (
                  <p className='mt-2 flex items-center gap-1.5 text-[10px] font-bold tracking-wide text-emerald-600 uppercase'>
                    <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' aria-hidden='true' />
                    {reminder.sentLabel}
                  </p>
                ) : (
                  <button
                    type='button'
                    className='mt-2 text-xs font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                    onClick={() => resendReminder(reminder.id)}
                  >
                    {reminder.resendLabel}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <section className='rounded-2xl bg-[#f8f4d4] px-5 py-5'>
        <h2 className='text-base font-bold text-ink'>{content.optimization.title}</h2>
        <p className='mt-2 text-sm leading-6 text-slate-600'>
          {optimizationDone ? content.optimization.done : content.optimization.description}
        </p>
        {optimizationDone ? null : (
          <Button type='button' size='sm' fullWidth className='mt-4 rounded-lg' onClick={fillWithAi}>
            {content.optimization.action}
          </Button>
        )}
      </section>

      <section className='rounded-2xl border border-slate-200/80 bg-white px-5 py-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)]'>
        <h2 className='text-base font-bold text-ink'>{content.quickAccess.title}</h2>
        <form className='mt-4 space-y-3' onSubmit={onWaitlist}>
          <label className='block text-xs font-medium text-slate-500'>
            {content.quickAccess.nameLabel}
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className='block text-xs font-medium text-slate-500'>
            {content.quickAccess.phoneLabel}
            <input
              type='tel'
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={fieldClass}
            />
          </label>
          <button
            type='submit'
            className='mt-1 inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#e7eef2] text-sm font-semibold text-[#5f7278] transition-colors hover:bg-[#dce7ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            {content.quickAccess.action}
          </button>
          {waitlistSaved ? (
            <p role='status' className='text-xs font-medium text-emerald-600'>
              {content.quickAccess.success}
            </p>
          ) : null}
        </form>
      </section>
    </aside>
  )
}

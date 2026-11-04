'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { formatRange, parseISODate, shiftDate } from '@/modules/schedule/lib/schedule'
import type {
  AppointmentDraft,
  AppointmentTone,
  ScheduleAppointment,
  ScheduleContent,
  ScheduleReminder,
  ScheduleView,
} from '@/modules/schedule/types/schedule'

const tones: AppointmentTone[] = ['blue', 'sage', 'green', 'purple']

type ScheduleContextValue = {
  content: ScheduleContent
  view: ScheduleView
  setView: (view: ScheduleView) => void
  anchor: Date
  rangeLabel: string
  goPrevious: () => void
  goNext: () => void
  appointments: ScheduleAppointment[]
  addAppointment: (draft: AppointmentDraft) => void
  composerOpen: boolean
  setComposerOpen: (open: boolean) => void
  reminders: ScheduleReminder[]
  resendReminder: (id: string) => void
  optimizationDone: boolean
  fillWithAi: () => void
  waitlistSaved: boolean
  saveWaitlist: (entry: { name: string; phone: string }) => void
}

const ScheduleContext = createContext<ScheduleContextValue | null>(null)

type ScheduleProviderProps = {
  content: ScheduleContent
  children: ReactNode
}

export function ScheduleProvider({ content, children }: ScheduleProviderProps) {
  const [view, setView] = useState<ScheduleView>(content.defaultView)
  const [anchor, setAnchor] = useState(() => parseISODate(content.today))
  const [appointments, setAppointments] = useState(content.appointments)
  const [composerOpen, setComposerOpen] = useState(false)
  const [reminders, setReminders] = useState(content.reminders)
  const [optimizationDone, setOptimizationDone] = useState(false)
  const [waitlistSaved, setWaitlistSaved] = useState(false)

  const value = useMemo<ScheduleContextValue>(
    () => ({
      content,
      view,
      setView,
      anchor,
      rangeLabel: formatRange(anchor, view),
      goPrevious: () => setAnchor((current) => shiftDate(current, view, -1)),
      goNext: () => setAnchor((current) => shiftDate(current, view, 1)),
      appointments,
      addAppointment: (draft) => {
        const patient = draft.patient.trim()
        const procedure = draft.procedure.trim()
        if (!patient || !procedure || !draft.date || !draft.hour) return

        setAppointments((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            date: draft.date,
            hour: draft.hour,
            patient,
            procedure,
            tone: tones[current.length % tones.length],
          },
        ])
        setAnchor(parseISODate(draft.date))
        setComposerOpen(false)
      },
      composerOpen,
      setComposerOpen,
      reminders,
      resendReminder: (id) => {
        setReminders((current) =>
          current.map((item) => (item.id === id ? { ...item, status: 'sent' } : item)),
        )
      },
      optimizationDone,
      fillWithAi: () => setOptimizationDone(true),
      waitlistSaved,
      saveWaitlist: (entry) => {
        if (!entry.name.trim() || !entry.phone.trim()) return
        setWaitlistSaved(true)
      },
    }),
    [
      content,
      view,
      anchor,
      appointments,
      composerOpen,
      reminders,
      optimizationDone,
      waitlistSaved,
    ],
  )

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>
}

export function useSchedule() {
  const value = useContext(ScheduleContext)
  if (!value) {
    throw new Error('useSchedule deve ser usado dentro de ScheduleProvider')
  }
  return value
}

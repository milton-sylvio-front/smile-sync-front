export type ScheduleView = 'day' | 'week' | 'month'

export type AppointmentTone = 'blue' | 'sage' | 'green' | 'purple'

export type ScheduleHour = {
  hour: number
  label: string
  lunch?: boolean
}

export type ScheduleAppointment = {
  id: string
  date: string
  hour: number
  patient: string
  procedure: string
  tone: AppointmentTone
}

export type AppointmentDraft = {
  patient: string
  procedure: string
  date: string
  hour: number
}

export type ReminderIcon = 'whatsapp' | 'clock'

export type ScheduleReminder = {
  id: string
  when: string
  patient: string
  detail: string
  status: 'sent' | 'pending'
  sentLabel: string
  resendLabel: string
  icon: ReminderIcon
}

export type ScheduleContent = {
  title: string
  views: { id: ScheduleView; label: string }[]
  defaultView: ScheduleView
  today: string
  hourColumnLabel: string
  weekdayLabels: string[]
  hours: ScheduleHour[]
  lunchLabel: string
  previousLabel: string
  nextLabel: string
  scheduleAction: string
  appointments: ScheduleAppointment[]
  remindersTitle: string
  liveLabel: string
  reminders: ScheduleReminder[]
  optimization: {
    title: string
    description: string
    action: string
    done: string
  }
  quickAccess: {
    title: string
    nameLabel: string
    phoneLabel: string
    action: string
    success: string
  }
  dialog: {
    title: string
    patientLabel: string
    procedureLabel: string
    dateLabel: string
    hourLabel: string
    cancel: string
    confirm: string
  }
}

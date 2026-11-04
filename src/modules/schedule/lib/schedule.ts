import type { ScheduleView } from '@/modules/schedule/types/schedule'

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function parseISODate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

export function startOfWeek(date: Date) {
  const weekday = date.getDay()
  const diff = weekday === 0 ? -6 : 1 - weekday
  return addDays(date, diff)
}

export function weekDays(date: Date, count = 5) {
  const start = startOfWeek(date)
  return Array.from({ length: count }, (_, index) => addDays(start, index))
}

export function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export function formatDayLabel(date: Date) {
  return `${date.getDate()} de ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
}

export function formatMonthLabel(date: Date) {
  return `${MONTHS[date.getMonth()]} de ${date.getFullYear()}`
}

export function formatWeekLabel(date: Date) {
  const start = startOfWeek(date)
  const end = addDays(start, 6)

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()} - ${end.getDate()} de ${MONTHS[start.getMonth()]}, ${start.getFullYear()}`
  }

  if (start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()} de ${MONTHS[start.getMonth()]} - ${end.getDate()} de ${MONTHS[end.getMonth()]}, ${start.getFullYear()}`
  }

  return `${formatDayLabel(start)} - ${formatDayLabel(end)}`
}

export function formatRange(date: Date, view: ScheduleView) {
  if (view === 'day') return formatDayLabel(date)
  if (view === 'month') return formatMonthLabel(date)
  return formatWeekLabel(date)
}

export function shiftDate(date: Date, view: ScheduleView, direction: -1 | 1) {
  if (view === 'month') {
    return new Date(date.getFullYear(), date.getMonth() + direction, 1)
  }

  return addDays(date, direction * (view === 'week' ? 7 : 1))
}

export function monthGrid(anchor: Date) {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
  const start = startOfWeek(first)

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(start, index)
    return { date, inMonth: date.getMonth() === anchor.getMonth() }
  })
}

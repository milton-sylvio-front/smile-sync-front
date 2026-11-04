import type { TransactionKind } from '@/modules/finance/types/finance'

const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export function formatBRL(value: number, withCents = true) {
  const absolute = Math.abs(value)
  const [whole, fraction] = absolute.toFixed(2).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const body = withCents ? `${grouped},${fraction}` : grouped
  return `R$ ${body}`
}

export function formatSignedBRL(kind: TransactionKind, value: number) {
  const sign = kind === 'income' ? '+' : '-'
  return `${sign} ${formatBRL(value)}`
}

export function formatDisplayDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-')
  const monthIndex = Number(month) - 1
  if (!year || !day || monthIndex < 0 || monthIndex > 11) return isoDate
  return `${Number(day)} ${months[monthIndex]}, ${year}`
}

export function parseAmount(raw: string) {
  const cleaned = raw.trim().replace(/[^\d,.-]/g, '')
  if (!cleaned) return Number.NaN
  const normalized = cleaned.includes(',')
    ? cleaned.replace(/\./g, '').replace(',', '.')
    : cleaned
  return Number(normalized)
}

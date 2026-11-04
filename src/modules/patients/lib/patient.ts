import type { Patient, PatientDraft } from '@/modules/patients/types/patients'

const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export const emptyDraft: PatientDraft = {
  photo: '',
  name: '',
  birthDate: '',
  document: '',
  rg: '',
  rgIssuer: '',
  sex: '',
  maritalStatus: '',
  occupation: '',
  plan: '',
  planNumber: '',
  reference: '',
  mobile: '',
  phone: '',
  email: '',
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  hasGuardian: false,
  guardianName: '',
  guardianRelationship: '',
  guardianPhone: '',
}

export function digits(value: string) {
  return value.replace(/\D/g, '')
}

export function formatCpf(value: string) {
  const numbers = digits(value).slice(0, 11)

  return numbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatPhone(value: string) {
  const numbers = digits(value).slice(0, 11)

  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d{1,4})$/, '$1-$2')
  }

  return numbers.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2')
}

export function formatCep(value: string) {
  const numbers = digits(value).slice(0, 8)
  return numbers.replace(/(\d{5})(\d{1,3})$/, '$1-$2')
}

export function formatBirthDate(value: string) {
  const numbers = digits(value).slice(0, 8)
  const day = numbers.slice(0, 2)
  const month = numbers.slice(2, 4)
  const year = numbers.slice(4, 8)

  return [day, month, year].filter(Boolean).join('/')
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isValidBirthDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)

  if (!match) {
    return false
  }

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    year >= 1900 &&
    date < today
  )
}

export function formatBirthLabel(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)

  if (!match || !isValidBirthDate(value)) {
    return ''
  }

  return `${Number(match[1])} ${months[Number(match[2]) - 1]}, ${match[3]}`
}

export function ageFrom(value: string, now = new Date()) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)

  if (!match || !isValidBirthDate(value)) {
    return null
  }

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  let age = now.getFullYear() - year
  const beforeBirthday =
    now.getMonth() + 1 < month || (now.getMonth() + 1 === month && now.getDate() < day)

  if (beforeBirthday) {
    age -= 1
  }

  return age
}

export function formatStamp(date: Date) {
  let hours = date.getHours()
  const period = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return {
    date: `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`,
    time: `${String(hours).padStart(2, '0')}:${minutes} ${period}`,
  }
}

export function filterPatients(patients: Patient[], query: string) {
  const term = query.trim().toLowerCase()

  if (!term) {
    return patients
  }

  const numericQuery = digits(term)

  return patients.filter((patient) => {
    const text = [
      patient.name,
      patient.document,
      patient.phone,
      patient.recordNumber,
      patient.draft.email,
    ]
      .join(' ')
      .toLowerCase()

    if (text.includes(term)) {
      return true
    }

    if (!numericQuery) {
      return false
    }

    const numeric = digits(`${patient.document}${patient.phone}${patient.recordNumber}`)
    return numeric.includes(numericQuery)
  })
}

export function isZeroBalance(value: string) {
  return Number(digits(value)) === 0
}

export function teethInTreatments(patient: Patient) {
  const teeth = new Set<string>()

  for (const treatment of patient.treatments) {
    for (const match of treatment.title.matchAll(/#(\d{2})/g)) {
      teeth.add(match[1])
    }
  }

  return teeth
}

type CreatePatientOptions = {
  id: string
  recordNumber: string
  previous?: Patient
}

export function createPatient(draft: PatientDraft, options: CreatePatientOptions): Patient {
  const name = draft.name.trim()
  const previous = options.previous

  const sameBirthDate = previous != null && previous.draft.birthDate === draft.birthDate

  return {
    id: options.id,
    recordNumber: options.recordNumber,
    status: previous?.status ?? 'active',
    name,
    photo: draft.photo,
    birthLabel: sameBirthDate ? previous.birthLabel : formatBirthLabel(draft.birthDate),
    age: sameBirthDate ? previous.age : ageFrom(draft.birthDate),
    document: draft.document,
    phone: draft.mobile || draft.phone,
    bloodType: previous?.bloodType ?? '—',
    allergies: previous?.allergies ?? '—',
    lastVisit: previous?.lastVisit ?? '—',
    balance: previous?.balance ?? 'R$ 0,00',
    treatments: previous?.treatments ?? [],
    files: previous?.files ?? [],
    signaturePending: previous?.signaturePending ?? false,
    anamnesis: previous?.anamnesis ?? [],
    visits: previous?.visits ?? [],
    ledger: previous?.ledger ?? [],
    draft: { ...draft, name },
  }
}

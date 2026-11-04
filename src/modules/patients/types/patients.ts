export type PatientStatus = 'active' | 'inactive'

export type PatientTabId = 'record' | 'odontogram' | 'visits' | 'files' | 'finance'

export type AnamnesisItem = {
  label: string
  value: string
}

export type TreatmentEntry = {
  id: string
  date: string
  time: string
  author: string
  title: string
  description: string
}

export type PatientFile = {
  id: string
  name: string
  kind: 'image' | 'pdf'
}

export type PatientVisit = {
  id: string
  date: string
  time: string
  procedure: string
  professional: string
  status: string
}

export type LedgerEntry = {
  id: string
  date: string
  description: string
  amount: string
  pending: boolean
}

export type PatientDraft = {
  photo: string
  name: string
  birthDate: string
  document: string
  rg: string
  rgIssuer: string
  sex: string
  maritalStatus: string
  occupation: string
  plan: string
  planNumber: string
  reference: string
  mobile: string
  phone: string
  email: string
  zipCode: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
  hasGuardian: boolean
  guardianName: string
  guardianRelationship: string
  guardianPhone: string
}

export type Patient = {
  id: string
  recordNumber: string
  status: PatientStatus
  name: string
  photo: string
  birthLabel: string
  age: number | null
  document: string
  phone: string
  bloodType: string
  allergies: string
  lastVisit: string
  balance: string
  treatments: TreatmentEntry[]
  files: PatientFile[]
  signaturePending: boolean
  anamnesis: AnamnesisItem[]
  visits: PatientVisit[]
  ledger: LedgerEntry[]
  draft: PatientDraft
}

export type PatientsContent = {
  title: string
  searchPlaceholder: string
  newPatientLabel: string
  newPatientHref: string
  idPrefix: string
  missingPhone: string
  status: Record<PatientStatus, string>
  tabs: { id: PatientTabId; label: string }[]
  historyTitle: string
  addEvolutionLabel: string
  emptyHistory: string
  quickInfoTitle: string
  quickFields: {
    bloodType: string
    allergies: string
    lastVisit: string
    balance: string
  }
  filesTitle: string
  uploadLabel: string
  emptyFiles: string
  anamnesisLabel: string
  anamnesisTitle: string
  emptyAnamnesis: string
  editProfileLabel: string
  emptyList: string
  emptySelection: string
  clinician: string
  signature: {
    title: string
    description: string
    placeholder: string
    submit: string
    clear: string
    emptyError: string
    doneTitle: string
    doneDescription: string
  }
  evolutionForm: {
    title: string
    titleLabel: string
    titlePlaceholder: string
    descriptionLabel: string
    descriptionPlaceholder: string
    save: string
    cancel: string
    titleError: string
    descriptionError: string
  }
  odontogram: {
    title: string
    hint: string
    selected: string
  }
  visitsTitle: string
  emptyVisits: string
  financeTitle: string
  emptyLedger: string
  balanceLabel: string
  patients: Patient[]
}

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type NewPatientContent = {
  title: string
  editTitle: string
  breadcrumb: BreadcrumbItem[]
  editBreadcrumb: BreadcrumbItem[]
  photo: {
    add: string
    change: string
    hint: string
    errorType: string
    errorSize: string
    alt: string
  }
  sections: {
    data: string
    contact: string
    address: string
    guardian: string
  }
  optional: string
  selectPlaceholder: string
  recordPlaceholder: string
  fields: {
    name: string
    namePlaceholder: string
    birthDate: string
    birthDatePlaceholder: string
    document: string
    documentPlaceholder: string
    rg: string
    rgPlaceholder: string
    rgIssuer: string
    rgIssuerPlaceholder: string
    sex: string
    maritalStatus: string
    occupation: string
    plan: string
    planPlaceholder: string
    planNumber: string
    planNumberPlaceholder: string
    recordNumber: string
    reference: string
    referencePlaceholder: string
    mobile: string
    mobilePlaceholder: string
    phone: string
    phonePlaceholder: string
    email: string
    emailPlaceholder: string
    zipCode: string
    zipCodePlaceholder: string
    street: string
    streetPlaceholder: string
    number: string
    numberPlaceholder: string
    complement: string
    complementPlaceholder: string
    district: string
    districtPlaceholder: string
    city: string
    cityPlaceholder: string
    state: string
    guardianName: string
    guardianNamePlaceholder: string
    guardianRelationship: string
    guardianRelationshipPlaceholder: string
    guardianPhone: string
    guardianPhonePlaceholder: string
  }
  yes: string
  no: string
  cancel: string
  save: string
  notFound: string
  back: string
  cepLoading: string
  help: {
    label: string
    greeting: string
    description: string
  }
  errors: {
    name: string
    birthDate: string
    document: string
    email: string
    mobile: string
    phone: string
    zipCode: string
    cepNotFound: string
    guardianName: string
  }
  options: {
    sex: string[]
    maritalStatus: string[]
    occupation: string[]
    relationship: string[]
    states: { value: string; label: string }[]
  }
}

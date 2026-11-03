export type RegisterLink = {
  label: string
  href: string
}

export type LegalSection = {
  heading: string
  paragraphs: string[]
}

export type LegalDocument = {
  label: string
  title: string
  updatedAt: string
  sections: LegalSection[]
}

export type RegisterField = {
  label: string
  placeholder: string
}

export type RegisterContent = {
  brandName: string
  title: string
  subtitle: string
  fullName: RegisterField
  birthDate: RegisterField
  document: RegisterField
  phone: RegisterField
  email: RegisterField
  password: RegisterField
  termsLabel: string
  terms: LegalDocument
  termsConjunction: string
  privacy: LegalDocument
  submitLabel: string
  loginPrompt: string
  login: RegisterLink
  copyright: string
  securityNote: string
}

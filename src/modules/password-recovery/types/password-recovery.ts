export type PasswordRecoveryLink = {
  label: string
  href: string
}

export type PasswordRecoveryContent = {
  brandName: string
  title: string
  subtitle: string
  email: {
    label: string
    placeholder: string
  }
  submitLabel: string
  back: PasswordRecoveryLink
  successMessage: string
}

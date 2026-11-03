export type InternalIcon =
  | 'panel'
  | 'calendar'
  | 'patients'
  | 'finance'
  | 'reactivation'

export type InternalNavItem = {
  label: string
  href: string
  icon: InternalIcon
  title: string
  description: string
}

export type InternalNotification = {
  id: string
  title: string
  description: string
}

export type InternalContent = {
  brandName: string
  navigation: InternalNavItem[]
  user: {
    name: string
    role: string
    initials: string
  }
  plan: {
    name: string
    badge: string
    usedPercent: number
    usageLabel: string
  }
  logout: {
    label: string
    href: string
  }
  notifications: {
    label: string
    items: InternalNotification[]
  }
}

export type MetricTone = 'blue' | 'green' | 'orange' | 'purple'

export type MetricIcon = 'calendar' | 'revenue' | 'reactivation' | 'patients'

export type DashboardMetric = {
  id: string
  label: string
  value: string
  trend: string
  trendTone: 'positive' | 'warning'
  icon: MetricIcon
  tone: MetricTone
}

export type FinancialPeriod = '6m' | '1y'

export type FinancialPoint = {
  label: string
  expenses: number
  revenue: number
}

export type AppointmentStatus = 'done' | 'scheduled' | 'new'

export type UpcomingAppointment = {
  id: string
  time: string
  period: string
  patient: string
  procedure: string
  status: AppointmentStatus
  statusLabel: string
}

export type DashboardAction = {
  label: string
  href: string
}

export type DashboardContent = {
  metrics: DashboardMetric[]
  financial: {
    title: string
    description: string
    periods: { id: FinancialPeriod; label: string }[]
    defaultPeriod: FinancialPeriod
    series: Record<FinancialPeriod, FinancialPoint[]>
    expensesLabel: string
    revenueLabel: string
  }
  appointments: {
    title: string
    items: UpcomingAppointment[]
    action: DashboardAction
  }
  insight: {
    title: string
    description: string
    action: DashboardAction
  }
}

export type ReactivationSort = 'potential' | 'revenue' | 'inactivity'

export type ReactivationPortrait = 'amanda' | 'jessica' | 'david'

export type ReactivationPatient = {
  id: string
  name: string
  lastVisit: string
  procedure: string
  revenue: number
  revenueLabel: string
  monthsInactive: number
  priority: number
  portrait?: ReactivationPortrait
  selected: boolean
}

export type ReactivationContent = {
  engine: {
    label: string
  }
  hub: {
    title: string
    leadPrefix: string
    records: string
    leadMiddle: string
    opportunities: string
    leadSuffix: string
    potentialLabel: string
    potentialValue: string
    targetLabel: string
    targetValue: string
    previewTitle: string
    previewMessage: string
    previewFootnote: string
    launchLabel: string
    launchedLabel: string
    launchedMessage: string
  }
  list: {
    title: string
    sortLabel: string
    sorts: { id: ReactivationSort; label: string }[]
    defaultSort: ReactivationSort
    lastVisitPrefix: string
    revenueCaption: string
    previewCount: number
    showAllLabel: string
    showLessLabel: string
  }
  patients: ReactivationPatient[]
  performance: {
    title: string
    conversionLabel: string
    conversionValue: string
    scheduledLabel: string
    scheduledValue: string
    scheduledGoal: string
    scheduledPercent: number
    roiLabel: string
    roiValue: string
  }
  tip: {
    title: string
    before: string
    emphasis: string
    after: string
  }
}

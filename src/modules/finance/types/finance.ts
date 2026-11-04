export type FinancePeriod = 'this-month' | 'last-month' | 'this-year'

export type SummaryTone = 'revenue' | 'expenses' | 'profit'

export type FinanceSummaryCard = {
  id: string
  label: string
  value: string
  trend: string
  tone: SummaryTone
  progress?: number
}

export type CashFlowPoint = {
  label: string
  revenue: number
  expenses: number
}

export type ExpenseColor = 'teal' | 'yellow' | 'gray'

export type ExpenseSlice = {
  id: string
  label: string
  amount: string
  value: number
  color: ExpenseColor
}

export type TransactionKind = 'income' | 'expense'

export type TransactionStatus = 'paid' | 'pending'

export type TransactionCategory = 'clinical' | 'supplies'

export type Transaction = {
  id: string
  date: string
  title: string
  detail: string
  category: TransactionCategory
  status: TransactionStatus
  kind: TransactionKind
  amountLabel: string
}

export type TransactionDraft = {
  title: string
  detail: string
  date: string
  category: TransactionCategory
  status: TransactionStatus
  kind: TransactionKind
  amount: number
}

export type FinanceSnapshot = {
  summary: FinanceSummaryCard[]
  cashFlow: CashFlowPoint[]
  expenses: ExpenseSlice[]
  transactions: Transaction[]
}

export type FinanceContent = {
  periods: { id: FinancePeriod; label: string }[]
  defaultPeriod: FinancePeriod
  exportLabel: string
  today: string
  cashFlowTitle: string
  revenueLabel: string
  expensesLabel: string
  distributionTitle: string
  transactionsTitle: string
  filterLabel: string
  addLabel: string
  seeAllLabel: string
  seeLessLabel: string
  emptyLabel: string
  previewCount: number
  columns: {
    date: string
    description: string
    category: string
    status: string
    amount: string
  }
  categories: Record<TransactionCategory, string>
  statuses: Record<TransactionStatus, string>
  filter: {
    title: string
    statusLabel: string
    categoryLabel: string
    all: string
    clear: string
  }
  dialog: {
    title: string
    descriptionLabel: string
    detailLabel: string
    dateLabel: string
    categoryLabel: string
    statusLabel: string
    kindLabel: string
    amountLabel: string
    income: string
    expense: string
    cancel: string
    confirm: string
    fallbackDetail: string
  }
  periodsData: Record<FinancePeriod, FinanceSnapshot>
}

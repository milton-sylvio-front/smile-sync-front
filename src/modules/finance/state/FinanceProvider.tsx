'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { formatDisplayDate, formatSignedBRL } from '@/modules/finance/lib/money'
import type {
  FinanceContent,
  FinancePeriod,
  Transaction,
  TransactionCategory,
  TransactionDraft,
  TransactionStatus,
} from '@/modules/finance/types/finance'

type StatusFilter = 'all' | TransactionStatus
type CategoryFilter = 'all' | TransactionCategory

type FinanceContextValue = {
  content: FinanceContent
  period: FinancePeriod
  setPeriod: (period: FinancePeriod) => void
  summary: FinanceContent['periodsData'][FinancePeriod]['summary']
  cashFlow: FinanceContent['periodsData'][FinancePeriod]['cashFlow']
  expenses: FinanceContent['periodsData'][FinancePeriod]['expenses']
  transactions: Transaction[]
  visibleTransactions: Transaction[]
  canToggleTransactions: boolean
  showAll: boolean
  toggleShowAll: () => void
  statusFilter: StatusFilter
  categoryFilter: CategoryFilter
  setStatusFilter: (status: StatusFilter) => void
  setCategoryFilter: (category: CategoryFilter) => void
  clearFilters: () => void
  filterOpen: boolean
  setFilterOpen: (open: boolean) => void
  composerOpen: boolean
  setComposerOpen: (open: boolean) => void
  addTransaction: (draft: TransactionDraft) => void
  exportReport: () => void
}

const FinanceContext = createContext<FinanceContextValue | null>(null)

type FinanceProviderProps = {
  content: FinanceContent
  children: ReactNode
}

const emptyExtra: Record<FinancePeriod, Transaction[]> = {
  'this-month': [],
  'last-month': [],
  'this-year': [],
}

export function FinanceProvider({ content, children }: FinanceProviderProps) {
  const [period, setPeriodState] = useState<FinancePeriod>(content.defaultPeriod)
  const [extra, setExtra] = useState(emptyExtra)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [composerOpen, setComposerOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const value = useMemo<FinanceContextValue>(() => {
    const snapshot = content.periodsData[period]
    const periodTransactions = [...extra[period], ...snapshot.transactions]
    const transactions = periodTransactions.filter((transaction) => {
      if (statusFilter !== 'all' && transaction.status !== statusFilter) return false
      if (categoryFilter !== 'all' && transaction.category !== categoryFilter) return false
      return true
    })
    const canToggleTransactions = transactions.length > content.previewCount

    return {
      content,
      period,
      setPeriod: (next) => {
        setPeriodState(next)
        setStatusFilter('all')
        setCategoryFilter('all')
        setShowAll(false)
        setFilterOpen(false)
        setComposerOpen(false)
      },
      summary: snapshot.summary,
      cashFlow: snapshot.cashFlow,
      expenses: snapshot.expenses,
      transactions,
      visibleTransactions: showAll ? transactions : transactions.slice(0, content.previewCount),
      canToggleTransactions,
      showAll,
      toggleShowAll: () => setShowAll((current) => !current),
      statusFilter,
      categoryFilter,
      setStatusFilter,
      setCategoryFilter,
      clearFilters: () => {
        setStatusFilter('all')
        setCategoryFilter('all')
      },
      filterOpen,
      setFilterOpen,
      composerOpen,
      setComposerOpen,
      addTransaction: (draft) => {
        const title = draft.title.trim()
        if (!title || !draft.date || !Number.isFinite(draft.amount) || draft.amount <= 0) return

        const transaction: Transaction = {
          id: crypto.randomUUID(),
          date: formatDisplayDate(draft.date),
          title,
          detail: draft.detail.trim() || content.dialog.fallbackDetail,
          category: draft.category,
          status: draft.status,
          kind: draft.kind,
          amountLabel: formatSignedBRL(draft.kind, draft.amount),
        }

        setExtra((current) => ({
          ...current,
          [period]: [transaction, ...current[period]],
        }))
        setComposerOpen(false)
        setShowAll(true)
      },
      exportReport: () => {
        const rows = [
          ['Indicador', 'Valor', 'Variação'],
          ...snapshot.summary.map((card) => [card.label, card.value, card.trend]),
          [],
          ['Data', 'Descrição', 'Detalhe', 'Categoria', 'Status', 'Valor'],
          ...periodTransactions.map((transaction) => [
            transaction.date,
            transaction.title,
            transaction.detail,
            content.categories[transaction.category],
            content.statuses[transaction.status],
            transaction.amountLabel,
          ]),
        ]
        const csv = rows
          .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
          .join('\n')
        const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'smile-sync-financeiro.csv'
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
      },
    }
  }, [
    categoryFilter,
    composerOpen,
    content,
    extra,
    filterOpen,
    period,
    showAll,
    statusFilter,
  ])

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const value = useContext(FinanceContext)
  if (!value) {
    throw new Error('useFinance deve ser usado dentro de FinanceProvider')
  }
  return value
}

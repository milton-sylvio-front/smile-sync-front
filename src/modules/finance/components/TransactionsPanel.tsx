'use client'

import { Button } from '@/components/button/Button'
import { TransactionDialog } from '@/modules/finance/components/TransactionDialog'
import { useFinance } from '@/modules/finance/state/FinanceProvider'
import type { Transaction, TransactionCategory, TransactionStatus } from '@/modules/finance/types/finance'

const amountTone: Record<Transaction['kind'], string> = {
  income: 'text-emerald-600',
  expense: 'text-red-500',
}

const categoryTone: Record<TransactionCategory, string> = {
  clinical: 'bg-sky-50 text-sky-700',
  supplies: 'bg-[#fbf3c8] text-amber-700',
}

const statusDot: Record<TransactionStatus, string> = {
  paid: 'bg-emerald-500',
  pending: 'bg-orange-400',
}

function FilterIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16l-6 7.2V19l-4-2v-3.8L4 6Z' />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className='h-4 w-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path strokeLinecap='round' d='M12 5v14M5 12h14' />
    </svg>
  )
}

export function TransactionsPanel() {
  const {
    content,
    visibleTransactions,
    canToggleTransactions,
    showAll,
    toggleShowAll,
    statusFilter,
    categoryFilter,
    setStatusFilter,
    setCategoryFilter,
    clearFilters,
    filterOpen,
    setFilterOpen,
    composerOpen,
    setComposerOpen,
  } = useFinance()

  const statusOptions = [
    { id: 'all' as const, label: content.filter.all },
    ...Object.entries(content.statuses).map(([id, label]) => ({
      id: id as TransactionStatus,
      label,
    })),
  ]
  const categoryOptions = [
    { id: 'all' as const, label: content.filter.all },
    ...Object.entries(content.categories).map(([id, label]) => ({
      id: id as TransactionCategory,
      label,
    })),
  ]

  return (
    <section className='rounded-2xl border border-slate-200/80 bg-white px-5 py-5 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] sm:px-6'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h2 className='text-base font-bold text-ink'>{content.transactionsTitle}</h2>
        <div className='flex flex-wrap items-center gap-2'>
          <div className='relative'>
            <Button
              type='button'
              variant='secondary'
              size='sm'
              aria-expanded={filterOpen}
              aria-controls='filtro-transacoes'
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <FilterIcon />
              {content.filterLabel}
            </Button>
            {filterOpen ? (
              <div
                id='filtro-transacoes'
                role='dialog'
                aria-label={content.filter.title}
                className='absolute right-0 z-20 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)]'
              >
                <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>
                  {content.filter.statusLabel}
                </p>
                <div className='mt-2 flex flex-wrap gap-1.5'>
                  {statusOptions.map((option) => {
                    const selected = option.id === statusFilter
                    return (
                      <button
                        key={option.id}
                        type='button'
                        aria-pressed={selected}
                        onClick={() => setStatusFilter(option.id)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          selected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
                <p className='mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                  {content.filter.categoryLabel}
                </p>
                <div className='mt-2 flex flex-wrap gap-1.5'>
                  {categoryOptions.map((option) => {
                    const selected = option.id === categoryFilter
                    return (
                      <button
                        key={option.id}
                        type='button'
                        aria-pressed={selected}
                        onClick={() => setCategoryFilter(option.id)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          selected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
                <button
                  type='button'
                  onClick={clearFilters}
                  className='mt-3 text-xs font-semibold text-primary hover:underline'
                >
                  {content.filter.clear}
                </button>
              </div>
            ) : null}
          </div>
          <Button
            type='button'
            size='sm'
            onClick={() => {
              setFilterOpen(false)
              setComposerOpen(true)
            }}
          >
            <PlusIcon />
            {content.addLabel}
          </Button>
        </div>
      </div>

      <div className='mt-4 overflow-x-auto'>
        <table className='w-full min-w-[720px] text-left'>
          <thead>
            <tr className='text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase'>
              <th scope='col' className='pr-4 pb-3 font-semibold'>
                {content.columns.date}
              </th>
              <th scope='col' className='pr-4 pb-3 font-semibold'>
                {content.columns.description}
              </th>
              <th scope='col' className='pr-4 pb-3 font-semibold'>
                {content.columns.category}
              </th>
              <th scope='col' className='pr-4 pb-3 font-semibold'>
                {content.columns.status}
              </th>
              <th scope='col' className='pb-3 text-right font-semibold'>
                {content.columns.amount}
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className='py-8 text-center text-sm text-slate-500'>
                  {content.emptyLabel}
                </td>
              </tr>
            ) : (
              visibleTransactions.map((transaction) => (
                <tr key={transaction.id} className='border-t border-slate-100'>
                  <td className='py-4 pr-4 text-sm whitespace-nowrap text-slate-500'>
                    {transaction.date}
                  </td>
                  <td className='py-4 pr-4'>
                    <p className='text-sm font-semibold text-ink'>{transaction.title}</p>
                    <p className='text-xs text-slate-400'>{transaction.detail}</p>
                  </td>
                  <td className='py-4 pr-4'>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${categoryTone[transaction.category]}`}
                    >
                      {content.categories[transaction.category]}
                    </span>
                  </td>
                  <td className='py-4 pr-4'>
                    <span className='inline-flex items-center gap-2 text-sm text-slate-600'>
                      <span className={`h-2 w-2 rounded-full ${statusDot[transaction.status]}`} />
                      {content.statuses[transaction.status]}
                    </span>
                  </td>
                  <td
                    className={`py-4 text-right text-sm font-semibold whitespace-nowrap ${amountTone[transaction.kind]}`}
                  >
                    {transaction.amountLabel}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {canToggleTransactions ? (
        <div className='mt-2 flex justify-center border-t border-slate-100 pt-3'>
          <button
            type='button'
            onClick={toggleShowAll}
            className='text-sm font-semibold text-primary hover:underline'
          >
            {showAll ? content.seeLessLabel : content.seeAllLabel}
          </button>
        </div>
      ) : null}

      {composerOpen ? <TransactionDialog /> : null}
    </section>
  )
}

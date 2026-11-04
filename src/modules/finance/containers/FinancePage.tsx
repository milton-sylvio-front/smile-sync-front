'use client'

import { CashFlowChart } from '@/modules/finance/components/CashFlowChart'
import { ExpenseDonut } from '@/modules/finance/components/ExpenseDonut'
import { TransactionsPanel } from '@/modules/finance/components/TransactionsPanel'
import { useFinance } from '@/modules/finance/state/FinanceProvider'
import type { SummaryTone } from '@/modules/finance/types/finance'

const trendTone: Record<SummaryTone, string> = {
  revenue: 'text-emerald-500',
  expenses: 'text-orange-400',
  profit: 'text-[#d7e7a4]',
}

const progressTone: Record<Exclude<SummaryTone, 'profit'>, string> = {
  revenue: 'bg-emerald-500',
  expenses: 'bg-[#f0b429]',
}

export function FinancePage() {
  const { content, summary, cashFlow, expenses } = useFinance()

  return (
    <div className='flex flex-col gap-4'>
      <section aria-label='Indicadores'>
        <ul className='grid gap-4 lg:grid-cols-3'>
          {summary.map((card) => {
            const highlighted = card.tone === 'profit'

            return (
              <li
                key={card.id}
                className={`overflow-hidden rounded-2xl shadow-[0_10px_30px_-24px_rgba(15,23,42,0.6)] ${
                  highlighted
                    ? 'bg-primary text-white'
                    : 'border border-slate-200/80 bg-white'
                }`}
              >
                <div className='px-5 pt-4 pb-5'>
                  <div className='flex items-start justify-between gap-3'>
                    <p className={`text-sm ${highlighted ? 'text-white/80' : 'text-slate-500'}`}>
                      {card.label}
                    </p>
                    <span className={`text-sm font-semibold ${trendTone[card.tone]}`}>
                      {card.trend}
                    </span>
                  </div>
                  <p className='mt-3 text-[1.7rem] font-bold tracking-tight'>{card.value}</p>
                </div>
                {card.progress != null && card.tone !== 'profit' ? (
                  <div className='h-1'>
                    <span
                      className={`block h-full ${progressTone[card.tone]}`}
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      </section>

      <div className='grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.72fr)]'>
        <CashFlowChart
          title={content.cashFlowTitle}
          revenueLabel={content.revenueLabel}
          expensesLabel={content.expensesLabel}
          points={cashFlow}
        />
        <ExpenseDonut title={content.distributionTitle} slices={expenses} />
      </div>

      <TransactionsPanel />
    </div>
  )
}

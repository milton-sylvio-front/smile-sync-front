'use client'

import { type FormEvent } from 'react'
import { Button } from '@/components/button/Button'
import { parseAmount } from '@/modules/finance/lib/money'
import { useFinance } from '@/modules/finance/state/FinanceProvider'
import type { TransactionCategory, TransactionKind, TransactionStatus } from '@/modules/finance/types/finance'

const fieldClass =
  'mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15'

export function TransactionDialog() {
  const { content, addTransaction, setComposerOpen } = useFinance()
  const { dialog, categories, statuses } = content

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    addTransaction({
      title: String(data.get('title') ?? ''),
      detail: String(data.get('detail') ?? ''),
      date: String(data.get('date') ?? ''),
      category: String(data.get('category') ?? 'clinical') as TransactionCategory,
      status: String(data.get('status') ?? 'paid') as TransactionStatus,
      kind: String(data.get('kind') ?? 'income') as TransactionKind,
      amount: parseAmount(String(data.get('amount') ?? '')),
    })
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4'
      onClick={() => setComposerOpen(false)}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='nova-transacao-titulo'
        className='w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)]'
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id='nova-transacao-titulo' className='text-lg font-bold text-primary'>
          {dialog.title}
        </h2>
        <form className='mt-4 space-y-3' onSubmit={onSubmit}>
          <label className='block text-sm font-medium text-slate-600'>
            {dialog.descriptionLabel}
            <input name='title' required className={fieldClass} />
          </label>
          <label className='block text-sm font-medium text-slate-600'>
            {dialog.detailLabel}
            <input name='detail' className={fieldClass} />
          </label>
          <div className='grid gap-3 sm:grid-cols-2'>
            <label className='block text-sm font-medium text-slate-600'>
              {dialog.dateLabel}
              <input
                type='date'
                name='date'
                required
                defaultValue={content.today}
                className={fieldClass}
              />
            </label>
            <label className='block text-sm font-medium text-slate-600'>
              {dialog.amountLabel}
              <input name='amount' inputMode='decimal' required placeholder='0,00' className={fieldClass} />
            </label>
          </div>
          <div className='grid gap-3 sm:grid-cols-3'>
            <label className='block text-sm font-medium text-slate-600'>
              {dialog.kindLabel}
              <select name='kind' defaultValue='income' className={fieldClass}>
                <option value='income'>{dialog.income}</option>
                <option value='expense'>{dialog.expense}</option>
              </select>
            </label>
            <label className='block text-sm font-medium text-slate-600'>
              {dialog.categoryLabel}
              <select name='category' defaultValue='clinical' className={fieldClass}>
                {Object.entries(categories).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className='block text-sm font-medium text-slate-600'>
              {dialog.statusLabel}
              <select name='status' defaultValue='paid' className={fieldClass}>
                {Object.entries(statuses).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='flex justify-end gap-2 pt-2'>
            <Button type='button' variant='secondary' size='sm' onClick={() => setComposerOpen(false)}>
              {dialog.cancel}
            </Button>
            <Button type='submit' size='sm'>
              {dialog.confirm}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

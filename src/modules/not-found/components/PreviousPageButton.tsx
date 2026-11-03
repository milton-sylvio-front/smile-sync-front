'use client'

import { Button } from '@/components/button/Button'

type PreviousPageButtonProps = {
  label: string
}

export function PreviousPageButton({ label }: PreviousPageButtonProps) {
  return (
    <Button variant='outline' fullWidth onClick={() => window.history.back()}>
      {label}
    </Button>
  )
}

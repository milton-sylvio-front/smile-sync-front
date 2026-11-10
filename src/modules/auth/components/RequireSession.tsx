'use client'

import { useEffect, type ReactNode } from 'react'
import { useActiveSession } from '@/modules/auth/hooks/useActiveSession'
import { clearAccessToken, redirectToLogin } from '@/modules/auth/session'

type RequireSessionProps = {
  token: string
  children: ReactNode
}

export function RequireSession({ token, children }: RequireSessionProps) {
  const session = useActiveSession(token)

  useEffect(() => {
    if (!session.isError) {
      return
    }

    clearAccessToken()
    redirectToLogin()
  }, [session.isError])

  if (!session.isSuccess) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-[#f5f7fa] text-sm text-slate-500'>
        Verificando sessão...
      </main>
    )
  }

  return children
}

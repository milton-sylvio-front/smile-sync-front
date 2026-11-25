'use client'

import Image from 'next/image'
import { useEffect, type ReactNode } from 'react'
import smilesyncLogoAnimation from '@/assets/img/smilesync-logo-animation-transparente.png'
import { useActiveSession } from '@/modules/auth/hooks/useActiveSession'
import { clearAccessToken, redirectToLogin } from '@/modules/auth/session'

type RequireSessionProps = {
  token: string | null
  children: ReactNode
}

export function RequireSession({ token, children }: RequireSessionProps) {
  const session = useActiveSession(token)
  const sessionRejected = !token || session.isError

  useEffect(() => {
    if (!sessionRejected) {
      return
    }

    clearAccessToken()
    redirectToLogin()
  }, [sessionRejected])

  if (sessionRejected) {
    return <SessionLoading />
  }

  return (
    <>
      {session.isSuccess ? null : (
        <div className='fixed inset-0 z-50'>
          <SessionLoading />
        </div>
      )}
      <div hidden={session.isSuccess ? undefined : true}>{children}</div>
    </>
  )
}

export function SessionPending({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='fixed inset-0 z-50'>
        <SessionLoading />
      </div>
      <div hidden>{children}</div>
    </>
  )
}

export function SessionLoading() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f5f7fa]'>
      <Image
        src={smilesyncLogoAnimation}
        alt='Carregando...'
        priority
      />
    </main>
  )
}

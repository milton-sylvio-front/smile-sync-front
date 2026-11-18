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

  useEffect(() => {
    if (!session.isError) {
      return
    }

    clearAccessToken()
    redirectToLogin()
  }, [session.isError])

  if (!session.isSuccess) {
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

  return children
}

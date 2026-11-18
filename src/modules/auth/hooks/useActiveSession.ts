'use client'

import { useQuery } from '@tanstack/react-query'
import { getApiBaseUrl } from '@/lib/api-base-url'
import { clearAccessToken } from '@/modules/auth/session'

export type ActiveSession = {
  userId: string
  clinicId: string
  name: string
  role: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isActiveSession(value: unknown): value is ActiveSession {
  return (
    isRecord(value) &&
    typeof value.userId === 'string' &&
    typeof value.clinicId === 'string' &&
    typeof value.name === 'string' &&
    typeof value.role === 'string'
  )
}

export async function fetchActiveSession(token: string): Promise<ActiveSession> {
  const baseUrl = getApiBaseUrl()
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const result: unknown = await response.json()

  if (response.status === 401) {
    clearAccessToken()
  }

  if (!response.ok) {
    const message =
      isRecord(result) && typeof result.error === 'string'
        ? result.error
        : 'Não foi possível confirmar a sessão.'
    throw new Error(message)
  }

  if (!isActiveSession(result)) {
    throw new Error('A API retornou uma resposta inválida ao confirmar a sessão.')
  }

  return result
}

export function useActiveSession(token: string | null) {
  return useQuery({
    queryKey: ['auth', 'session', token],
    queryFn: () => fetchActiveSession(token ?? ''),
    enabled: Boolean(token),
    retry: false,
  })
}

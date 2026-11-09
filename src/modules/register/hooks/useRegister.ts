'use client'

import { useMutation } from '@tanstack/react-query'

export type RegisterInput = {
  clinicName: string
  name: string
  email: string
  password: string
}

type RegisterResponse = {
  accessToken: string
  user: {
    id: string
    clinicId: string
    name: string
    email: string
    role: string
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isRegisterResponse(value: unknown): value is RegisterResponse {
  if (!isRecord(value) || !isRecord(value.user)) {
    return false
  }

  return (
    typeof value.accessToken === 'string' &&
    typeof value.user.id === 'string' &&
    typeof value.user.clinicId === 'string' &&
    typeof value.user.name === 'string' &&
    typeof value.user.email === 'string' &&
    typeof value.user.role === 'string'
  )
}

async function register(input: RegisterInput): Promise<RegisterResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'
  const response = await fetch(
    `${baseUrl.replace(/\/$/, '')}/api/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    },
  )
  const result: unknown = await response.json()

  if (!response.ok) {
    const message =
      isRecord(result) && typeof result.error === 'string'
        ? result.error
        : 'Não foi possível criar a conta. Tente novamente.'
    throw new Error(message)
  }

  if (!isRegisterResponse(result)) {
    throw new Error('A API retornou uma resposta inválida ao criar a conta.')
  }

  return result
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
  })
}

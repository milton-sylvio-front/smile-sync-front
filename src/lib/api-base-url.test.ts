import { resolveApiBaseUrl } from '@/lib/api-base-url'

describe('resolveApiBaseUrl', () => {
  it('usa a API local fora de produção', () => {
    expect(resolveApiBaseUrl('test', undefined)).toBe('http://localhost:3333')
  })

  it('em produção ignora localhost e usa a API publicada', () => {
    expect(resolveApiBaseUrl('production', 'http://localhost:3333')).toBe(
      'https://smile-sync-back.vercel.app',
    )
  })

  it('em produção respeita uma URL pública configurada', () => {
    expect(resolveApiBaseUrl('production', 'https://api.exemplo.com/')).toBe(
      'https://api.exemplo.com',
    )
  })
})

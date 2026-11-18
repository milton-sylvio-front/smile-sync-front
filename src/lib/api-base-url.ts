const localApiUrl = 'http://localhost:3333'
const productionApiUrl = 'https://smile-sync-back.vercel.app'

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, '')
}

function isLoopbackUrl(url: string) {
  try {
    const { hostname } = new URL(url)
    return (
      hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
    )
  } catch {
    return false
  }
}

export function resolveApiBaseUrl(
  nodeEnv: string | undefined,
  configuredValue: string | undefined,
) {
  const configured = configuredValue?.trim()

  if (nodeEnv !== 'production') {
    return stripTrailingSlash(configured || localApiUrl)
  }

  if (configured && !isLoopbackUrl(configured)) {
    return stripTrailingSlash(configured)
  }

  return productionApiUrl
}

export function getApiBaseUrl() {
  return resolveApiBaseUrl(
    process.env.NODE_ENV,
    process.env.NEXT_PUBLIC_API_URL,
  )
}

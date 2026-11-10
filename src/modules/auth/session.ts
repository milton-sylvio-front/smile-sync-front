export const accessTokenStorageKey = 'smile-sync.accessToken'

function browserStorage(persistent: boolean) {
  return persistent ? localStorage : sessionStorage
}

function writeAccessTokenCookie(value: string, maxAge?: number) {
  const maxAgePart = maxAge === undefined ? '' : `; Max-Age=${maxAge}`
  document.cookie = `${accessTokenStorageKey}=${value}; Path=/${maxAgePart}; SameSite=Lax`
}

export function saveAccessToken(token: string, remember: boolean) {
  browserStorage(!remember).removeItem(accessTokenStorageKey)
  browserStorage(remember).setItem(accessTokenStorageKey, token)
  writeAccessTokenCookie(
    encodeURIComponent(token),
    remember ? 60 * 60 * 24 * 30 : undefined,
  )
}

export function readAccessToken() {
  if (typeof window === 'undefined') {
    return null
  }

  return (
    sessionStorage.getItem(accessTokenStorageKey) ??
    localStorage.getItem(accessTokenStorageKey)
  )
}

export function clearAccessToken() {
  sessionStorage.removeItem(accessTokenStorageKey)
  localStorage.removeItem(accessTokenStorageKey)
  writeAccessTokenCookie('', 0)
}

export function redirectToLogin() {
  window.location.replace('/entrar')
}

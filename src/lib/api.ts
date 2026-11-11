// 백엔드 호출. 출입증(30분)·재발급권(30일)은 이 브라우저에만 둔다 (backend docs/로그인-API.md).
// 출입증이 끝나면(401 TOKEN_EXPIRED) 한 번 조용히 재발급하고 다시 부른다.

export const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
export const hasServer = () => API_BASE !== ''

/** 서버 에러 (ProblemDetail + code). 화면은 문구가 아니라 code로 나눈다 */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message)
  }
}

export type Tokens = { accessToken: string; refreshToken: string }

const KEY = 'bigeup-web-tokens'
const listeners = new Set<() => void>()

function read(): Tokens | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Tokens) : null
  } catch {
    return null
  }
}

let current: Tokens | null = read()

export const tokens = {
  get: () => current,
  set(t: Tokens | null) {
    current = t
    try {
      if (t) localStorage.setItem(KEY, JSON.stringify(t))
      else localStorage.removeItem(KEY)
    } catch {
      // 저장이 막힌 브라우저(사생활 보호 모드)면 이 탭에서만 로그인 유지
    }
    listeners.forEach((l) => l())
  },
  subscribe(l: () => void) {
    listeners.add(l)
    return () => listeners.delete(l)
  },
}

async function raw(path: string, init: RequestInit, auth: boolean): Promise<Response> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (init.body) headers['Content-Type'] = 'application/json'
  const t = tokens.get()
  if (auth && t) headers.Authorization = `Bearer ${t.accessToken}`
  return fetch(`${API_BASE}${path}`, { ...init, headers })
}

async function toError(res: Response): Promise<ApiError> {
  try {
    const body = await res.json()
    return new ApiError(res.status, body.code ?? 'UNKNOWN', body.detail ?? body.title ?? '요청에 실패했어요.')
  } catch {
    return new ApiError(res.status, 'UNKNOWN', '요청에 실패했어요.')
  }
}

let refreshing: Promise<boolean> | null = null

/** 재발급. 동시에 여러 요청이 401을 받아도 한 번만 */
function refresh(): Promise<boolean> {
  const t = tokens.get()
  if (!t) return Promise.resolve(false)
  refreshing ??= raw('/api/v1/auth/refresh', { method: 'POST', body: JSON.stringify({ refreshToken: t.refreshToken }) }, false)
    .then(async (res) => {
      if (!res.ok) {
        tokens.set(null)
        return false
      }
      tokens.set((await res.json()) as Tokens)
      return true
    })
    .catch(() => false)
    .finally(() => {
      refreshing = null
    })
  return refreshing
}

/** JSON API 호출. auth=false면 출입증 없이 */
export async function api<T>(path: string, init: RequestInit = {}, auth = true): Promise<T> {
  if (!hasServer()) throw new ApiError(0, 'NO_SERVER', '서버 주소가 설정되지 않았어요.')
  let res: Response
  try {
    res = await raw(path, init, auth)
    if (res.status === 401 && auth && tokens.get()) {
      const err = await toError(res.clone())
      if (err.code === 'TOKEN_EXPIRED' && (await refresh())) res = await raw(path, init, auth)
    }
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR', '인터넷 연결을 확인해 주세요.')
  }
  if (!res.ok) {
    const err = await toError(res)
    if (res.status === 401 && auth) tokens.set(null) // 재발급도 안 되면 다시 로그인
    throw err
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

export const post = <T>(path: string, body: unknown, auth = true) =>
  api<T>(path, { method: 'POST', body: JSON.stringify(body) }, auth)
export const put = <T>(path: string, body: unknown) => api<T>(path, { method: 'PUT', body: JSON.stringify(body) })

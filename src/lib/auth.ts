// 웹 로그인: 앱과 같은 소셜 계정 → 같은 서버 출입증 (backend docs/로그인-API.md).
// 웹에서 결제한 교재가 그 계정으로 앱에서 열린다. 가입(약관·프로필)을 마쳐야 결제 API를 쓸 수 있다.
import { useSyncExternalStore } from 'react'
import { api, post, put, tokens, type Tokens } from './api'

export type Provider = 'KAKAO' | 'GOOGLE' | 'APPLE' | 'NAVER'
export type NextStep = 'TERMS' | 'PROFILE' | 'HOME'
export type Exam = 'HIGH3' | 'REPEAT' | 'OTHER'

type LoginResponse = Tokens & { nextStep: NextStep }

export type Me = {
  nickname: string | null
  exam: Exam | null
  provider: Provider
  nextStep: NextStep
  consents: { questions: boolean; marketing: boolean }
}

/** 로그인돼 있나 (출입증이 있나). 화면이 바뀌면 다시 그린다 */
export function useLoggedIn(): boolean {
  return useSyncExternalStore(tokens.subscribe, () => tokens.get() !== null)
}

async function finish(res: LoginResponse): Promise<NextStep> {
  tokens.set({ accessToken: res.accessToken, refreshToken: res.refreshToken })
  return res.nextStep
}

/** 구글·애플: 브라우저가 받은 확인서(ID 토큰)를 그대로 서버로 */
export async function loginWithIdToken(provider: Provider, idToken: string, authorizationCode?: string) {
  return finish(await post<LoginResponse>('/api/v1/auth/login', { provider, idToken, authorizationCode }, false))
}

/** 카카오: 인가 코드를 서버가 토큰으로 바꾼다 (REST API 키는 서버에만) */
export async function loginWithKakaoCode(code: string, redirectUri: string) {
  return finish(await post<LoginResponse>('/api/v1/auth/kakao/web', { code, redirectUri }, false))
}

/**
 * 네이버: 카카오와 같은 방식 (네이버 토큰 주소는 브라우저에서 부를 수 없어 서버가 코드를 확인서로 바꿔야 한다).
 * ❓ 서버에 이 주소가 아직 없다 — 생기면 주소·요청 모양을 backend docs/로그인-API.md 에 맞춘다. 그때까지 네이버 버튼은 숨겨 둔다.
 */
export async function loginWithNaverCode(code: string, redirectUri: string) {
  return finish(await post<LoginResponse>('/api/v1/auth/naver/web', { code, redirectUri }, false))
}

/** 개발 서버 전용 (VITE_DEV_LOGIN) */
export async function devLogin(key: string) {
  return finish(await post<LoginResponse>('/api/v1/auth/dev-login', { key }, false))
}

export async function logout() {
  const t = tokens.get()
  tokens.set(null)
  if (t) await post('/api/v1/auth/logout', { refreshToken: t.refreshToken }, false).catch(() => {})
}

export const getMe = () => api<Me>('/api/v1/members/me')

export type TermsAgreement = { service: boolean; privacy: boolean; over14: boolean; questions: boolean; marketing: boolean }

export const putTerms = (t: TermsAgreement) => put<{ nextStep: NextStep }>('/api/v1/members/me/terms', t)
export const putProfile = (nickname: string, exam: Exam) =>
  put<{ nextStep: NextStep }>('/api/v1/members/me/profile', { nickname, exam })

/** 로그인 뒤 갈 곳: 가입을 마치지 않았으면 가입 화면으로 (next 를 들고) */
export const afterLogin = (step: NextStep, next: string) =>
  step === 'HOME' ? next : `/signup?next=${encodeURIComponent(next)}`

/** 다른 사이트로 튀지 않게 우리 주소만 */
export const safeNext = (next: string | null) => (next && next.startsWith('/') && !next.startsWith('//') ? next : '/pass')

// 소셜 로그인 SDK. 키가 없으면 그 버튼은 보이지 않는다 (.env.example).
import { loadScript } from './script'

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
export const APPLE_SERVICES_ID = import.meta.env.VITE_APPLE_SERVICES_ID ?? ''
export const KAKAO_REST_KEY = import.meta.env.VITE_KAKAO_REST_KEY ?? ''
/** 네이버 로그인 Client ID. 비어 있으면 네이버 버튼은 보이지 않는다 (서버 웹 로그인 주소가 생긴 뒤 넣는다) */
export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID ?? ''
/** "1"이면 로그인 화면에 '아이디로 로그인'(테스트 계정)을 보여 준다. 결제사 심사가 끝나면 끈다 */
export const REVIEW_LOGIN = import.meta.env.VITE_REVIEW_LOGIN === '1'
export const DEV_LOGIN = import.meta.env.VITE_DEV_LOGIN === '1'

// ── 카카오·네이버: 인가 화면으로 갔다가 코드(code)를 들고 돌아온다. 코드를 확인서로 바꾸는 일은 서버가 한다
export type CodeProvider = 'kakao' | 'naver'

const AUTHORIZE: Record<CodeProvider, { url: string; clientId: () => string }> = {
  kakao: { url: 'https://kauth.kakao.com/oauth/authorize', clientId: () => KAKAO_REST_KEY },
  naver: { url: 'https://nid.naver.com/oauth2/authorize', clientId: () => NAVER_CLIENT_ID },
}

/** 각 콘솔에 등록하는 돌아올 주소 (서버 설정에도 같은 값) */
export const codeRedirectUri = (p: CodeProvider) => `${window.location.origin}/auth/${p}/callback`

const stateKey = (p: CodeProvider) => `bigeup-${p}-state`

/** 인가 화면으로 이동. state 로 위조 요청을 막고, 돌아올 곳(next)을 같이 들고 간다 */
export function startCodeLogin(p: CodeProvider, next: string) {
  const state = crypto.randomUUID()
  try {
    sessionStorage.setItem(stateKey(p), JSON.stringify({ state, next }))
  } catch {
    // 저장이 막힌 브라우저면 돌아왔을 때 요청을 확인할 수 없어 다시 로그인하라고 안내한다
  }
  const q = new URLSearchParams({
    client_id: AUTHORIZE[p].clientId(),
    redirect_uri: codeRedirectUri(p),
    response_type: 'code',
    scope: 'openid',
    state,
  })
  window.location.assign(`${AUTHORIZE[p].url}?${q}`)
}

/** 콜백의 state 가 우리가 보낸 것과 같으면 돌아올 곳을 준다 */
export function takeCodeState(p: CodeProvider, state: string | null): { ok: boolean; next: string | null } {
  try {
    const raw = sessionStorage.getItem(stateKey(p))
    sessionStorage.removeItem(stateKey(p))
    const saved = raw ? (JSON.parse(raw) as { state: string; next: string }) : null
    return { ok: !!saved && saved.state === state, next: saved?.next ?? null }
  } catch {
    return { ok: false, next: null }
  }
}

// ── 구글: 구글 로그인 페이지로 갔다가 확인서(id_token)를 주소의 # 뒤에 달고 돌아온다 (OpenID Connect implicit)
// 구글이 주는 버튼(Google Identity Services)은 쓰지 않는다:
//  - 브라우저에 구글 로그인이 남아 있으면 "○○ 계정으로 계속"(이름·이메일)으로 바뀌고 끌 수 없다
//  - 우리 버튼 위에 투명하게 겹치면 구글이 클릭을 무시한다 (2026-11-12 운영에서 확인하고 되돌림)
/** 구글 콘솔 '승인된 리디렉션 URI'에 등록한 주소 */
export const googleRedirectUri = () => `${window.location.origin}/auth/google/callback`

const GOOGLE_STATE_KEY = 'bigeup-google-state'

/** 구글 로그인 페이지로 이동. state 로 위조 요청을, nonce 로 확인서 재사용을 막는다 */
export function startGoogleLogin(next: string) {
  const state = crypto.randomUUID()
  const nonce = crypto.randomUUID()
  try {
    sessionStorage.setItem(GOOGLE_STATE_KEY, JSON.stringify({ state, nonce, next }))
  } catch {
    // 저장이 막힌 브라우저면 돌아왔을 때 요청을 확인할 수 없어 다시 로그인하라고 안내한다
  }
  const q = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: googleRedirectUri(),
    response_type: 'id_token',
    // email: 서버가 확인된 이메일로 마스터 계정을 알아본다 (저장하지는 않는다)
    scope: 'openid email',
    nonce,
    state,
    prompt: 'select_account',
  })
  window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth?${q}`)
}

/** 확인서(JWT) 가운데 부분에서 nonce 를 읽는다. 서명 확인은 서버가 한다 */
function nonceOf(idToken: string): string | null {
  try {
    const payload = idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return (JSON.parse(atob(payload.padEnd(Math.ceil(payload.length / 4) * 4, '='))) as { nonce?: string }).nonce ?? null
  } catch {
    return null
  }
}

/** 돌아온 state·nonce 가 우리가 보낸 것과 같으면 돌아올 곳을 준다 */
export function takeGoogleState(state: string | null, idToken: string | null): { ok: boolean; next: string | null } {
  try {
    const raw = sessionStorage.getItem(GOOGLE_STATE_KEY)
    sessionStorage.removeItem(GOOGLE_STATE_KEY)
    const saved = raw ? (JSON.parse(raw) as { state: string; nonce: string; next: string }) : null
    const ok = !!saved && saved.state === state && !!idToken && nonceOf(idToken) === saved.nonce
    return { ok, next: saved?.next ?? null }
  } catch {
    return { ok: false, next: null }
  }
}

// ── 애플 (Sign in with Apple JS): 팝업으로 확인서와 인증 코드를 받는다
type AppleAuth = {
  init(o: { clientId: string; scope: string; redirectURI: string; usePopup: boolean; state?: string }): void
  signIn(): Promise<{ authorization: { id_token: string; code: string } }>
}

export async function appleSignIn(): Promise<{ idToken: string; code: string }> {
  await loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/ko_KR/appleid.auth.js')
  const a = (window as unknown as { AppleID: { auth: AppleAuth } }).AppleID.auth
  a.init({ clientId: APPLE_SERVICES_ID, scope: '', redirectURI: `${window.location.origin}/login`, usePopup: true })
  const res = await a.signIn()
  return { idToken: res.authorization.id_token, code: res.authorization.code }
}

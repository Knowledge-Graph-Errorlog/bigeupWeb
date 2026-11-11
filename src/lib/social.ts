// 소셜 로그인 SDK. 키가 없으면 그 버튼은 보이지 않는다 (.env.example).
import { loadScript } from './script'

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
export const APPLE_SERVICES_ID = import.meta.env.VITE_APPLE_SERVICES_ID ?? ''
export const KAKAO_REST_KEY = import.meta.env.VITE_KAKAO_REST_KEY ?? ''
export const DEV_LOGIN = import.meta.env.VITE_DEV_LOGIN === '1'

/** 카카오 콘솔에 등록하는 Redirect URI (서버 KAKAO_WEB_REDIRECT_URIS 에도) */
export const kakaoRedirectUri = () => `${window.location.origin}/auth/kakao/callback`

const STATE_KEY = 'bigeup-kakao-state'

/** 카카오 인가 화면으로 이동. state 로 위조 요청을 막고, 돌아올 곳(next)을 같이 들고 간다 */
export function startKakaoLogin(next: string) {
  const state = crypto.randomUUID()
  try {
    sessionStorage.setItem(STATE_KEY, JSON.stringify({ state, next }))
  } catch {
    // 저장이 막혀도 로그인은 되게 (돌아올 곳만 기본값)
  }
  const q = new URLSearchParams({
    client_id: KAKAO_REST_KEY,
    redirect_uri: kakaoRedirectUri(),
    response_type: 'code',
    scope: 'openid',
    state,
  })
  window.location.assign(`https://kauth.kakao.com/oauth/authorize?${q}`)
}

/** 콜백의 state 가 우리가 보낸 것과 같으면 돌아올 곳을 준다 */
export function takeKakaoState(state: string | null): { ok: boolean; next: string | null } {
  try {
    const raw = sessionStorage.getItem(STATE_KEY)
    sessionStorage.removeItem(STATE_KEY)
    const saved = raw ? (JSON.parse(raw) as { state: string; next: string }) : null
    return { ok: !!saved && saved.state === state, next: saved?.next ?? null }
  } catch {
    return { ok: false, next: null }
  }
}

// ── 구글 (Google Identity Services): 버튼을 그려 두면 누를 때 확인서(credential)를 준다
type GoogleId = {
  initialize(o: { client_id: string; callback: (r: { credential: string }) => void; ux_mode?: string }): void
  renderButton(el: HTMLElement, o: Record<string, unknown>): void
}

export async function renderGoogleButton(el: HTMLElement, onIdToken: (idToken: string) => void) {
  await loadScript('https://accounts.google.com/gsi/client')
  const g = (window as unknown as { google: { accounts: { id: GoogleId } } }).google.accounts.id
  g.initialize({ client_id: GOOGLE_CLIENT_ID, callback: (r) => onIdToken(r.credential) })
  g.renderButton(el, { type: 'standard', theme: 'outline', size: 'large', text: 'continue_with', locale: 'ko', width: el.clientWidth || 320 })
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

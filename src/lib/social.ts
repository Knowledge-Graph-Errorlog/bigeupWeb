// 소셜 로그인 SDK. 키가 없으면 그 버튼은 보이지 않는다 (.env.example).
import { loadScript } from './script'

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
export const APPLE_SERVICES_ID = import.meta.env.VITE_APPLE_SERVICES_ID ?? ''
export const KAKAO_REST_KEY = import.meta.env.VITE_KAKAO_REST_KEY ?? ''
/** 네이버 로그인 Client ID. 비어 있으면 네이버 버튼은 보이지 않는다 (서버 웹 로그인 주소가 생긴 뒤 넣는다) */
export const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID ?? ''
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

// ── 구글 (Google Identity Services): 버튼을 그려 두면 누를 때 확인서(credential)를 준다
type GoogleId = {
  initialize(o: { client_id: string; callback: (r: { credential: string }) => void; ux_mode?: string }): void
  renderButton(el: HTMLElement, o: Record<string, unknown>): void
}

/**
 * 구글 버튼은 브라우저에 구글 로그인이 남아 있으면 "○○ 계정으로 계속"(이름·이메일)으로 바뀌고, 끄는 설정이 없다.
 * 우리 버튼 위에 투명하게 겹치는 방법은 쓰지 않는다 — 구글이 가려진 버튼의 클릭을 무시해서 로그인이 안 된다 (2026-11-12 운영에서 확인, 되돌림).
 * 늘 같은 모양이 필요하면 구글 OAuth 리디렉션 방식(승인된 리디렉션 URI 등록 필요)으로 바꿔야 한다.
 */
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

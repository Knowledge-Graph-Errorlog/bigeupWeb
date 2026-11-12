import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router'
import { ApiError, hasServer, tokens } from '../../lib/api'
import { afterLogin, devLogin, loginWithIdToken, safeNext, type NextStep } from '../../lib/auth'
import {
  APPLE_SERVICES_ID,
  DEV_LOGIN,
  GOOGLE_CLIENT_ID,
  KAKAO_REST_KEY,
  NAVER_CLIENT_ID,
  appleSignIn,
  renderGoogleButton,
  startCodeLogin,
} from '../../lib/social'

// 로그인. 앱과 같은 소셜 계정으로 들어와야 결제한 교재가 앱에서 열린다.
export default function Login() {
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const googleRef = useRef<HTMLDivElement>(null)
  // 이 화면을 열 때 이미 로그인돼 있었나 (로그인하는 도중에 바뀌는 값이 아니라 처음 값만 본다 — 가입 화면으로 보내는 흐름과 겹치지 않게)
  const [already] = useState(() => tokens.get() !== null)

  const go = (step: NextStep) => navigate(afterLogin(step, next), { replace: true })
  const fail = (e: unknown) =>
    setError(e instanceof ApiError && e.code !== 'UNKNOWN' ? e.message : '로그인하지 못했어요. 다시 시도해 주세요.')

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleRef.current) return
    renderGoogleButton(googleRef.current, (idToken) => loginWithIdToken('GOOGLE', idToken).then(go, fail)).catch(fail)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const apple = async () => {
    try {
      const { idToken, code } = await appleSignIn()
      go(await loginWithIdToken('APPLE', idToken, code))
    } catch (e) {
      // 팝업을 닫은 것이면 조용히
      if ((e as { error?: string })?.error !== 'popup_closed_by_user') fail(e)
    }
  }

  const dev = async () => {
    try {
      go(await devLogin(`web-${crypto.randomUUID().slice(0, 8)}`))
    } catch (e) {
      fail(e)
    }
  }

  if (already) return <Navigate to={next} replace />

  const none = !KAKAO_REST_KEY && !NAVER_CLIENT_ID && !GOOGLE_CLIENT_ID && !APPLE_SERVICES_ID && !DEV_LOGIN

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:py-20">
      <h1 className="text-center text-2xl font-bold sm:text-3xl">로그인</h1>
      <p className="mt-3 text-center text-sm leading-relaxed text-ink-soft">
        태블릿 앱에서 쓸 계정으로 로그인해 주세요.
        <br />
        결제한 교재는 이 계정으로 앱에 로그인하면 바로 열려요.
      </p>

      <div className="mt-10 space-y-3">
        {KAKAO_REST_KEY && (
          <button
            type="button"
            onClick={() => startCodeLogin('kakao', next)}
            className="w-full rounded-xl bg-[#FEE500] py-3.5 font-bold text-[#191919]"
          >
            카카오로 계속하기
          </button>
        )}
        {NAVER_CLIENT_ID && (
          <button
            type="button"
            onClick={() => startCodeLogin('naver', next)}
            className="w-full rounded-xl bg-[#03C75A] py-3.5 font-bold text-white"
          >
            네이버로 계속하기
          </button>
        )}
        {GOOGLE_CLIENT_ID && (
          // 보이는 것은 우리 버튼, 클릭을 받는 것은 그 위에 투명하게 겹친 구글 버튼 (lib/social.ts renderGoogleButton)
          <div className="relative h-[52px] w-full overflow-hidden rounded-xl border border-stone-300 bg-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5 font-bold text-[#1f1f1f]">
              <GoogleLogo />
              Google로 계속하기
            </div>
            <div ref={googleRef} className="absolute inset-0 opacity-0" />
          </div>
        )}
        {APPLE_SERVICES_ID && (
          <button type="button" onClick={apple} className="w-full rounded-xl bg-black py-3.5 font-bold text-white">
             Apple로 계속하기
          </button>
        )}
        {DEV_LOGIN && hasServer() && (
          <button type="button" onClick={dev} className="w-full rounded-xl border border-dashed border-ink-soft py-3 text-sm">
            개발용 로그인 (개발 서버 전용)
          </button>
        )}
        {none && <p className="text-center text-sm text-ink-soft">로그인 준비 중이에요. 조금만 기다려 주세요.</p>}
      </div>

      {error && <p className="mt-6 rounded-lg bg-seal-soft px-4 py-3 text-sm text-seal-deep">{error}</p>}

      <p className="mt-10 text-center text-xs leading-relaxed text-ink-soft">
        처음이면 로그인한 뒤 약관 동의와 닉네임만 정하면 가입이 끝나요. 만 14세 이상만 가입할 수 있어요.
        <br />
        <Link to="/terms" className="underline">
          이용약관
        </Link>{' '}
        ·{' '}
        <Link to="/privacy" className="underline">
          개인정보 처리방침
        </Link>
      </p>
    </div>
  )
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

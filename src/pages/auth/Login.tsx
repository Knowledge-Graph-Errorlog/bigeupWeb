import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { ApiError, hasServer } from '../../lib/api'
import { afterLogin, devLogin, loginWithIdToken, safeNext, type NextStep } from '../../lib/auth'
import {
  APPLE_SERVICES_ID,
  DEV_LOGIN,
  GOOGLE_CLIENT_ID,
  KAKAO_REST_KEY,
  appleSignIn,
  renderGoogleButton,
  startKakaoLogin,
} from '../../lib/social'

// 로그인. 앱과 같은 소셜 계정으로 들어와야 결제한 교재가 앱에서 열린다.
export default function Login() {
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const googleRef = useRef<HTMLDivElement>(null)

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

  const none = !KAKAO_REST_KEY && !GOOGLE_CLIENT_ID && !APPLE_SERVICES_ID && !DEV_LOGIN

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
            onClick={() => startKakaoLogin(next)}
            className="w-full rounded-xl bg-[#FEE500] py-3.5 font-bold text-[#191919]"
          >
            카카오로 계속하기
          </button>
        )}
        {GOOGLE_CLIENT_ID && <div ref={googleRef} className="flex h-11 w-full justify-center" />}
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

import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router'
import { ApiError, hasServer, tokens } from '../../lib/api'
import { afterLogin, devLogin, loginWithIdToken, reviewLogin, safeNext, type NextStep } from '../../lib/auth'
import {
  APPLE_SERVICES_ID,
  DEV_LOGIN,
  GOOGLE_CLIENT_ID,
  KAKAO_REST_KEY,
  REVIEW_LOGIN,
  NAVER_CLIENT_ID,
  appleSignIn,
  startCodeLogin,
  startGoogleLogin,
} from '../../lib/social'
import { SocialLogo } from '../../components/SocialLogos'

// 로그인. 앱과 같은 소셜 계정으로 들어와야 결제한 교재가 앱에서 열린다.
export default function Login() {
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))
  const navigate = useNavigate()
  const [error, setError] = useState('')
  // 이 화면을 열 때 이미 로그인돼 있었나 (로그인하는 도중에 바뀌는 값이 아니라 처음 값만 본다 — 가입 화면으로 보내는 흐름과 겹치지 않게)
  const [already] = useState(() => tokens.get() !== null)

  const go = (step: NextStep) => navigate(afterLogin(step, next), { replace: true })
  const fail = (e: unknown) =>
    setError(e instanceof ApiError && e.code !== 'UNKNOWN' ? e.message : '로그인하지 못했어요. 다시 시도해 주세요.')

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

  const none = !KAKAO_REST_KEY && !NAVER_CLIENT_ID && !GOOGLE_CLIENT_ID && !APPLE_SERVICES_ID && !DEV_LOGIN && !REVIEW_LOGIN

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
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#FEE500] py-3.5 font-bold text-[#191919]"
          >
            <SocialLogo provider="kakao" />
            카카오로 계속하기
          </button>
        )}
        {NAVER_CLIENT_ID && (
          <button
            type="button"
            onClick={() => startCodeLogin('naver', next)}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#03C75A] py-3.5 font-bold text-white"
          >
            <SocialLogo provider="naver" />
            네이버로 계속하기
          </button>
        )}
        {GOOGLE_CLIENT_ID && (
          <button
            type="button"
            onClick={() => startGoogleLogin(next)}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-stone-300 bg-white py-3.5 font-bold text-[#1f1f1f] hover:bg-stone-50"
          >
            <SocialLogo provider="google" />
            Google로 계속하기
          </button>
        )}
        {APPLE_SERVICES_ID && (
          <button type="button" onClick={apple} className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-black py-3.5 font-bold text-white">
            {/* 애플 마크 글자()는 애플 기기 글꼴에만 있어서 그림으로 */}
            <SocialLogo provider="apple" />
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

      {REVIEW_LOGIN && hasServer() && <IdLogin onDone={go} />}

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

// 아이디로 로그인 (테스트 계정). 결제사 심사관이 소셜 계정 없이 상품 확인과 결제 테스트를 할 때 쓴다.
// 일반 회원은 소셜 로그인만 쓴다 — 아이디 가입은 없다.
function IdLogin({ onDone }: { onDone: (step: NextStep) => void }) {
  const [open, setOpen] = useState(false)
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      onDone(await reviewLogin(loginId.trim(), password))
    } catch (err) {
      setError(
        err instanceof ApiError && err.code === 'INVALID_REVIEW_LOGIN'
          ? '아이디 또는 비밀번호가 올바르지 않아요.'
          : err instanceof ApiError && err.code === 'NETWORK_ERROR'
            ? '인터넷 연결을 확인하고 다시 시도해 주세요.'
            : '로그인하지 못했어요. 다시 시도해 주세요.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-8 border-t border-line pt-6">
      {!open ? (
        <button type="button" onClick={() => setOpen(true)} className="mx-auto block text-sm text-ink-soft underline">
          아이디로 로그인 (테스트 계정)
        </button>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <p className="text-sm font-bold">아이디로 로그인 (테스트 계정)</p>
          <label className="block text-sm" htmlFor="review-id">
            아이디
            <input
              id="review-id"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              autoComplete="username"
              autoCapitalize="none"
              autoFocus
              maxLength={100}
              className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3"
            />
          </label>
          <label className="block text-sm" htmlFor="review-password">
            비밀번호
            <input
              id="review-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              maxLength={200}
              className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3"
            />
          </label>
          <button
            type="submit"
            disabled={busy || loginId.trim() === '' || password === ''}
            className="w-full rounded-xl bg-ink py-3.5 font-bold text-white disabled:opacity-40"
          >
            로그인
          </button>
          {error && <p className="rounded-lg bg-seal-soft px-4 py-3 text-sm text-seal-deep">{error}</p>}
          <p className="text-xs leading-relaxed text-ink-soft">
            안내받은 테스트 계정으로만 로그인할 수 있어요. 일반 회원은 위의 소셜 로그인을 이용해 주세요.
          </p>
        </form>
      )}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { afterLogin, loginWithKakaoCode, loginWithNaverCode, safeNext } from '../../lib/auth'
import { codeRedirectUri, takeCodeState, type CodeProvider } from '../../lib/social'

const NAME: Record<CodeProvider, string> = { kakao: '카카오', naver: '네이버' }
const LOGIN = { kakao: loginWithKakaoCode, naver: loginWithNaverCode }

// 카카오·네이버 인가 뒤 돌아오는 곳. 코드를 서버에 넘기면 서버가 그 회사에서 확인서를 받아 로그인한다.
export default function CodeCallback({ provider }: { provider: CodeProvider }) {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const once = useRef(false)
  const name = NAME[provider]

  useEffect(() => {
    if (once.current) return // 개발 모드에서 두 번 돌아도 코드는 한 번만 쓴다
    once.current = true
    const { ok, next } = takeCodeState(provider, params.get('state'))
    const code = params.get('code')
    if (params.get('error') || !code) {
      setError(params.get('error') === 'access_denied' ? `${name} 로그인을 취소했어요.` : `${name} 로그인에 실패했어요.`)
      return
    }
    if (!ok) {
      setError('로그인 요청이 올바르지 않아요. 다시 시도해 주세요.')
      return
    }
    LOGIN[provider](code, codeRedirectUri(provider))
      .then((step) => navigate(afterLogin(step, safeNext(next)), { replace: true }))
      .catch(() => setError(`${name} 로그인에 실패했어요. 다시 시도해 주세요.`))
  }, [name, navigate, params, provider])

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      {error ? (
        <>
          <p className="font-bold">{error}</p>
          <Link to="/login" className="mt-6 inline-block rounded-xl bg-seal px-5 py-3 font-bold text-white">
            다시 로그인
          </Link>
        </>
      ) : (
        <p className="text-ink-soft">로그인하는 중이에요…</p>
      )}
    </div>
  )
}

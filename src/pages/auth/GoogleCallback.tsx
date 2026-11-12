import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ApiError } from '../../lib/api'
import { afterLogin, loginWithIdToken, safeNext } from '../../lib/auth'
import { takeGoogleState } from '../../lib/social'

// 구글 로그인 뒤 돌아오는 곳. 확인서(id_token)가 주소의 # 뒤에 붙어 온다 → 서버에 보내 로그인한다.
export default function GoogleCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const once = useRef(false)

  useEffect(() => {
    if (once.current) return // 개발 모드에서 두 번 돌아도 한 번만
    once.current = true
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''))
    // 확인서가 주소 표시줄·방문 기록에 남지 않게 바로 지운다
    window.history.replaceState(null, '', window.location.pathname)
    const idToken = params.get('id_token')
    const { ok, next } = takeGoogleState(params.get('state'), idToken)
    if (params.get('error') || !idToken) {
      setError(params.get('error') === 'access_denied' ? '구글 로그인을 취소했어요.' : '구글 로그인에 실패했어요.')
      return
    }
    if (!ok) {
      setError('로그인 요청이 올바르지 않아요. 다시 시도해 주세요.')
      return
    }
    loginWithIdToken('GOOGLE', idToken)
      .then((step) => navigate(afterLogin(step, safeNext(next)), { replace: true }))
      .catch((e) =>
        setError(e instanceof ApiError && e.code === 'NETWORK_ERROR' ? '인터넷 연결을 확인하고 다시 시도해 주세요.' : '구글 로그인에 실패했어요. 다시 시도해 주세요.'),
      )
  }, [navigate])

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

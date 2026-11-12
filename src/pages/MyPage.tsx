import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { COMPANY, USE_PERIOD } from '../data/company'
import { ApiError } from '../lib/api'
import { getMe, logout, useLoggedIn, type Exam, type Me } from '../lib/auth'
import { SUBJECTS, getBooks } from '../lib/pass'

const EXAM: Record<Exam, string> = { HIGH3: '고3', REPEAT: 'N수', OTHER: '기타' }
const PROVIDER: Record<string, string> = { KAKAO: '카카오', GOOGLE: '구글', APPLE: 'Apple', NAVER: '네이버', DEV: '개발용 로그인' }

// 내 정보: 계정(닉네임·응시·로그인 방법), 가진 교재, 선택 동의, 로그아웃.
// 닉네임·동의 바꾸기와 계정 삭제는 앱 설정 › 계정에서 한다 (웹은 보기만).
export default function MyPage() {
  const loggedIn = useLoggedIn()
  const navigate = useNavigate()
  const [me, setMe] = useState<Me | null>(null)
  const [books, setBooks] = useState<string[] | null>(null)
  const [error, setError] = useState('')
  // 로그아웃 버튼으로 나가는 중이면 로그인 화면이 아니라 홈으로 보낸다
  const leaving = useRef(false)

  useEffect(() => {
    if (!loggedIn) return
    let alive = true
    ;(async () => {
      try {
        const m = await getMe()
        if (!alive) return
        // 가입(약관·프로필)을 마치지 않았으면 가입 화면으로
        if (m.nextStep !== 'HOME') return navigate('/signup?next=%2Fme', { replace: true })
        setMe(m)
        const b = await getBooks()
        if (alive) setBooks(b.subjects)
      } catch (e) {
        // 로그인이 끝났으면(401) 토큰이 지워져 아래 Navigate가 로그인으로 보낸다
        if (alive && !(e instanceof ApiError && e.status === 401)) setError('정보를 불러오지 못했어요. 잠시 뒤 다시 시도해 주세요.')
      }
    })()
    return () => {
      alive = false
    }
  }, [loggedIn, navigate])

  if (!loggedIn) return <Navigate to={leaving.current ? '/' : '/login?next=%2Fme'} replace />

  const owned = (key: string) => books?.includes(key) ?? false
  const ownsAll = books !== null && SUBJECTS.every((s) => owned(s.key))

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-bold sm:text-3xl">내 정보</h1>

      {error && <p className="mt-6 rounded-lg bg-seal-soft px-4 py-3 text-sm text-seal-deep">{error}</p>}

      <Card title="계정">
        {me ? (
          <dl className="grid grid-cols-[6rem_1fr] gap-y-3 text-sm sm:text-base">
            <dt className="text-ink-soft">닉네임</dt>
            <dd className="font-bold">{me.nickname}</dd>
            <dt className="text-ink-soft">응시</dt>
            <dd>{me.exam ? EXAM[me.exam] : '-'}</dd>
            <dt className="text-ink-soft">로그인</dt>
            <dd>{PROVIDER[me.provider] ?? me.provider}</dd>
          </dl>
        ) : (
          !error && <Loading />
        )}
      </Card>

      <Card title="내 교재">
        {books ? (
          <>
            <ul className="divide-y divide-line">
              {SUBJECTS.map((s) => (
                <li key={s.key} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-bold">기출비급 {s.name}</span>
                  {owned(s.key) ? (
                    <span className="rounded-full bg-seal-soft px-3 py-1 text-sm font-bold text-seal-deep">이용 중</span>
                  ) : (
                    <Link to={`/pass/${s.productId}`} className="rounded-lg border border-line bg-white px-3 py-1.5 text-sm font-bold hover:bg-paper-deep">
                      구매하기
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            {!ownsAll && (
              <Link to="/pass/pass-3" className="mt-4 block rounded-xl bg-seal py-3.5 text-center font-bold text-white hover:bg-seal-deep">
                3권 패스 보기 · 한 권에 9,300원
              </Link>
            )}
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              가진 교재는 태블릿(iPad, 갤럭시 탭)의 {COMPANY.service} 앱에서 지금 계정으로 로그인하면 바로 풀 수 있어요. 이용 기간은{' '}
              {USE_PERIOD}이에요.
            </p>
          </>
        ) : (
          !error && <Loading />
        )}
      </Card>

      {me && (
        <Card title="선택 동의">
          <dl className="grid grid-cols-[1fr_auto] gap-y-3 text-sm sm:text-base">
            <dt>질문 내용 저장·분석 (AI 선생님을 쓰려면 필요해요)</dt>
            <dd className="font-bold">{me.consents.questions ? '동의함' : '동의 안 함'}</dd>
            <dt>마케팅 정보 수신</dt>
            <dd className="font-bold">{me.consents.marketing ? '동의함' : '동의 안 함'}</dd>
          </dl>
          <p className="mt-4 text-sm text-ink-soft">닉네임과 동의는 앱의 설정 › 계정에서 바꿀 수 있어요. 계정 삭제도 앱에서 할 수 있어요.</p>
        </Card>
      )}

      <Card title="도움이 필요할 때">
        <p className="text-sm leading-relaxed text-ink-soft">
          결제·환불 문의는 고객센터 {COMPANY.phone}로 연락해 주세요.{' '}
          <Link to="/refund" className="underline">
            환불·배송 정책
          </Link>
        </p>
      </Card>

      <button
        type="button"
        onClick={() => {
          leaving.current = true
          void logout()
        }}
        className="mt-8 w-full rounded-xl border border-line bg-white py-3.5 font-bold text-ink-soft hover:bg-paper-deep"
      >
        로그아웃
      </button>
    </div>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 rounded-2xl border border-line bg-white p-5 sm:p-6">
      <h2 className="mb-4 font-bold">{title}</h2>
      {children}
    </section>
  )
}

const Loading = () => <p className="text-sm text-ink-soft">불러오는 중이에요…</p>

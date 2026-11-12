import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { ApiError } from '../../lib/api'
import { getMe, putProfile, putTerms, safeNext, type Exam, type TermsAgreement } from '../../lib/auth'

// 웹 가입 마무리: 앱 가입 화면과 같은 약관 5개(필수 3) + 닉네임·응시 (backend 로그인-API 5·6번).
const TERMS: { key: keyof TermsAgreement; label: string; required: boolean; to?: string }[] = [
  { key: 'service', label: '이용약관', required: true, to: '/terms' },
  { key: 'privacy', label: '개인정보 수집·이용', required: true, to: '/privacy' },
  { key: 'over14', label: '만 14세 이상입니다', required: true },
  { key: 'questions', label: '질문 내용 저장·분석 (AI 선생님을 쓰려면 필요해요)', required: false },
  { key: 'marketing', label: '마케팅 정보 수신', required: false },
]

const EXAMS: { value: Exam; label: string }[] = [
  { value: 'HIGH3', label: '고3' },
  { value: 'REPEAT', label: 'N수' },
  { value: 'OTHER', label: '기타' },
]

const NONE: TermsAgreement = { service: false, privacy: false, over14: false, questions: false, marketing: false }

export default function Signup() {
  const [params] = useSearchParams()
  const next = safeNext(params.get('next'))
  const navigate = useNavigate()
  const [step, setStep] = useState<'loading' | 'TERMS' | 'PROFILE'>('loading')
  const [checks, setChecks] = useState(NONE)
  const [nickname, setNickname] = useState('')
  const [exam, setExam] = useState<Exam>('HIGH3')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    getMe()
      .then((me) => (me.nextStep === 'HOME' ? navigate(next, { replace: true }) : setStep(me.nextStep)))
      .catch(() => navigate(`/login?next=${encodeURIComponent(next)}`, { replace: true }))
  }, [navigate, next])

  const all = TERMS.every((t) => checks[t.key])
  const canGo = TERMS.every((t) => !t.required || checks[t.key])

  const submitTerms = async () => {
    setBusy(true)
    setError('')
    try {
      const res = await putTerms(checks)
      if (res.nextStep === 'HOME') navigate(next, { replace: true })
      else setStep('PROFILE')
    } catch {
      setError('저장하지 못했어요. 다시 시도해 주세요.')
    } finally {
      setBusy(false)
    }
  }

  const submitProfile = async () => {
    setBusy(true)
    setError('')
    try {
      await putProfile(nickname.trim(), exam)
      navigate(next, { replace: true })
    } catch (e) {
      setError(e instanceof ApiError && e.code === 'NICKNAME_DUPLICATE' ? '이미 쓰는 닉네임이에요' : '저장하지 못했어요. 다시 시도해 주세요.')
    } finally {
      setBusy(false)
    }
  }

  if (step === 'loading') return <p className="py-24 text-center text-ink-soft">불러오는 중이에요…</p>

  return (
    <div className="mx-auto max-w-md px-4 py-14 sm:py-20">
      <h1 className="text-2xl font-bold">{step === 'TERMS' ? '약관 동의' : '프로필'}</h1>

      {step === 'TERMS' ? (
        <>
          <label className="mt-8 flex cursor-pointer items-center gap-3 rounded-xl bg-paper-deep px-4 py-3.5 font-bold">
            <input
              type="checkbox"
              checked={all}
              onChange={() => setChecks(Object.fromEntries(TERMS.map((t) => [t.key, !all])) as TermsAgreement)}
              className="size-5 accent-seal"
            />
            모두 동의
          </label>
          <ul className="mt-3 space-y-1">
            {TERMS.map((t) => (
              <li key={t.key} className="flex items-center gap-3 px-4 py-2 text-sm">
                <input
                  id={t.key}
                  type="checkbox"
                  checked={checks[t.key]}
                  onChange={() => setChecks({ ...checks, [t.key]: !checks[t.key] })}
                  className="size-4 accent-seal"
                />
                <label htmlFor={t.key} className="flex-1 cursor-pointer">
                  <span className={t.required ? 'text-seal' : 'text-ink-soft'}>{t.required ? '[필수]' : '[선택]'}</span> {t.label}
                </label>
                {t.to && (
                  <Link to={t.to} target="_blank" className="text-ink-soft underline">
                    보기
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled={!canGo || busy}
            onClick={submitTerms}
            className="mt-8 w-full rounded-xl bg-seal py-4 font-bold text-white disabled:opacity-40"
          >
            다음
          </button>
        </>
      ) : (
        <>
          <label className="mt-8 block text-sm font-bold" htmlFor="nickname">
            닉네임 (1~12자)
          </label>
          <input
            id="nickname"
            value={nickname}
            maxLength={12}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3"
          />
          <p className="mt-6 text-sm font-bold">응시</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {EXAMS.map((x) => (
              <button
                key={x.value}
                type="button"
                onClick={() => setExam(x.value)}
                className={`rounded-xl border py-3 font-bold ${exam === x.value ? 'border-seal bg-seal-soft text-seal-deep' : 'border-line bg-white'}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={nickname.trim().length === 0 || busy}
            onClick={submitProfile}
            className="mt-8 w-full rounded-xl bg-seal py-4 font-bold text-white disabled:opacity-40"
          >
            가입 마치기
          </button>
        </>
      )}

      {error && <p className="mt-4 text-sm text-seal-deep">{error}</p>}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router'
import BookCover from '../components/BookCover'
import { USE_PERIOD } from '../data/company'
import { findProduct, won } from '../data/products'
import { ApiError } from '../lib/api'
import { useLoggedIn } from '../lib/auth'
import { createOrder, type CreatedOrder } from '../lib/pass'
import { loadTossWidgets, type TossWidgets } from '../lib/toss'
import NotFound from './NotFound'

// 주문·결제. 로그인 → 서버가 주문(금액)을 만들고 → 토스 결제위젯 → 성공하면 /checkout/success 에서 서버가 승인.
export default function Checkout() {
  // 상품이 바뀌면(주소의 :id) 주문과 결제위젯을 처음부터 다시 만든다
  const { id } = useParams()
  return <CheckoutFor key={id} id={id} />
}

function CheckoutFor({ id }: { id: string | undefined }) {
  const product = findProduct(id)
  const loggedIn = useLoggedIn()
  const location = useLocation()
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)
  const [order, setOrder] = useState<CreatedOrder | null>(null)
  const [ready, setReady] = useState(false)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState<{ text: string; owned?: boolean } | null>(null)
  const widgets = useRef<TossWidgets | null>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!product || !loggedIn || started.current) return
    started.current = true
    ;(async () => {
      try {
        const created = await createOrder(product.id)
        setOrder(created)
        const w = await loadTossWidgets(created.clientKey)
        await w.setAmount({ currency: 'KRW', value: created.amount }) // 렌더 전에 먼저
        await Promise.all([
          w.renderPaymentMethods({ selector: '#payment-method', variantKey: 'DEFAULT' }),
          w.renderAgreement({ selector: '#agreement', variantKey: 'AGREEMENT' }),
        ])
        widgets.current = w
        setReady(true)
      } catch (e) {
        // 로그인만 하고 가입(약관·프로필)을 마치지 않은 계정 → 가입부터
        if (e instanceof ApiError && e.code === 'SIGNUP_INCOMPLETE')
          navigate(`/signup?next=${encodeURIComponent(location.pathname)}`, { replace: true })
        else if (e instanceof ApiError && e.code === 'PASS_ALREADY_OWNED') setError({ text: '이미 가진 교재예요.', owned: true })
        else if (e instanceof ApiError && e.code === 'PASS_UNAVAILABLE') setError({ text: '지금은 결제할 수 없어요. 잠시 뒤 다시 시도해 주세요.' })
        // 서버 주소가 없거나 결제 API가 아직 배포되지 않았을 때 (결제 오픈 전)
        else if (e instanceof ApiError && (e.code === 'NO_SERVER' || e.status === 404)) setError({ text: '결제 준비 중이에요. 곧 열려요.' })
        else setError({ text: '결제 화면을 불러오지 못했어요. 새로고침해 주세요.' })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, loggedIn])

  if (!product) return <NotFound message="찾는 상품이 없어요" />
  if (!loggedIn) return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />

  const pay = async () => {
    if (!widgets.current || !order) return
    setPaying(true)
    try {
      await widgets.current.requestPayment({
        orderId: order.orderId,
        orderName: order.orderName,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
      })
    } catch (e) {
      // 결제창을 닫은 것은 조용히, 그 밖에는 안내
      if ((e as { code?: string })?.code !== 'USER_CANCEL') setError({ text: (e as Error)?.message || '결제를 시작하지 못했어요.' })
    } finally {
      setPaying(false)
    }
  }

  const amount = order?.amount ?? product.price

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-bold sm:text-3xl">주문 · 결제</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
            <h2 className="font-bold">주문 상품</h2>
            <div className="mt-4 flex gap-4 sm:gap-6">
              <div className="w-20 shrink-0 text-[9px] sm:w-24">
                <BookCover product={product} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold sm:text-lg">{product.name}</p>
                <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                  {product.perks.map((p) => (
                    <li key={p}>· {p}</li>
                  ))}
                </ul>
              </div>
              <p className="shrink-0 font-bold">{won(amount)}</p>
            </div>
            <Link to="/pass" className="mt-4 inline-block text-sm text-ink-soft underline">
              다른 상품 고르기
            </Link>
          </section>

          {/* 토스페이먼츠 결제위젯: 결제 수단과 결제 약관 (색·모양은 토스 결제 어드민에서) */}
          <section className={`overflow-hidden rounded-2xl border border-line bg-white ${error && !ready ? 'hidden' : ''}`}>
            <div id="payment-method" />
            <div id="agreement" />
            {!ready && !error && <p className="p-6 text-sm text-ink-soft">결제 수단을 불러오는 중이에요…</p>}
          </section>

          <section className="rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed sm:p-6">
            <h2 className="text-base font-bold">결제 후 이용 방법</h2>
            <p className="mt-3 text-ink-soft">
              태블릿에 기출비급 앱을 설치하고, 지금 로그인한 계정으로 로그인하면 바로 풀 수 있어요. 펜을 쓸 수 있는 iPad와
              갤럭시 탭에서 쓸 수 있어요. 휴대폰과 PC에서는 쓸 수 없어요.
            </p>
            <h2 className="mt-5 text-base font-bold">이용 기간</h2>
            <p className="mt-3 text-ink-soft">{USE_PERIOD} 이용할 수 있어요.</p>
            <h2 className="mt-5 text-base font-bold">환불 안내</h2>
            <p className="mt-3 text-ink-soft">
              결제 후 7일 안에 AI 선생님 질문을 쓰지 않았다면 전액 환불받을 수 있어요.{' '}
              <Link to="/refund" className="underline">
                환불·배송 정책 보기
              </Link>
            </p>
            <p className="mt-3 text-ink-soft">만 19세 미만은 보호자의 동의를 받은 뒤 결제해 주세요.</p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-ink p-6 text-white lg:sticky lg:top-24">
          <h2 className="font-bold">결제 금액</h2>
          <dl className="mt-4 space-y-2 text-sm text-white/75">
            <div className="flex justify-between">
              <dt>상품 금액</dt>
              <dd>{won(amount)}</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-end justify-between border-t border-white/15 pt-4">
            <span className="font-bold">총 결제 금액</span>
            <span className="text-2xl font-bold">{won(amount)}</span>
          </div>

          <label className="mt-6 flex cursor-pointer gap-2 text-sm text-white/85">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 size-4 accent-seal"
            />
            주문 내용과 환불 안내를 확인했고, 결제에 동의해요.
          </label>

          <button
            type="button"
            disabled={!agreed || !ready || paying}
            onClick={pay}
            className="mt-5 w-full rounded-xl bg-seal py-4 text-lg font-bold transition hover:bg-seal-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {won(amount)} 결제하기
          </button>

          {error && (
            <p className="mt-4 rounded-lg bg-white/10 px-3 py-2.5 text-sm">
              {error.text}{' '}
              {error.owned && (
                <Link to="/pass" className="underline">
                  다른 상품 보기
                </Link>
              )}
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}

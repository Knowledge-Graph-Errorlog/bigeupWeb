import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { won } from '../data/products'
import { ApiError } from '../lib/api'
import { confirmOrder, getOrder, subjectName, type Order } from '../lib/pass'

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

// 결제창 성공 → 서버 승인. 토스 successUrl 에 paymentKey·orderId·amount 가 붙어 온다.
// 서버가 금액을 대조하고 승인한다. 새로고침해도 다시 승인하지 않고 결과만 받는다.
export function CheckoutSuccess() {
  const [params] = useSearchParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [error, setError] = useState('')
  const once = useRef(false)

  useEffect(() => {
    if (once.current) return
    once.current = true
    const paymentKey = params.get('paymentKey')
    const orderId = params.get('orderId')
    const amount = Number(params.get('amount'))
    if (!paymentKey || !orderId || !Number.isFinite(amount)) {
      setError('결제 정보가 올바르지 않아요.')
      return
    }
    ;(async () => {
      try {
        let o = await confirmOrder(orderId, paymentKey, amount)
        // 승인 결과를 아직 모르면 잠시 기다리며 다시 본다 (서버도 5분마다 확정한다)
        for (let i = 0; i < 8 && (o.status === 'CONFIRMING' || o.status === 'READY'); i++) {
          setOrder(o)
          await wait(2500)
          o = await getOrder(orderId)
        }
        setOrder(o)
      } catch (e) {
        setError(
          e instanceof ApiError && e.code === 'PASS_AMOUNT_MISMATCH'
            ? '결제 금액이 주문과 달라 결제하지 않았어요. 돈은 빠져나가지 않았어요.'
            : e instanceof ApiError && e.status === 401
              ? '로그인이 끝났어요. 다시 로그인한 뒤 주문 내역을 확인해 주세요.'
              : '결제 결과를 확인하지 못했어요. 잠시 뒤 다시 확인해 주세요.',
        )
      }
    })()
  }, [params])

  if (error) return <Result title="결제를 마치지 못했어요" body={error} />
  if (!order || order.status === 'CONFIRMING' || order.status === 'READY')
    return <Result title="결제를 확인하는 중이에요" body="창을 닫지 말고 잠시만 기다려 주세요." />
  if (order.status === 'PAID')
    return (
      <Result
        ok
        title="결제가 끝났어요"
        body={`${order.orderName} · ${won(order.amount)}`}
        detail={
          <>
            <p>
              열린 교재: <strong className="text-ink">{order.subjects.map(subjectName).join(', ')}</strong>
            </p>
            <p className="mt-2">태블릿에서 기출비급 앱을 열고, 지금 로그인한 계정으로 로그인하면 바로 풀 수 있어요.</p>
            <p className="mt-2">주문 번호 {order.orderId}</p>
          </>
        }
      />
    )
  return (
    <Result
      title="결제하지 못했어요"
      body={order.failureMessage ?? '결제가 승인되지 않았어요. 돈은 빠져나가지 않았어요.'}
      retry={`/checkout/${order.productId}`}
    />
  )
}

// 결제창 실패·취소 → failUrl 에 code·message 가 붙어 온다.
export function CheckoutFail() {
  const [params] = useSearchParams()
  const canceled = params.get('code') === 'PAY_PROCESS_CANCELED' || params.get('code') === 'USER_CANCEL'
  return (
    <Result
      title={canceled ? '결제를 취소했어요' : '결제하지 못했어요'}
      body={canceled ? '결제는 진행되지 않았어요.' : (params.get('message') ?? '다시 시도해 주세요.')}
      retry="/pass"
    />
  )
}

function Result({
  ok,
  title,
  body,
  detail,
  retry,
}: {
  ok?: boolean
  title: string
  body: string
  detail?: React.ReactNode
  retry?: string
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className={`mx-auto flex size-14 items-center justify-center rounded-full text-2xl ${ok ? 'bg-seal text-white' : 'bg-paper-deep'}`}>
        {ok ? '✓' : '!'}
      </div>
      <h1 className="mt-6 text-2xl font-bold">{title}</h1>
      <p className="mt-3 text-ink-soft">{body}</p>
      {detail && <div className="mt-6 rounded-2xl bg-white p-5 text-left text-sm leading-relaxed text-ink-soft">{detail}</div>}
      <div className="mt-8 flex justify-center gap-2">
        <Link to="/" className="rounded-xl border border-line bg-white px-5 py-3 font-bold">
          홈으로
        </Link>
        {ok && (
          <Link to="/me" className="rounded-xl bg-ink px-5 py-3 font-bold text-white">
            내 교재 보기
          </Link>
        )}
        {retry && (
          <Link to={retry} className="rounded-xl bg-seal px-5 py-3 font-bold text-white">
            다시 결제하기
          </Link>
        )}
      </div>
    </div>
  )
}

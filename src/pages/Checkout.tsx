import { useState } from 'react'
import { Link, useParams } from 'react-router'
import BookCover from '../components/BookCover'
import { useComingSoon } from '../components/ComingSoon'
import { findProduct, won } from '../data/products'
import NotFound from './NotFound'

// 결제 페이지. 결제사·웹 로그인 방식이 정해지면 '결제하기'를 실제 결제에 연결한다.
export default function Checkout() {
  const product = findProduct(useParams().id)
  const show = useComingSoon()
  const [agreed, setAgreed] = useState(false)

  if (!product) return <NotFound message="찾는 상품이 없어요" />

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
              <p className="shrink-0 font-bold">{won(product.price)}</p>
            </div>
            <Link to="/pass" className="mt-4 inline-block text-sm text-ink-soft underline">
              다른 상품 고르기
            </Link>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5 text-sm leading-relaxed sm:p-6">
            <h2 className="text-base font-bold">결제 후 이용 방법</h2>
            <p className="mt-3 text-ink-soft">
              태블릿에 기출비급 앱을 설치하고, 결제한 계정으로 로그인하면 바로 풀 수 있어요. 펜을 쓸 수 있는 iPad와
              갤럭시 탭에서 쓸 수 있어요. 휴대폰과 PC에서는 쓸 수 없어요.
            </p>
            <h2 className="mt-5 text-base font-bold">환불 안내</h2>
            <p className="mt-3 text-ink-soft">
              결제 후 7일 안에 AI 선생님 질문을 쓰지 않았다면 전액 환불받을 수 있어요.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-ink p-6 text-white lg:sticky lg:top-24">
          <h2 className="font-bold">결제 금액</h2>
          <dl className="mt-4 space-y-2 text-sm text-white/75">
            <div className="flex justify-between">
              <dt>상품 금액</dt>
              <dd>{won(product.price)}</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-end justify-between border-t border-white/15 pt-4">
            <span className="font-bold">총 결제 금액</span>
            <span className="text-2xl font-bold">{won(product.price)}</span>
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
            disabled={!agreed}
            onClick={() => show({ title: '결제 준비 중이에요', body: '곧 결제가 열려요. 조금만 기다려 주세요.' })}
            className="mt-5 w-full rounded-xl bg-seal py-4 text-lg font-bold transition hover:bg-seal-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {won(product.price)} 결제하기
          </button>
        </aside>
      </div>
    </div>
  )
}

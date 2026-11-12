import { Link, useParams } from 'react-router'
import BookCover from '../components/BookCover'
import { FAQS } from '../data/faq'
import { USE_PERIOD } from '../data/company'
import { findProduct, won } from '../data/products'
import NotFound from './NotFound'

export default function ProductDetail() {
  const product = findProduct(useParams().id)
  if (!product) return <NotFound message="찾는 상품이 없어요" />

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="text-xs text-ink-soft">
        <Link to="/" className="hover:underline">
          HOME
        </Link>
        <span className="mx-1.5">›</span>
        <Link to="/pass" className="hover:underline">
          기출비급패스
        </Link>
        <span className="mx-1.5">›</span>
        <span>{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
        <div className="rounded-3xl bg-paper-deep p-10 sm:p-14">
          <BookCover product={product} className="mx-auto w-full max-w-72 text-lg" />
        </div>

        <div className="flex flex-col">
          <span
            className={`self-start rounded px-2 py-0.5 text-xs font-bold ${
              product.kind === 'pass' ? 'bg-seal text-white' : 'bg-ink/10 text-ink'
            }`}
          >
            {product.badge}
          </span>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold">{won(product.price)}</p>

          <ul className="mt-6 space-y-2.5 border-y border-line py-6">
            {product.perks.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-seal">✓</span>
                {p}
              </li>
            ))}
          </ul>

          {/* 카드사 심사: 무형 상품은 서비스 제공 기간과 환불 정책이 상품 페이지에서 보여야 한다 */}
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="font-bold">이용 기간</dt>
            <dd>{USE_PERIOD}</dd>
            <dt className="font-bold">배송</dt>
            <dd>실물 배송 없음(배송비 없음) · 결제 즉시 결제한 계정으로 태블릿 앱에서 이용</dd>
            <dt className="font-bold">환불</dt>
            <dd>
              결제 후 7일 안, AI 선생님 질문을 쓰지 않았다면 전액 환불 ·{' '}
              <Link to="/refund" className="underline">
                환불·배송 정책
              </Link>
            </dd>
          </dl>

          <Link
            to={`/checkout/${product.id}`}
            className="mt-6 rounded-xl bg-seal py-4 text-center text-lg font-bold text-white hover:bg-seal-deep"
          >
            바로 구매
          </Link>
          {product.kind === 'single' && (
            <Link
              to="/pass/pass-3"
              className="mt-3 rounded-xl border border-line bg-white py-3.5 text-center font-bold hover:bg-paper-deep"
            >
              3권 패스로 보기 · 한 권에 9,300원
            </Link>
          )}

          <dl className="mt-10 space-y-5 text-sm">
            {FAQS.slice(0, 4).map((f) => (
              <div key={f.q}>
                <dt className="font-bold">{f.q}</dt>
                <dd className="mt-1 leading-relaxed text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

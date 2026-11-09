import { Link } from 'react-router'
import { won, type Product } from '../data/products'
import BookCover from './BookCover'

export default function ProductCard({ product }: { product: Product }) {
  const isPass = product.kind === 'pass'
  return (
    <article className="flex flex-col">
      <Link
        to={`/pass/${product.id}`}
        className="group block rounded-2xl bg-paper-deep p-5 transition hover:bg-line sm:p-7"
      >
        <BookCover product={product} className="mx-auto w-full max-w-44 text-[13px] transition group-hover:-translate-y-1" />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <span
          className={`self-start rounded px-2 py-0.5 text-xs font-bold ${
            isPass ? 'bg-seal text-white' : 'bg-ink/10 text-ink'
          }`}
        >
          {product.badge}
        </span>
        <Link to={`/pass/${product.id}`} className="mt-2 font-bold hover:underline sm:text-lg">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-ink-soft">AI 선생님 질문 약 {product.aiQuestions}회 포함</p>
        <p className="mt-3 text-xl font-bold">{won(product.price)}</p>
        {isPass && <p className="text-sm text-ink-soft">한 권에 9,300원</p>}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            to={`/pass/${product.id}`}
            className="rounded-lg border border-line bg-white py-2.5 text-center text-sm font-bold hover:bg-paper-deep"
          >
            자세히 보기
          </Link>
          <Link
            to={`/checkout/${product.id}`}
            className="rounded-lg bg-seal py-2.5 text-center text-sm font-bold text-white hover:bg-seal-deep"
          >
            바로 구매
          </Link>
        </div>
      </div>
    </article>
  )
}

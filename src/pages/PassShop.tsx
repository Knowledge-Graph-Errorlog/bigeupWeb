import { Link, useSearchParams } from 'react-router'
import ProductCard from '../components/ProductCard'
import { SHOW_AI_TOPUP } from '../data/company'
import { PRODUCTS, SUBJECT_NAME, type Product, type Subject } from '../data/products'

type Tab = 'all' | 'pass' | Subject

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'pass', label: '3권 패스' },
  { key: 'prob', label: SUBJECT_NAME.prob },
  { key: 'algebra', label: SUBJECT_NAME.algebra },
  { key: 'calc', label: SUBJECT_NAME.calc },
]

const matches = (p: Product, tab: Tab) =>
  tab === 'all' ? true : tab === 'pass' ? p.kind === 'pass' : p.subjects.includes(tab)

export default function PassShop() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('tab')
  const tab: Tab = TABS.some((t) => t.key === raw) ? (raw as Tab) : 'all'
  const items = PRODUCTS.filter((p) => matches(p, tab))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="text-xs text-ink-soft">
        <Link to="/" className="hover:underline">
          HOME
        </Link>
        <span className="mx-1.5">›</span>
        <span>기출비급패스</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">기출비급패스</h1>
      <p className="mt-2 text-ink-soft">2028 수능 수학 평가원 기출을 iPad, 갤럭시 탭에서 펜으로 풀어요.</p>

      <div className="mt-8 border-y border-line py-4">
        <div className="flex items-center gap-4">
          <span className="hidden shrink-0 text-sm font-bold sm:block">과목 선택</span>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setParams(t.key === 'all' ? {} : { tab: t.key }, { replace: true })}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                  tab === t.key ? 'bg-ink text-white' : 'bg-white text-ink-soft ring-1 ring-line hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        총 <b className="text-ink">{items.length}</b>개
      </p>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <p className="mt-14 rounded-2xl bg-paper-deep p-5 text-sm leading-relaxed text-ink-soft">
        결제는 이 웹사이트에서만 할 수 있어요. 결제한 계정으로 태블릿 앱에 로그인하면 바로 풀 수 있어요.
        {SHOW_AI_TOPUP && ' 질문을 다 쓰면 앱에서 약 100회를 4,000원에 추가할 수 있어요.'}
      </p>
    </div>
  )
}

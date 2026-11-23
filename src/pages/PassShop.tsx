import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router'
import ProductCard from '../components/ProductCard'
import { SHOW_AI_TOPUP } from '../data/company'
import { AREAS, PRODUCTS, areaReady, type Product, type Subject } from '../data/products'

type Kind = Product['kind']
const KINDS: { key: Kind; label: string }[] = [
  { key: 'pass', label: '패스' },
  { key: 'single', label: '단권' },
]

function Chip({ on, disabled, onClick, children }: { on: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={disabled}
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
        on ? 'bg-ink text-white' : disabled ? 'bg-white text-ink-faint ring-1 ring-line' : 'bg-white text-ink-soft ring-1 ring-line hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-16 shrink-0 text-sm font-bold">{label}</span>
      <div className="-mr-4 flex gap-2 overflow-x-auto py-0.5 pr-4 pl-0.5 sm:mr-0 sm:flex-wrap sm:pr-0">{children}</div>
    </div>
  )
}

export default function PassShop() {
  const [params, setParams] = useSearchParams()

  // 예전 주소(?tab=pass, ?tab=prob)도 그대로 열리게 읽는다
  const old = params.get('tab')
  const kindRaw = params.get('kind') ?? (old === 'pass' ? 'pass' : null)
  const subRaw = params.get('sub') ?? (old && old !== 'pass' ? old : null)
  const kind = KINDS.find((k) => k.key === kindRaw)?.key ?? null
  const areaFromSub = AREAS.find((a) => a.subs.some((x) => x.key === subRaw && x.ready))
  const area = AREAS.find((a) => a.key === params.get('area')) ?? areaFromSub ?? null
  // 세부 과목은 교재가 나온 것만 고를 수 있다
  const sub = area?.subs.find((x) => x.key === subRaw && x.ready)?.key ?? null

  const set = (next: { kind?: Kind | null; area?: string | null; sub?: string | null }) => {
    const v = { kind, area: area?.key ?? null, sub, ...next }
    if (!v.area) v.sub = null
    const q: Record<string, string> = {}
    if (v.kind) q.kind = v.kind
    if (v.area) q.area = v.area
    if (v.sub) q.sub = v.sub
    setParams(q, { replace: true })
  }

  const inArea = (p: Product) => !area || p.subjects.every((s) => area.subs.some((x) => x.key === s))
  const items = PRODUCTS.filter((p) => (!kind || p.kind === kind) && inArea(p) && (!sub || p.subjects.includes(sub as Subject)))
  const comingSoon = area !== null && !areaReady(area)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="text-xs text-ink-soft">
        <Link to="/" className="hover:underline">
          HOME
        </Link>
        <span className="mx-1.5">›</span>
        <span>비급교재 구매</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">비급교재 구매</h1>
      <p className="mt-2 text-ink-soft">2028 수능 수학 평가원 기출을 iPad, 갤럭시 탭에서 펜으로 풀어요.</p>

      <div className="mt-8 space-y-3 border-y border-line py-4">
        <Row label="종류">
          <Chip on={!kind} onClick={() => set({ kind: null })}>
            전체
          </Chip>
          {KINDS.map((k) => (
            <Chip key={k.key} on={kind === k.key} onClick={() => set({ kind: k.key })}>
              {k.label}
            </Chip>
          ))}
        </Row>

        <Row label="과목">
          <Chip on={!area} onClick={() => set({ area: null })}>
            전체
          </Chip>
          {AREAS.map((a) => {
            const soon = !areaReady(a)
            return (
              <Chip key={a.key} on={area?.key === a.key} onClick={() => set({ area: a.key, sub: null })}>
                {a.name}
                {soon && <span className="ml-1.5 text-xs font-normal opacity-70">준비 중</span>}
              </Chip>
            )
          })}
        </Row>

        {/* 과목을 고르면 그 아래 세부 과목이 열린다 */}
        {area && area.subs.length > 0 && (
          <Row label="세부 과목">
            <Chip on={!sub} onClick={() => set({ sub: null })}>
              {area.name} 전체
            </Chip>
            {area.subs.map((x) => (
              <Chip key={x.key} on={sub === x.key} disabled={!x.ready} onClick={() => set({ sub: x.key })}>
                {x.name}
                {!x.ready && <span className="ml-1.5 text-xs font-normal">준비 중</span>}
              </Chip>
            ))}
          </Row>
        )}
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        총 <b className="text-ink">{items.length}</b>개
      </p>

      {items.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-2xl bg-white p-8 text-center text-sm text-ink-soft">{comingSoon ? `${area.name} 교재는 준비 중이에요.` : '고른 조건에 맞는 교재가 없어요.'}</p>
      )}

      <p className="mt-14 rounded-2xl bg-paper-deep p-5 text-sm leading-relaxed text-ink-soft">
        결제는 이 웹사이트에서만 할 수 있어요. 결제한 계정으로 태블릿 앱에 로그인하면 바로 풀 수 있어요.
        {SHOW_AI_TOPUP && ' 질문을 다 쓰면 앱에서 약 100회를 4,000원에 추가할 수 있어요.'}
      </p>
    </div>
  )
}

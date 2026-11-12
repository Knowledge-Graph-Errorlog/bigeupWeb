import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { COMPANY, LEGAL_EFFECTIVE_DATE } from '../data/company'

const DOCS = [
  { to: '/terms', label: '이용약관' },
  { to: '/privacy', label: '개인정보 처리방침' },
  { to: '/refund', label: '환불·배송 정책' },
]

/** 약관류 페이지 공통 틀: 제목, 시행일, 다른 문서로 가는 탭 */
export default function LegalPage({ title, current, children }: { title: string; current: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <nav className="flex flex-wrap gap-2 text-sm">
        {DOCS.map((d) => (
          <Link
            key={d.to}
            to={d.to}
            className={`rounded-lg px-3 py-1.5 font-bold ${d.to === current ? 'bg-ink text-white' : 'bg-paper-deep text-ink'}`}
          >
            {d.label}
          </Link>
        ))}
      </nav>
      <h1 className="mt-8 text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-soft">
        {COMPANY.service} · 시행일 {LEGAL_EFFECTIVE_DATE}
      </p>
      <div className="legal mt-8 space-y-8 text-[15px] leading-relaxed">{children}</div>
    </div>
  )
}

/** 조항 하나 */
export function Article({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3 space-y-2 text-ink-soft">{children}</div>
    </section>
  )
}

/** 번호 목록 */
export function Items({ children }: { children: ReactNode }) {
  return <ol className="list-decimal space-y-1.5 pl-5">{children}</ol>
}

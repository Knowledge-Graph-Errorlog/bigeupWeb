import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import coverAlgebra from '../../assets/app/cover-algebra-480.webp'
import coverCalc from '../../assets/app/cover-calc-480.webp'
import coverProb from '../../assets/app/cover-prob-480.webp'
import BookCover from '../BookCover'
import { SHOW_AI_TOPUP, USE_PERIOD } from '../../data/company'
import { FAQS } from '../../data/faq'
import { findProduct, won } from '../../data/products'
import { Container, SectionTitle, btnLine, btnPen } from './ui'

const COVERS = [
  { src: coverProb, name: '확률과 통계' },
  { src: coverAlgebra, name: '대수' },
  { src: coverCalc, name: '미적분Ⅰ' },
]
const coverCls = 'block aspect-[480/657] w-full rounded-[6%/4.4%] object-cover shadow-[0_1px_2px_rgba(20,22,26,0.08),0_16px_36px_-12px_rgba(20,22,26,0.28)]'

/** 2028 수능 범위 */
export function Scope() {
  return (
    <section className="bg-desk py-20 sm:py-28 lg:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <SectionTitle>
            2028 수능 범위에 맞는
            <br />
            기출만 담았어요
          </SectionTitle>
          <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.8] text-ink-soft sm:text-[18px]">
            2028 수능부터는 2022 개정 교육과정 범위에서 출제돼요. 어떤 기출을 풀어야 할지 고르느라 더 이상 시간을 쓰지
            마세요. 기출비급은 2022 개정 교육과정에 맞춰 모든 문항을 검토하고, 꼭 풀어야 할 문제만 남겼어요.
          </p>
        </div>
        <ul className="reveal grid grid-cols-3 items-end gap-3 sm:gap-5">
          {COVERS.map((c, i) => (
            <li key={c.name} className={i === 1 ? 'pb-[14%]' : ''}>
              <img src={c.src} alt={`기출비급 ${c.name} 표지`} width={480} height={657} loading="lazy" decoding="async" className={coverCls} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-[3px] size-5 shrink-0 text-pen">
      <path d="M4 10.5 8.2 15 16 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** 가격 */
export function Pricing() {
  const pass = findProduct('pass-3')!
  const single = findProduct('prob')!
  return (
    <section id="pricing" className="bg-sheet py-20 sm:py-28 lg:py-32">
      <Container>
        <SectionTitle>
          확률과 통계, 대수, 미적분I
          <br />
          3권을 27,900원에
        </SectionTitle>

        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="grid gap-8 rounded-3xl border-2 border-ink p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)] sm:p-10">
            <div className="flex flex-col">
              <p className="text-[17px] font-bold">3권 패스</p>
              <p className="mt-2 text-[44px] leading-none font-extrabold tracking-[-0.04em] tabular-nums sm:text-[56px]">{won(pass.price)}</p>
              <ul className="mt-7 space-y-3 text-[16px] leading-[1.55] sm:text-[17px]">
                {pass.perks.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to="/checkout/pass-3" className={`mt-9 sm:self-start sm:px-10 ${btnPen}`}>
                3권 패스 받기
              </Link>
            </div>
            <BookCover product={pass} className="mx-auto w-full max-w-[220px] max-sm:order-first max-sm:max-w-[170px]" />
          </div>

          <div className="flex flex-col rounded-3xl bg-desk p-6 sm:p-10">
            <p className="text-[17px] font-bold">단권</p>
            <p className="mt-2 text-[36px] leading-none font-extrabold tracking-[-0.04em] tabular-nums sm:text-[44px]">{won(single.price)}</p>
            <ul className="mt-7 space-y-3 text-[16px] leading-[1.55] sm:text-[17px]">
              {['원하는 과목 1권', ...single.perks.slice(1)].map((p) => (
                <li key={p} className="flex gap-2.5">
                  <Check />
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/pass" className={`mt-9 lg:mt-auto ${btnLine}`}>
              단권 고르기
            </Link>
          </div>
        </div>

        <p className="mt-6 text-[14px] leading-[1.7] text-ink-soft sm:text-[15px]">
          이용 기간은 {USE_PERIOD}이에요. 결제한 계정으로 태블릿 앱에 로그인하면 바로 풀 수 있어요.
          {SHOW_AI_TOPUP && ' 질문을 다 쓰면 앱에서 약 100회를 4,000원에 추가할 수 있어요.'}
        </p>
      </Container>
    </section>
  )
}

/** 자주 묻는 질문 */
export function Faq() {
  return (
    <section id="faq" className="bg-desk py-20 sm:py-28 lg:py-32">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <SectionTitle>자주 묻는 질문</SectionTitle>
        <div className="overflow-hidden rounded-2xl bg-sheet shadow-[0_1px_2px_rgba(20,22,26,0.06)]">
          {FAQS.map((f, i) => (
            <details key={f.q} className={`group ${i > 0 ? 'border-t border-line' : ''}`}>
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-bold sm:px-7 sm:text-[18px] [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5 shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-45">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="px-5 pb-6 text-[16px] leading-[1.75] text-ink-soft sm:px-7 sm:text-[17px]">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}

/** 마지막 안내. 바탕은 흰색으로 두고 빨강은 버튼에만 쓴다 */
export function FinalCta() {
  return (
    <section className="bg-sheet py-20 sm:py-28">
      <Container className="text-center">
        <h2 className="reveal mx-auto text-[27px] leading-[1.32] font-extrabold tracking-[-0.03em] sm:text-[40px] lg:text-[48px]">
          다음에 같은 문제를 만나면
          <br />
          맞힐 수 있게
        </h2>
        <p className="mx-auto mt-5 max-w-[40ch] text-[16px] leading-[1.75] text-ink-soft sm:text-[18px]">
          펜으로 푼 내 풀이에서 틀린 줄을 확인하고, 부족한 개념을 채우고, 다시 풀어 보세요.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-2 sm:flex-row">
          <Link to="/checkout/pass-3" className={`sm:px-9 ${btnPen}`}>
            3권 패스 받기 {won(findProduct('pass-3')!.price)}
          </Link>
          <Link to="/pass" className={`sm:px-9 ${btnLine}`}>
            과목별로 보기
          </Link>
        </div>
      </Container>
    </section>
  )
}

/** 휴대폰 하단 고정 버튼. 첫 화면의 버튼이 화면 밖으로 나간 뒤에 나타나고, 가격 칸·하단 정보가 보일 때는 숨는다 */
export function MobileBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const hero = document.querySelector('[data-hero-cta]')
    const hide = [document.getElementById('pricing'), document.querySelector('footer')].filter(Boolean) as Element[]
    let heroGone = false
    const covered = new Set<Element>()
    const update = () => setShow(heroGone && covered.size === 0)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroGone = !e.isIntersecting && e.boundingClientRect.top < 0
        else if (e.isIntersecting) covered.add(e.target)
        else covered.delete(e.target)
      }
      update()
    })
    if (hero) io.observe(hero)
    hide.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-sheet/95 px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
    >
      <div className="flex items-center gap-4">
        <p className="min-w-0 flex-1 text-[14px] leading-[1.35] text-ink-soft">
          3권 패스
          <br />
          <strong className="text-[17px] font-extrabold text-ink tabular-nums">{won(findProduct('pass-3')!.price)}</strong>
        </p>
        <Link to="/pass/pass-3" tabIndex={show ? 0 : -1} className={`h-[48px] shrink-0 px-7 ${btnPen}`}>
          패스 보기
        </Link>
      </div>
    </div>
  )
}

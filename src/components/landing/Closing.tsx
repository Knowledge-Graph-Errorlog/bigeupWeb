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
    <section className="bg-desk py-16 sm:py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <SectionTitle>
            2028 수능 범위에 맞는
            <br />
            기출만 담았어요
          </SectionTitle>
          <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-ink-soft sm:text-[16px]">
            2028 수능은 2022 개정 교육과정 범위에서 출제돼요. 그 범위에 맞춰 모든 문항을 검토하고, 꼭 풀어야 할 문제만
            남겼어요.
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
    <section id="pricing" className="bg-sheet py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle>
          확률과 통계, 대수, 미적분I
          <br />
          3권을 27,900원에
        </SectionTitle>

        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="grid gap-8 rounded-3xl border-2 border-ink p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,220px)] sm:p-10">
            <div className="flex flex-col">
              <p className="text-[15px] font-bold">3권 패스</p>
              <p className="mt-2 text-[34px] leading-none font-bold tracking-[-0.04em] tabular-nums sm:text-[40px]">{won(pass.price)}</p>
              <ul className="mt-7 space-y-2.5 text-[15px] leading-[1.55]">
                {pass.perks.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Check />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to="/pass" className={`mt-9 sm:self-start sm:px-10 ${btnPen}`}>
                3권 패스 구매하기
              </Link>
            </div>
            <BookCover product={pass} className="mx-auto w-full max-w-[220px] max-sm:order-first max-sm:max-w-[170px]" />
          </div>

          <div className="flex flex-col rounded-3xl bg-desk p-6 sm:p-10">
            <p className="text-[15px] font-bold">단권</p>
            <p className="mt-2 text-[28px] leading-none font-bold tracking-[-0.04em] tabular-nums sm:text-[32px]">{won(single.price)}</p>
            <ul className="mt-7 space-y-2.5 text-[15px] leading-[1.55]">
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
    <section id="faq" className="bg-desk py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <SectionTitle>자주 묻는 질문</SectionTitle>
        <div className="overflow-hidden rounded-2xl bg-sheet shadow-[0_1px_2px_rgba(20,22,26,0.06)]">
          {FAQS.map((f, i) => (
            <details key={f.q} className={`group ${i > 0 ? 'border-t border-line' : ''}`}>
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-[15px] font-bold sm:px-7 sm:text-[16px] [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5 shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-45">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-[1.7] text-ink-soft sm:px-7">{f.a}</p>
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
    <section className="bg-sheet py-16 sm:py-20">
      <Container className="text-center">
        <h2 className="reveal mx-auto text-[24px] leading-[1.35] font-bold tracking-[-0.03em] sm:text-[30px] lg:text-[34px]">
          다음에 같은 문제를 만나면
          <br />
          맞힐 수 있게
        </h2>
        <p className="mx-auto mt-5 max-w-[40ch] text-[15px] leading-[1.7] text-ink-soft sm:text-[16px]">
          펜으로 푼 내 풀이에서 틀린 줄을 확인하고, 부족한 개념을 채우고, 다시 풀어 보세요.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-2 sm:flex-row">
          <Link to="/pass" className={`sm:px-9 ${btnPen}`}>
            3권 패스 구매하기 {won(findProduct('pass-3')!.price)}
          </Link>
          <Link to="/pass" className={`sm:px-9 ${btnLine}`}>
            과목별로 보기
          </Link>
        </div>
      </Container>
    </section>
  )
}

/**
 * 스크롤해도 따라다니는 구매 배너. PC는 오른쪽 아래, 좁은 화면은 아래 가운데.
 * 첫 화면의 구매 버튼이 화면 밖으로 나간 뒤에 나타나고, 맨 아래 사업자 정보가 보일 때는 가리지 않게 숨는다.
 */
export function BuyBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setShow(true)
      return
    }
    const hero = document.querySelector('[data-hero-cta]')
    const footer = document.querySelector('footer')
    let heroGone = !hero
    let atFooter = false
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroGone = !e.isIntersecting && e.boundingClientRect.top < 0
        else atFooter = e.isIntersecting
      }
      setShow(heroGone && !atFooter)
    })
    if (hero) io.observe(hero)
    if (footer) io.observe(footer)
    return () => io.disconnect()
  }, [])

  const pass = findProduct('pass-3')!
  return (
    <Link
      to="/pass"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 items-center gap-4 rounded-2xl bg-pen py-3 pr-3 pl-5 text-white shadow-[0_10px_30px_-8px_rgba(142,12,12,0.55)] transition-[opacity,translate,background-color] duration-300 hover:bg-pen-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pen lg:right-6 lg:bottom-6 lg:left-auto lg:w-auto lg:translate-x-0 ${
        show ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="min-w-0 flex-1 text-[13px] leading-[1.4] text-white/85">
        기출비급 3권 패스
        <br />
        <strong className="text-[17px] font-extrabold text-white tabular-nums">{won(pass.price)}</strong>
        <span className="ml-1.5">한 권에 9,300원</span>
      </span>
      <span className="inline-flex h-11 shrink-0 items-center rounded-xl bg-white px-4 text-[15px] font-bold text-pen-deep">구매하기</span>
    </Link>
  )
}

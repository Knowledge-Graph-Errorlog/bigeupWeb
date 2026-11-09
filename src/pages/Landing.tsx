import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useComingSoon } from '../components/ComingSoon'
import { FAQS } from '../data/faq'
import { findProduct, won, type Product } from '../data/products'

// 카피: 기출비급 랜딩 카피 4판 (2026-11-09)

const TRIAL_NOTICE = {
  title: '맛보기 준비 중이에요',
  body: '3문제 맛보기는 곧 열려요. 조금만 기다려 주세요.',
}

export default function Landing() {
  return (
    <>
      <Hero />
      <PainPoints />
      <MySolution />
      <FeatureCheck />
      <FeatureConcept />
      <FeatureRounds />
      <Trial />
      <Extras />
      <Scope />
      <Pricing />
      <Faq />
    </>
  )
}

/* ───────── 공통 ───────── */

function Section({
  id,
  tone = 'paper',
  children,
}: {
  id?: string
  tone?: 'paper' | 'deep' | 'ink'
  children: ReactNode
}) {
  const bg = { paper: 'bg-paper', deep: 'bg-paper-deep', ink: 'bg-ink text-white' }[tone]
  return (
    <section id={id} className={`${bg} scroll-mt-16`}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">{children}</div>
    </section>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-bold text-seal">{children}</p>
}

function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-2xl leading-snug font-bold sm:text-4xl ${className}`}>{children}</h2>
}

const btnBase =
  'inline-flex items-center justify-center rounded-xl px-6 py-3.5 font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2'
const btnPrimary = `${btnBase} bg-seal text-white hover:bg-seal-deep focus-visible:outline-seal`
const btnGhost = `${btnBase} border border-ink/15 bg-white text-ink hover:bg-paper-deep focus-visible:outline-ink`

function TrialButton({ label, className = '' }: { label: string; className?: string }) {
  const show = useComingSoon()
  return (
    <button type="button" className={`${btnPrimary} ${className}`} onClick={() => show(TRIAL_NOTICE)}>
      {label}
    </button>
  )
}

/* ───────── 첫 화면 ───────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-28">
        <ul className="flex flex-wrap gap-2 text-xs font-bold text-ink-soft sm:text-sm">
          {['2028 수능 수학 평가원 기출', '2022 개정 교육과정 반영', 'iPad, 갤럭시 탭에서 펜으로'].map((t) => (
            <li key={t} className="rounded-full border border-line bg-white px-3 py-1">
              {t}
            </li>
          ))}
        </ul>

        <h1 className="mt-8 max-w-4xl text-3xl leading-tight font-bold sm:text-5xl sm:leading-tight">
          기출, 틀린 문제에 <span className="text-seal underline decoration-4 underline-offset-8">빨간 줄</span>만
          긋고 넘어가면, 세 번 풀어도 4등급이 나옵니다
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          같은 문제를 다시 만났을 때 맞히려면, 조건을 보고 어떤 개념을 쓸지 판단하고 식마다 근거를 대며 풀이를 써
          나갈 수 있어야 해요.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <TrialButton label="3문제 맛보기" />
          <a href="#pricing" className={btnGhost}>
            3권 패스 보기
          </a>
        </div>
      </div>
    </section>
  )
}

/* ───────── 문제 제기 ───────── */

const PAINS = [
  '내 풀이에서 뭐가 틀렸는지 모르겠어요.',
  '비슷한 문제를 또 틀렸는데, 원인이 무엇인지 모르겠어요.',
  '해설을 읽어도 왜 그렇게 푸는지 이해가 안 돼요.',
  '정답은 맞았는데, 이게 좋은 풀이인지 모르겠어요.',
  'AI에게 물어보려면 사진을 찍고 풀이를 옮겨 적는 게 번거로워요.',
]

function PainPoints() {
  return (
    <Section tone="deep">
      <H2>기출을 풀면서 이런 적 있었나요?</H2>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAINS.map((p) => (
          <li key={p} className="rounded-2xl rounded-bl-sm bg-white px-5 py-4 text-base shadow-sm">
            {p}
          </li>
        ))}
      </ul>

      <div className="mt-16 max-w-3xl">
        <h3 className="text-xl font-bold sm:text-2xl">해설지에는 내 풀이에 대한 설명이 없어요</h3>
        <p className="mt-4 leading-relaxed text-ink-soft">
          해설지는 정답 풀이를 기준으로 쓰여 있어요. 내 풀이가 어디서 틀렸는지, 어떤 개념이 부족했는지는 나와 있지
          않아요. 원인을 모른 채 넘어가니, 비슷한 문제를 또 틀리게 돼요.
        </p>
      </div>
    </Section>
  )
}

function MySolution() {
  return (
    <Section tone="ink">
      <div className="mx-auto max-w-3xl text-center">
        <H2>
          정답 풀이가 아니라,
          <br />내 풀이를 기준으로 공부하세요
        </H2>
        <p className="mt-6 leading-relaxed text-white/75 sm:text-lg">
          기출비급은 태블릿에서 펜으로 푸는 기출 교재예요. 내가 쓴 풀이가 그대로 저장되고, 그 풀이를 기준으로 틀린
          곳을 확인하고, 질문하고, 다시 풀 수 있어요.
        </p>
      </div>
    </Section>
  )
}

/* ───────── 핵심 기능 3가지 ───────── */

function FeatureRow({
  index,
  title,
  children,
  visual,
  flip = false,
}: {
  index: string
  title: string
  children: ReactNode
  visual: ReactNode
  flip?: boolean
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? 'lg:order-2' : ''}>
        <Eyebrow>{index}</Eyebrow>
        <H2 className="mt-3">{title}</H2>
        <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">{children}</div>
      </div>
      <div className={flip ? 'lg:order-1' : ''}>{visual}</div>
    </div>
  )
}

/** 손글씨 한 줄을 대신하는 막대 */
function Scribble({ w, mark }: { w: string; mark?: 'wrong' | 'fixed' }) {
  return (
    <div className="py-1.5">
      <span
        className={`block h-2.5 rounded-full ${
          mark === 'wrong' ? 'bg-seal/70' : mark === 'fixed' ? 'bg-emerald-600/70' : 'bg-ink/25'
        }`}
        style={{ width: w }}
      />
    </div>
  )
}

function Paper({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="rounded-3xl bg-paper-deep p-4 sm:p-6">
      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
        {label && <p className="mb-4 text-xs font-bold text-ink-soft">{label}</p>}
        {children}
      </div>
    </div>
  )
}

function FeatureCheck() {
  return (
    <Section>
      <FeatureRow
        index="01 · 풀이 점검"
        title="내 풀이가 어느 줄에서 틀렸는지 확인하세요"
        visual={
          <Paper label="내 풀이">
            <Scribble w="70%" />
            <Scribble w="55%" />
            <div className="relative -mx-2 flex items-center gap-2 rounded-md bg-seal/15 px-2 py-1.5">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-seal text-[11px] font-bold text-white">
                1
              </span>
              <span className="h-2.5 w-[60%] rounded-full bg-seal/70" />
            </div>
            <Scribble w="45%" />
            <Scribble w="35%" />
            <div className="mt-5 rounded-xl bg-paper p-4 text-sm leading-relaxed">
              <p className="text-xs font-bold text-seal">AI 선생님</p>
              <p className="mt-1">(1)에서는 이렇게 생각한 것 같은데, 이 조건에서는 이렇게 생각해야 해요.</p>
            </div>
          </Paper>
        }
      >
        <p>
          '내 풀이 점검 받기'를 누르면 틀린 줄에 빨간 형광펜과 번호가 표시돼요. 설명도 "(1)에서는 이렇게 생각한 것
          같은데, 이 조건에서는 이렇게 생각해야 해요"처럼 내 풀이를 기준으로 들을 수 있어요.
        </p>
      </FeatureRow>
    </Section>
  )
}

const CONCEPTS = [
  { name: '코사인법칙', level: '고등' },
  { name: '반원에 대한 원주각', level: '중학교' },
  { name: '삼각비', level: '중학교' },
  { name: '피타고라스 정리', level: '중학교' },
]

function FeatureConcept() {
  return (
    <Section tone="deep">
      <FeatureRow
        flip
        index="02 · 부족한 개념"
        title="어떤 개념이 부족해서 틀렸는지 찾을 수 있어요"
        visual={
          <Paper label="2022학년도 수능 15번 · 이 문제에 쓰인 개념">
            <ul className="space-y-2">
              {CONCEPTS.map((c, i) => (
                <li
                  key={c.name}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                    i === 1 ? 'border-seal bg-seal-soft' : 'border-line'
                  }`}
                >
                  <span className="font-bold">{c.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      c.level === '중학교' ? 'bg-ink text-white' : 'bg-paper-deep text-ink-soft'
                    }`}
                  >
                    {c.level}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink-soft">하나만 부족해도 끝까지 풀 수 없어요.</p>
          </Paper>
        }
      >
        <p>
          수능 문제 하나에는 여러 개념이 함께 쓰여요. 2022학년도 수능 15번에는 코사인법칙과 함께 중학교에서 배운 반원에
          대한 원주각, 삼각비, 피타고라스 정리까지 4개의 개념이 쓰였어요. 이 가운데 하나만 부족해도 문제를 끝까지 풀 수
          없어요.
        </p>
        <p>
          기출비급에서는 내 풀이가 막힌 곳에서 어떤 개념이 부족했는지 찾을 수 있어요. 부족한 개념이 중학교 개념이라면
          중학교 개념까지 다시 보고, 같은 개념이 쓰인 기출들을 모아서 다시 풀어 볼 수도 있어요.
        </p>
      </FeatureRow>
    </Section>
  )
}

function FeatureRounds() {
  return (
    <Section>
      <FeatureRow
        index="03 · 회차 기록"
        title="다시 풀 때, 지난번 풀이와 비교하세요"
        visual={
          <div className="grid grid-cols-2 gap-3 rounded-3xl bg-paper-deep p-4 sm:p-6">
            {(['1회차', '2회차'] as const).map((r, i) => (
              <div key={r} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
                <p className="mb-3 text-xs font-bold text-ink-soft">{r}</p>
                <Scribble w="80%" />
                <Scribble w="60%" mark={i === 0 ? 'wrong' : 'fixed'} />
                <Scribble w="70%" />
                <Scribble w="40%" />
                <p className={`mt-3 text-xs font-bold ${i === 0 ? 'text-seal' : 'text-emerald-700'}`}>
                  {i === 0 ? '여기서 막혔어요' : '이번엔 풀었어요'}
                </p>
              </div>
            ))}
          </div>
        }
      >
        <p>
          채점할 때마다 내 풀이가 회차별로 저장돼요. 다시 풀고 나서 1회차 풀이를 열면, 지난번에 막힌 곳을 이번에는
          어떻게 풀었는지, 풀이가 얼마나 나아졌는지 비교해서 볼 수 있어요.
        </p>
      </FeatureRow>
    </Section>
  )
}

/* ───────── 맛보기 ───────── */

function Trial() {
  return (
    <Section tone="deep">
      <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-sm sm:px-12">
        <H2>결제하기 전에, 3문제를 직접 풀어 보세요</H2>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-ink-soft">
          가입하지 않아도 확률과 통계, 대수, 미적분Ⅰ에서 한 문제씩 풀어 볼 수 있어요. 풀이 점검, 해설, 개념, AI 선생님
          질문까지 모든 기능을 그대로 쓸 수 있어요.
        </p>
        <TrialButton label="3문제 풀어 보기" className="mt-8" />
        <p className="mt-4 text-sm text-ink-soft">iPad와 갤럭시 탭에서 펜으로 풀어요.</p>
      </div>
    </Section>
  )
}

/* ───────── 그 밖에 ───────── */

const EXTRAS = [
  {
    title: '읽고 나면 혼자 써 낼 수 있는 해설',
    body: '해설은 교과서에서 배우는 개념만으로, 한 단계에 한 가지 생각씩 적었어요. 단계마다 그 단계에서 쓴 개념이 함께 붙어 있어서, 해설을 읽고 나면 왜 그 식을 세웠는지 내 말로 설명할 수 있어요. 그림이 필요한 문제는 그림으로 보여 주고, 다른 길로 푸는 방법도 함께 실었어요.',
  },
  {
    title: '풀던 화면에서 바로 질문',
    body: 'AI 선생님은 지금 보고 있는 문제와 내가 쓴 풀이를 함께 읽고 답해요. 사진을 찍거나 풀이를 옮겨 적을 필요가 없어요. 해설을 읽다가 막힌 부분도 그대로 이어서 물어볼 수 있어요.',
  },
  {
    title: '개념 책',
    body: '막힌 개념이 있으면 개념서를 따로 펼치지 않고 그 자리에서 다시 볼 수 있어요. 공식만 외우는 대신 그 공식이 왜 성립하는지부터 이해할 수 있고, 중학교 개념이 기억나지 않으면 그 개념도 같은 방식으로 다시 볼 수 있어요.',
  },
  {
    title: '오답노트',
    body: '틀린 문제는 따로 옮겨 적지 않아도 개념별로 오답노트에 모여요. 내가 어떤 개념에서 자주 틀리는지 한눈에 보이고, 시험 전에는 아직 못 푼 문제만 골라 다시 풀면 돼요.',
  },
  {
    title: '유형별, 쉬운 문제부터',
    body: '유형 안에서 2점, 3점, 4점 순서로, 4점은 난이도 하, 중, 상 순서로 놓여 있어요. 쉬운 문제로 개념을 확인한 다음 어려운 문제로 넘어갈 수 있어서, 내가 어느 난이도까지 풀 수 있는지도 알 수 있어요.',
  },
]

function Extras() {
  return (
    <Section>
      <H2>그 밖에, 기출 공부에 필요한 것은 모두 들어 있어요</H2>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {EXTRAS.map((e) => (
          <article key={e.title} className="rounded-2xl border border-line bg-white p-6">
            <h3 className="text-lg font-bold">{e.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{e.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Scope() {
  return (
    <Section tone="ink">
      <div className="max-w-3xl">
        <H2>2028 수능 범위에 맞는 기출만 담았어요</H2>
        <p className="mt-6 leading-relaxed text-white/75 sm:text-lg">
          2028 수능부터는 2022 개정 교육과정 범위에서 출제돼요. 어떤 기출을 풀어야 할지 고르느라 더 이상 시간을 쓰지
          마세요. 기출비급은 2022 개정 교육과정에 맞춰 모든 문항을 검토하고, 꼭 풀어야 할 문제만 남겼어요.
        </p>
      </div>
    </Section>
  )
}

/* ───────── 가격 ───────── */

function PriceCard({
  product,
  title,
  cta,
  to,
  featured = false,
}: {
  product: Product
  title: string
  cta: string
  to: string
  featured?: boolean
}) {
  return (
    <div
      className={`flex flex-col rounded-3xl p-7 sm:p-8 ${
        featured ? 'bg-ink text-white shadow-xl ring-2 ring-seal' : 'border border-line bg-white'
      }`}
    >
      <p className={`text-sm font-bold ${featured ? 'text-white/70' : 'text-ink-soft'}`}>{title}</p>
      <p className="mt-2 text-4xl font-bold">{won(product.price)}</p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {(product.kind === 'single' ? ['원하는 과목 1권', ...product.perks.slice(1)] : product.perks).map((p) => (
          <li key={p} className="flex gap-2">
            <span className="text-seal">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <Link to={to} className={`mt-8 ${featured ? btnPrimary : btnGhost}`}>
        {cta}
      </Link>
    </div>
  )
}

function Pricing() {
  const pass = findProduct('pass-3')!
  const single = findProduct('prob')!
  return (
    <Section id="pricing" tone="deep">
      <H2 className="text-center">확률과 통계, 대수, 미적분Ⅰ 3권을 27,900원에</H2>
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        <PriceCard product={pass} title="3권 패스" cta="3권 패스 받기" to="/checkout/pass-3" featured />
        <PriceCard product={single} title="단권" cta="단권 고르기" to="/pass" />
      </div>
      <p className="mt-8 text-center text-sm text-ink-soft">
        질문을 다 쓰면 앱에서 약 100회를 4,000원에 추가할 수 있어요.
      </p>
    </Section>
  )
}

/* ───────── 자주 묻는 질문 ───────── */

function Faq() {
  return (
    <Section>
      <H2>자주 묻는 질문</H2>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {f.q}
              <span className="text-xl text-ink-soft transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}

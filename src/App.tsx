import { useEffect, useState } from 'react'

const FEATURES = [
  {
    title: '틀린 이유를 중학교 개념까지',
    body: '틀린 문제에서 빠진 개념을 거슬러 올라가, 막힌 곳을 정확히 짚어 줍니다.',
  },
  {
    title: '오답 노트는 자동으로',
    body: '채점하는 순간 틀리거나 넘긴 문제가 오답 노트에 쌓입니다.',
  },
  {
    title: 'AI 선생님의 풀이 점검',
    body: '펜으로 쓴 내 풀이를 보고, 어디서 어긋났는지 알려 줍니다.',
  },
]

const BOOKS = ['확률과 통계', '대수', '미적분Ⅰ']

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <span className="text-xl font-bold tracking-tight">기출비급</span>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <section className="py-16 text-center sm:py-24">
          <p className="text-sm font-bold text-seal">재수·정시 수능 수학</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            기출을 펜으로 풀고,
            <br />
            틀린 이유를 끝까지
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-stone-600 sm:text-lg">
            태블릿에서 종이처럼 풀고, 틀린 문제는 중학교 개념까지 거슬러 짚어 주는 오답 진단 교재
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {BOOKS.map((b) => (
              <span
                key={b}
                className="rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-700"
              >
                {b}
              </span>
            ))}
          </div>
          <PayButton onClick={() => setOpen(true)} className="mt-10" />
        </section>

        <section className="grid gap-4 pb-20 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-bold">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.body}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-stone-200 py-6 text-center text-xs text-stone-500">
        © 2026 기출비급
      </footer>

      {open && <ComingSoonDialog onClose={() => setOpen(false)} />}
    </div>
  )
}

function PayButton({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl bg-seal px-8 py-4 text-lg font-bold text-white shadow-sm transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal ${className}`}
    >
      교재 결제하기
    </button>
  )
}

function ComingSoonDialog({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="coming-soon-title" className="text-lg font-bold">
          결제 준비 중이에요
        </h2>
        <p className="mt-2 text-sm text-stone-600">곧 열릴 예정이에요. 조금만 기다려 주세요.</p>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-ink py-3 font-bold text-white hover:bg-stone-700"
        >
          확인
        </button>
      </div>
    </div>
  )
}

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

type Notice = { title: string; body: string }

const ComingSoonContext = createContext<(notice?: Partial<Notice>) => void>(() => {})

const DEFAULT: Notice = {
  title: '준비 중이에요',
  body: '곧 열릴 예정이에요. 조금만 기다려 주세요.',
}

// 아직 없는 기능(결제, 맛보기)을 누르면 안내 창을 띄운다.
export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<Notice | null>(null)
  const show = useCallback((n?: Partial<Notice>) => setNotice({ ...DEFAULT, ...n }), [])

  return (
    <ComingSoonContext.Provider value={show}>
      {children}
      {notice && <Dialog notice={notice} onClose={() => setNotice(null)} />}
    </ComingSoonContext.Provider>
  )
}

export const useComingSoon = () => useContext(ComingSoonContext)

function Dialog({ notice, onClose }: { notice: Notice; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="coming-soon-title" className="text-lg font-bold">
          {notice.title}
        </h2>
        <p className="mt-2 text-sm text-ink-soft">{notice.body}</p>
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

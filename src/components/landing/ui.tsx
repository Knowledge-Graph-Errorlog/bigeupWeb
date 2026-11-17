import type { ReactNode } from 'react'

/** 본문 폭. 넓은 모니터에서 양옆이 비어 보이지 않게 1360px까지 */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1520px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`reveal text-[27px] leading-[1.3] font-extrabold tracking-[-0.03em] sm:text-[38px] lg:text-[46px] lg:leading-[1.22] ${className}`}>
      {children}
    </h2>
  )
}

const btn =
  'inline-flex h-[52px] items-center justify-center rounded-xl px-6 text-[16px] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2'
export const btnPen = `${btn} bg-pen text-white hover:bg-pen-deep focus-visible:outline-pen`
/** 보조 버튼: 포인트 색의 아주 옅은 버전 */
export const btnQuiet = `${btn} bg-pen-soft text-pen-deep hover:bg-[#f6dcdc] focus-visible:outline-pen`
export const btnLine = `${btn} border border-line bg-sheet text-ink hover:bg-desk focus-visible:outline-ink`

type Shot = { small: string; large: string; alt: string; w: number; h: number }

/** 앱 화면 캡처. 작은 화면에는 작은 파일을 준다 */
export function AppShot({ shot, className = '', eager = false, sizes = '(min-width: 1024px) 60vw, 100vw' }: { shot: Shot; className?: string; eager?: boolean; sizes?: string }) {
  return (
    <img
      src={shot.large}
      srcSet={`${shot.small} 1000w, ${shot.large} 1800w`}
      sizes={sizes}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`block h-auto w-full ${className}`}
    />
  )
}

/** 태블릿 테두리. 안에 앱 화면(가로 1194:834)을 넣는다 */
export function Tablet({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[clamp(14px,2.6vw,34px)] bg-ink p-[clamp(5px,0.9vw,12px)] shadow-[0_2px_4px_rgba(20,22,26,0.1),0_30px_70px_-20px_rgba(20,22,26,0.35)] ${className}`}>
      <div className="relative aspect-[1194/834] overflow-hidden rounded-[clamp(9px,1.8vw,23px)] bg-sheet">{children}</div>
    </div>
  )
}

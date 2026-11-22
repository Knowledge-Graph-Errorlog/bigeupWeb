import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { COMPANY } from '../data/company'
import { useLoggedIn } from '../lib/auth'
import { useSmoothAnchors } from '../hooks/useSmoothAnchors'
import Logo from './Logo'

// 랜딩에서만 보이는 페이지 안 이동 (PC)
const ANCHORS = [
  { href: '#how', label: '기능' },
  { href: '#concept', label: '개념' },
  { href: '#pricing', label: '가격' },
  { href: '#faq', label: '자주 묻는 질문' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const loggedIn = useLoggedIn()
  useSmoothAnchors()
  // 페이지를 옮기면 맨 위로. scrollTo의 반환값(최신 Chrome은 Promise)을 effect에서 돌려주면
  // React가 정리 함수로 착각해 화면이 지워지므로, 블록으로 감싸 아무것도 돌려주지 않는다.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-sheet/90 backdrop-blur">
        <div className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo />
          {/* 헤더 한가운데 (로고·오른쪽 메뉴 폭과 상관없이) */}
          {pathname === '/' && (
              <nav aria-label="페이지 안 이동" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[15px] text-ink-soft lg:flex">
                {ANCHORS.map((a) => (
                  <a key={a.href} href={a.href} className="transition-colors hover:text-ink">
                    {a.label}
                  </a>
                ))}
              </nav>
          )}
          <nav className="flex items-center gap-1 sm:gap-2">
            {loggedIn ? (
              <NavLink
                to="/me"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm hover:bg-paper-deep ${isActive ? 'font-bold text-ink' : 'text-ink-soft'}`
                }
              >
                내 정보
              </NavLink>
            ) : (
              <Link to={/^\/(login|signup|auth)(\/|$)/.test(pathname) ? '/login' : `/login?next=${encodeURIComponent(pathname)}`} className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-paper-deep">
                로그인
              </Link>
            )}
            <NavLink
              to="/pass"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-bold transition sm:text-base ${
                  isActive ? 'bg-seal text-white' : 'text-ink hover:bg-paper-deep'
                }`
              }
            >
              비급교재 구매
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-paper-deep">
        <div className="mx-auto max-w-[1200px] px-5 py-8 text-xs leading-relaxed text-ink-soft sm:px-8 lg:px-12">
          <nav className="flex flex-wrap gap-x-4 gap-y-1 font-bold text-ink">
            <Link to="/terms" className="hover:underline">
              이용약관
            </Link>
            <Link to="/privacy" className="hover:underline">
              개인정보 처리방침
            </Link>
            <Link to="/refund" className="hover:underline">
              환불·배송 정책
            </Link>
          </nav>
          {/* 카드사 심사 필수: 상호·대표자·사업자등록번호·통신판매업 신고번호·주소·대표전화 (사업자등록증과 같게) */}
          <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {[
              ['상호', COMPANY.name],
              ['대표자', COMPANY.ceo],
              ['사업자등록번호', COMPANY.bizNo],
              ['통신판매업 신고번호', COMPANY.mailOrderNo],
              ['주소', COMPANY.address],
              ['대표전화(고객센터)', COMPANY.phone || '준비 중'],
              ...(COMPANY.email ? [['이메일', COMPANY.email]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex gap-1">
                <dt>{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4">© 2026 {COMPANY.name}. {COMPANY.service}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

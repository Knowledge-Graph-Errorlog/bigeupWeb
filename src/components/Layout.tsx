import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { COMPANY, contactText } from '../data/company'
import { logout, useLoggedIn } from '../lib/auth'
import Logo from './Logo'

export default function Layout() {
  const { pathname } = useLocation()
  const loggedIn = useLoggedIn()
  // 페이지를 옮기면 맨 위로. scrollTo의 반환값(최신 Chrome은 Promise)을 effect에서 돌려주면
  // React가 정리 함수로 착각해 화면이 지워지므로, 블록으로 감싸 아무것도 돌려주지 않는다.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="flex items-center gap-1 sm:gap-2">
            {loggedIn ? (
              <button type="button" onClick={() => void logout()} className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-paper-deep">
                로그아웃
              </button>
            ) : (
              <Link to={`/login?next=${encodeURIComponent(pathname)}`} className="rounded-lg px-3 py-2 text-sm text-ink-soft hover:bg-paper-deep">
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
              기출비급패스
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs leading-relaxed text-ink-soft sm:px-6">
          <nav className="flex flex-wrap gap-x-4 gap-y-1 font-bold text-ink">
            <Link to="/terms" className="hover:underline">
              이용약관
            </Link>
            <Link to="/privacy" className="hover:underline">
              개인정보 처리방침
            </Link>
            <Link to="/refund" className="hover:underline">
              환불 정책
            </Link>
          </nav>
          {/* 카드사 심사 필수: 상호·대표자·사업자등록번호·통신판매업 신고번호·주소·전화 (사업자등록증과 같게) */}
          <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {[
              ['상호', COMPANY.name],
              ['대표자', COMPANY.ceo],
              ['사업자등록번호', COMPANY.bizNo],
              ['통신판매업 신고번호', COMPANY.mailOrderNo],
              ['주소', COMPANY.address],
              ['고객센터', contactText()],
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

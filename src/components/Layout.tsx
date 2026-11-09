import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'
import Logo from './Logo'

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav>
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
          <p className="font-bold text-ink">기출비급</p>
          {/* 사업자 정보·약관 링크는 확정되면 넣는다 */}
          <p className="mt-2">© 2026 기출비급. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

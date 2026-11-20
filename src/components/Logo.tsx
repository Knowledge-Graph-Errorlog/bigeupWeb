import { Link, useLocation } from 'react-router'
import logo from '../assets/logo.webp'

// 가로형 로고 (디자이너 원본: 브랜딩/로고_가로ver.png, 바탕 투명)
export default function Logo({ className = '' }: { className?: string }) {
  const { pathname } = useLocation()
  const cls = `inline-flex items-center ${className}`
  const img = <img src={logo} alt="기출비급" width={361} height={132} className="block h-8 w-auto sm:h-9" />
  // 랜딩에서는 맨 위로 미끄러지듯 올라간다 (useSmoothAnchors)
  return pathname === '/' ? (
    <a href="#top" className={cls} aria-label="기출비급 맨 위로">
      {img}
    </a>
  ) : (
    <Link to="/" className={cls} aria-label="기출비급 홈">
      {img}
    </Link>
  )
}

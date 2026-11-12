import { Route, Routes } from 'react-router'
import { ComingSoonProvider } from './components/ComingSoon'
import Layout from './components/Layout'
import Checkout from './pages/Checkout'
import { CheckoutFail, CheckoutSuccess } from './pages/CheckoutResult'
import CodeCallback from './pages/auth/CodeCallback'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Landing from './pages/Landing'
import MyPage from './pages/MyPage'
import NotFound from './pages/NotFound'
import PassShop from './pages/PassShop'
import ProductDetail from './pages/ProductDetail'
import Privacy from './pages/legal/Privacy'
import Refund from './pages/legal/Refund'
import Terms from './pages/legal/Terms'

export default function App() {
  return (
    <ComingSoonProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="pass" element={<PassShop />} />
          <Route path="pass/:id" element={<ProductDetail />} />
          <Route path="checkout/success" element={<CheckoutSuccess />} />
          <Route path="checkout/fail" element={<CheckoutFail />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="me" element={<MyPage />} />
          <Route path="auth/kakao/callback" element={<CodeCallback provider="kakao" />} />
          <Route path="auth/naver/callback" element={<CodeCallback provider="naver" />} />
          {/* 약관류: 앱도 이 주소를 연다 (frontend VITE_TERMS_URL·VITE_PRIVACY_URL·VITE_REFUND_URL) */}
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="refund" element={<Refund />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ComingSoonProvider>
  )
}

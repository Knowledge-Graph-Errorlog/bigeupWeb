import { Route, Routes } from 'react-router'
import { ComingSoonProvider } from './components/ComingSoon'
import Layout from './components/Layout'
import Checkout from './pages/Checkout'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'
import PassShop from './pages/PassShop'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <ComingSoonProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="pass" element={<PassShop />} />
          <Route path="pass/:id" element={<ProductDetail />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ComingSoonProvider>
  )
}


import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

import HomePage from './pages/HomePage/HomePage.jsx'
import ProductListingPage from './pages/ProductListingPage/ProductListingPage.jsx'
import ProductViewPage from './pages/ProductViewPage/ProductViewPage.jsx'
import CategoriesPage from './pages/CategoriesPage/CategoriesPage.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'

import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import MyPage from './pages/MyPage/MyPage.jsx'
import MyDataPage from './pages/MyPage/MyDataPage/MyDataPage.jsx'
import MyAddressesPage from './pages/MyAddressesPage/MyAddressesPage.jsx'
import WishlistPage from './pages/WishlistPage/WishlistPage.jsx'
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage.jsx'

import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext'

function App() {
  return (
    <CartProvider>
       <WishlistProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductListingPage />} />
          <Route path="/produto/:id" element={<ProductViewPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/carrinho" element={<CartPage />} />

          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/meus-pedidos" element={<MyPage />} />
          <Route path="/meus-dados" element={<MyDataPage />} />
          <Route path="/meus-enderecos" element={<MyAddressesPage />} />
          <Route path="/lista-desejos" element={<WishlistPage />} />
          <Route path="/alterar-senha" element={<ChangePasswordPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App

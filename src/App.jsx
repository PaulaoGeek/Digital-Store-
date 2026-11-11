
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'

import HomePage from './pages/HomePage/HomePage.jsx'
import ProductListingPage from './pages/ProductListingPage/ProductListingPage.jsx'
import CategoriesPage from './pages/CategoriesPage/CategoriesPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/produtos"
          element={<ProductListingPage />}
        />

        <Route
          path="/categorias"
          element={<CategoriesPage />}
        />

        <Route
          path="/meus-pedidos"
          element={<PagePlaceholder title="Meus pedidos" />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

function PagePlaceholder({ title }) {
  return (
    <main
      className="container"
      style={{
        paddingTop: '60px',
        paddingBottom: '60px'
      }}
    >
      <h1>{title}</h1>

      <p style={{ marginTop: '12px', color: '#666666' }}>
        Estamos preparando esta página. Em breve você poderá explorar todas as funcionalidades!
      </p>
    </main>
  )
}

export default App

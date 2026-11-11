
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
//paginas principais
import HomePage from './pages/HomePage/HomePage.jsx'
import ProductListingPage from './pages/ProductListingPage/ProductListingPage.jsx'
import CategoriesPage from './pages/CategoriesPage/CategoriesPage.jsx'

//telas de login e cadastro
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'

//pagina de perfil do usuario
import MyPage from './pages/MyPage/MyPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/produtos" element={<ProductListingPage />}/>

        <Route
          path="/categorias"element={<CategoriesPage />} />
          
        <Route 
          path="/cadastro" element={<RegisterPage />} />

        <Route 
        path="/login" element={<LoginPage />} />

        <Route 
        path="/meus-pedidos" element={<MyPage />} />

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

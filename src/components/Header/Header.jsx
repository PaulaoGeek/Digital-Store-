
import {
  Search,
  ShoppingCart,
  User
} from 'lucide-react'

import { Link, NavLink } from 'react-router-dom'

import './Header.css'

function Header() {
  return (
    <header className="header">

      <div className="header-top container">

        <Link to="/" className="header-logo">
          <span className="logo-symbol">D</span>
          <span>Digital Store</span>
        </Link>

        <div className="header-search">
          <input
            type="text"
            placeholder="Pesquisar produto..."
          />

          <button aria-label="Pesquisar">
            <Search size={22} />
          </button>
        </div>

        <div className="header-actions">

          <Link to="/cadastro" className="register-link">
            Cadastre-se
          </Link>

          <Link to="/login" className="login-button">
            <User size={18} />
            Entrar
          </Link>

          <button
            className="cart-button"
            aria-label="Carrinho"
          >
            <ShoppingCart size={25} />
          </button>

        </div>

      </div>

      <nav className="header-nav container">

        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Home
        </NavLink>

        <NavLink
          to="/produtos"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Produtos
        </NavLink>

        <NavLink
          to="/categorias"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Categorias
        </NavLink>

        <NavLink
          to="/meus-pedidos"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Meus Pedidos
        </NavLink>

      </nav>

    </header>
  )
}

export default Header


import { useEffect, useState } from 'react'

import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Package,
  UserRound,
  MapPin,
  Heart,
  LockKeyhole,
  LogOut
} from 'lucide-react'

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import './Header.css'

function getStoredUser() {
  try {
    const savedUser = localStorage.getItem('digitalStoreUser')
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

function Header() {
  const [user, setUser] = useState(getStoredUser)
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  // Atualiza o cabeçalho quando o usuário entra ou muda de página
  useEffect(() => {
    setUser(getStoredUser())
  }, [location.pathname])

  function handleLogout() {
    localStorage.removeItem('digitalStoreUser')
    setUser(null)
    setMenuOpen(false)
    navigate('/')
  }

  const userName = user?.email
    ? user.email.split('@')[0]
    : ''

  const formattedName = userName
    ? userName.charAt(0).toUpperCase() + userName.slice(1)
    : 'Usuário'

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

          {!user ? (
            <>
              <Link to="/cadastro" className="register-link">
                Cadastre-se
              </Link>

              <Link to="/login" className="login-button">
                <User size={18} />
                Entrar
              </Link>
            </>
          ) : (
            <div className="account-menu">

              <button
                type="button"
                className="account-trigger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
              >
                <span className="account-user-icon">
                  <User size={20} />
                </span>

                <span className="account-greeting">
                  <span>Olá,</span>
                  <strong>{formattedName}</strong>
                </span>

                <ChevronDown
                  size={17}
                  className={menuOpen ? 'account-chevron open' : 'account-chevron'}
                />
              </button>

              {menuOpen && (
                <div className="account-dropdown">

                  <Link
                    to="/meus-pedidos"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Package size={18} />
                    <span>Meus pedidos</span>
                  </Link>

                  <Link
                    to="/meus-dados"
                    onClick={() => setMenuOpen(false)}
                  >
                    <UserRound size={18} />
                    <span>Meus dados pessoais</span>
                  </Link>

                  <Link
                    to="/meus-enderecos"
                    onClick={() => setMenuOpen(false)}
                  >
                    <MapPin size={18} />
                    <span>Meus endereços</span>
                  </Link>

                  <Link
                    to="/lista-desejos"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Heart size={18} />
                    <span>Minha lista de desejos</span>
                  </Link>

                  <Link
                    to="/alterar-senha"
                    onClick={() => setMenuOpen(false)}
                  >
                    <LockKeyhole size={18} />
                    <span>Alterar senha</span>
                  </Link>

                  <div className="account-dropdown-divider" />

                  <button
                    type="button"
                    className="account-logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Sair da conta</span>
                  </button>

                </div>
              )}

            </div>
          )}

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

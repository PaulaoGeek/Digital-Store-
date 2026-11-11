
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState(location.state?.email || '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setFeedback('')

    if (!email.trim() || !password.trim()) {
      setFeedback('Preencha seu e-mail e sua senha para continuar.')
      return
    }

    // Simulação de usuário conectado no front-end
    const user = {
      name: location.state?.name || email.split('@')[0],
      email: email
    }

    // Guarda os dados básicos do usuário para a próxima etapa
    localStorage.setItem('digitalStoreUser', JSON.stringify(user))

    // Exibe a janela de sucesso
    setSuccess(true)

    // Redireciona para a página inicial após 3 segundos
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  return (
    <main className="login-page">
      <div className="login-container">

        <div className="login-heading">
          <span className="login-tag">DIGITAL STORE</span>

          <h1>Bem-vindo de volta!</h1>

          <p>
            Entre na sua conta para continuar suas compras.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="login-field">
            <label htmlFor="login-email">E-mail</label>

            <input
              id="login-email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Senha</label>

            <div className="login-password-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="login-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <div className="login-options">
            <Link to="/recuperar-senha">
              Esqueceu sua senha?
            </Link>
          </div>

          {feedback && (
            <div className="login-feedback" role="alert">
              {feedback}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={success}
          >
            Entrar na minha conta
          </button>

        </form>

        <div className="login-register">
          <span>Ainda não possui uma conta?</span>
          <Link to="/cadastro">Criar minha conta</Link>
        </div>

      </div>

      {/* JANELA DE LOGIN REALIZADO */}
      {success && (
        <div className="login-modal-overlay">
          <div
            className="login-success-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="login-success-title"
          >
            <div className="login-success-icon">✓</div>

            <h2 id="login-success-title">
              Login realizado!
            </h2>

            <p>
              Seja bem-vindo à Digital Store!
            </p>

            <p>
              Seu acesso foi concluído com sucesso.
            </p>

            <div className="login-redirect-message">
              Redirecionando para a página inicial...
            </div>

            <div className="login-loading-bar">
              <span />
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default LoginPage

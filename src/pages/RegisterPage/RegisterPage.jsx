
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './RegisterPage.css'

function RegisterPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setFeedback('')

    if (password !== confirmPassword) {
      setFeedback('As senhas não coincidem. Confira e tente novamente.')
      return
    }

    if (password.length < 8) {
      setFeedback('A senha precisa ter pelo menos 8 caracteres.')
      return
    }

    if (!acceptedTerms) {
      setFeedback('Você precisa aceitar os termos para continuar.')
      return
    }

    // Cadastro validado: exibe a janela de sucesso
    setSuccess(true)

    // Após 3 segundos, segue para o login com o e-mail preenchido
    setTimeout(() => {
      navigate('/login', {
        state: { email, name }
      })
    }, 3000)
  }

  return (
    <main className="register-page">
      <div className="register-container">

        <div className="register-heading">
          <span className="register-tag">DIGITAL STORE</span>
          <h1>Crie sua conta</h1>
          <p>
            Faça seu cadastro e aproveite uma experiência
            de compras ainda melhor.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>

          <div className="register-field">
            <label htmlFor="register-name">Nome completo</label>
            <input
              id="register-name"
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-email">E-mail</label>
            <input
              id="register-email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="register-field">
            <label htmlFor="register-password">Senha</label>

            <div className="register-password-wrapper">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Crie uma senha com pelo menos 8 caracteres"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <div className="register-field">
            <label htmlFor="register-confirm-password">
              Confirmar senha
            </label>

            <div className="register-password-wrapper">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Digite sua senha novamente"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="register-show-password"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <label className="register-terms">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
            />

            <span>
              Li e aceito os termos de uso e a política de privacidade.
            </span>
          </label>

          {feedback && (
            <div className="register-feedback" role="alert">
              {feedback}
            </div>
          )}

          <button
            type="submit"
            className="register-submit"
            disabled={success}
          >
            Criar minha conta
          </button>

        </form>

        <div className="register-login">
          <span>Já possui uma conta?</span>
          <Link to="/login">Fazer login</Link>
        </div>

      </div>

      {/* JANELA DE CADASTRO REALIZADO */}
      {success && (
        <div className="register-modal-overlay">
          <div
            className="register-success-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="register-success-title"
          >
            <div className="register-success-icon">✓</div>

            <h2 id="register-success-title">
              Cadastro realizado!
            </h2>

            <p>
              Sua conta foi cadastrada com sucesso.
            </p>

            <p>
              Agora você já pode acessar sua conta na Digital Store.
            </p>

            <div className="register-redirect-message">
              Redirecionando para a tela de login...
            </div>

            <div className="register-loading-bar">
              <span />
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default RegisterPage

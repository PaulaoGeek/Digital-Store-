
import { useState } from 'react'
import {
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './ChangePasswordPage.css'

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    setMessage('')
    setSuccess(false)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('Preencha todos os campos.')
      return
    }

    if (newPassword.length < 8) {
      setMessage('A nova senha deve ter pelo menos 8 caracteres.')
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage('A confirmação da nova senha não corresponde.')
      return
    }

    if (newPassword === currentPassword) {
      setMessage('A nova senha deve ser diferente da senha atual.')
      return
    }

    let currentUser
    let accounts

    try {
      currentUser = JSON.parse(
        localStorage.getItem('digitalStoreUser') || 'null'
      )

      accounts = JSON.parse(
        localStorage.getItem('digitalStoreAccounts') || '[]'
      )

      if (!Array.isArray(accounts)) {
        accounts = []
      }
    } catch {
      setMessage('Não foi possível acessar os dados da conta.')
      return
    }

    if (!currentUser?.email) {
      setMessage('Entre na sua conta para alterar a senha.')
      return
    }

    const userIndex = accounts.findIndex(
      account => account.email === currentUser.email
    )

    if (userIndex === -1) {
      setMessage(
        'Não encontramos os dados desta conta. Faça um novo cadastro e entre novamente.'
      )
      return
    }

    if (accounts[userIndex].password !== currentPassword) {
      setMessage('A senha atual está incorreta.')
      return
    }

    const updatedAccounts = accounts.map((account, index) =>
      index === userIndex
        ? { ...account, password: newPassword }
        : account
    )

    localStorage.setItem(
      'digitalStoreAccounts',
      JSON.stringify(updatedAccounts)
    )

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')

    setSuccess(true)
    setMessage('Sua senha foi alterada com sucesso!')
  }

  return (
    <main className="change-password-page">
      <div className="change-password-container">

        <div className="change-password-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/meus-dados">Minha conta</Link>
          <span>/</span>
          <strong>Alterar senha</strong>
        </div>

        <div className="change-password-card">

          <div className="change-password-header">
            <div className="change-password-icon">
              <LockKeyhole size={28} />
            </div>

            <h1>Alterar senha</h1>

            <p>
              Para manter sua conta protegida, informe sua senha atual
              e escolha uma nova senha.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="change-password-field">
              <label>Senha atual</label>

              <div className="change-password-input">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={event => setCurrentPassword(event.target.value)}
                  placeholder="Digite sua senha atual"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(!showCurrentPassword)
                  }
                >
                  {showCurrentPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div className="change-password-field">
              <label>Nova senha</label>

              <div className="change-password-input">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={event => setNewPassword(event.target.value)}
                  placeholder="Digite sua nova senha"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <small>A senha deve ter pelo menos 8 caracteres.</small>
            </div>

            <div className="change-password-field">
              <label>Confirmar nova senha</label>

              <div className="change-password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                  placeholder="Digite novamente sua nova senha"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`change-password-message ${
                  success ? 'success' : 'error'
                }`}
              >
                {success
                  ? <CheckCircle2 size={19} />
                  : <AlertCircle size={19} />}

                <span>{message}</span>
              </div>
            )}

            <button type="submit" className="change-password-submit">
              Salvar nova senha
            </button>

            <Link to="/meus-dados" className="change-password-back">
              Voltar para meus dados
            </Link>

          </form>
        </div>
      </div>
    </main>
  )
}

export default ChangePasswordPage

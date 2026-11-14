
import { useState } from 'react'
import {
  UserRound,
  Mail,
  Phone,
  Pencil,
  Save,
  X
} from 'lucide-react'

import './MyDataPage.css'

function getStoredUser() {
  try {
    const savedUser = localStorage.getItem('digitalStoreUser')
    return savedUser ? JSON.parse(savedUser) : {}
  } catch {
    return {}
  }
}

function MyDataPage() {
  const [userData, setUserData] = useState(() => {
    const user = getStoredUser()

    return {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setUserData(currentData => ({
      ...currentData,
      [name]: value
    }))
  }

  function handleSave(event) {
    event.preventDefault()

    const currentUser = getStoredUser()

    const updatedUser = {
      ...currentUser,
      ...userData
    }

    localStorage.setItem(
      'digitalStoreUser',
      JSON.stringify(updatedUser)
    )

    setUserData({
      name: updatedUser.name || '',
      email: updatedUser.email || '',
      phone: updatedUser.phone || ''
    })

    setIsEditing(false)
    setMessage('Seus dados foram atualizados com sucesso!')
  }

  function handleCancel() {
    const user = getStoredUser()

    setUserData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    })

    setIsEditing(false)
    setMessage('')
  }

  return (
    <main className="my-data-page">
      <div className="my-data-container">

        <div className="my-data-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Minha conta</span>
          <span>/</span>
          <strong>Meus dados</strong>
        </div>

        <div className="my-data-heading">
          <div>
            <span className="my-data-tag">MINHA CONTA</span>
            <h1>Meus dados</h1>
            <p>
              Consulte e atualize suas informações pessoais.
            </p>
          </div>

          <div className="my-data-icon">
            <UserRound size={27} />
          </div>
        </div>

        <section className="my-data-card">

          <div className="my-data-card-header">
            <div>
              <h2>Informações pessoais</h2>
              <p>Mantenha seus dados sempre atualizados.</p>
            </div>

            {!isEditing && (
              <button
                type="button"
                className="my-data-edit-button"
                onClick={() => {
                  setMessage('')
                  setIsEditing(true)
                }}
              >
                <Pencil size={17} />
                Editar dados
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>

            <div className="my-data-fields">

              <div className="my-data-field">
                <label htmlFor="name">Nome completo</label>

                <div className="my-data-input-wrapper">
                  <UserRound size={19} />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome completo"
                    value={userData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="my-data-field">
                <label htmlFor="email">E-mail</label>

                <div className="my-data-input-wrapper">
                  <Mail size={19} />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="my-data-field">
                <label htmlFor="phone">Telefone</label>

                <div className="my-data-input-wrapper">
                  <Phone size={19} />

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={userData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

            </div>

            {message && (
              <div className="my-data-success">
                {message}
              </div>
            )}

            {isEditing && (
              <div className="my-data-actions">

                <button
                  type="button"
                  className="my-data-cancel-button"
                  onClick={handleCancel}
                >
                  <X size={18} />
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="my-data-save-button"
                >
                  <Save size={18} />
                  Salvar alterações
                </button>

              </div>
            )}

          </form>

        </section>

        <p className="my-data-note">
          Seus dados são armazenados neste navegador nesta versão do projeto.
        </p>

      </div>
    </main>
  )
}

export default MyDataPage


import { useState } from 'react'
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Star,
  X,
  Save
} from 'lucide-react'

import './MyAddressesPage.css'

function getSavedAddresses() {
  try {
    const saved = localStorage.getItem('digitalStoreAddresses')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const emptyAddress = {
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: ''
}

function MyAddressesPage() {
  const [addresses, setAddresses] = useState(getSavedAddresses)
  const [formData, setFormData] = useState(emptyAddress)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  function saveAddresses(updatedAddresses) {
    setAddresses(updatedAddresses)

    localStorage.setItem(
      'digitalStoreAddresses',
      JSON.stringify(updatedAddresses)
    )
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormData(current => ({
      ...current,
      [name]: name === 'cep'
        ? value.replace(/\D/g, '').slice(0, 8)
        : value
    }))
  }

  function openNewAddress() {
    setFormData(emptyAddress)
    setEditingId(null)
    setMessage('')
    setFormOpen(true)
  }

  function openEditAddress(address) {
    setFormData({
      cep: address.cep,
      street: address.street,
      number: address.number,
      complement: address.complement || '',
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state
    })

    setEditingId(address.id)
    setMessage('')
    setFormOpen(true)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (formData.cep.length !== 8) {
      setMessage('Informe um CEP válido com 8 números.')
      return
    }

    let updatedAddresses

    if (editingId !== null) {
      updatedAddresses = addresses.map(address =>
        address.id === editingId
          ? { ...address, ...formData }
          : address
      )
    } else {
      const newAddress = {
        ...formData,
        id: Date.now(),
        isPrimary: addresses.length === 0
      }

      updatedAddresses = [...addresses, newAddress]
    }

    saveAddresses(updatedAddresses)
    setFormOpen(false)
    setEditingId(null)
    setFormData(emptyAddress)
    setMessage('Endereço salvo com sucesso!')
  }

  function handleCancel() {
    setFormOpen(false)
    setEditingId(null)
    setFormData(emptyAddress)
    setMessage('')
  }

  function setPrimaryAddress(id) {
    const updatedAddresses = addresses.map(address => ({
      ...address,
      isPrimary: address.id === id
    }))

    saveAddresses(updatedAddresses)
    setMessage('Endereço principal atualizado.')
  }

  function removeAddress(id) {
    const addressToRemove = addresses.find(
      address => address.id === id
    )

    const remainingAddresses = addresses.filter(
      address => address.id !== id
    )

    if (addressToRemove?.isPrimary && remainingAddresses.length > 0) {
      remainingAddresses[0].isPrimary = true
    }

    saveAddresses(remainingAddresses)
    setMessage('Endereço removido com sucesso.')
  }

  return (
    <main className="my-addresses-page">
      <div className="my-addresses-container">

        <div className="addresses-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Minha conta</span>
          <span>/</span>
          <strong>Meus endereços</strong>
        </div>

        <div className="addresses-heading">
          <div>
            <span className="addresses-tag">MINHA CONTA</span>
            <h1>Meus endereços</h1>
            <p>
              Gerencie os endereços utilizados nas suas compras.
            </p>
          </div>

          <div className="addresses-heading-icon">
            <MapPin size={27} />
          </div>
        </div>

        {message && (
          <div className="addresses-message">
            {message}
          </div>
        )}

        <div className="addresses-section-header">
          <div>
            <h2>Endereços cadastrados</h2>
            <p>
              {addresses.length} endereço(s) cadastrado(s)
            </p>
          </div>

          {!formOpen && (
            <button
              className="address-add-button"
              onClick={openNewAddress}
            >
              <Plus size={18} />
              Adicionar endereço
            </button>
          )}
        </div>

        {formOpen && (
          <section className="address-form-card">

            <div className="address-form-header">
              <div>
                <h2>
                  {editingId !== null
                    ? 'Editar endereço'
                    : 'Novo endereço'}
                </h2>
                <p>Preencha os campos abaixo.</p>
              </div>

              <button
                type="button"
                className="address-close-button"
                onClick={handleCancel}
                aria-label="Fechar formulário"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="address-form-grid">

                <div className="address-field">
                  <label htmlFor="cep">CEP *</label>
                  <input
                    id="cep"
                    name="cep"
                    type="text"
                    inputMode="numeric"
                    placeholder="Somente números"
                    value={formData.cep}
                    onChange={handleChange}
                    maxLength={8}
                    required
                  />
                </div>

                <div className="address-field address-field-wide">
                  <label htmlFor="street">Rua ou avenida *</label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Nome da rua ou avenida"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="address-field">
                  <label htmlFor="number">Número *</label>
                  <input
                    id="number"
                    name="number"
                    type="text"
                    placeholder="Número"
                    value={formData.number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="address-field">
                  <label htmlFor="complement">Complemento</label>
                  <input
                    id="complement"
                    name="complement"
                    type="text"
                    placeholder="Apartamento, bloco..."
                    value={formData.complement}
                    onChange={handleChange}
                  />
                </div>

                <div className="address-field">
                  <label htmlFor="neighborhood">Bairro *</label>
                  <input
                    id="neighborhood"
                    name="neighborhood"
                    type="text"
                    placeholder="Seu bairro"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="address-field">
                  <label htmlFor="city">Cidade *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Sua cidade"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="address-field">
                  <label htmlFor="state">Estado *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione</option>
                    {[
                      'AC', 'AL', 'AP', 'AM', 'BA', 'CE',
                      'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
                      'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
                      'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
                      'SP', 'SE', 'TO'
                    ].map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <p className="address-required-note">
                * Campos obrigatórios
              </p>

              <div className="address-form-actions">
                <button
                  type="button"
                  className="address-cancel-button"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="address-save-button"
                >
                  <Save size={17} />
                  Salvar endereço
                </button>
              </div>

            </form>
          </section>
        )}

        {addresses.length > 0 ? (
          <div className="addresses-list">

            {addresses.map(address => (
              <article
                className="address-card"
                key={address.id}
              >

                <div className="address-card-top">
                  <div className="address-card-title">
                    <MapPin size={21} />
                    <h3>Endereço de entrega</h3>
                  </div>

                  {address.isPrimary && (
                    <span className="address-primary-badge">
                      <Star size={14} />
                      Principal
                    </span>
                  )}
                </div>

                <div className="address-card-information">
                  <strong>
                    {address.street}, {address.number}
                  </strong>

                  {address.complement && (
                    <span>{address.complement}</span>
                  )}

                  <span>{address.neighborhood}</span>

                  <span>
                    {address.city} - {address.state}
                  </span>

                  <span>CEP: {address.cep}</span>
                </div>

                <div className="address-card-actions">

                  {!address.isPrimary && (
                    <button
                      className="address-primary-button"
                      onClick={() => setPrimaryAddress(address.id)}
                    >
                      <Star size={16} />
                      Definir como principal
                    </button>
                  )}

                  <button
                    className="address-edit-button"
                    onClick={() => openEditAddress(address)}
                  >
                    <Pencil size={16} />
                    Editar
                  </button>

                  <button
                    className="address-delete-button"
                    onClick={() => removeAddress(address.id)}
                  >
                    <Trash2 size={16} />
                    Excluir
                  </button>

                </div>

              </article>
            ))}

          </div>
        ) : (
          !formOpen && (
            <div className="addresses-empty">
              <MapPin size={48} />
              <h2>Nenhum endereço cadastrado</h2>
              <p>
                Adicione um endereço para utilizá-lo nas suas compras.
              </p>

              <button
                className="address-add-button"
                onClick={openNewAddress}
              >
                <Plus size={18} />
                Cadastrar primeiro endereço
              </button>
            </div>
          )
        )}

      </div>
    </main>
  )
}

export default MyAddressesPage

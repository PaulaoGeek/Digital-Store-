
import { Link } from 'react-router-dom'
import { ShoppingBag, Trash2, Minus, Plus } from 'lucide-react'

import { useCart } from '../../context/CartContext'
import './CartPage.css'

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal
  } = useCart()

  function formatPrice(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="container cart-empty">
          <ShoppingBag size={64} />
          <h1>Seu carrinho está vazio</h1>
          <p>Você ainda não adicionou nenhum produto.</p>
          <Link to="/produtos" className="cart-continue-button">
            Continuar comprando
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="container">

        <div className="cart-header">
          <h1>Meu carrinho</h1>
          <span>{cartItems.length} produto(s)</span>
        </div>

        <div className="cart-layout">

          <section className="cart-products">

            {cartItems.map((item) => (
              <article
                className="cart-item"
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              >

                <Link to={`/produto/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="cart-item-information">

                  <Link to={`/produto/${item.id}`}>
                    <h2>{item.name}</h2>
                  </Link>

                  <p>Categoria: {item.category}</p>

                  {item.selectedSize && (
                    <p>Tamanho: {item.selectedSize}</p>
                  )}

                  <p>Cor: {item.selectedColor}</p>

                  <strong className="cart-item-price">
                    {formatPrice(item.priceDiscount)}
                  </strong>

                  <div className="cart-item-actions">

                    <div className="cart-quantity">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={16} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      className="cart-remove-button"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.selectedSize,
                          item.selectedColor
                        )
                      }
                    >
                      <Trash2 size={17} />
                      Remover
                    </button>

                  </div>

                </div>

                <strong className="cart-item-subtotal">
                  {formatPrice(item.priceDiscount * item.quantity)}
                </strong>

              </article>
            ))}

          </section>

          <aside className="cart-summary">

            <h2>Resumo da compra</h2>

            <div className="cart-summary-line">
              <span>Subtotal</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            <div className="cart-summary-line">
              <span>Frete</span>
              <strong>A calcular</strong>
            </div>

            <div className="cart-summary-total">
              <span>Total</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            <button className="cart-checkout-button" disabled>
              Finalizar compra
            </button>

            <p className="cart-checkout-note">
              A finalização da compra será implementada em uma próxima etapa.
            </p>

            <Link to="/produtos" className="cart-back-link">
              Continuar comprando
            </Link>

          </aside>

        </div>
      </div>
    </main>
  )
}

export default CartPage

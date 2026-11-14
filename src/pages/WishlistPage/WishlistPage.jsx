
import { Heart, Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'

import './WishlistPage.css'

function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()

  function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <main className="wishlist-page">
      <div className="wishlist-container">

        <div className="wishlist-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Minha conta</span>
          <span>/</span>
          <strong>Lista de desejos</strong>
        </div>

        <div className="wishlist-heading">
          <div>
            <span className="wishlist-tag">MINHA CONTA</span>
            <h1>Lista de desejos</h1>
            <p>Seus produtos favoritos estão reunidos aqui.</p>
          </div>

          <div className="wishlist-heading-icon">
            <Heart size={28} />
          </div>
        </div>

        <div className="wishlist-section-header">
          <div>
            <h2>Meus favoritos</h2>
            <p>
              {wishlistItems.length} produto(s) salvo(s)
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button
              className="wishlist-clear-button"
              onClick={clearWishlist}
            >
              <Trash2 size={17} />
              Limpar lista
            </button>
          )}
        </div>

        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map(product => (
              <article className="wishlist-card" key={product.id}>
                <Link
                  to={`/produto/${product.id}`}
                  className="wishlist-image"
                >
                  <img src={product.image} alt={product.name} />
                  {product.discount && (
                    <span>{product.discount}</span>
                  )}
                </Link>

                <div className="wishlist-info">
                  <span className="wishlist-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="wishlist-prices">
                    <span>{formatPrice(product.price)}</span>
                    <strong>
                      {formatPrice(product.priceDiscount)}
                    </strong>
                  </div>

                  <div className="wishlist-actions">
                    <Link
                      to={`/produto/${product.id}`}
                      className="wishlist-view-button"
                    >
                      Ver produto
                    </Link>

                    <button
                      className="wishlist-remove-button"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remover ${product.name} dos favoritos`}
                      title="Remover dos favoritos"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <Heart size={45} />
            </div>

            <h2>Sua lista está vazia</h2>

            <p>
              Você ainda não adicionou nenhum produto aos favoritos.
              Explore nossa loja e salve os produtos que gostar.
            </p>

            <Link to="/produtos" className="wishlist-shop-button">
              <ShoppingBag size={18} />
              Explorar produtos
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}

export default WishlistPage

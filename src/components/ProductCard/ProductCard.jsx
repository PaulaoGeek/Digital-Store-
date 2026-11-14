
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'

import './ProductCard.css'

function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist()

  const favorite = isInWishlist(product.id)

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  function handleWishlistClick(event) {
    event.preventDefault()
    event.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <article className="product-card">

      <div className="product-image">
        <span className="product-discount">
          {product.discount}
        </span>

        <button
          type="button"
          className={`product-favorite-button ${favorite ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            size={20}
            fill={favorite ? 'currentColor' : 'none'}
          />
        </button>

        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <div className="product-prices">
          <span className="product-old-price">
            {formatPrice(product.price)}
          </span>

          <strong className="product-current-price">
            {formatPrice(product.priceDiscount)}
          </strong>
        </div>

        <Link to={`/produto/${product.id}`} className="product-view-link">
          Ver produto
        </Link>

      </div>

    </article>
  )
}

export default ProductCard

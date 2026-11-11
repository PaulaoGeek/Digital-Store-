
import './ProductCard.css'

function ProductCard({ product }) {
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  return (
    <article className="product-card">

      <div className="product-image">
        <span className="product-discount">
          {product.discount}
        </span>

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

        <a href={`/produto/${product.id}`} className="product-view-link">
          Ver produto
        </a>

      </div>

    </article>
  )
}

export default ProductCard

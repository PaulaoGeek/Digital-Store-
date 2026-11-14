
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart
} from 'lucide-react'

import products from '../../data/products'
import { useCart } from '../../context/CartContext'
import './ProductViewPage.css'

function ProductViewPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find(
    (item) => String(item.id) === String(id)
  )

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('red')
  const [message, setMessage] = useState('')

  const sizes = product?.sizes || []

  const colors = [
    { name: 'blue', value: '#5DE1E6' },
    { name: 'red', value: '#F75D75' },
    { name: 'black', value: '#555555' },
    { name: 'purple', value: '#6969B8' }
  ]

  useEffect(() => {
    setSelectedImage(0)
    setSelectedSize('')
    setSelectedColor('red')
    setMessage('')
  }, [id])

  if (!product) {
    return (
      <main className="product-view-page">
        <div className="container product-not-found">
          <h2>Produto não encontrado</h2>
          <p>Não encontramos o produto solicitado.</p>
          <Link to="/produtos">Voltar para produtos</Link>
        </div>
      </main>
    )
  }

  const galleryImages = product.images?.length
    ? product.images
    : [product.image]

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4)

  function changeImage(direction) {
    setSelectedImage((current) => {
      if (direction === 'next') {
        return (current + 1) % galleryImages.length
      }

      return (
        current - 1 + galleryImages.length
      ) % galleryImages.length
    })
  }

  function handleBuy() {
    if (sizes.length > 0 && !selectedSize) {
      setMessage('Selecione um tamanho antes de continuar.')
      return
    }

    addToCart(product, selectedSize, selectedColor)

    setMessage('Produto adicionado ao carrinho com sucesso!')
  }

  return (
    <main className="product-view-page">
      <div className="container">

        <div className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/produtos">Produtos</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <strong>{product.name}</strong>
        </div>

        <section className="product-details">

          <div className="product-gallery">

            <div className="product-main-image">

              {galleryImages.length > 1 && (
                <button
                  className="gallery-arrow gallery-arrow-left"
                  onClick={() => changeImage('previous')}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <img
                src={galleryImages[selectedImage]}
                alt={product.name}
              />

              {galleryImages.length > 1 && (
                <button
                  className="gallery-arrow gallery-arrow-right"
                  onClick={() => changeImage('next')}
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={24} />
                </button>
              )}

            </div>

            <div className="product-thumbnails">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={
                    selectedImage === index
                      ? 'product-thumbnail active'
                      : 'product-thumbnail'
                  }
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>

          </div>

          <div className="product-information">

            <h1>{product.name}</h1>

            <div className="product-meta">
              <span>{product.category}</span>
              <span>|</span>
              <span>Ref.: DS{product.id}00{product.id}</span>
              <span>|</span>
              <span>90 avaliações</span>
            </div>

            <div className="product-rating">
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={15}
                    fill="#F6AA1C"
                    color="#F6AA1C"
                  />
                ))}
              </div>

              <span className="rating-score">4.7</span>
              <span className="rating-reviews">(90 avaliações)</span>
            </div>

            <div className="product-view-price">

              <div className="product-old-price">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </div>

              <div className="product-current-price">
                <span>R$</span>
                {product.priceDiscount.toFixed(2).replace('.', ',')}
              </div>

              <span className="product-installments">
                ou 10x sem juros
              </span>

            </div>

            {product.discount && (
              <span className="product-discount-tag">
                {product.discount}
              </span>
            )}

            <div className="product-description">
              <h3>Descrição do produto</h3>
              <p>
                {product.description ||
                  `Conheça o ${product.name}, um produto pensado para oferecer conforto, qualidade e estilo. Confira os detalhes e escolha a opção ideal para você.`}
              </p>
            </div>

            <div className="product-selection">

              {sizes.length > 0 && (
                <div className="product-size-section">
                  <h3>
                    {product.category === 'Tênis'
                      ? 'Numeração'
                      : 'Tamanho'}
                  </h3>

                  <div className="product-size-options">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={
                          selectedSize === size
                            ? 'size-option selected'
                            : 'size-option'
                        }
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-color-section">
                <h3>Cor</h3>

                <div className="product-color-options">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      className={
                        selectedColor === color.name
                          ? 'color-option selected'
                          : 'color-option'
                      }
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Selecionar cor ${color.name}`}
                    />
                  ))}
                </div>
              </div>

            </div>

            <button
              className="product-buy-button"
              onClick={handleBuy}
            >
              <ShoppingCart size={18} />
              COMPRAR
            </button>

            {message && (
              <p className="product-buy-message" role="status">
                {message}
              </p>
            )}

          </div>

        </section>

        <section className="related-products">

          <div className="related-products-header">
            <h2>Produtos relacionados</h2>

            <Link to="/produtos">
              Ver todos <span>→</span>
            </Link>
          </div>

          <div className="related-products-grid">
            {relatedProducts.map((item) => (
              <Link
                to={`/produto/${item.id}`}
                className="related-product-card"
                key={item.id}
              >
                <div className="related-product-image">
                  {item.discount && (
                    <span className="related-discount">
                      {item.discount}
                    </span>
                  )}

                  <img src={item.image} alt={item.name} />
                </div>

                <span className="related-product-category">
                  {item.category}
                </span>

                <h3>{item.name}</h3>

                <div className="related-product-prices">
                  <span className="related-old-price">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>

                  <strong>
                    R$ {item.priceDiscount.toFixed(2).replace('.', ',')}
                  </strong>
                </div>
              </Link>
            ))}
          </div>

        </section>

      </div>
    </main>
  )
}

export default ProductViewPage

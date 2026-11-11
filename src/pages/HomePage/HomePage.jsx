import products from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Footprints,
  Shirt,
  Watch,
  ShoppingBag,
  Glasses,
  Dumbbell
} from 'lucide-react'

import './HomePage.css'

const slides = [
  {
    image: '/home-slide-1.jpeg',
    label: 'OFERTA ESPECIAL',
    title: 'Queima de estoque Nike',
    description: 'Aproveite ofertas especiais e encontre o tênis perfeito para acompanhar seu estilo.',
    button: 'Ver ofertas'
  },
  {
    image: '/home-slide-2.jpeg',
    label: 'NOVIDADES',
    title: 'Descubra seu próximo estilo',
    description: 'Novidades incríveis esperam por você. Escolha seu modelo favorito.',
    button: 'Conhecer coleção'
  },
  {
    image: '/home-slide-3.jpeg',
    label: 'COLEÇÃO ESPECIAL',
    title: 'Estilo que combina com você',
    description: 'Encontre produtos que unem personalidade, qualidade e conforto.',
    button: 'Explorar coleção'
  },
  {
    image: '/home-slide-4.jpeg',
    label: 'OFERTAS EXCLUSIVAS',
    title: 'Seu estilo merece mais',
    description: 'Confira nossa seleção especial e aproveite oportunidades imperdíveis.',
    button: 'Ver produtos'
  },
  {
    image: '/home-slide-5.jpeg',
    label: 'DESTAQUES',
    title: 'Encontre seu favorito',
    description: 'Descubra modelos selecionados para deixar seu visual ainda melhor.',
    button: 'Descobrir agora'
  },
  {
    image: '/home-slide-6.jpeg',
    label: 'ESTILO E CONFORTO',
    title: 'Conforto em cada passo',
    description: 'Uma combinação perfeita de estilo e conforto para o seu dia a dia.',
    button: 'Ver coleção'
  },
  {
    image: '/home-slide-7.jpeg',
    label: 'NOVA COLEÇÃO',
    title: 'Renove seu visual',
    description: 'Explore novidades e encontre peças que representam você.',
    button: 'Explorar agora'
  },
  {
    image: '/home-slide-8.jpeg',
    label: 'ESCOLHAS ESPECIAIS',
    title: 'Seu próximo passo começa aqui',
    description: 'Encontre seus produtos favoritos na Digital Store.',
    button: 'Conferir ofertas'
  }
]

const categories = [
  { name: 'Tênis', icon: Footprints },
  { name: 'Roupas', icon: Shirt },
  { name: 'Acessórios', icon: Watch },
  { name: 'Bolsas', icon: ShoppingBag },
  { name: 'Óculos', icon: Glasses },
  { name: 'Esportivo', icon: Dumbbell }
]

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % slides.length)
  }

  const previousSlide = () => {
    setCurrentSlide((current) => (current - 1 + slides.length) % slides.length)
  }

  const slide = slides[currentSlide]

  return (
    <main>

      {/* CATEGORIAS */}
      <section className="categories-section container">

        <div className="categories-header">
          <h2>Compre por categoria</h2>
          <p>Encontre exatamente o que procura.</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <a
                href="/produtos"
                className="category-card"
                key={category.name}
              >
                <div className="category-icon">
                  <Icon size={32} />
                </div>

                <h3>{category.name}</h3>
              </a>
            )
          })}
        </div>

      </section>

      {/* BANNER PRINCIPAL */}
      <section className="hero">

        <div className="hero-content container">

          <div className="hero-text" key={currentSlide}>
            <span className="hero-label">
              {slide.label}
            </span>

            <h1>{slide.title}</h1>

            <p>{slide.description}</p>

            <button className="hero-button">
              {slide.button}
            </button>
          </div>

          <div className="hero-image" key={`image-${currentSlide}`}>
            <img
              src={slide.image}
              alt={slide.title}
            />
          </div>

        </div>

        <button
          className="hero-arrow hero-arrow-left"
          onClick={previousSlide}
          aria-label="Slide anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="hero-arrow hero-arrow-right"
          onClick={nextSlide}
          aria-label="Próximo slide"
        >
          <ChevronRight size={24} />
        </button>

        <div className="hero-dots">
          {slides.map((item, index) => (
            <button
              key={item.image}
              className={currentSlide === index ? 'active' : ''}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>

      </section>

      {/* COLEÇÕES EM DESTAQUE */}
      <section className="featured-collections container">

        <div className="collections-header">
          <h2>Coleções em destaque</h2>
          <p>Encontre o estilo que combina com você.</p>
        </div>

        <div className="collections-grid">

          <article className="collection-card">
            <img
              src="/collection-1.png"
              alt="Coleção de produtos em destaque"
            />

            <div className="collection-info">
              <span>COLEÇÃO ESPECIAL</span>
              <h3>Novidades</h3>
              <a href="/produtos">Explorar coleção</a>
            </div>
          </article>

          <article className="collection-card">
            <img
              src="/collection-2.png"
              alt="Coleção de estilo esportivo"
            />

            <div className="collection-info">
              <span>SELEÇÃO EXCLUSIVA</span>
              <h3>Estilo esportivo</h3>
              <a href="/produtos">Explorar coleção</a>
            </div>
          </article>

          <article className="collection-card">
            <img
              src="/collection-3.png"
              alt="Coleção de produtos mais vendidos"
            />

            <div className="collection-info">
              <span>ESCOLHAS PARA VOCÊ</span>
              <h3>Mais vendidos</h3>
              <a href="/produtos">Explorar coleção</a>
            </div>
          </article>

        </div>

      </section>

      {/* PRODUTOS EM ALTA */}
      <section className="trending-section container">

        <div className="trending-header">
          <div>
            <h2>Produtos em alta</h2>
            <p>Os favoritos dos nossos clientes.</p>
          </div>

          <a href="/produtos" className="see-all-products">
            Ver todos
          </a>
        </div>

        <div className="trending-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>

    </main>
  )
}

export default HomePage

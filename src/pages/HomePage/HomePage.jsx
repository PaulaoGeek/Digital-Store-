
import { useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'

import {
  ChevronLeft,
  ChevronRight,
  Shirt,
  Footprints,
  Headphones,
  GraduationCap,
  ArrowRight
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

const collections = [
  { name: 'Camisetas', icon: Shirt },
  { name: 'Calças', icon: GraduationCap },
  { name: 'Bonés', icon: GraduationCap },
  { name: 'Headphones', icon: Headphones },
  { name: 'Tênis', icon: Footprints }
]

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % slides.length)
  }

  const previousSlide = () => {
    setCurrentSlide((current) =>
      (current - 1 + slides.length) % slides.length
    )
  }

  const slide = slides[currentSlide]

  return (
    <main>
      {/* BANNER PRINCIPAL */}
      <section className="hero">
        <div className="hero-content container">
          <div className="hero-text" key={currentSlide}>
            <span className="hero-label">{slide.label}</span>

            <h1>{slide.title}</h1>

            <p>{slide.description}</p>

            <Link to="/produtos" className="hero-button">
              {slide.button}
            </Link>
          </div>

          <div className="hero-image" key={`image-${currentSlide}`}>
            <img src={slide.image} alt={slide.title} />
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
      <section className="collections-highlight container">
        <h2>Coleções em destaque</h2>

        <div className="collections-highlight-list">
          {collections.map((collection) => {
            const Icon = collection.icon

            return (
              <Link
                to="/produtos"
                className="highlight-collection"
                key={collection.name}
              >
                <span className="highlight-collection-icon">
                  <Icon size={27} strokeWidth={1.5} />
                </span>

                <span className="highlight-collection-name">
                  {collection.name}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* PRODUTOS EM ALTA */}
      <section className="trending-section container">
        <div className="trending-header">
          <h2>Produtos em alta</h2>

          <Link to="/produtos" className="see-all-products">
            Ver todos
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="trending-grid">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* DESTAQUE ESPECIAL */}
      <section className="jordan-highlight">
        <div className="jordan-highlight-content container">
          <div className="jordan-highlight-image">
            <img
              src="/produc-image-4.jpeg"
              alt="Tênis em destaque"
            />
          </div>

          <div className="jordan-highlight-text">
            <span>OFERTA ESPECIAL</span>
            <h2>Estilo e personalidade em cada passo</h2>
            <p>
              Descubra nossa seleção especial de produtos
              e encontre o modelo ideal para você.
            </p>
            <Link to="/produtos">Ver ofertas</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage

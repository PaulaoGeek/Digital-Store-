
import { useState } from 'react'
import {
  Footprints,
  Shirt,
  ShoppingBag,
  Watch,
  Glasses,
  Dumbbell
} from 'lucide-react'

import products from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import './CategoriesPage.css'

const categories = [
  {
    name: 'Tênis',
    description: 'Encontre o tênis ideal para seu estilo.',
    icon: Footprints
  },
  {
    name: 'Camisetas',
    description: 'Camisetas para todos os momentos.',
    icon: Shirt
  },
  {
    name: 'Calças',
    description: 'Modelos casuais e modernos.',
    icon: ShoppingBag
  },
  {
    name: 'Jaquetas',
    description: 'Estilo e conforto para qualquer ocasião.',
    icon: Shirt
  },
  {
    name: 'Bermudas',
    description: 'Conforto para seus dias de lazer.',
    icon: Dumbbell
  },
  {
    name: 'Acessórios',
    description: 'Detalhes que completam seu visual.',
    icon: Watch
  }
]

function CategoriesPage() {
  const [selectedCategories, setSelectedCategories] = useState([])

  function toggleCategory(categoryName) {
    setSelectedCategories((current) =>
      current.includes(categoryName)
        ? current.filter((category) => category !== categoryName)
        : [...current, categoryName]
    )
  }

  function selectAllCategories() {
    setSelectedCategories(categories.map((category) => category.name))
  }

  function clearCategories() {
    setSelectedCategories([])
  }

  const filteredProducts = products.filter((product) =>
    selectedCategories.includes(product.category)
  )

  return (
    <main className="categories-page container">
      <div className="categories-breadcrumb">
        Home / <strong>Categorias</strong>
      </div>

      <section className="categories-intro">
        <span className="categories-eyebrow">EXPLORE NOSSA LOJA</span>
        <h1>Encontre sua categoria favorita</h1>
        <p>
          Escolha os tipos de produtos que deseja encontrar
          e descubra opções que combinam com você.
        </p>
      </section>

      <section className="categories-selection">
        <div className="categories-selection-header">
          <div>
            <h2>Explore por categoria</h2>
            <p>
              {selectedCategories.length === 0
                ? 'Selecione uma ou mais categorias.'
                : `${selectedCategories.length} categoria(s) selecionada(s).`}
            </p>
          </div>

          <div className="categories-actions">
            <button onClick={selectAllCategories}>
              Selecionar todas
            </button>

            <button onClick={clearCategories}>
              Limpar seleção
            </button>
          </div>
        </div>

        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategories.includes(category.name)
            const quantity = products.filter(
              (product) => product.category === category.name
            ).length

            return (
              <label
                className={`category-card ${isSelected ? 'selected' : ''}`}
                key={category.name}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleCategory(category.name)}
                />

                <span className="category-check">
                  {isSelected ? '✓' : ''}
                </span>

                <span className="category-icon">
                  <Icon size={30} />
                </span>

                <span className="category-card-name">
                  {category.name}
                </span>

                <span className="category-card-description">
                  {category.description}
                </span>

                <span className="category-card-quantity">
                  {quantity} produtos
                </span>
              </label>
            )
          })}
        </div>
      </section>

      <section className="category-products">
        <div className="category-products-heading">
          <div>
            <h2>Produtos selecionados</h2>
            <p>
              {selectedCategories.length > 0
                ? `Exibindo produtos de: ${selectedCategories.join(', ')}`
                : 'Marque uma categoria acima para visualizar os produtos.'}
            </p>
          </div>

          {selectedCategories.length > 0 && (
            <span className="category-product-count">
              {filteredProducts.length} produtos
            </span>
          )}
        </div>

        {selectedCategories.length > 0 ? (
          filteredProducts.length > 0 ? (
            <div className="category-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="category-empty">
              Nenhum produto encontrado nessas categorias.
            </div>
          )
        ) : (
          <div className="category-empty">
            <ShoppingBag size={32} />
            <h3>Escolha suas categorias</h3>
            <p>
              Selecione os marcadores acima e os produtos aparecerão aqui.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}

export default CategoriesPage


import { useState } from 'react'
import products from '../../data/products'
import ProductCard from '../../components/ProductCard/ProductCard'
import { SlidersHorizontal } from 'lucide-react'
import './ProductListingPage.css'

const filterOptions = {
  brand: ['Adidas', 'Balenciaga', 'K-Swiss', 'Nike', 'Puma'],
  category: ['Tênis', 'Camisetas', 'Calças', 'Jaquetas', 'Bermudas', 'Acessórios'],
  gender: ['Masculino', 'Feminino', 'Unissex']
}

function ProductListingPage() {
  const [filters, setFilters] = useState({
    brand: [],
    category: [],
    gender: [],
    condition: ''
  })

  const [sortOrder, setSortOrder] = useState('relevance')

  function toggleFilter(type, value) {
    setFilters((current) => ({
      ...current,
      [type]: current[type].includes(value)
        ? current[type].filter((item) => item !== value)
        : [...current[type], value]
    }))
  }

  function handleCondition(value) {
    setFilters((current) => ({
      ...current,
      condition: current.condition === value ? '' : value
    }))
  }

  function clearFilters() {
    setFilters({
      brand: [],
      category: [],
      gender: [],
      condition: ''
    })
  }

  let filteredProducts = products.filter((product) => {
    const matchesBrand =
      filters.brand.length === 0 ||
      filters.brand.includes(product.brand)

    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.includes(product.category)

    const matchesGender =
      filters.gender.length === 0 ||
      filters.gender.includes(product.gender)

    const matchesCondition =
      filters.condition === '' ||
      filters.condition === product.condition

    return (
      matchesBrand &&
      matchesCategory &&
      matchesGender &&
      matchesCondition
    )
  })

  filteredProducts = [...filteredProducts]

  if (sortOrder === 'lowest') {
    filteredProducts.sort((a, b) => a.priceDiscount - b.priceDiscount)
  } else if (sortOrder === 'highest') {
    filteredProducts.sort((a, b) => b.priceDiscount - a.priceDiscount)
  } else if (sortOrder === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
  }

  function renderCheckboxGroup(title, type) {
    return (
      <div className="filter-group">
        <h3>{title}</h3>

        {filterOptions[type].map((option) => (
          <label className="filter-option" key={option}>
            <input
              type="checkbox"
              checked={filters[type].includes(option)}
              onChange={() => toggleFilter(type, option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    )
  }

  return (
    <main className="listing-page container">
      <div className="listing-heading">
        <div>
          <h1>Produtos</h1>
          <p>
            Resultados para sua busca - {filteredProducts.length} produtos
          </p>
        </div>

        <div className="listing-sort">
          <label htmlFor="sort-products">
            <strong>Ordenar por:</strong>
          </label>

          <select
            id="sort-products"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="relevance">Mais relevantes</option>
            <option value="lowest">Menor preço</option>
            <option value="highest">Maior preço</option>
            <option value="name">Nome</option>
          </select>
        </div>
      </div>

      <div className="listing-layout">
        <aside className="listing-filters">
          <div className="filter-title">
            <SlidersHorizontal size={19} />
            <h2>Filtrar por</h2>
          </div>

          {renderCheckboxGroup('Marca', 'brand')}
          {renderCheckboxGroup('Categoria', 'category')}
          {renderCheckboxGroup('Gênero', 'gender')}

          <div className="filter-group">
            <h3>Estado</h3>

            {['Novo', 'Usado'].map((condition) => (
              <label className="filter-option" key={condition}>
                <input
                  type="radio"
                  name="condition"
                  checked={filters.condition === condition}
                  onChange={() => handleCondition(condition)}
                />
                <span>{condition}</span>
              </label>
            ))}
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            Limpar filtros
          </button>
        </aside>

        <section className="listing-results">
          {filteredProducts.length > 0 ? (
            <div className="listing-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h2>Nenhum produto encontrado</h2>
              <p>Experimente alterar ou limpar os filtros.</p>
              <button className="clear-filters" onClick={clearFilters}>
                Limpar filtros
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProductListingPage

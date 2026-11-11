
import { useState } from 'react'
import {
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

import './MyPage.css'

const orders = [
  {
    id: '#DS2026001',
    date: '05/11/2026',
    status: 'Em andamento',
    total: 459.90,
    payment: 'Cartão de crédito',
    delivery: 'Previsão de entrega: 15/11/2026',
    products: [
      {
        name: 'Tênis Nike Revolution 6',
        quantity: 1,
        price: 239.90,
        image: '/produc-image-1.jpeg'
      },
      {
        name: 'Tênis Adidas Esportivo',
        quantity: 1,
        price: 220.00,
        image: '/produc-image-2.jpeg'
      }
    ]
  },
  {
    id: '#DS2026002',
    date: '28/10/2026',
    status: 'Enviado',
    total: 279.90,
    payment: 'Pix',
    delivery: 'Previsão de entrega: 13/11/2026',
    products: [
      {
        name: 'Tênis Adidas Esportivo',
        quantity: 1,
        price: 279.90,
        image: '/produc-image-2.jpeg'
      }
    ]
  },
  {
    id: '#DS2026003',
    date: '15/10/2026',
    status: 'Entregue',
    total: 219.90,
    payment: 'Cartão de crédito',
    delivery: 'Pedido entregue em 22/10/2026',
    products: [
      {
        name: 'Tênis Casual Moderno',
        quantity: 1,
        price: 219.90,
        image: '/produc-image-3.jpeg'
      }
    ]
  },
  {
    id: '#DS2026004',
    date: '10/10/2026',
    status: 'Cancelado',
    total: 319.90,
    payment: 'Pix',
    delivery: 'Este pedido foi cancelado',
    products: [
      {
        name: 'Tênis Performance Running',
        quantity: 1,
        price: 319.90,
        image: '/produc-image-4.jpeg'
      }
    ]
  }
]

function MyPage() {
  const [filter, setFilter] = useState('Todos')
  const [expandedOrder, setExpandedOrder] = useState(null)

  const filters = [
    'Todos',
    'Em andamento',
    'Enviado',
    'Entregue',
    'Cancelado'
  ]

  const filteredOrders = orders.filter(order => {
    return filter === 'Todos' || order.status === filter
  })

  function getStatusIcon(status) {
    switch (status) {
      case 'Em andamento':
        return <Clock3 size={17} />
      case 'Enviado':
        return <Truck size={17} />
      case 'Entregue':
        return <CheckCircle2 size={17} />
      case 'Cancelado':
        return <XCircle size={17} />
      default:
        return <Package size={17} />
    }
  }

  function getStatusClass(status) {
    switch (status) {
      case 'Em andamento':
        return 'status-progress'
      case 'Enviado':
        return 'status-shipped'
      case 'Entregue':
        return 'status-delivered'
      case 'Cancelado':
        return 'status-cancelled'
      default:
        return ''
    }
  }

  return (
    <main className="my-orders-page">
      <div className="my-orders-container">

        <div className="orders-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <strong>Meus pedidos</strong>
        </div>

        <div className="orders-heading">
          <div>
            <span className="orders-tag">MINHA CONTA</span>
            <h1>Meus pedidos</h1>
            <p>
              Acompanhe suas compras e consulte seus pedidos.
            </p>
          </div>

          <div className="orders-total">
            <Package size={22} />
            <div>
              <strong>{orders.length}</strong>
              <span>Pedidos realizados</span>
            </div>
          </div>
        </div>

        <div className="orders-filters">
          {filters.map(item => (
            <button
              key={item}
              className={filter === item ? 'selected' : ''}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="orders-list">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <article className="order-card" key={order.id}>

                <div className="order-card-header">
                  <div>
                    <span className="order-label">Pedido</span>
                    <strong>{order.id}</strong>
                  </div>

                  <span className="order-date">
                    Realizado em {order.date}
                  </span>

                  <span className={`order-status ${getStatusClass(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>

                <div className="order-card-content">
                  <div className="order-products-preview">
                    {order.products.map((product, index) => (
                      <div className="order-product" key={index}>
                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <div>
                          <strong>{product.name}</strong>
                          <span>Quantidade: {product.quantity}</span>
                          <span>
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-summary">
                    <span>Valor total</span>

                    <strong>
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </strong>

                    <button
                      className="order-details-button"
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === order.id ? null : order.id
                        )
                      }
                    >
                      {expandedOrder === order.id
                        ? 'Ocultar detalhes'
                        : 'Ver detalhes'}

                      {expandedOrder === order.id
                        ? <ChevronUp size={17} />
                        : <ChevronDown size={17} />
                      }
                    </button>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="order-details">
                    <div>
                      <span>Forma de pagamento</span>
                      <strong>{order.payment}</strong>
                    </div>

                    <div>
                      <span>Entrega</span>
                      <strong>{order.delivery}</strong>
                    </div>

                    <div>
                      <span>Identificação do pedido</span>
                      <strong>{order.id}</strong>
                    </div>
                  </div>
                )}

              </article>
            ))
          ) : (
            <div className="orders-empty">
              <Package size={45} />
              <h2>Nenhum pedido encontrado</h2>
              <p>
                Não existem pedidos nessa categoria no momento.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}

export default MyPage

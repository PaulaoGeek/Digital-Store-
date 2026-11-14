
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('digitalStoreCart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('digitalStoreCart', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product, selectedSize, selectedColor) {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
      )

      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...currentItems,
        {
          ...product,
          selectedSize,
          selectedColor,
          quantity: 1
        }
      ]
    })
  }

  function removeFromCart(itemId, selectedSize, selectedColor) {
    setCartItems(currentItems =>
      currentItems.filter(item =>
        !(
          item.id === itemId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        )
      )
    )
  }

  function updateQuantity(itemId, selectedSize, selectedColor, quantity) {
    if (quantity < 1) return

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.priceDiscount * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart precisa ser utilizado dentro de CartProvider')
  }

  return context
}


import { createContext, useContext, useEffect, useState } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem('digitalStoreWishlist')
      return savedItems ? JSON.parse(savedItems) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      'digitalStoreWishlist',
      JSON.stringify(wishlistItems)
    )
  }, [wishlistItems])

  function toggleWishlist(product) {
    setWishlistItems(currentItems => {
      const alreadySaved = currentItems.some(
        item => item.id === product.id
      )

      if (alreadySaved) {
        return currentItems.filter(item => item.id !== product.id)
      }

      return [...currentItems, product]
    })
  }

  function isInWishlist(productId) {
    return wishlistItems.some(item => item.id === productId)
  }

  function removeFromWishlist(productId) {
    setWishlistItems(currentItems =>
      currentItems.filter(item => item.id !== productId)
    )
  }

  function clearWishlist() {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error(
      'useWishlist precisa ser utilizado dentro de WishlistProvider'
    )
  }

  return context
}

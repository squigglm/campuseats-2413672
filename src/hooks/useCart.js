//hook that allow data to be shared between components/ read the cart context
import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

export function useCart() {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
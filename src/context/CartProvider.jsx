//handle the cart and orders, save to local storage and make it available through contexxt
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  function addToCart(item) {
    setCart((previousCart) => {
      const exists = previousCart.some(  //.some() checks atleast one input matches. returns 'true'/'false'
        (line) => line.item.id === item.id
      )

      if (exists) {
        return previousCart.map((line) =>  //.map() builds new array
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...previousCart, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((previousCart) =>
      previousCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)  //.filter() keeps only those that match condition. here qty>0
    )
  }

  function removeFromCart(itemId) {
    setCart((previousCart) =>
      previousCart.filter((line) => line.item.id !== itemId)
    )
  }

  const count = cart.reduce(  //.reduce() reduce array to one value
    (sum, line) => sum + line.qty,
    0
  )

  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  function placeOrder(details) {
    if (cart.length === 0) return

    const order = {
      ...details,
      id: crypto.randomUUID(),
      items: cart.map((line) => ({
        ...line,
        item: { ...line.item },
      })),
      total,
      createdAt: new Date().toISOString(),
    }

    setOrders((previousOrders) => [order, ...previousOrders])
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
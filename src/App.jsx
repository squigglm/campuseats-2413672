import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
  // Vendor data and request status
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  // Selected vendor
  const [selectedVendorId, setSelectedVendorId] = useState(null)

  // Cart and page view
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)

  // B2: Fetch vendors
  useEffect(() => {
    const controller = new AbortController()

    async function loadVendors() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`Could not load vendors (${res.status})`)
        }

        const data = await res.json()

        if (!controller.signal.aborted) {
          setVendors(data)
          setSelectedVendorId(data[0]?.id ?? null)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadVendors()

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId
  )

  // B3: Add a new line or increase an existing quantity
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const exists = prevCart.some(
        (line) => line.item.id === item.id
      )

      if (exists) {
        return prevCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...prevCart, { item, qty: 1 }]
    })
  }

  // B3: Change quantity; remove lines that reach zero
  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  // B3: Remove an entire cart line
  function handleRemove(itemId) {
    setCart((prevCart) =>
      prevCart.filter((line) => line.item.id !== itemId)
    )
  }

  // B3: Calculate the header badge
  const cartCount = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

  // B5: Save order details, clear cart and show confirmation
  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0
    )

    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  function handleRetry() {
    setReloadKey((prevKey) => prevKey + 1)
  }

  // Choose the content for the current view
  let content

  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = lastOrder ? (
      <section className="card">
        <h2>Order placed!</h2>
        <p>Thank you, {lastOrder.name}.</p>
        <p>Pickup time: {lastOrder.pickupTime}</p>
        <p>Total: RM {lastOrder.total.toFixed(2)}</p>

        <button
          type="button"
          className="btn"
          onClick={() => setView('menu')}
        >
          Back to vendors
        </button>
      </section>
    ) : (
      <p>No order placed yet.</p>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage message={error} onRetry={handleRetry} />
    )
  } else if (vendors.length === 0) {
    content = <p>No vendors available.</p>
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>

          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">
              Menu: {selectedVendor.name}
            </h2>

            <MenuList
              items={selectedVendor.menu}
              onAdd={handleAddToCart}
            />
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />

      <main className="container">{content}</main>

      <Footer />
    </>
  )
}

export default App
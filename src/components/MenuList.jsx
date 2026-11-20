//displays vendor's menu items with sorting and add to cart button
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'
import MenuItemCard from './MenuItemCard.jsx'

function MenuListContent({ items, user }) {
  const { addToCart } = useCart()
  const [sortBy, setSortBy] = useLocalStorage(
  user ? 'ce-sort-' + user.uid : 'ce-sort-guest',
    'default',
    Boolean(user)
)
  const sortedItems = [...items]

  if (sortBy === 'price-low') {
    sortedItems.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    sortedItems.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'popular') {
    sortedItems.sort(
      (a, b) => Number(b.popular === true) - Number(a.popular === true)
    )
  }

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }

  return (
    <>
      <div className="menu-sort">
        <label htmlFor="menu-sort">Sort menu:</label>

        <select
          id="menu-sort"
          className="sort-select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">Original order</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="popular">Popular first</option>
        </select>

        {!user && (
          <p className="muted">
            Log in to save your sorting preference.
          </p>
        )}
      </div>

      <div className="grid">
        {sortedItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAdd={addToCart}
          />
        ))}
      </div>
    </>
  )
}

  function MenuList({ items }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="muted">Loading preference…</p>
  }

  return (
    <MenuListContent
      key={user?.uid ?? 'guest'}
      items={items}
      user={user}
    />
  )
  }


export default MenuList
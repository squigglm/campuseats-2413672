//display error page with link to home page
import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>This page does not exist.</p>
      <Link to="/">Back to vendors</Link>
    </section>
  )
}

export default NotFoundPage
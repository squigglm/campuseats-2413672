//hooks that loads vendor data and manages loading, error and retry
import { useEffect, useState } from 'react'

export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

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

  function reload() {
    setReloadKey((previousKey) => previousKey + 1)
  }

  return { vendors, loading, error, reload }
}
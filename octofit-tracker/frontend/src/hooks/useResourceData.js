import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function getRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  throw new Error('The API response did not contain a list of records.')
}

export default function useResourceData(endpoint) {
  const [state, setState] = useState({
    data: [],
    error: null,
    loading: true,
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setState({ data: [], error: null, loading: true })

      try {
        const response = await fetch(new URL(endpoint, apiOrigin), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            `Request failed (${response.status} ${response.statusText}).`,
          )
        }

        const payload = await response.json()
        setState({ data: getRecords(payload), error: null, loading: false })
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            data: [],
            error:
              error instanceof Error
                ? error.message
                : 'An unexpected error occurred while loading data.',
            loading: false,
          })
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint])

  return state
}

// src/services/api.ts

const apiUrl = 'http://localhost:3333'

type FetchOptions = {
  method?: string
  headers?: Record<string, string>
  body?: Record<string, any>
}

async function useFetch(
  endpoint: string,
  options: FetchOptions = {},
  isUpload: boolean = false
): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': isUpload ? '' : 'application/json',
    // Add any common headers here
    ...(options.headers || {})
  }
  const uploadHeaders: Record<string, string> = {
    // Add any common headers here
    ...(options.headers || {})
  }
  const formattedBody = isUpload ? (options.body as FormData) : JSON.stringify(options.body)
  const config: RequestInit = {
    method: options.method || 'GET',
    headers: new Headers(isUpload ? uploadHeaders : headers),
    credentials: 'same-origin', // You can change this as per your API requirements
    body: options.body ? formattedBody : undefined
  }
  console.log(config)
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, config)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    console.log(await response.headers)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export default useFetch

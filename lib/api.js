const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://nam-landscaping-backend-4ya5w4fzn-basirat-hamayoons-projects.vercel.app/api/v1"

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`
  
  const headers = { ...(options.headers || {}) }

  // If body is FormData, let browser automatically handle Content-Type & boundary
  if (options.body instanceof FormData) {
    delete headers["Content-Type"]
    delete headers["content-type"]
  } else if (
    !headers["Content-Type"] &&
    !headers["content-type"] &&
    options.body &&
    typeof options.body === "object"
  ) {
    headers["Content-Type"] = "application/json"
    options.body = JSON.stringify(options.body)
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: options.credentials || "include",
  })

  let json
  try {
    json = await res.json()
  } catch {
    json = {}
  }

  if (!res.ok) {
    const error = new Error(json.message || `Request failed with status ${res.status}`)
    error.response = { status: res.status, data: json }
    throw error
  }

  return { data: json, status: res.status, headers: res.headers }
}

export const api = {
  get: (url, config = {}) => request(url, { method: "GET", ...config }),
  post: (url, body, config = {}) => request(url, { method: "POST", body, ...config }),
  put: (url, body, config = {}) => request(url, { method: "PUT", body, ...config }),
  patch: (url, body, config = {}) => request(url, { method: "PATCH", body, ...config }),
  delete: (url, config = {}) => request(url, { method: "DELETE", ...config }),
}

export const fetchApi = api
export default api
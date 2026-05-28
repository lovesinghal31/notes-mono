import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let refreshSubscribers: (() => void)[] = []

function subscribeTokenRefresh(cb: () => void) {
  refreshSubscribers.push(cb)
}
function onRefreshed() {
  refreshSubscribers.forEach((cb) => cb())
  refreshSubscribers = []
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }
    if (!error.response) {
      return Promise.reject(error)
    }
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/users/refresh-tokens")
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(api(originalRequest))
          })
        })
      }
      originalRequest._retry = true
      isRefreshing = true
      try {
        const response = await api.post("/users/refresh-tokens")
        if (!response.data?.success) {
          isRefreshing = false
          return Promise.reject(error)
        }
        onRefreshed()
        isRefreshing = false
        return api(originalRequest)
      } catch (refreshError) {
        isRefreshing = false
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

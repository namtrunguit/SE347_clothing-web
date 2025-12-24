import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { getToken, removeToken } from '@/utils/storage'

// Tạo Axios instance với baseURL
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Thêm token vào header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - Token hết hạn hoặc không hợp lệ
    if (error.response?.status === 401) {
      removeToken()
      // Redirect to login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    // Handle 403 Forbidden - Không có quyền truy cập
    if (error.response?.status === 403) {
      // Có thể redirect hoặc hiển thị thông báo
      console.error('Access denied')
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default api


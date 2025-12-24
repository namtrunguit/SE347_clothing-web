// API Response types
export interface ApiResponse<T = any> {
  message: string
  data: T
  meta?: PaginationMeta
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  total_pages?: number
}

export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
  errorInfo?: any
}


import api from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type { Category } from '@/types'
import type { ApiResponse } from '@/types/api.types'

/**
 * Interface cho categories filters
 */
export interface CategoriesFilters {
  is_featured?: boolean
  limit?: number
}

/**
 * Lấy danh sách categories
 * Backend endpoint: GET /categories
 */
export const getCategories = async (params?: CategoriesFilters): Promise<Category[]> => {
  try {
    // Build query string từ params
    const queryParams = new URLSearchParams()

    if (params?.is_featured !== undefined) {
      queryParams.append('is_featured', params.is_featured.toString())
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString())
    }

    const queryString = queryParams.toString()
    const url = `${API_ENDPOINTS.CATEGORIES.LIST}${queryString ? `?${queryString}` : ''}`

    const response = await api.get<ApiResponse<Category[]>>(url)
    return response.data.data
  } catch (error: any) {
    throw error
  }
}


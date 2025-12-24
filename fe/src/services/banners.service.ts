import api from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type { Banner } from '@/types'
import type { ApiResponse } from '@/types/api.types'

/**
 * Lấy danh sách banners
 * Backend endpoint: GET /banners
 * @param position - Vị trí banner (optional)
 */
export const getBanners = async (position?: string): Promise<Banner[]> => {
  try {
    // Build query string
    const queryParams = new URLSearchParams()
    if (position) {
      queryParams.append('position', position)
    }

    const queryString = queryParams.toString()
    const url = `${API_ENDPOINTS.BANNERS.LIST}${queryString ? `?${queryString}` : ''}`

    const response = await api.get<ApiResponse<Banner[]>>(url)
    return response.data.data
  } catch (error: any) {
    throw error
  }
}


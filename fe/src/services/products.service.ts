import api from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type { Product, ProductFilters } from '@/types'
import type { ApiResponse, PaginatedApiResponse } from '@/types/api.types'

/**
 * Interface cho products response với pagination
 */
export interface ProductsResponse {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total_page: number
  }
}

/**
 * Lấy danh sách products với filters và pagination
 * Backend endpoint: GET /products
 */
export const getProducts = async (
  params: ProductFilters
): Promise<ProductsResponse> => {
  try {
    // Build query string từ params
    const queryParams = new URLSearchParams()

    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.category_slug) queryParams.append('category_slug', params.category_slug)
    if (params.name) queryParams.append('name', params.name)
    if (params.sort_by) queryParams.append('sort_by', params.sort_by)
    if (params.order) queryParams.append('order', params.order)
    if (params.price_min !== undefined) queryParams.append('price_min', params.price_min.toString())
    if (params.price_max !== undefined) queryParams.append('price_max', params.price_max.toString())
    if (params.rating_filter !== undefined) queryParams.append('rating_filter', params.rating_filter.toString())
    if (params.is_featured !== undefined) queryParams.append('is_featured', params.is_featured.toString())

    const queryString = queryParams.toString()
    const url = `${API_ENDPOINTS.PRODUCTS.LIST}${queryString ? `?${queryString}` : ''}`

    const response = await api.get<ApiResponse<ProductsResponse>>(url)
    return response.data.data
  } catch (error: any) {
    throw error
  }
}

/**
 * Lấy chi tiết product theo slug
 * Backend endpoint: GET /products/:slug
 */
export const getProductDetail = async (slug: string): Promise<Product> => {
  try {
    const response = await api.get<ApiResponse<Product>>(API_ENDPOINTS.PRODUCTS.DETAIL(slug))
    return response.data.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Product not found')
    }
    throw error
  }
}

/**
 * Lấy related products
 * Backend endpoint: GET /products/:slug/related
 */
export const getRelatedProducts = async (slug: string, limit: number = 4): Promise<Product[]> => {
  try {
    const response = await api.get<ApiResponse<Product[]>>(
      `${API_ENDPOINTS.PRODUCTS.DETAIL(slug)}/related?limit=${limit}`
    )
    return response.data.data
  } catch (error: any) {
    throw error
  }
}


import api from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type { AddToCartRequest, UpdateCartItemRequest } from '@/types/cart.types'
import type { ApiResponse } from '@/types/api.types'

/**
 * Interface cho cart item từ backend response
 */
export interface CartItemResponse {
  _id: string
  product_id: string
  buy_count: number
  color?: string
  size?: string
  product_name?: string
  product_image?: string
  price?: number
  price_before_discount?: number
  slug?: string
}

/**
 * Interface cho cart response từ backend
 */
export interface CartResponse {
  _id?: string
  user_id?: string
  items: CartItemResponse[]
  created_at?: string
  updated_at?: string
}

/**
 * Lấy giỏ hàng của user hiện tại
 * Backend endpoint: GET /cart
 */
export const getCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.get<ApiResponse<{ result: CartResponse }>>(API_ENDPOINTS.CART.GET)
    // Backend trả về trong result field
    return response.data.data?.result || { items: [] }
  } catch (error: any) {
    throw error
  }
}

/**
 * Thêm sản phẩm vào giỏ hàng
 * Backend endpoint: POST /cart/items
 */
export const addToCart = async (data: AddToCartRequest): Promise<void> => {
  try {
    await api.post<ApiResponse<any>>(API_ENDPOINTS.CART.ADD_ITEM, data)
  } catch (error: any) {
    throw error
  }
}

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 * Backend endpoint: PUT /cart/items/:itemId
 */
export const updateCartItem = async (
  itemId: string,
  data: UpdateCartItemRequest
): Promise<void> => {
  try {
    await api.put<ApiResponse<any>>(API_ENDPOINTS.CART.UPDATE_ITEM(itemId), data)
  } catch (error: any) {
    throw error
  }
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 * Backend endpoint: DELETE /cart/items/:itemId
 */
export const deleteCartItem = async (itemId: string): Promise<void> => {
  try {
    await api.delete<ApiResponse<any>>(API_ENDPOINTS.CART.DELETE_ITEM(itemId))
  } catch (error: any) {
    throw error
  }
}


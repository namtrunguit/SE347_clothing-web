import api from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type { ApiResponse } from '@/types/api.types'
import type { PlaceOrderRequest } from '@/types/order.types'

/**
 * Interface cho checkout init response
 */
export interface CheckoutInitResponse {
  user: {
    name: string
    email: string
    phone: string
  }
  saved_addresses: Array<{
    id: string
    full_address: string
    is_default: boolean
  }>
}

/**
 * Interface cho shipping validation request
 */
export interface ValidateShippingRequest {
  full_name: string
  phone: string
  email: string
  province_id: string
  district_id: string
  ward_id: string
  address: string
}

/**
 * Interface cho shipping validation response
 */
export interface ValidateShippingResponse {
  shipping_fee: number
  shipping_methods: Array<{
    id: string
    name: string
    fee: number
    estimated_delivery: string
  }>
}

/**
 * Interface cho payment info response
 */
export interface PaymentInfoResponse {
  summary: {
    subtotal: number
    subtotal_display: string
    shipping_fee: number
    shipping_display: string
    discount_amount: number
    total: number
    total_display: string
  }
  payment_methods: Array<{
    id: string
    name: string
    description?: string
    icons?: string[]
    is_enabled: boolean
  }>
}

/**
 * Interface cho place order response
 */
export interface PlaceOrderResponse {
  order_id: string
  order_code: string
  message?: string
}

/**
 * Lấy thông tin checkout init (user info, saved addresses)
 * Backend endpoint: GET /checkout/init
 */
export const getCheckoutInit = async (): Promise<CheckoutInitResponse> => {
  try {
    const response = await api.get<ApiResponse<CheckoutInitResponse>>(
      API_ENDPOINTS.CHECKOUT.INIT
    )
    return response.data.data
  } catch (error: any) {
    throw error
  }
}

/**
 * Validate shipping address và tính phí vận chuyển
 * Backend endpoint: POST /checkout/validate-shipping
 */
export const validateShipping = async (
  data: ValidateShippingRequest
): Promise<ValidateShippingResponse> => {
  try {
    const response = await api.post<ApiResponse<ValidateShippingResponse>>(
      API_ENDPOINTS.CHECKOUT.VALIDATE_SHIPPING,
      data
    )
    return response.data.data
  } catch (error: any) {
    throw error
  }
}

/**
 * Lấy thông tin payment (summary, payment methods)
 * Backend endpoint: GET /checkout/payment-info
 */
export const getPaymentInfo = async (): Promise<PaymentInfoResponse> => {
  try {
    const response = await api.get<ApiResponse<PaymentInfoResponse>>(
      API_ENDPOINTS.CHECKOUT.PAYMENT_INFO
    )
    return response.data.data
  } catch (error: any) {
    throw error
  }
}

/**
 * Đặt hàng
 * Backend endpoint: POST /checkout/place-order
 * Backend expects shipping_address as string, so we transform the data
 */
export const placeOrder = async (data: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  try {
    // Transform shipping_address object to string format expected by backend
    const shippingAddressString = `${data.shipping_address.address}, ${data.shipping_address.ward_id}, ${data.shipping_address.district_id}, ${data.shipping_address.province_id}`
    
    const requestBody = {
      payment_method: data.payment_method,
      note: data.note,
      billing_address_same_as_shipping: data.billing_address_same_as_shipping,
      shipping_address: shippingAddressString, // Backend expects string
      receiver_name: data.receiver_name,
      phone: data.phone,
      email: data.email,
    }

    const response = await api.post<ApiResponse<PlaceOrderResponse>>(
      API_ENDPOINTS.CHECKOUT.PLACE_ORDER,
      requestBody
    )
    return response.data.data
  } catch (error: any) {
    throw error
  }
}


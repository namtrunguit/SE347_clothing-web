// Order types
export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Shipping = 'shipping',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export interface OrderItem {
  product_id: string
  name: string
  thumbnail_url: string
  variant_text: string
  price: number
  quantity: number
  total: number
}

export interface ShippingInfo {
  receiver_name: string
  phone: string
  email: string
  address: string
  province_id?: string
  district_id?: string
  ward_id?: string
  payment_method: string
  estimated_delivery?: string
}

export interface CostSummary {
  subtotal: number
  shipping_fee: number
  discount_amount: number
  total: number
}

export interface Order {
  _id: string
  user_id: string
  order_code: string
  status: OrderStatus
  shipping_info: ShippingInfo
  items: OrderItem[]
  cost_summary: CostSummary
  note?: string
  created_at?: string
  updated_at?: string
}

export interface OrderFilters {
  page?: number
  limit?: number
  keyword?: string
  status?: OrderStatus
  start_date?: string
  end_date?: string
}

export interface ShippingAddress {
  full_name: string
  phone: string
  email: string
  province_id: string
  district_id: string
  ward_id: string
  address: string
}

export interface BillingAddress extends ShippingAddress {}

export interface PlaceOrderRequest {
  payment_method: string
  note?: string
  billing_address_same_as_shipping?: boolean
  billing_address?: BillingAddress
  shipping_address: ShippingAddress
  receiver_name: string
  phone: string
  email: string
}

export interface Location {
  _id: string
  name: string
  code?: string
  type?: 'province' | 'district' | 'ward'
}


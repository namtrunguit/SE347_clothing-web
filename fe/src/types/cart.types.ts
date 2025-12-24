// Cart types
import type { Product } from './product.types'

export interface CartItem {
  _id: string
  product_id: string | Product
  buy_count: number
  color?: string
  size?: string
  product?: Product // Populated product data
}

export interface Cart {
  _id: string
  user_id: string
  items: CartItem[]
  created_at?: string
  updated_at?: string
}

export interface AddToCartRequest {
  product_id: string
  buy_count: number
  color?: string
  size?: string
}

export interface UpdateCartItemRequest {
  buy_count: number
}


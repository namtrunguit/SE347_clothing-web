export interface PlaceOrderReqBody {
  payment_method: string
  note?: string
  billing_address_same_as_shipping?: boolean
  billing_address?: any
  shipping_address: string // Full address string for simplicity now, or structured
  receiver_name: string
  phone: string
  email: string
}

import { useCart as useCartContext } from '@/contexts/CartContext'

/**
 * Custom hook để access cart context
 * Wrapper cho useCart từ CartContext để dễ sử dụng
 */
export const useCart = () => {
  return useCartContext()
}


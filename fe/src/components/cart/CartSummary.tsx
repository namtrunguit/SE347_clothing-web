import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'
import { ROUTES } from '@/utils/constants'
import { formatPrice } from '@/utils/formatters'

interface CartSummaryProps {
  subtotal: number
  shipping?: number
  total: number
  onCheckout?: () => void
  isLoading?: boolean
}

const CartSummary = ({
  subtotal,
  shipping = 0,
  total,
  onCheckout,
  isLoading = false,
}: CartSummaryProps) => {
  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 500000
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal

  return (
    <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-bold text-text-main dark:text-white mb-6">
        Tóm tắt đơn hàng
      </h2>

      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between text-sm">
          <span className="text-text-sub dark:text-gray-400">Tạm tính</span>
          <span className="font-medium text-text-main dark:text-white">{formatPrice(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-text-sub dark:text-gray-400">Phí vận chuyển</span>
          {subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <span className="font-medium text-green-600 dark:text-green-400">Miễn phí</span>
          ) : (
            <span className="font-medium text-text-main dark:text-white">
              {shipping > 0 ? formatPrice(shipping) : 'Tính khi thanh toán'}
            </span>
          )}
        </div>

        {/* Free Shipping Message */}
        {subtotal < FREE_SHIPPING_THRESHOLD && remainingForFreeShipping > 0 && (
          <div className="bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-lg p-3 text-xs">
            <p className="text-primary dark:text-primary font-medium">
              Mua thêm {formatPrice(remainingForFreeShipping)} để được miễn phí vận chuyển!
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-text-main dark:text-white">Tổng cộng</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        isLoading={isLoading}
        className="w-full py-3 text-lg mb-4"
      >
        Thanh toán
      </Button>

      {/* Continue Shopping Link */}
      <Link
        to={ROUTES.PRODUCTS}
        className="block text-center text-sm text-primary hover:text-[#159cc9] transition-colors"
      >
        Tiếp tục mua sắm
      </Link>

      {/* Security Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-text-sub dark:text-gray-400">
          <span className="material-symbols-outlined text-base">lock</span>
          <span>Thanh toán an toàn và bảo mật</span>
        </div>
      </div>
    </div>
  )
}

export default CartSummary


import { Link } from 'react-router-dom'
import { formatPrice } from '@/utils/formatters'
import { ROUTES } from '@/utils/constants'
import type { Order, OrderStatus } from '@/types'

interface OrderCardProps {
  order: Order
}

const getStatusBadgeClass = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Pending:
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
    case OrderStatus.Processing:
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
    case OrderStatus.Shipping:
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
    case OrderStatus.Completed:
      return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    case OrderStatus.Cancelled:
      return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
  }
}

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Pending:
      return 'Chờ xử lý'
    case OrderStatus.Processing:
      return 'Đang xử lý'
    case OrderStatus.Shipping:
      return 'Đang giao hàng'
    case OrderStatus.Completed:
      return 'Hoàn thành'
    case OrderStatus.Cancelled:
      return 'Đã hủy'
    default:
      return status
  }
}

const OrderCard = ({ order }: OrderCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Link
      to={ROUTES.ORDER_DETAIL(order._id)}
      className="block bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Order Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-text-main dark:text-white">
              {order.order_code}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                order.status
              )}`}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>
          <p className="text-sm text-text-sub dark:text-gray-400 mb-2">
            Đặt hàng ngày {formatDate(order.created_at)}
          </p>
          <p className="text-sm text-text-sub dark:text-gray-400">
            {order.items.length} sản phẩm
          </p>
        </div>

        {/* Right: Total */}
        <div className="flex flex-col items-end sm:items-end">
          <p className="text-lg font-bold text-primary mb-1">
            {formatPrice(order.cost_summary.total)}
          </p>
          <span className="text-xs text-text-sub dark:text-gray-400">Tổng cộng</span>
        </div>
      </div>

      {/* Items Preview */}
      {order.items.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 overflow-x-auto">
            {order.items.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-16 h-16 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 overflow-hidden"
              >
                {item.thumbnail_url ? (
                  <img
                    src={item.thumbnail_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400 text-sm">image</span>
                  </div>
                )}
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="flex-shrink-0 w-16 h-16 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-xs font-semibold text-text-sub dark:text-gray-400">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Link>
  )
}

export default OrderCard


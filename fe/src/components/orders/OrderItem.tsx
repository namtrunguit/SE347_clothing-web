import { Link } from 'react-router-dom'
import { formatPrice } from '@/utils/formatters'
import { ROUTES } from '@/utils/constants'
import type { OrderItem as OrderItemType } from '@/types'

interface OrderItemProps {
  item: OrderItemType
  showLink?: boolean
}

const OrderItem = ({ item, showLink = true }: OrderItemProps) => {
  const content = (
    <div className="flex gap-4">
      {/* Product Image */}
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        {item.thumbnail_url ? (
          <img
            src={item.thumbnail_url}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-400">image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-text-main dark:text-white mb-1 line-clamp-2">
          {item.name}
        </h3>
        {item.variant_text && (
          <p className="text-sm text-text-sub dark:text-gray-400 mb-2">{item.variant_text}</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-sub dark:text-gray-400">
            Số lượng: {item.quantity}
          </p>
          <div className="text-right">
            <p className="text-sm text-text-sub dark:text-gray-400 line-through mb-1">
              {formatPrice(item.price)} × {item.quantity}
            </p>
            <p className="text-base font-semibold text-text-main dark:text-white">
              {formatPrice(item.total)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  if (showLink && item.product_id) {
    return (
      <Link
        to={ROUTES.PRODUCT_DETAIL(item.product_id)} // Note: This might need to be slug instead
        className="block hover:opacity-80 transition-opacity"
      >
        {content}
      </Link>
    )
  }

  return <div>{content}</div>
}

export default OrderItem


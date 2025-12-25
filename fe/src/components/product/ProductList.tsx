import ProductCard from './ProductCard'
import Skeleton from '@/components/common/Skeleton'
import type { Product } from '@/types'

interface ProductListProps {
  products: Product[]
  isLoading?: boolean
  emptyMessage?: string
  columns?: 1 | 2 | 3 | 4
}

const ProductList = ({
  products,
  isLoading = false,
  emptyMessage = 'Không tìm thấy sản phẩm nào',
  columns = 4,
}: ProductListProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (isLoading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[3/4]" />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">
          inventory_2
        </span>
        <p className="text-text-sub dark:text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductList


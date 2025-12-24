import { useState, useEffect } from 'react'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import type { ProductFilters, Category } from '@/types'

interface ProductFiltersProps {
  categories: Category[]
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  onClearFilters: () => void
}

const ProductFilters = ({
  categories,
  filters,
  onFiltersChange,
  onClearFilters,
}: ProductFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value, page: 1 }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters: ProductFilters = {
      page: 1,
      limit: filters.limit,
    }
    setLocalFilters(clearedFilters)
    onClearFilters()
  }

  const hasActiveFilters =
    localFilters.category_slug ||
    localFilters.name ||
    localFilters.price_min ||
    localFilters.price_max ||
    localFilters.rating_filter ||
    localFilters.sort_by

  return (
    <div className="bg-white dark:bg-[#1a2c32] border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-main dark:text-white">Bộ lọc</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Xóa bộ lọc
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <Input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={localFilters.name || ''}
            onChange={(e) => handleFilterChange('name', e.target.value || undefined)}
          />
        </div>

        {/* Category */}
        <div>
          <Select
            value={localFilters.category_slug || ''}
            onChange={(e) => handleFilterChange('category_slug', e.target.value || undefined)}
            options={[
              { value: '', label: 'Tất cả danh mục' },
              ...categories.map((cat) => ({
                value: cat.slug,
                label: cat.name,
              })),
            ]}
          />
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Giá tối thiểu"
            value={localFilters.price_min || ''}
            onChange={(e) =>
              handleFilterChange('price_min', e.target.value ? parseFloat(e.target.value) : undefined)
            }
          />
          <Input
            type="number"
            placeholder="Giá tối đa"
            value={localFilters.price_max || ''}
            onChange={(e) =>
              handleFilterChange('price_max', e.target.value ? parseFloat(e.target.value) : undefined)
            }
          />
        </div>

        {/* Rating */}
        <div>
          <Select
            value={localFilters.rating_filter?.toString() || ''}
            onChange={(e) =>
              handleFilterChange('rating_filter', e.target.value ? parseFloat(e.target.value) : undefined)
            }
            options={[
              { value: '', label: 'Tất cả đánh giá' },
              { value: '4.5', label: '4.5 sao trở lên' },
              { value: '4', label: '4 sao trở lên' },
              { value: '3.5', label: '3.5 sao trở lên' },
              { value: '3', label: '3 sao trở lên' },
            ]}
          />
        </div>

        {/* Sort */}
        <div>
          <Select
            value={`${localFilters.sort_by || ''}_${localFilters.order || 'desc'}`}
            onChange={(e) => {
              const [sort_by, order] = e.target.value.split('_')
              handleFilterChange('sort_by', sort_by || undefined)
              handleFilterChange('order', (order as 'asc' | 'desc') || 'desc')
            }}
            options={[
              { value: '_desc', label: 'Mặc định' },
              { value: 'price_asc', label: 'Giá: Thấp đến cao' },
              { value: 'price_desc', label: 'Giá: Cao đến thấp' },
              { value: 'createdAt_desc', label: 'Mới nhất' },
              { value: 'createdAt_asc', label: 'Cũ nhất' },
              { value: 'view_desc', label: 'Xem nhiều nhất' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductFilters


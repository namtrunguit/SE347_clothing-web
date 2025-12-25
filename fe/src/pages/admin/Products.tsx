import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import AdminLayout from '@/components/admin/AdminLayout'
import DataTable, { Column } from '@/components/admin/DataTable'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Pagination from '@/components/common/Pagination'
import Modal from '@/components/common/Modal'
import { useToast } from '@/contexts/ToastContext'
import * as adminService from '@/services/admin.service'
import { PAGINATION } from '@/utils/constants'
import { formatPrice } from '@/utils/formatters'
import type { Product } from '@/types'

const AdminProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { showSuccess, showError, showInfo } = useToast()

  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGINATION.DEFAULT_LIMIT,
    total_page: 1,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    page: parseInt(searchParams.get('page') || '1'),
    limit: PAGINATION.DEFAULT_LIMIT,
    keyword: searchParams.get('keyword') || '',
    category_slug: searchParams.get('category') || '',
    status: searchParams.get('status') || '',
  })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await adminService.getProducts(filters)
      setProducts(response.products)
      setPagination(response.pagination)
    } catch (error: any) {
      console.error('Failed to fetch products:', error)
      showError(error.response?.data?.message || 'Không thể tải danh sách sản phẩm')
    } finally {
      setIsLoading(false)
    }
  }, [filters, showError])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.page > 1) params.set('page', filters.page.toString())
    if (filters.keyword) params.set('keyword', filters.keyword)
    if (filters.category_slug) params.set('category', filters.category_slug)
    if (filters.status) params.set('status', filters.status)
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  const handleDelete = async () => {
    if (!productToDelete) return

    try {
      await adminService.deleteProduct(productToDelete._id)
      showSuccess('Đã xóa sản phẩm thành công')
      setDeleteModalOpen(false)
      setProductToDelete(null)
      fetchProducts()
    } catch (error: any) {
      showError(error.response?.data?.message || 'Không thể xóa sản phẩm')
    }
  }

  const columns: Column<Product>[] = [
    {
      key: 'image',
      header: 'Hình ảnh',
      render: (product) => (
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      key: 'name',
      header: 'Tên sản phẩm',
      sortable: true,
      render: (product) => (
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-xs text-text-sub dark:text-gray-400">{product.slug}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Danh mục',
      render: (product) => (
        <span className="text-sm">
          {typeof product.category === 'object' ? product.category.name : product.category || 'N/A'}
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Giá',
      sortable: true,
      render: (product) => (
        <div>
          <p className="font-medium">{formatPrice(product.price)}</p>
          {product.price_before_discount && product.price_before_discount > product.price && (
            <p className="text-xs text-text-sub dark:text-gray-400 line-through">
              {formatPrice(product.price_before_discount)}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'quantity',
      header: 'Tồn kho',
      sortable: true,
      render: (product) => (
        <span className={product.quantity === 0 ? 'text-red-500' : ''}>
          {product.quantity || 0}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (product) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {product.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Thao tác',
      render: (product) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // TODO: Navigate to edit page or open edit modal
              showInfo('Chức năng chỉnh sửa sẽ được implement sau')
            }}
          >
            Sửa
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setProductToDelete(product)
              setDeleteModalOpen(true)
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ]

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-main dark:text-white mb-4">Quản lý sản phẩm</h1>
          <div className="flex items-center justify-between mb-6">
            <Button
                onClick={() => {
                  // TODO: Navigate to add product page
                  showInfo('Chức năng thêm sản phẩm sẽ được implement sau')
                }}
              >
                Thêm sản phẩm
              </Button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={filters.keyword}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, keyword: e.target.value, page: 1 }))
                  }
                />
                <Select
                  value={filters.category_slug}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, category_slug: e.target.value, page: 1 }))
                  }
                  options={[
                    { value: '', label: 'Tất cả danh mục' },
                    // TODO: Fetch categories and populate
                  ]}
                />
                <Select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }))
                  }
                  options={[
                    { value: '', label: 'Tất cả trạng thái' },
                    { value: 'active', label: 'Hoạt động' },
                    { value: 'inactive', label: 'Tạm ngưng' },
                  ]}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters({
                      page: 1,
                      limit: PAGINATION.DEFAULT_LIMIT,
                      keyword: '',
                      category_slug: '',
                      status: '',
                    })
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              columns={columns}
              data={products}
              loading={isLoading}
              emptyMessage="Không có sản phẩm nào"
            />

            {/* Pagination */}
            {pagination.total_page > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.total_page}
                  onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
                />
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setProductToDelete(null)
        }}
        title="Xác nhận xóa"
        size="sm"
      >
        <div className="p-6">
          <p className="text-text-main dark:text-white mb-4">
            Bạn có chắc chắn muốn xóa sản phẩm <strong>{productToDelete?.name}</strong>?
          </p>
          <p className="text-sm text-text-sub dark:text-gray-400 mb-6">
            Hành động này không thể hoàn tác.
          </p>
          <div className="flex gap-4 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteModalOpen(false)
                setProductToDelete(null)
              }}
            >
              Hủy
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Xóa
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  )
}

export default AdminProducts

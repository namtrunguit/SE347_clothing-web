import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import StatsCard from '@/components/admin/StatsCard'
import Chart from '@/components/admin/Chart'
import Skeleton from '@/components/common/Skeleton'
import { useToast } from '@/contexts/ToastContext'
import * as adminService from '@/services/admin.service'
import { formatPrice } from '@/utils/formatters'

const AdminDashboard = () => {
  const [stats, setStats] = useState<adminService.DashboardStats | null>(null)
  const [chartData, setChartData] = useState<adminService.RevenueChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<{ start_date?: string; end_date?: string }>({})
  const { showError } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [statsData, chartDataResult] = await Promise.all([
          adminService.getDashboardStats(dateRange),
          adminService.getRevenueChart({ ...dateRange, days: 30 }),
        ])
        setStats(statsData)
        setChartData(chartDataResult)
      } catch (error: any) {
        console.error('Failed to fetch dashboard data:', error)
        showError(error.response?.data?.message || 'Không thể tải dữ liệu dashboard.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dateRange])

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    setDateRange((prev) => ({
      ...prev,
      [type === 'start' ? 'start_date' : 'end_date']: value || undefined,
    }))
  }

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-main dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-text-sub dark:text-gray-400">
              Tổng quan về hoạt động của cửa hàng
            </p>
          </div>

          {/* Date Range Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 sm:flex-initial">
              <label className="block text-sm font-medium text-text-main dark:text-white mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                value={dateRange.start_date || ''}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111d21] text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div className="flex-1 sm:flex-initial">
              <label className="block text-sm font-medium text-text-main dark:text-white mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                value={dateRange.end_date || ''}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111d21] text-text-main dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <button
              onClick={() => setDateRange({})}
              className="px-4 py-2 text-sm font-medium text-text-sub dark:text-gray-400 hover:text-primary transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>

          {/* Stats Cards */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Tổng doanh thu"
                value={stats.total_revenue}
                icon="payments"
                formatCurrency
                trend={
                  stats.revenue_change !== undefined
                    ? {
                        value: stats.revenue_change,
                        isPositive: stats.revenue_change >= 0,
                      }
                    : undefined
                }
              />
              <StatsCard
                title="Tổng đơn hàng"
                value={stats.total_orders}
                icon="shopping_bag"
                trend={
                  stats.orders_change !== undefined
                    ? {
                        value: stats.orders_change,
                        isPositive: stats.orders_change >= 0,
                      }
                    : undefined
                }
              />
              <StatsCard
                title="Tổng khách hàng"
                value={stats.total_customers}
                icon="people"
                trend={
                  stats.customers_change !== undefined
                    ? {
                        value: stats.customers_change,
                        isPositive: stats.customers_change >= 0,
                      }
                    : undefined
                }
              />
              <StatsCard
                title="Tổng sản phẩm"
                value={stats.total_products}
                icon="inventory"
                trend={
                  stats.products_change !== undefined
                    ? {
                        value: stats.products_change,
                        isPositive: stats.products_change >= 0,
                      }
                    : undefined
                }
              />
            </div>
          ) : null}

          {/* Revenue Chart */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-text-main dark:text-white mb-4">
              Biểu đồ doanh thu
            </h2>
            {loading ? (
              <Skeleton className="h-80 w-full rounded-xl" />
            ) : (
              <Chart data={chartData} type="line" height={300} />
            )}
          </div>
        </div>
    </AdminLayout>
  )
}

export default AdminDashboard

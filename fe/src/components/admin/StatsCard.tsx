import { formatPrice } from '@/utils/formatters'

interface StatsCardProps {
  title: string
  value: string | number
  icon?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  formatCurrency?: boolean
}

const StatsCard = ({ title, value, icon, trend, formatCurrency = false }: StatsCardProps) => {
  const displayValue = formatCurrency && typeof value === 'number' ? formatPrice(value) : value

  return (
    <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-sub dark:text-gray-400">{title}</h3>
        {icon && (
          <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
            <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-text-main dark:text-white">{displayValue}</p>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              trend.isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {trend.isPositive ? 'trending_up' : 'trending_down'}
            </span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard


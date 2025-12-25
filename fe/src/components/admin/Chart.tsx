import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ChartProps {
  data: Array<{ date: string; revenue: number; orders?: number }>
  type?: 'line' | 'bar'
  height?: number
}

const Chart = ({ data, type = 'line', height = 300 }: ChartProps) => {
  const ChartComponent = type === 'line' ? LineChart : BarChart
  const DataComponent = type === 'line' ? Line : Bar

  return (
    <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <DataComponent
            type="monotone"
            dataKey="revenue"
            stroke="#19b3e6"
            fill="#19b3e6"
            name="Doanh thu"
          />
          {data[0]?.orders !== undefined && (
            <DataComponent
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              fill="#10b981"
              name="Đơn hàng"
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart


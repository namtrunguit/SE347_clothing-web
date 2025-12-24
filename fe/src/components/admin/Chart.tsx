// Note: This component requires recharts library
// Install with: npm install recharts
// For now, we'll create a placeholder that shows a message if recharts is not available

interface ChartProps {
  data: Array<{ date: string; revenue: number; orders?: number }>
  type?: 'line' | 'bar'
  height?: number
}

const Chart = ({ data, type = 'line', height = 300 }: ChartProps) => {
  // Check if recharts is available
  let RechartsLineChart: any = null
  let RechartsBarChart: any = null
  let Line: any = null
  let Bar: any = null
  let XAxis: any = null
  let YAxis: any = null
  let CartesianGrid: any = null
  let Tooltip: any = null
  let Legend: any = null
  let ResponsiveContainer: any = null

  try {
    const recharts = require('recharts')
    RechartsLineChart = recharts.LineChart
    RechartsBarChart = recharts.BarChart
    Line = recharts.Line
    Bar = recharts.Bar
    XAxis = recharts.XAxis
    YAxis = recharts.YAxis
    CartesianGrid = recharts.CartesianGrid
    Tooltip = recharts.Tooltip
    Legend = recharts.Legend
    ResponsiveContainer = recharts.ResponsiveContainer
  } catch (e) {
    // recharts not installed
  }

  if (!RechartsLineChart) {
    return (
      <div
        className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center"
        style={{ height: `${height}px` }}
      >
        <p className="text-text-sub dark:text-gray-400 mb-2">
          Chart library (recharts) chưa được cài đặt
        </p>
        <p className="text-sm text-text-sub dark:text-gray-400">
          Chạy: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm install recharts</code>
        </p>
      </div>
    )
  }

  const ChartComponent = type === 'line' ? RechartsLineChart : RechartsBarChart
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


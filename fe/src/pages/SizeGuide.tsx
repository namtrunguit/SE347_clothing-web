import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ROUTES } from '@/utils/constants'

const SizeGuide = () => {
  const sizeChart = [
    { size: 'XS', chest: '86-90', waist: '70-74', hip: '90-94', length: '58-60' },
    { size: 'S', chest: '90-94', waist: '74-78', hip: '94-98', length: '60-62' },
    { size: 'M', chest: '94-98', waist: '78-82', hip: '98-102', length: '62-64' },
    { size: 'L', chest: '98-102', waist: '82-86', hip: '102-106', length: '64-66' },
    { size: 'XL', chest: '102-106', waist: '86-90', hip: '106-110', length: '66-68' },
    { size: 'XXL', chest: '106-110', waist: '90-94', hip: '110-114', length: '68-70' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-6xl">
          <Breadcrumb
            items={[
              { label: 'Trang chủ', path: ROUTES.HOME },
              { label: 'Hướng dẫn chọn size' },
            ]}
          />

          <div className="mt-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-text-main dark:text-white mb-4">
                Hướng dẫn chọn size
              </h1>
              <p className="text-text-sub dark:text-gray-400 max-w-2xl mx-auto">
                Chọn size phù hợp giúp bạn cảm thấy thoải mái và tự tin nhất. Hãy tham khảo bảng
                size chart dưới đây để tìm size phù hợp với bạn.
              </p>
            </div>

            {/* Size Chart Table */}
            <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-12 overflow-x-auto">
              <h2 className="text-2xl font-bold text-text-main dark:text-white mb-6">
                Bảng size áo (cm)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                      <th className="px-6 py-4 text-sm font-semibold text-text-main dark:text-white uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-text-main dark:text-white uppercase tracking-wider">
                        Ngực (cm)
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-text-main dark:text-white uppercase tracking-wider">
                        Eo (cm)
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-text-main dark:text-white uppercase tracking-wider">
                        Mông (cm)
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-text-main dark:text-white uppercase tracking-wider">
                        Dài (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sizeChart.map((row) => (
                      <tr
                        key={row.size}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-bold text-text-main dark:text-white">
                          {row.size}
                        </td>
                        <td className="px-6 py-4 text-text-sub dark:text-gray-400">{row.chest}</td>
                        <td className="px-6 py-4 text-text-sub dark:text-gray-400">{row.waist}</td>
                        <td className="px-6 py-4 text-text-sub dark:text-gray-400">{row.hip}</td>
                        <td className="px-6 py-4 text-text-sub dark:text-gray-400">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-4">
                  Cách đo size
                </h3>
                <ul className="space-y-3 text-text-sub dark:text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <strong>Ngực:</strong> Đo vòng ngực tại điểm rộng nhất, giữ thước đo ngang
                      và không quá chặt
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <strong>Eo:</strong> Đo vòng eo tại điểm nhỏ nhất, thường ở trên rốn khoảng
                      2-3cm
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                      check_circle
                    </span>
                    <span>
                      <strong>Mông:</strong> Đo vòng mông tại điểm rộng nhất, giữ thước đo ngang
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold text-text-main dark:text-white mb-4">
                  Lưu ý khi chọn size
                </h3>
                <ul className="space-y-3 text-text-sub dark:text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                      info
                    </span>
                    <span>
                      Nếu số đo của bạn nằm giữa 2 size, hãy chọn size lớn hơn để thoải mái hơn
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                      info
                    </span>
                    <span>
                      Các sản phẩm của YORI có thiết kế rộng rãi, phù hợp với phong cách tối giản
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                      info
                    </span>
                    <span>
                      Nếu bạn có thắc mắc về size, vui lòng liên hệ với chúng tôi để được tư vấn
                      chi tiết
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SizeGuide

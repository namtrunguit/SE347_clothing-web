import { Link } from 'react-router-dom'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Button from '@/components/common/Button'
import { ROUTES } from '@/utils/constants'

const Error500 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
            <span className="material-symbols-outlined text-6xl text-red-500 dark:text-red-400 mb-4">
              error
            </span>
            <h1 className="text-4xl font-bold text-text-main dark:text-white mb-4">500</h1>
            <h2 className="text-2xl font-semibold text-text-main dark:text-white mb-4">
              Lỗi máy chủ
            </h2>
            <p className="text-text-sub dark:text-gray-400 mb-8">
              Xin lỗi, đã có lỗi xảy ra ở phía máy chủ. Vui lòng thử lại sau hoặc liên hệ với chúng
              tôi nếu vấn đề vẫn tiếp tục.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>Tải lại trang</Button>
              <Link
                to={ROUTES.HOME}
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 text-lg"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Error500


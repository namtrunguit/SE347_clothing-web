import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import { ROUTES } from '@/utils/constants'

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-4xl">
          <Breadcrumb
            items={[
              { label: 'Trang chủ', path: ROUTES.HOME },
              { label: 'Điều khoản & Chính sách' },
            ]}
          />

          <div className="mt-8 bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
            <h1 className="text-3xl font-bold text-text-main dark:text-white mb-8">
              Điều khoản & Chính sách
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                  1. Điều khoản sử dụng
                </h2>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed mb-4">
                  Bằng việc truy cập và sử dụng website YORI, bạn đồng ý tuân thủ các điều khoản
                  và điều kiện sau đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng
                  không sử dụng website này.
                </p>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed">
                  Chúng tôi có quyền thay đổi, sửa đổi hoặc bổ sung các điều khoản này bất cứ lúc
                  nào mà không cần thông báo trước. Việc bạn tiếp tục sử dụng website sau khi có
                  thay đổi được coi là bạn đã chấp nhận các điều khoản mới.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                  2. Quyền sở hữu trí tuệ
                </h2>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed mb-4">
                  Tất cả nội dung trên website YORI, bao gồm nhưng không giới hạn ở văn bản, hình
                  ảnh, logo, thiết kế, phần mềm và các tài liệu khác, đều thuộc quyền sở hữu của
                  YORI hoặc các bên cấp phép.
                </p>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed">
                  Bạn không được phép sao chép, tái sản xuất, phân phối, hiển thị hoặc sử dụng bất
                  kỳ nội dung nào từ website này mà không có sự cho phép bằng văn bản từ YORI.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                  3. Chính sách đổi trả
                </h2>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed mb-4">
                  YORI chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng, với điều
                  kiện:
                </p>
                <ul className="list-disc list-inside text-text-sub dark:text-gray-400 space-y-2 mb-4">
                  <li>Sản phẩm chưa được sử dụng, còn nguyên tem mác và bao bì</li>
                  <li>Sản phẩm không bị hư hỏng do lỗi của khách hàng</li>
                  <li>Có hóa đơn mua hàng hợp lệ</li>
                </ul>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed">
                  Chi phí vận chuyển đổi trả sẽ do khách hàng chịu trách nhiệm, trừ trường hợp sản
                  phẩm bị lỗi từ phía YORI.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                  4. Chính sách bảo mật
                </h2>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed mb-4">
                  YORI cam kết bảo vệ thông tin cá nhân của khách hàng. Chúng tôi thu thập và sử
                  dụng thông tin của bạn chỉ nhằm mục đích:
                </p>
                <ul className="list-disc list-inside text-text-sub dark:text-gray-400 space-y-2 mb-4">
                  <li>Xử lý đơn hàng và giao hàng</li>
                  <li>Cải thiện dịch vụ khách hàng</li>
                  <li>Gửi thông tin về sản phẩm mới và khuyến mãi (nếu bạn đồng ý)</li>
                </ul>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed">
                  Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bất kỳ
                  bên thứ ba nào mà không có sự đồng ý của bạn.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                  5. Thanh toán
                </h2>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed">
                  YORI chấp nhận các phương thức thanh toán: thẻ tín dụng/ghi nợ, chuyển khoản ngân
                  hàng, ví điện tử và thanh toán khi nhận hàng (COD). Tất cả giao dịch đều được
                  bảo mật và mã hóa.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                  6. Vận chuyển
                </h2>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed mb-4">
                  YORI giao hàng toàn quốc. Thời gian giao hàng dự kiến:
                </p>
                <ul className="list-disc list-inside text-text-sub dark:text-gray-400 space-y-2">
                  <li>Nội thành TP.HCM: 1-2 ngày</li>
                  <li>Các tỉnh thành khác: 3-5 ngày</li>
                  <li>Vùng sâu vùng xa: 5-7 ngày</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-4">
                  7. Liên hệ
                </h2>
                <p className="text-text-sub dark:text-gray-400 leading-relaxed">
                  Nếu bạn có bất kỳ câu hỏi nào về các điều khoản và chính sách này, vui lòng liên
                  hệ với chúng tôi qua email: hello@yori.vn hoặc hotline: 090 123 4567.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Terms

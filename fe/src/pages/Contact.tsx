import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { ROUTES } from '@/utils/constants'
import { useToast } from '@/contexts/ToastContext'
import * as contactService from '@/services/contact.service'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên của bạn'),
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  message: z.string().min(10, 'Vui lòng nhập ít nhất 10 ký tự'),
})

type ContactFormData = z.infer<typeof contactSchema>

const Contact = () => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { showError, showSuccess } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    setSuccess(false)
    try {
      await contactService.submitContact(data)
      setSuccess(true)
      showSuccess('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.')
      reset()
      setTimeout(() => setSuccess(false), 5000)
    } catch (error: any) {
      console.error('Failed to submit contact:', error)
      showError(error.response?.data?.message || 'Gửi tin nhắn thất bại. Vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-6xl">
          <Breadcrumb
            items={[
              { label: 'Trang chủ', path: ROUTES.HOME },
              { label: 'Liên hệ' },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div>
              <h1 className="text-3xl font-bold text-text-main dark:text-white mb-4">
                Liên hệ với chúng tôi
              </h1>
              <p className="text-text-sub dark:text-gray-400 mb-8">
                Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy gửi tin nhắn cho chúng tôi
                hoặc liên hệ trực tiếp qua các kênh sau.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main dark:text-white mb-1">Địa chỉ</h3>
                    <p className="text-text-sub dark:text-gray-400">
                      123 Đường Nguyễn Huệ, Quận 1,<br />
                      TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-2xl">call</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main dark:text-white mb-1">
                      Số điện thoại
                    </h3>
                    <p className="text-text-sub dark:text-gray-400">090 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main dark:text-white mb-1">Email</h3>
                    <p className="text-text-sub dark:text-gray-400">hello@yori.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main dark:text-white mb-1">
                      Giờ làm việc
                    </h3>
                    <p className="text-text-sub dark:text-gray-400">
                      Thứ 2 - Thứ 6: 9:00 - 18:00
                      <br />
                      Thứ 7 - Chủ nhật: 10:00 - 16:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-text-main dark:text-white mb-6">
                Gửi tin nhắn
              </h2>

              {success && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-300 text-sm">
                    Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Họ và tên"
                  type="text"
                  {...register('name')}
                  error={errors.name?.message}
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-text-main dark:text-white mb-2">
                    Tin nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111d21] px-4 py-3 text-base text-text-main dark:text-white placeholder:text-text-sub dark:placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Nhập tin nhắn của bạn..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button type="submit" isLoading={submitting} className="w-full">
                  Gửi tin nhắn
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact

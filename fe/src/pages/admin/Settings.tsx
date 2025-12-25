import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AdminLayout from '@/components/admin/AdminLayout'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import FileUpload from '@/components/admin/FileUpload'
import Spinner from '@/components/common/Spinner'
import { useToast } from '@/contexts/ToastContext'
import * as adminService from '@/services/admin.service'
import { ROUTES } from '@/utils/constants'
import type { Settings } from '@/types/settings.types'

const AdminSettings = () => {
  const { showSuccess, showError } = useToast()
  const [activeTab, setActiveTab] = useState<'general' | 'logo' | 'payment' | 'shipping'>('general')
  const [settings, setSettings] = useState<Settings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Settings['general']>({
    defaultValues: {
      store_name: '',
      store_email: '',
      store_phone: '',
      store_address: '',
    },
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    if (settings) {
      reset(settings.general)
      if (settings.general.logo_url) {
        setLogoPreview(settings.general.logo_url)
      }
    }
  }, [settings, reset])

  const fetchSettings = async () => {
    try {
      setIsLoading(true)
      const data = await adminService.getSettings()
      setSettings(data)
    } catch (error: any) {
      console.error('Failed to fetch settings:', error)
      showError(error.response?.data?.message || 'Không thể tải cài đặt')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitGeneral = async (data: Settings['general']) => {
    try {
      setIsSaving(true)
      await adminService.updateSettingsGeneral(data)
      showSuccess('Đã cập nhật cài đặt chung thành công')
      fetchSettings()
    } catch (error: any) {
      showError(error.response?.data?.message || 'Không thể cập nhật cài đặt')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogoUpload = async () => {
    if (!logoFile) {
      showError('Vui lòng chọn file logo')
      return
    }

    try {
      setIsSaving(true)
      const result = await adminService.uploadLogo(logoFile)
      showSuccess('Đã tải logo thành công')
      setLogoPreview(result.logo_url)
      setLogoFile(null)
      fetchSettings()
    } catch (error: any) {
      showError(error.response?.data?.message || 'Không thể tải logo')
    } finally {
      setIsSaving(false)
    }
  }

  const onSubmitPayment = async (data: any) => {
    try {
      setIsSaving(true)
      await adminService.updatePaymentSettings(data)
      showSuccess('Đã cập nhật cài đặt thanh toán thành công')
      fetchSettings()
    } catch (error: any) {
      showError(error.response?.data?.message || 'Không thể cập nhật cài đặt thanh toán')
    } finally {
      setIsSaving(false)
    }
  }

  const onSubmitShipping = async (data: any) => {
    try {
      setIsSaving(true)
      await adminService.updateShippingSettings(data)
      showSuccess('Đã cập nhật cài đặt vận chuyển thành công')
      fetchSettings()
    } catch (error: any) {
      showError(error.response?.data?.message || 'Không thể cập nhật cài đặt vận chuyển')
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: 'general', label: 'Cài đặt chung', icon: 'settings' },
    { id: 'logo', label: 'Logo', icon: 'image' },
    { id: 'payment', label: 'Thanh toán', icon: 'payment' },
    { id: 'shipping', label: 'Vận chuyển', icon: 'local_shipping' },
  ]

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Spinner size="lg" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-main dark:text-white mb-6">Cài đặt hệ thống</h1>

            {/* Tabs */}
            <div className="bg-white dark:bg-[#1a2c32] rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-text-sub dark:text-gray-400 hover:text-text-main dark:hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <form onSubmit={handleSubmit(onSubmitGeneral)} className="space-y-4">
                    <Input
                      label="Tên cửa hàng"
                      {...register('store_name', { required: 'Tên cửa hàng là bắt buộc' })}
                      error={errors.store_name?.message}
                    />
                    <Input
                      label="Email cửa hàng"
                      type="email"
                      {...register('store_email', {
                        required: 'Email là bắt buộc',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email không hợp lệ',
                        },
                      })}
                      error={errors.store_email?.message}
                    />
                    <Input
                      label="Số điện thoại"
                      {...register('store_phone')}
                      error={errors.store_phone?.message}
                    />
                    <Input
                      label="Địa chỉ"
                      {...register('store_address')}
                      error={errors.store_address?.message}
                    />
                    <div className="flex justify-end">
                      <Button type="submit" isLoading={isSaving}>
                        Lưu cài đặt
                      </Button>
                    </div>
                  </form>
                )}

                {/* Logo Settings */}
                {activeTab === 'logo' && (
                  <div className="space-y-4">
                    {logoPreview && (
                      <div className="mb-4">
                        <p className="text-sm text-text-sub dark:text-gray-400 mb-2">Logo hiện tại:</p>
                        <img
                          src={logoPreview}
                          alt="Logo"
                          className="h-32 w-auto object-contain border border-gray-200 dark:border-gray-700 rounded"
                        />
                      </div>
                    )}
                    <FileUpload
                      onFileSelect={(file) => {
                        setLogoFile(file)
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setLogoPreview(reader.result as string)
                        }
                        reader.readAsDataURL(file)
                      }}
                      accept="image/*"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleLogoUpload} isLoading={isSaving}>
                        Tải logo lên
                      </Button>
                    </div>
                  </div>
                )}

                {/* Payment Settings */}
                {activeTab === 'payment' && (
                  <form onSubmit={handleSubmit(onSubmitPayment)} className="space-y-4">
                    <p className="text-text-sub dark:text-gray-400">
                      Cài đặt thanh toán sẽ được implement sau khi backend có API chi tiết.
                    </p>
                    <div className="flex justify-end">
                      <Button type="submit" isLoading={isSaving} disabled>
                        Lưu cài đặt
                      </Button>
                    </div>
                  </form>
                )}

                {/* Shipping Settings */}
                {activeTab === 'shipping' && (
                  <form onSubmit={handleSubmit(onSubmitShipping)} className="space-y-4">
                    <p className="text-text-sub dark:text-gray-400">
                      Cài đặt vận chuyển sẽ được implement sau khi backend có API chi tiết.
                    </p>
                    <div className="flex justify-end">
                      <Button type="submit" isLoading={isSaving} disabled>
                        Lưu cài đặt
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
    </AdminLayout>
  )
}

export default AdminSettings

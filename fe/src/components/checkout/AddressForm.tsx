import { useState, useEffect } from 'react'
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import Select from '@/components/common/Select'
import Input from '@/components/common/Input'
import * as locationsService from '@/services/locations.service'
import type { Province, District, Ward } from '@/services/locations.service'
import Spinner from '@/components/common/Spinner'

interface AddressFormData {
  full_name: string
  phone: string
  email: string
  province_id: string
  district_id: string
  ward_id: string
  address: string
}

interface AddressFormProps {
  register: UseFormRegister<AddressFormData>
  errors: FieldErrors<AddressFormData>
  setValue: UseFormSetValue<AddressFormData>
  watch: UseFormWatch<AddressFormData>
  disabled?: boolean
}

const AddressForm = ({ register, errors, setValue, watch, disabled = false }: AddressFormProps) => {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [loadingProvinces, setLoadingProvinces] = useState(false)
  const [loadingDistricts, setLoadingDistricts] = useState(false)
  const [loadingWards, setLoadingWards] = useState(false)

  const provinceId = watch('province_id')
  const districtId = watch('district_id')

  // Fetch provinces on mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true)
      try {
        const data = await locationsService.getProvinces()
        setProvinces(data)
      } catch (error) {
        console.error('Failed to fetch provinces:', error)
      } finally {
        setLoadingProvinces(false)
      }
    }
    fetchProvinces()
  }, [])

  // Fetch districts when province changes
  useEffect(() => {
    if (!provinceId) {
      setDistricts([])
      setWards([])
      setValue('district_id', '')
      setValue('ward_id', '')
      return
    }

    const fetchDistricts = async () => {
      setLoadingDistricts(true)
      try {
        const data = await locationsService.getDistricts(provinceId)
        setDistricts(data)
        // Reset district and ward when province changes
        setValue('district_id', '')
        setValue('ward_id', '')
        setWards([])
      } catch (error) {
        console.error('Failed to fetch districts:', error)
      } finally {
        setLoadingDistricts(false)
      }
    }
    fetchDistricts()
  }, [provinceId, setValue])

  // Fetch wards when district changes
  useEffect(() => {
    if (!districtId) {
      setWards([])
      setValue('ward_id', '')
      return
    }

    const fetchWards = async () => {
      setLoadingWards(true)
      try {
        const data = await locationsService.getWards(districtId)
        setWards(data)
        // Reset ward when district changes
        setValue('ward_id', '')
      } catch (error) {
        console.error('Failed to fetch wards:', error)
      } finally {
        setLoadingWards(false)
      }
    }
    fetchWards()
  }, [districtId, setValue])

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <Input
          label="Họ và tên"
          type="text"
          {...register('full_name')}
          error={errors.full_name?.message}
          disabled={disabled}
          required
        />
      </div>

      {/* Phone and Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Số điện thoại"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
          disabled={disabled}
          required
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          disabled={disabled}
          required
        />
      </div>

      {/* Province, District, Ward */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Select
            label="Tỉnh / Thành phố"
            {...register('province_id')}
            error={errors.province_id?.message}
            disabled={disabled || loadingProvinces}
            required
          >
            <option value="">Chọn Tỉnh/Thành</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </Select>
          {loadingProvinces && (
            <div className="mt-2 flex items-center gap-2 text-sm text-text-sub">
              <Spinner size="sm" />
              <span>Đang tải...</span>
            </div>
          )}
        </div>

        <div>
          <Select
            label="Quận / Huyện"
            {...register('district_id')}
            error={errors.district_id?.message}
            disabled={disabled || !provinceId || loadingDistricts}
            required
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </Select>
          {loadingDistricts && (
            <div className="mt-2 flex items-center gap-2 text-sm text-text-sub">
              <Spinner size="sm" />
              <span>Đang tải...</span>
            </div>
          )}
        </div>

        <div>
          <Select
            label="Phường / Xã"
            {...register('ward_id')}
            error={errors.ward_id?.message}
            disabled={disabled || !districtId || loadingWards}
            required
          >
            <option value="">Chọn Phường/Xã</option>
            {wards.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
              </option>
            ))}
          </Select>
          {loadingWards && (
            <div className="mt-2 flex items-center gap-2 text-sm text-text-sub">
              <Spinner size="sm" />
              <span>Đang tải...</span>
            </div>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <Input
          label="Địa chỉ cụ thể"
          type="text"
          {...register('address')}
          error={errors.address?.message}
          disabled={disabled}
          placeholder="Số nhà, tên đường, tòa nhà..."
          required
        />
      </div>
    </div>
  )
}

export default AddressForm


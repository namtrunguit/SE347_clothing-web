import { useState, useEffect } from 'react'
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch, Control, Controller } from 'react-hook-form'
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
  control: Control<AddressFormData>
  disabled?: boolean
}

const AddressForm = ({ register, errors, setValue, watch, control, disabled = false }: AddressFormProps) => {
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
        console.log('Provinces fetched:', data)
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
    console.log('Province ID changed:', provinceId, 'Type:', typeof provinceId)
    if (!provinceId || provinceId === '') {
      setDistricts([])
      setWards([])
      setValue('district_id', '')
      setValue('ward_id', '')
      return
    }

    const fetchDistricts = async () => {
      setLoadingDistricts(true)
      try {
        console.log('Fetching districts for province:', provinceId)
        const data = await locationsService.getDistricts(provinceId)
        console.log('Districts fetched:', data)
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
    console.log('District ID changed:', districtId, 'Type:', typeof districtId)
    if (!districtId || districtId === '') {
      setWards([])
      setValue('ward_id', '')
      return
    }

    const fetchWards = async () => {
      setLoadingWards(true)
      try {
        console.log('Fetching wards for district:', districtId)
        const data = await locationsService.getWards(districtId)
        console.log('Wards fetched:', data)
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
          <Controller
            name="province_id"
            control={control}
            render={({ field: { onChange, value, onBlur, name, ref } }) => (
              <Select
                label="Tỉnh / Thành phố"
                name={name}
                ref={ref}
                value={value || ''}
                onChange={(e) => {
                  const selectedValue = e.target.value
                  console.log('🔵 Province onChange triggered:', selectedValue, 'Event:', e)
                  onChange(e) // Pass the event directly to Controller
                }}
                onBlur={onBlur}
                error={errors.province_id?.message}
                disabled={disabled || loadingProvinces}
                required
                placeholder="Chọn Tỉnh/Thành"
                options={provinces.map((province) => ({
                  value: province.id,
                  label: province.name
                }))}
              />
            )}
          />
          {loadingProvinces && (
            <div className="mt-2 flex items-center gap-2 text-sm text-text-sub">
              <Spinner size="sm" />
              <span>Đang tải...</span>
            </div>
          )}
        </div>

        <div>
          <Controller
            name="district_id"
            control={control}
            render={({ field: { onChange, value, onBlur, name, ref } }) => (
              <Select
                label="Quận / Huyện"
                name={name}
                ref={ref}
                value={value || ''}
                onChange={(e) => {
                  const selectedValue = e.target.value
                  console.log('🟢 District onChange triggered:', selectedValue, 'Event:', e)
                  onChange(e) // Pass the event directly to Controller
                }}
                onBlur={onBlur}
                error={errors.district_id?.message}
                disabled={disabled || !provinceId || loadingDistricts}
                required
                placeholder="Chọn Quận/Huyện"
                options={districts.map((district) => ({
                  value: district.id,
                  label: district.name
                }))}
              />
            )}
          />
          {loadingDistricts && (
            <div className="mt-2 flex items-center gap-2 text-sm text-text-sub">
              <Spinner size="sm" />
              <span>Đang tải...</span>
            </div>
          )}
        </div>

        <div>
          <Controller
            name="ward_id"
            control={control}
            render={({ field: { onChange, value, onBlur, name, ref } }) => (
              <Select
                label="Phường / Xã"
                name={name}
                ref={ref}
                value={value || ''}
                onChange={(e) => {
                  const selectedValue = e.target.value
                  console.log('🟡 Ward onChange triggered:', selectedValue, 'Event:', e)
                  onChange(e) // Pass the event directly to Controller
                }}
                onBlur={onBlur}
                error={errors.ward_id?.message}
                disabled={disabled || !districtId || loadingWards}
                required
                placeholder="Chọn Phường/Xã"
                options={wards.map((ward) => ({
                  value: ward.id,
                  label: ward.name
                }))}
              />
            )}
          />
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


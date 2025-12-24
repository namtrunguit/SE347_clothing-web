import api from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type { ApiResponse } from '@/types/api.types'

/**
 * Interface cho Province
 */
export interface Province {
  id: string
  name: string
  code?: string
}

/**
 * Interface cho District
 */
export interface District {
  id: string
  name: string
  province_id: string
  code?: string
}

/**
 * Interface cho Ward
 */
export interface Ward {
  id: string
  name: string
  district_id: string
  code?: string
}

/**
 * Lấy danh sách provinces
 * Backend endpoint: GET /locations/provinces
 */
export const getProvinces = async (): Promise<Province[]> => {
  try {
    const response = await api.get<ApiResponse<{ result: Province[] }>>(
      API_ENDPOINTS.LOCATIONS.PROVINCES
    )
    return response.data.data?.result || []
  } catch (error: any) {
    throw error
  }
}

/**
 * Lấy danh sách districts theo province_id
 * Backend endpoint: GET /locations/districts/:provinceId
 */
export const getDistricts = async (provinceId: string): Promise<District[]> => {
  try {
    const response = await api.get<ApiResponse<{ result: District[] }>>(
      API_ENDPOINTS.LOCATIONS.DISTRICTS(provinceId)
    )
    return response.data.data?.result || []
  } catch (error: any) {
    throw error
  }
}

/**
 * Lấy danh sách wards theo district_id
 * Backend endpoint: GET /locations/wards/:districtId
 */
export const getWards = async (districtId: string): Promise<Ward[]> => {
  try {
    const response = await api.get<ApiResponse<{ result: Ward[] }>>(
      API_ENDPOINTS.LOCATIONS.WARDS(districtId)
    )
    return response.data.data?.result || []
  } catch (error: any) {
    throw error
  }
}


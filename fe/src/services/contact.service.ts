import api from './api'
import { API_ENDPOINTS } from '@/utils/constants'
import type { ApiResponse } from '@/types/api.types'

/**
 * Interface cho contact form request
 */
export interface ContactRequest {
  name: string
  email: string
  message: string
}

/**
 * Submit contact form
 * Backend endpoint: POST /contact/submit
 */
export const submitContact = async (data: ContactRequest): Promise<void> => {
  try {
    await api.post<ApiResponse<any>>(API_ENDPOINTS.CONTACT.SUBMIT, data)
  } catch (error: any) {
    throw error
  }
}


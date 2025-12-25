/**
 * Interface cho contact form request
 */
export interface ContactRequest {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

/**
 * Interface cho contact form response
 */
export interface ContactResponse {
  success: boolean
  message: string
}


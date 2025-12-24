// Validation functions

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Vietnam format)
 * Supports: 10-11 digits, may start with 0 or +84
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+84|0)[0-9]{9,10}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Validate password strength
 * Minimum 8 characters, at least one letter and one number
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
  return passwordRegex.test(password)
}

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if string is not empty
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0
}

/**
 * Check if number is positive
 */
export const isPositive = (value: number): boolean => {
  return value > 0
}

/**
 * Check if number is non-negative
 */
export const isNonNegative = (value: number): boolean => {
  return value >= 0
}


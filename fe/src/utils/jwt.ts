/**
 * Utility functions để decode và check JWT token expiration
 */

interface JWTPayload {
  userId?: string
  token_type?: string
  exp?: number
  iat?: number
}

/**
 * Decode JWT token (không verify signature)
 * Chỉ để lấy thông tin expiration
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    
    return JSON.parse(jsonPayload) as JWTPayload
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

/**
 * Kiểm tra token có sắp hết hạn không
 * @param token JWT token
 * @param bufferSeconds Số giây buffer trước khi expire (default: 5 phút = 300s)
 * @returns true nếu token sắp hết hạn hoặc đã hết hạn
 */
export const isTokenExpiringSoon = (token: string | null, bufferSeconds: number = 300): boolean => {
  if (!token) return true
  
  const decoded = decodeJWT(token)
  if (!decoded || !decoded.exp) return true
  
  const expirationTime = decoded.exp * 1000 // Convert to milliseconds
  const currentTime = Date.now()
  const bufferTime = bufferSeconds * 1000
  
  // Token sắp hết hạn nếu còn ít hơn bufferSeconds
  return expirationTime - currentTime < bufferTime
}

/**
 * Kiểm tra token đã hết hạn chưa
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true
  
  const decoded = decodeJWT(token)
  if (!decoded || !decoded.exp) return true
  
  const expirationTime = decoded.exp * 1000
  const currentTime = Date.now()
  
  return currentTime >= expirationTime
}

/**
 * Lấy thời gian còn lại của token (milliseconds)
 */
export const getTokenTimeRemaining = (token: string | null): number => {
  if (!token) return 0
  
  const decoded = decodeJWT(token)
  if (!decoded || !decoded.exp) return 0
  
  const expirationTime = decoded.exp * 1000
  const currentTime = Date.now()
  
  return Math.max(0, expirationTime - currentTime)
}


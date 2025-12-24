// LocalStorage helpers cho token management

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

/**
 * Lưu access token vào localStorage
 */
export const setToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

/**
 * Lưu refresh token vào localStorage
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

/**
 * Lấy access token từ localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

/**
 * Lấy refresh token từ localStorage
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

/**
 * Xóa access token khỏi localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

/**
 * Xóa refresh token khỏi localStorage
 */
export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

/**
 * Xóa tất cả tokens
 */
export const clearTokens = (): void => {
  removeToken()
  removeRefreshToken()
}

/**
 * Lưu cả access token và refresh token
 */
export const setTokens = (accessToken: string, refreshToken: string): void => {
  setToken(accessToken)
  setRefreshToken(refreshToken)
}


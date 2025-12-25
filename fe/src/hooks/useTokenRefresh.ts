import { useEffect, useRef } from 'react'
import { getToken, getRefreshToken } from '@/utils/storage'
import { isTokenExpiringSoon, isTokenExpired, getTokenTimeRemaining } from '@/utils/jwt'
import { refreshToken } from '@/services/auth.service'

/**
 * Hook để tự động refresh token trước khi hết hạn
 * Refresh token khi:
 * 1. Token sắp hết hạn (còn < 5 phút)
 * 2. User quay lại tab/window (visibilitychange)
 * 3. User tương tác với page (focus)
 */
export const useTokenRefresh = () => {
  const refreshIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isRefreshingRef = useRef(false)

  const attemptRefresh = async () => {
    // Tránh refresh đồng thời
    if (isRefreshingRef.current) return
    
    const accessToken = getToken()
    const refreshTokenValue = getRefreshToken()

    // Không có token, không cần refresh
    if (!accessToken || !refreshTokenValue) return

    // Token chưa hết hạn và chưa sắp hết hạn, không cần refresh
    if (!isTokenExpiringSoon(accessToken)) return

    // Token đã hết hạn hoặc sắp hết hạn, refresh
    try {
      isRefreshingRef.current = true
      console.log('[TokenRefresh] Refreshing token...')
      await refreshToken()
      console.log('[TokenRefresh] Token refreshed successfully')
    } catch (error) {
      console.error('[TokenRefresh] Failed to refresh token:', error)
      // Nếu refresh thất bại, interceptor sẽ xử lý logout
    } finally {
      isRefreshingRef.current = false
    }
  }

  const setupRefreshInterval = () => {
    // Clear interval/timeout cũ nếu có
    if (refreshIntervalRef.current) {
      clearTimeout(refreshIntervalRef.current)
      clearInterval(refreshIntervalRef.current)
      refreshIntervalRef.current = null
    }

    const accessToken = getToken()
    if (!accessToken) return

    // Lấy thời gian còn lại của token
    const timeRemaining = getTokenTimeRemaining(accessToken)
    
    // Nếu token đã hết hạn, refresh ngay
    if (isTokenExpired(accessToken)) {
      attemptRefresh()
      // Setup interval để check lại sau 1 phút
      refreshIntervalRef.current = setInterval(() => {
        attemptRefresh()
      }, 60000) // Check mỗi 1 phút
      return
    }

    // Nếu token sắp hết hạn (< 5 phút), refresh ngay
    if (isTokenExpiringSoon(accessToken)) {
      attemptRefresh()
      // Setup interval để check lại sau 1 phút
      refreshIntervalRef.current = setInterval(() => {
        attemptRefresh()
      }, 60000) // Check mỗi 1 phút
      return
    }

    // Tính thời gian để refresh (5 phút trước khi expire)
    const refreshTime = timeRemaining - 5 * 60 * 1000 // 5 phút = 300000ms
    
    if (refreshTime > 0) {
      // Setup timeout để refresh trước khi expire
      refreshIntervalRef.current = setTimeout(() => {
        attemptRefresh()
        // Sau khi refresh, setup interval để check định kỳ
        refreshIntervalRef.current = setInterval(() => {
          attemptRefresh()
        }, 60000) // Check mỗi 1 phút
      }, refreshTime)
    }
  }

  useEffect(() => {
    // Setup refresh interval khi mount
    setupRefreshInterval()

    // Refresh khi user quay lại tab/window
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        attemptRefresh()
        setupRefreshInterval()
      }
    }

    // Refresh khi user focus vào window
    const handleFocus = () => {
      attemptRefresh()
      setupRefreshInterval()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', handleFocus)

    // Cleanup
    return () => {
      if (refreshIntervalRef.current) {
        clearTimeout(refreshIntervalRef.current)
        clearInterval(refreshIntervalRef.current)
        refreshIntervalRef.current = null
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, []) // Chỉ chạy một lần khi mount

  return { attemptRefresh }
}


/**
 * Utility script to verify API response formats
 * Run with: npx ts-node src/utils/verify-response-format.ts
 */

import axios from 'axios'

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api/v1'

interface ResponseFormat {
  message?: string
  data?: any
  errors?: Array<{ field: string; message: string }>
}

/**
 * Verify response format
 */
function verifyResponseFormat(response: any, expectedFormat: 'success' | 'error'): boolean {
  if (expectedFormat === 'success') {
    return (
      typeof response === 'object' &&
      typeof response.message === 'string' &&
      'data' in response
    )
  } else {
    return (
      typeof response === 'object' &&
      typeof response.message === 'string' &&
      (response.errors === undefined || Array.isArray(response.errors))
    )
  }
}

/**
 * Verify pagination format
 */
function verifyPaginationFormat(pagination: any): boolean {
  return (
    typeof pagination === 'object' &&
    typeof pagination.page === 'number' &&
    typeof pagination.limit === 'number' &&
    typeof pagination.total_page === 'number' &&
    typeof pagination.total === 'number'
  )
}

/**
 * Test endpoints
 */
async function testEndpoints() {
  console.log('🔍 Starting API Response Format Verification...\n')

  const results: Array<{ endpoint: string; status: 'PASS' | 'FAIL'; message: string }> = []

  // Test 1: GET /products
  try {
    const response = await axios.get(`${API_BASE_URL}/products`)
    const isValid = verifyResponseFormat(response.data, 'success')
    const hasPagination = response.data.data?.pagination && verifyPaginationFormat(response.data.data.pagination)
    
    results.push({
      endpoint: 'GET /products',
      status: isValid && hasPagination ? 'PASS' : 'FAIL',
      message: isValid && hasPagination
        ? 'Response format and pagination are correct'
        : `Response format: ${isValid ? 'OK' : 'FAIL'}, Pagination: ${hasPagination ? 'OK' : 'FAIL'}`
    })
  } catch (error: any) {
    results.push({
      endpoint: 'GET /products',
      status: 'FAIL',
      message: `Error: ${error.message}`
    })
  }

  // Test 2: GET /categories
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`)
    const isValid = verifyResponseFormat(response.data, 'success')
    const isArray = Array.isArray(response.data.data)
    
    results.push({
      endpoint: 'GET /categories',
      status: isValid && isArray ? 'PASS' : 'FAIL',
      message: isValid && isArray
        ? 'Response format is correct'
        : `Response format: ${isValid ? 'OK' : 'FAIL'}, Data is array: ${isArray}`
    })
  } catch (error: any) {
    results.push({
      endpoint: 'GET /categories',
      status: 'FAIL',
      message: `Error: ${error.message}`
    })
  }

  // Test 3: GET /banners
  try {
    const response = await axios.get(`${API_BASE_URL}/banners`)
    const isValid = verifyResponseFormat(response.data, 'success')
    const isArray = Array.isArray(response.data.data)
    
    results.push({
      endpoint: 'GET /banners',
      status: isValid && isArray ? 'PASS' : 'FAIL',
      message: isValid && isArray
        ? 'Response format is correct'
        : `Response format: ${isValid ? 'OK' : 'FAIL'}, Data is array: ${isArray}`
    })
  } catch (error: any) {
    results.push({
      endpoint: 'GET /banners',
      status: 'FAIL',
      message: `Error: ${error.message}`
    })
  }

  // Print results
  console.log('📊 Test Results:\n')
  results.forEach((result) => {
    const icon = result.status === 'PASS' ? '✅' : '❌'
    console.log(`${icon} ${result.endpoint}: ${result.status}`)
    console.log(`   ${result.message}\n`)
  })

  const passCount = results.filter((r) => r.status === 'PASS').length
  const failCount = results.filter((r) => r.status === 'FAIL').length

  console.log(`\n📈 Summary: ${passCount} passed, ${failCount} failed`)
  
  if (failCount === 0) {
    console.log('✅ All response formats are correct!')
  } else {
    console.log('⚠️  Some response formats need to be fixed')
  }
}

// Run if executed directly
if (require.main === module) {
  testEndpoints().catch(console.error)
}

export { verifyResponseFormat, verifyPaginationFormat }


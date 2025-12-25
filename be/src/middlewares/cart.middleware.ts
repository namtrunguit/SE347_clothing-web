import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import { ObjectId } from 'mongodb'

export const addToCartValidator = validate(
  checkSchema(
    {
      product_id: {
        notEmpty: {
          errorMessage: 'Product ID is required'
        },
        custom: {
          options: (value) => {
            // Convert to string if needed
            const productId = String(value)
            if (!ObjectId.isValid(productId)) {
              throw new Error('Invalid Product ID format')
            }
            return true
          }
        }
      },
      buy_count: {
        notEmpty: {
          errorMessage: 'Buy count is required'
        },
        custom: {
          options: (value) => {
            // Accept both number and string
            const num = typeof value === 'number' ? value : Number(value)
            if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
              throw new Error('Buy count must be a positive integer')
            }
            return true
          }
        }
      },
      color: {
        optional: true,
        isString: {
          errorMessage: 'Color must be a string'
        },
        custom: {
          options: (value) => {
            // If provided, must be non-empty string
            if (value !== undefined && value !== null && String(value).trim() === '') {
              return true // Allow empty string, will be treated as undefined
            }
            return true
          }
        }
      },
      size: {
        optional: true,
        isString: {
          errorMessage: 'Size must be a string'
        },
        custom: {
          options: (value) => {
            // If provided, must be non-empty string
            if (value !== undefined && value !== null && String(value).trim() === '') {
              return true // Allow empty string, will be treated as undefined
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const updateCartValidator = validate(
  checkSchema(
    {
      buy_count: {
        notEmpty: {
          errorMessage: 'Buy count is required'
        },
        custom: {
          options: (value) => {
            // Accept both number and string
            const num = typeof value === 'number' ? value : Number(value)
            if (isNaN(num) || num < 1 || !Number.isInteger(num)) {
              throw new Error('Buy count must be a positive integer')
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

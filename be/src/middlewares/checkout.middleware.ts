import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import { ObjectId } from 'mongodb'

export const validateShippingValidator = validate(
  checkSchema(
    {
      full_name: {
        in: ['body'],
        isString: { errorMessage: 'Full name must be a string' },
        notEmpty: { errorMessage: 'Full name is required' },
        trim: true
      },
      phone: {
        in: ['body'],
        isString: { errorMessage: 'Phone must be a string' },
        notEmpty: { errorMessage: 'Phone is required' },
        trim: true
      },
      email: {
        in: ['body'],
        isEmail: { errorMessage: 'Valid email is required' },
        normalizeEmail: true
      },
      province_id: {
        in: ['body'],
        isString: { errorMessage: 'Province ID must be a string' },
        notEmpty: { errorMessage: 'Province ID is required' }
      },
      district_id: {
        in: ['body'],
        isString: { errorMessage: 'District ID must be a string' },
        notEmpty: { errorMessage: 'District ID is required' }
      },
      ward_id: {
        in: ['body'],
        isString: { errorMessage: 'Ward ID must be a string' },
        notEmpty: { errorMessage: 'Ward ID is required' }
      },
      address: {
        in: ['body'],
        isString: { errorMessage: 'Address must be a string' },
        notEmpty: { errorMessage: 'Address is required' },
        trim: true
      }
    },
    ['body']
  )
)

export const placeOrderValidator = validate(
  checkSchema(
    {
      payment_method: {
        in: ['body'],
        isString: { errorMessage: 'Payment method must be a string' },
        notEmpty: { errorMessage: 'Payment method is required' },
        isIn: {
          options: [['cod', 'bank_transfer', 'credit_card', 'e_wallet']],
          errorMessage: 'Invalid payment method'
        }
      },
      note: {
        in: ['body'],
        optional: true,
        isString: { errorMessage: 'Note must be a string' },
        trim: true
      },
      billing_address_same_as_shipping: {
        in: ['body'],
        optional: true,
        isBoolean: { errorMessage: 'billing_address_same_as_shipping must be a boolean' }
      },
      shipping_address: {
        in: ['body'],
        isString: { errorMessage: 'Shipping address must be a string' },
        notEmpty: { errorMessage: 'Shipping address is required' },
        trim: true
      },
      receiver_name: {
        in: ['body'],
        isString: { errorMessage: 'Receiver name must be a string' },
        notEmpty: { errorMessage: 'Receiver name is required' },
        trim: true
      },
      phone: {
        in: ['body'],
        isString: { errorMessage: 'Phone must be a string' },
        notEmpty: { errorMessage: 'Phone is required' },
        trim: true
      },
      email: {
        in: ['body'],
        isEmail: { errorMessage: 'Valid email is required' },
        normalizeEmail: true
      }
    },
    ['body']
  )
)


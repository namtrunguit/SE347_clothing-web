import { Router } from 'express'
import {
  checkoutInitController,
  validateShippingController,
  getPaymentInfoController,
  placeOrderController
} from '~/controllers/checkout.controller'
import { accessTokenValidator } from '~/middlewares/users.middleware'
import { validateShippingValidator, placeOrderValidator } from '~/middlewares/checkout.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const checkoutRouter = Router()

/**
 * Description: Get checkout init info
 * Path: /init
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
checkoutRouter.get('/init', accessTokenValidator, wrapRequestHandler(checkoutInitController))

/**
 * Description: Validate shipping info
 * Path: /validate-shipping
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { full_name, phone, email, province_id, district_id, ward_id, address }
 */
checkoutRouter.post(
  '/validate-shipping',
  accessTokenValidator,
  validateShippingValidator,
  wrapRequestHandler(validateShippingController)
)

/**
 * Description: Get payment info
 * Path: /payment-info
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
checkoutRouter.get('/payment-info', accessTokenValidator, wrapRequestHandler(getPaymentInfoController))

/**
 * Description: Place order
 * Path: /place-order
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { payment_method, note, billing_address_same_as_shipping, billing_address, shipping_address, receiver_name, phone, email }
 */
checkoutRouter.post(
  '/place-order',
  accessTokenValidator,
  placeOrderValidator,
  wrapRequestHandler(placeOrderController)
)

export default checkoutRouter

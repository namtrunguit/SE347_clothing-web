import { Router } from 'express'
import { checkoutInitController, validateShippingController } from '~/controllers/checkout.controller'
import { accessTokenValidator } from '~/middlewares/users.middleware'
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
checkoutRouter.post('/validate-shipping', accessTokenValidator, wrapRequestHandler(validateShippingController))

export default checkoutRouter

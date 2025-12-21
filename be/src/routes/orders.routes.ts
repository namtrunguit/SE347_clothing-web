import { Router } from 'express'
import { getOrderController } from '~/controllers/orders.controller'
import { accessTokenValidator } from '~/middlewares/users.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const ordersRouter = Router()

/**
 * Description: Get order details
 * Path: /:order_id
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
ordersRouter.get('/:order_id', accessTokenValidator, wrapRequestHandler(getOrderController))

export default ordersRouter

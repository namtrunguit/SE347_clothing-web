import { Router } from 'express'
import { getOrderController, getOrdersController } from '~/controllers/orders.controller'
import { accessTokenValidator } from '~/middlewares/users.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const ordersRouter = Router()

/**
 * Description: Get orders list
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { page, limit, keyword, status, start_date, end_date }
 */
ordersRouter.get('/', accessTokenValidator, wrapRequestHandler(getOrdersController))

/**
 * Description: Get order details
 * Path: /:order_id
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
ordersRouter.get('/:order_id', accessTokenValidator, wrapRequestHandler(getOrderController))

export default ordersRouter

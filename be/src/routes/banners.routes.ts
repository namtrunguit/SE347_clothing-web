import { Router } from 'express'
import { getBannersController } from '~/controllers/banners.controller'
import { wrapRequestHandler } from '~/utils/handler'

const bannersRouter = Router()

/**
 * Description: Get banners
 * Path: /
 * Method: GET
 * Query Params: { position }
 */
bannersRouter.get('/', wrapRequestHandler(getBannersController))

export default bannersRouter

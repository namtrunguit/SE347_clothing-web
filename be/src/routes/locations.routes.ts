import { Router } from 'express'
import { getProvincesController, getDistrictsController, getWardsController } from '~/controllers/locations.controller'
import { wrapRequestHandler } from '~/utils/handler'

const locationsRouter = Router()

/**
 * Description: Get provinces
 * Path: /provinces
 * Method: GET
 */
locationsRouter.get('/provinces', wrapRequestHandler(getProvincesController))

/**
 * Description: Get districts
 * Path: /districts/:province_id
 * Method: GET
 */
locationsRouter.get('/districts/:province_id', wrapRequestHandler(getDistrictsController))

/**
 * Description: Get wards
 * Path: /wards/:district_id
 * Method: GET
 */
locationsRouter.get('/wards/:district_id', wrapRequestHandler(getWardsController))

export default locationsRouter

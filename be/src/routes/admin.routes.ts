import { Router } from 'express'
import { accessTokenValidator } from '~/middlewares/users.middleware'
import { requireAdmin } from '~/middlewares/admin.middleware'
import {
  dashboardStatsController,
  revenueChartController,
  statsOverviewController,
  adminGetProductsController,
  adminGetProductsMetadataController,
  adminGetProductDetailController,
  adminUpdateProductController,
  adminDeleteProductController
} from '~/controllers/admin.controller'
import { wrapRequestHandler } from '~/utils/handler'

const adminRouter = Router()

/**
 * Description: Admin Dashboard Stats
 * Path: /dashboard/stats
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { start_date?, end_date? }
 */
adminRouter.get('/dashboard/stats', accessTokenValidator, requireAdmin, wrapRequestHandler(dashboardStatsController))

/**
 * Description: Admin Revenue Chart
 * Path: /dashboard/revenue-chart
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { start_date?, end_date?, days? }
 */
adminRouter.get(
  '/dashboard/revenue-chart',
  accessTokenValidator,
  requireAdmin,
  wrapRequestHandler(revenueChartController)
)

/**
 * Description: Admin - List products
 * Path: /products
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { page?, limit?, keyword?, category_id?, status?, sort_by?, order? }
 */
adminRouter.get('/products', accessTokenValidator, requireAdmin, wrapRequestHandler(adminGetProductsController))

/**
 * Description: Admin - Products metadata (filters)
 * Path: /products/metadata
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
adminRouter.get(
  '/products/metadata',
  accessTokenValidator,
  requireAdmin,
  wrapRequestHandler(adminGetProductsMetadataController)
)

/**
 * Description: Admin - Product detail (for edit)
 * Path: /products/:id
 * Method: GET
 */
adminRouter.get(
  '/products/:id',
  accessTokenValidator,
  requireAdmin,
  wrapRequestHandler(adminGetProductDetailController)
)

/**
 * Description: Admin - Update product
 * Path: /products/:id
 * Method: PUT
 */
adminRouter.put('/products/:id', accessTokenValidator, requireAdmin, wrapRequestHandler(adminUpdateProductController))

/**
 * Description: Admin - Delete product (soft delete)
 * Path: /products/:id
 * Method: DELETE
 */
adminRouter.delete(
  '/products/:id',
  accessTokenValidator,
  requireAdmin,
  wrapRequestHandler(adminDeleteProductController)
)

export default adminRouter
/**
 * Description: Admin Stats Overview
 * Path: /stats/overview
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { start_date?, end_date? }
 */
adminRouter.get('/stats/overview', accessTokenValidator, requireAdmin, wrapRequestHandler(statsOverviewController))

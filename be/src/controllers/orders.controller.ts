import { Request, Response } from 'express'
import ordersServices from '~/services/orders.services'

export const getOrderController = async (req: Request, res: Response) => {
  const { userId } = req.decoded_authorization as any
  const { order_id } = req.params
  const order = await ordersServices.getOrder(userId, order_id)

  if (!order) {
    return res.status(404).json({ message: 'Order not found' })
  }

  return res.json({
    message: 'Get order details successfully',
    result: order
  })
}

import { ObjectId } from 'mongodb'
import databaseServices from './database.services'
import Order, { OrderItem, OrderStatus } from '~/models/schemas/Order.schema'
import cartServices from './cart.services'
import { PlaceOrderReqBody } from '~/models/requests/order.requests'

class OrdersService {
  async createOrder(user_id: string, body: PlaceOrderReqBody) {
    const cart = await cartServices.getCart(user_id)

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty')
    }

    const items: OrderItem[] = cart.items.map((item: any) => ({
      product_id: item.product_id,
      name: item.product_name,
      thumbnail_url: item.product_image,
      variant_text: `Màu: ${item.color || 'N/A'} | Size: ${item.size || 'N/A'}`,
      price: item.price,
      quantity: item.buy_count,
      total: item.price * item.buy_count
    }))

    const subtotal = items.reduce((sum, item) => sum + item.total, 0)
    const shipping_fee = 30000 // Fixed for now
    const discount_amount = 0
    const total = subtotal + shipping_fee - discount_amount

    const order_code = `YORI-${Date.now().toString().slice(-6)}`

    const order = new Order({
      user_id: new ObjectId(user_id),
      order_code,
      status: OrderStatus.Pending,
      shipping_info: {
        receiver_name: body.receiver_name,
        phone: body.phone,
        email: body.email,
        address: body.shipping_address,
        payment_method: body.payment_method,
        estimated_delivery: '3-5 ngày'
      },
      items,
      cost_summary: {
        subtotal,
        shipping_fee,
        discount_amount,
        total
      }
    })

    const result = await databaseServices.orders.insertOne(order)

    // Clear cart
    await databaseServices.carts.updateOne(
      { user_id: new ObjectId(user_id) },
      { $set: { items: [], updated_at: new Date() } }
    )

    return {
      order_id: result.insertedId,
      order_code
    }
  }

  async getOrder(user_id: string, order_id: string) {
    const order = await databaseServices.orders.findOne({
      _id: new ObjectId(order_id),
      user_id: new ObjectId(user_id)
    })
    return order
  }
}

export default new OrdersService()

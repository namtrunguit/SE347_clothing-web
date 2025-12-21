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

  async getOrders(user_id: string, { page, limit, keyword, status, start_date, end_date }: any) {
    const match: any = {
      user_id: new ObjectId(user_id)
    }

    if (keyword) {
      match.order_code = { $regex: keyword, $options: 'i' }
    }

    if (status) {
      match.status = status
    }

    if (start_date || end_date) {
      match.created_at = {}
      if (start_date) {
        match.created_at.$gte = new Date(start_date)
      }
      if (end_date) {
        match.created_at.$lte = new Date(end_date)
      }
    }

    const orders = await databaseServices.orders
      .find(match)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const total = await databaseServices.orders.countDocuments(match)

    const items = orders.map((order) => ({
      id: order._id,
      order_code: order.order_code,
      created_at: order.created_at,
      created_at_display: order.created_at ? order.created_at.toLocaleDateString('vi-VN') : '',
      product_summary: order.items.map((item) => item.name).join(', '),
      total_amount: order.cost_summary.total,
      total_display: `${order.cost_summary.total.toLocaleString('vi-VN')}đ`,
      status: order.status,
      status_label: this.getStatusLabel(order.status),
      detail_link: `/account/orders/${order.order_code}`
    }))

    return {
      items,
      pagination: {
        page,
        limit,
        total_pages: Math.ceil(total / limit),
        total_records: total
      }
    }
  }

  async getOrderDetail(user_id: string, order_id_or_code: string) {
    const query: any = { user_id: new ObjectId(user_id) }

    if (ObjectId.isValid(order_id_or_code)) {
      query._id = new ObjectId(order_id_or_code)
    } else {
      query.order_code = order_id_or_code
    }

    const order = await databaseServices.orders.findOne(query)

    if (!order) return null

    return {
      id: order._id,
      order_code: order.order_code,
      created_at: order.created_at,
      created_at_display: order.created_at ? order.created_at.toLocaleString('vi-VN') : '',
      current_status: order.status,
      status_label: this.getStatusLabel(order.status),
      status_color: this.getStatusColor(order.status),
      timeline: this.getTimeline(order.status, order.created_at),
      items: order.items.map((item) => ({
        id: item.product_id, // Using product_id as item id for now
        product_id: item.product_id,
        name: item.name,
        thumbnail_url: item.thumbnail_url,
        variant_text: item.variant_text,
        price: item.price,
        price_display: `${item.price.toLocaleString('vi-VN')}đ`,
        quantity: item.quantity,
        total_display: `${item.total.toLocaleString('vi-VN')}đ`,
        can_review: order.status === OrderStatus.Completed,
        is_reviewed: false
      })),
      summary: {
        subtotal: order.cost_summary.subtotal,
        subtotal_display: `${order.cost_summary.subtotal.toLocaleString('vi-VN')}đ`,
        shipping_fee: order.cost_summary.shipping_fee,
        shipping_display: `${order.cost_summary.shipping_fee.toLocaleString('vi-VN')}đ`,
        discount_amount: order.cost_summary.discount_amount,
        discount_display: `-${order.cost_summary.discount_amount.toLocaleString('vi-VN')}đ`,
        total: order.cost_summary.total,
        total_display: `${order.cost_summary.total.toLocaleString('vi-VN')}đ`
      },
      shipping_address: {
        receiver_name: order.shipping_info.receiver_name,
        phone: order.shipping_info.phone,
        full_address: order.shipping_info.address
      },
      payment_method: order.shipping_info.payment_method
    }
  }

  private getStatusLabel(status: OrderStatus) {
    switch (status) {
      case OrderStatus.Pending:
        return 'Đang xử lý'
      case OrderStatus.Processing:
        return 'Đang chuẩn bị hàng'
      case OrderStatus.Shipping:
        return 'Đang giao hàng'
      case OrderStatus.Completed:
        return 'Giao hàng thành công'
      case OrderStatus.Cancelled:
        return 'Đã hủy'
      default:
        return status
    }
  }

  private getStatusColor(status: OrderStatus) {
    switch (status) {
      case OrderStatus.Completed:
        return 'green'
      case OrderStatus.Cancelled:
        return 'red'
      case OrderStatus.Shipping:
        return 'blue'
      default:
        return 'orange'
    }
  }

  private getTimeline(status: OrderStatus, created_at?: Date) {
    // Simplified timeline logic
    const time = created_at
      ? created_at.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
      : ''
    return [
      { step: 'placed', label: 'Đã đặt', completed: true, time },
      {
        step: 'confirmed',
        label: 'Đã xác nhận',
        completed: status !== OrderStatus.Pending && status !== OrderStatus.Cancelled,
        time: ''
      },
      {
        step: 'shipping',
        label: 'Đang giao',
        completed: status === OrderStatus.Shipping || status === OrderStatus.Completed,
        time: ''
      },
      { step: 'completed', label: 'Đã giao', completed: status === OrderStatus.Completed, time: '' }
    ]
  }
}

export default new OrdersService()

import { Request, Response } from 'express'
import databaseServices from '~/services/database.services'
import { ObjectId } from 'mongodb'
import cartServices from '~/services/cart.services'
import ordersServices from '~/services/orders.services'
import { PlaceOrderReqBody } from '~/models/requests/order.requests'
import { ParamsDictionary } from 'express-serve-static-core'

export const checkoutInitController = async (req: Request, res: Response) => {
  const { userId } = req.decoded_authorization as any
  const user = await databaseServices.users.findOne({ _id: new ObjectId(userId) })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Mock saved addresses for now since we don't have an address book feature yet
  const saved_addresses = user.address
    ? [
        {
          id: 'default',
          full_address: user.address,
          is_default: true
        }
      ]
    : []

  return res.json({
    message: 'Get checkout init info successfully',
    data: {
      user: {
        name: user.full_name || `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.phonenumber || ''
      },
      saved_addresses
    }
  })
}

export const validateShippingController = async (req: Request, res: Response) => {
  // In a real app, we would validate the address with a shipping provider API
  // and calculate the exact shipping fee.
  // For now, we'll return a fixed shipping fee.

  const shipping_fee = 30000 // 30k VND

  return res.json({
    message: 'Validate shipping successfully',
    data: {
      shipping_fee,
      shipping_methods: [
        {
          id: 'standard',
          name: 'Giao hàng tiêu chuẩn',
          fee: shipping_fee,
          estimated_delivery: '3-5 ngày'
        },
        {
          id: 'express',
          name: 'Giao hàng hỏa tốc',
          fee: 50000,
          estimated_delivery: '1-2 ngày'
        }
      ]
    }
  })
}

export const getPaymentInfoController = async (req: Request, res: Response) => {
  const { userId } = req.decoded_authorization as any
  const cart = await cartServices.getCart(userId)

  const subtotal = cart.items.reduce((sum: number, item: any) => sum + item.price * item.buy_count, 0)
  const shipping_fee = 30000
  const discount_amount = 0
  const total = subtotal + shipping_fee - discount_amount

  return res.json({
    message: 'Get payment info successfully',
    data: {
      summary: {
        subtotal,
        subtotal_display: `${subtotal.toLocaleString('vi-VN')}₫`,
        shipping_fee,
        shipping_display: `${shipping_fee.toLocaleString('vi-VN')}₫`,
        discount_amount,
        total,
        total_display: `${total.toLocaleString('vi-VN')}₫`
      },
      payment_methods: [
        {
          id: 'credit_card',
          name: 'Thẻ tín dụng / Ghi nợ quốc tế',
          icons: ['visa', 'mastercard'],
          is_enabled: true
        },
        {
          id: 'cod',
          name: 'Thanh toán khi nhận hàng (COD)',
          description: 'Bạn chỉ phải thanh toán khi đã nhận được hàng.',
          is_enabled: true
        },
        {
          id: 'ewallet',
          name: 'Ví điện tử (MoMo / ZaloPay)',
          icons: ['momo', 'zalopay'],
          is_enabled: true
        },
        {
          id: 'bank_transfer',
          name: 'Chuyển khoản ngân hàng',
          is_enabled: true
        }
      ]
    }
  })
}

export const placeOrderController = async (req: Request<ParamsDictionary, any, PlaceOrderReqBody>, res: Response) => {
  const { userId } = req.decoded_authorization as any
  const result = await ordersServices.createOrder(userId, req.body)
  return res.json({
    message: 'Place order successfully',
    result
  })
}

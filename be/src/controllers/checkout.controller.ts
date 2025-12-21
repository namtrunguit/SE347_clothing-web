import { Request, Response } from 'express'
import databaseServices from '~/services/database.services'
import { ObjectId } from 'mongodb'

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

import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { AddToCartReqBody, UpdateCartReqBody } from '~/models/requests/cart.requests'
import cartServices from '~/services/cart.services'

export const addToCartController = async (req: Request<ParamsDictionary, any, AddToCartReqBody>, res: Response) => {
  const { userId } = req.decoded_authorization as any
  const cart = await cartServices.addToCart(userId, req.body)
  return res.json({
    message: 'Add to cart successfully',
    data: cart
  })
}

export const getCartController = async (req: Request, res: Response) => {
  const { userId } = req.decoded_authorization as any
  const result = await cartServices.getCart(userId)
  return res.json({
    message: 'Get cart successfully',
    data: result
  })
}

export const updateCartItemController = async (
  req: Request<ParamsDictionary, any, UpdateCartReqBody>,
  res: Response
) => {
  const { userId } = req.decoded_authorization as any
  const { item_id } = req.params
  const { buy_count } = req.body
  const cart = await cartServices.updateCartItem(userId, item_id, buy_count)
  return res.json({
    message: 'Update cart item successfully',
    data: cart
  })
}

export const deleteCartItemController = async (req: Request, res: Response) => {
  const { userId } = req.decoded_authorization as any
  const { item_id } = req.params
  const cart = await cartServices.deleteCartItem(userId, item_id)
  return res.json({
    message: 'Delete cart item successfully',
    data: cart
  })
}

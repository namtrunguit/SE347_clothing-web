import { Request, Response, NextFunction } from 'express'
import contactService from '~/services/contact.services'
import HTTP_STATUS from '~/constants/httpStatus'

export const submitContactController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, subject, message } = req.body as {
      name: string
      email: string
      phone?: string
      subject?: string
      message: string
    }
    const result = await contactService.submit({ name, email, phone, subject, message })
    return res.status(HTTP_STATUS.OK).json({
      message: result.message,
      data: result.data || {}
    })
  } catch (error) {
    next(error)
  }
}

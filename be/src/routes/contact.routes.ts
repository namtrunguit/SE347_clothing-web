import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { submitContactController } from '~/controllers/contact.controller'
import { validate } from '~/utils/validation'
import { wrapRequestHandler } from '~/utils/handler'

const contactRouter = Router()

contactRouter.post(
  '/submit',
  validate(
    checkSchema(
      {
        name: {
          in: ['body'],
          isString: { errorMessage: 'Name is required' },
          notEmpty: { errorMessage: 'Name is required' },
          trim: true
        },
        email: {
          in: ['body'],
          isEmail: { errorMessage: 'Valid email is required' },
          normalizeEmail: true
        },
        phone: {
          in: ['body'],
          optional: true,
          isString: { errorMessage: 'Phone must be a string' }
        },
        subject: {
          in: ['body'],
          optional: true,
          isString: { errorMessage: 'Subject must be a string' }
        },
        message: {
          in: ['body'],
          isString: { errorMessage: 'Message is required' },
          notEmpty: { errorMessage: 'Message is required' },
          trim: true
        }
      },
      ['body']
    )
  ),
  wrapRequestHandler(submitContactController)
)

export default contactRouter

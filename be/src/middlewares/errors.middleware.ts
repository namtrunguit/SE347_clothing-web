import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus, EntityError } from '~/models/Errors'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    if (err instanceof EntityError) {
      const errors: Record<string, string[]> = {}
      for (const key in err.error) {
        errors[key] = [err.error[key].msg]
      }
      return res.status(err.status).json({
        status: err.status,
        message: err.message,
        errors
      })
    }
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      ...omit(err, ['status', 'message'])
    })
  }
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperties(err, {
      key: {
        enumerable: true
      }
    })
  })
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || 'Internal Server Error',
    errorInfo: omit(err, 'stack')
  })
}

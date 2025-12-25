import { Request, Response, NextFunction } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus, EntityError } from '~/models/Errors'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // EntityError - Validation errors (422)
  if (err instanceof EntityError) {
    const errors: Array<{ field: string; message: string }> = []
    for (const key in err.error) {
      errors.push({
        field: key,
        message: err.error[key].msg
      })
    }
    return res.status(err.status).json({
      message: err.message,
      errors
    })
  }

  // ErrorWithStatus - Other errors (400, 401, 403, 404, etc.)
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json({
      message: err.message
    })
  }

  // Unknown errors - Internal Server Error (500)
  // Log error for debugging (không expose stack trace trong production)
  console.error('Unhandled error:', err)
  
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Internal Server Error'
  })
}

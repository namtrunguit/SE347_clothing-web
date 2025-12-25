import { Request, Response } from 'express'
import usersServices from '~/services/users.services'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import {
  RegisterRequestBody,
  SocialLoginRequestBody,
  ForgotPasswordRequestBody,
  ResetPasswordRequestBody,
  VerifyForgotPasswordTokenReqBody
} from '~/models/requests/users.requests'
import { error } from 'node:console'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const user_id = (req as any).user._id as string
  const result = await usersServices.login(user_id)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    data: result
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await usersServices.register(req.body)
    return res.status(HTTP_STATUS.CREATED).json({
      message: USERS_MESSAGES.REGISTER_SUCCESS,
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  const { refresh_token } = req.body
  await usersServices.logout(refresh_token)
  return res.status(HTTP_STATUS.OK).json({ message: USERS_MESSAGES.LOGOUT_SUCCESS })
}

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refresh_token } = req.body
    const result = await usersServices.refreshToken(refresh_token)
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS || 'Refresh token success',
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const socialLoginController = async (
  req: Request<ParamsDictionary, any, SocialLoginRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersServices.socialLogin(req.body)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.SOCIAL_LOGIN_SUCCESS,
    data: result
  })
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordRequestBody>,
  res: Response,
  next: NextFunction
) => {
  await usersServices.forgotPassword(req.body)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.FORGOT_PASSWORD_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, ResetPasswordRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { _id } = (req as any).user
  const result = await usersServices.resetPassword(_id.toString(), req.body.password)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.RESET_PASSWORD_SUCCESS,
    data: result
  })
}

export const verifyForgotPasswordTokenController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordTokenReqBody>,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.decoded_authorization as any
    const user = await usersServices.getMe(userId)
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.GET_USER_SUCCESS,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const updateMeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.decoded_authorization as any
    const user = await usersServices.updateMe(userId, req.body)
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.UPDATE_USER_SUCCESS,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

export const uploadAvatarController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.decoded_authorization as any
    
    // Check if file is uploaded via multer
    const file = (req as any).file
    if (file) {
      // File uploaded via multer - convert to base64 or save to storage
      // For now, convert to base64 data URL
      const base64 = file.buffer.toString('base64')
      const avatar_url = `data:${file.mimetype};base64,${base64}`
      
      const result = await usersServices.uploadAvatar(userId, avatar_url)
      return res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.UPLOAD_AVATAR_SUCCESS,
        data: result
      })
    }
    
    // Fallback: accept avatar_url in body (for backward compatibility)
    const { avatar_url } = req.body
    if (!avatar_url) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Avatar file or URL is required'
      })
    }
    const result = await usersServices.uploadAvatar(userId, avatar_url)
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.UPLOAD_AVATAR_SUCCESS,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
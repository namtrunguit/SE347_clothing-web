import { Request, Response } from 'express'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterRequestBody } from '~/models/requests/users.requests'

export const loginController = (req: Request, res: Response) => {
  const { username, password } = req.body
  if (username === 'admin' && password === 'password') {
    return res.json({ message: 'Login successful' })
  } else {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterRequestBody>, res: Response) => {
  try {
    const result = await usersServices.register(req.body)
    return res.status(201).json({ message: 'Register success', result: result })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

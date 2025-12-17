import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  name?: string
  username: string
  email: string
  date_of_birth?: Date
  phonenumber?: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  email_verified_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  address?: string
  avatar?: string
}

export default class User {
  _id: ObjectId
  name: string
  username: string
  email: string
  date_of_birth: Date
  phonenumber: string
  password: string
  createdAt: Date
  updatedAt: Date
  email_verified_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  address: string
  avatar: string

  constructor(user: UserType) {
    this._id = user._id || new ObjectId()
    this.name = user.name || ''
    this.email = user.email
    this.username = user.username
    this.date_of_birth = user.date_of_birth || new Date()
    this.phonenumber = user.phonenumber || ''
    this.password = user.password
    this.createdAt = user.createdAt || new Date()
    this.updatedAt = user.updatedAt || new Date()
    this.email_verified_token = user.email_verified_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.address = user.address || ''
    this.avatar = user.avatar || ''
  }
}

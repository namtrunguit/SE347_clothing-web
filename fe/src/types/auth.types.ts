// Auth types
export interface User {
  _id: string
  first_name: string
  last_name: string
  full_name: string
  email: string
  role: UserRole
  address?: string
  avatar?: string
  phonenumber?: string
  createdAt?: string
  updatedAt?: string
}

export enum UserRole {
  Customer = 'customer',
  Admin = 'admin',
}

export interface LoginRequest {
  email?: string
  username?: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: User
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirm_password: string
  date_of_birth?: string
}

export interface RegisterResponse {
  access_token: string
  refresh_token: string
  user: User
}

export interface SocialLoginRequest {
  provider: 'google' | 'facebook'
  token: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirm_password: string
}

export interface VerifyForgotPasswordTokenRequest {
  token: string
}


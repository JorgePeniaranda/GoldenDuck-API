import { type $Enums } from '@prisma/client'

export interface CheckUserRequest {
  email?: string
  dni?: string | number
  phoneNumber?: string | number
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  lastName: string
  phoneNumber: string | number
  dni: string | number
  birthDate: string | Date
  address: string
  email: string
  password: string
  sex: $Enums.sex
}

export interface ForgotForm {
  email: string
  password: string
  confirmPassword: string
}

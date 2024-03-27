export interface UserPrimitive {
  id: number
  name: string
  lastName: string
  dni: number | bigint
  email: string
  phoneNumber: number | bigint
  password: string
  salt: string
  address: string
  birthDate: Date
  sex: UserSex
  updatedAt: Date
  createdAt: Date
  actived: boolean
  deleted: boolean
  role: UserRoles
}

export enum UserSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  USER = 'USER'
}

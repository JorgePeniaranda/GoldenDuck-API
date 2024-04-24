import { type User } from '@prisma/client'

export interface UserPrimitive {
  readonly id: User['id']
  name: User['name']
  lastName: User['lastName']
  readonly dni: User['dni']
  email: User['email']
  phoneNumber: User['phoneNumber']
  password: User['password']
  salt: User['salt']
  address: User['address']
  readonly birthDate: User['birthDate']
  readonly sex: (typeof UserSex)[keyof typeof UserSex]
  imgUrl?: User['imgUrl']
  readonly updatedAt: User['updatedAt']
  readonly createdAt: User['createdAt']
  actived: User['actived']
  deleted: User['deleted']
  role: (typeof UserRoles)[keyof typeof UserRoles]
}

export const UserSex = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
} as const

export const UserRoles = {
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  USER: 'USER'
} as const

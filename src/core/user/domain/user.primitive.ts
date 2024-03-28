import { type User } from '@prisma/client'

export interface UserPrimitive {
  id: User['id']
  name: User['name']
  lastName: User['lastName']
  dni: User['dni']
  email: User['email']
  phoneNumber: User['phoneNumber']
  password: User['password']
  salt: User['salt']
  address: User['address']
  birthDate: User['birthDate']
  sex: User['sex']
  updatedAt: User['updatedAt']
  createdAt: User['createdAt']
  actived: User['actived']
  deleted: User['deleted']
  role: User['role']
}

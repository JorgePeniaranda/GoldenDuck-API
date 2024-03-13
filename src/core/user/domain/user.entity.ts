import { type ValidDate } from '../../../valueObjects/date/validDate.value'
import { type UserAddress } from './valueObjects/address/address.value'
import { type UserBirthDate } from './valueObjects/birthDate/birthDate.value'
import { type UserDNI } from './valueObjects/dni/dni.value'
import { type UserEmail } from './valueObjects/email/email.value'
import { type UserLastName } from './valueObjects/lastName/lastName.value'
import { type UserName } from './valueObjects/name/name.value'
import { type UserPassword } from './valueObjects/password/password.value'
import { type UserPhoneNumber } from './valueObjects/phoneNumber/phoneNumber.value'
import { type UserRole } from './valueObjects/role/role.value'
import { type UserSex } from './valueObjects/sex/sex.value'
import { type ID } from '../../../valueObjects/id/id.value'

export interface UserEntity {
  id: ID
  name: UserName
  lastName: UserLastName
  dni: UserDNI
  email: UserEmail
  phoneNumber: UserPhoneNumber
  password: UserPassword
  address: UserAddress
  birthDate: UserBirthDate
  sex: UserSex
  updatedAt: ValidDate
  createdAt: ValidDate
  deleted: boolean
  role: UserRole
}

export interface UserPrimitiveEntity {
  id: number
  name: string
  lastName: string
  dni: number | bigint
  email: string
  phoneNumber: number | bigint
  password: string
  address: string
  birthDate: Date
  sex: 'MALE' | 'FEMALE'
  updatedAt: Date
  createdAt: Date
  deleted: boolean
  role: 'ADMIN' | 'SUPPORT' | 'USER'
}

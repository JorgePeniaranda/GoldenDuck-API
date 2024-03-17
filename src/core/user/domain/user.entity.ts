import { type Sex } from '@/valueObjects/sex/sex.value'
import { type Role } from '@/valueObjects/role/role.value'
import { type BirthDate } from '@/valueObjects/birthDate/birthDate.value'
import { type Address } from '@/valueObjects/address/address.value'
import { type Password } from '@/valueObjects/password/password.value'
import { type PhoneNumber } from '@/valueObjects/phoneNumber/phoneNumber.value'
import { type Email } from '@/valueObjects/email/email.value'
import { type DNI } from '@/valueObjects/dni/dni.value'
import { type LastName } from '@/valueObjects/lastName/lastName.value'
import { type Name } from '@/valueObjects/name/name.value'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type ID } from '@/valueObjects/id/id.value'

export interface UserEntity {
  id: ID
  name: Name
  lastName: LastName
  dni: DNI
  email: Email
  phoneNumber: PhoneNumber
  password: Password
  address: Address
  birthDate: BirthDate
  sex: Sex
  updatedAt: ValidDate
  createdAt: ValidDate
  deleted: boolean
  role: Role
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

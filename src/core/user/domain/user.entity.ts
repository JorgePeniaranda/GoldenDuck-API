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
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type PrimitiveName } from '@/valueObjects/name/name.primitive'
import { type PrimitiveLastName } from '@/valueObjects/lastName/lastName.primitive'
import { type PrimitiveDNI } from '@/valueObjects/dni/dni.primitive'
import { type PrimitiveEmail } from '@/valueObjects/email/email.primitive'
import { type PrimitivePhoneNumber } from '@/valueObjects/phoneNumber/phoneNumber.primitive'
import { type PrimitivePassword } from '@/valueObjects/password/password.primitive'
import { type PrimitiveAddress } from '@/valueObjects/address/address.primitive'
import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'
import { type PrimitiveSex } from '@/valueObjects/sex/sex.primitive'
import { type PrimitiveRole } from '@/valueObjects/role/role.primitive'

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
  id: PrimitiveID['id']
  name: PrimitiveName['name']
  lastName: PrimitiveLastName['lastName']
  dni: PrimitiveDNI['dni']
  email: PrimitiveEmail['email']
  phoneNumber: PrimitivePhoneNumber['phoneNumber']
  password: PrimitivePassword['password']
  address: PrimitiveAddress['address']
  birthDate: PrimitiveValidDate['validDate']
  sex: PrimitiveSex['sex']
  updatedAt: PrimitiveValidDate['validDate']
  createdAt: PrimitiveValidDate['validDate']
  deleted: boolean
  role: PrimitiveRole['role']
}

import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type Name } from './valueObjects/name/name.value'
import { type LastName } from './valueObjects/lastName/LastName.value'
import { type DNI } from './valueObjects/dni/Dni.value'
import { type Email } from '@/valueObjects/string/email/email.value'
import { type PhoneNumber } from './valueObjects/phoneNumber/phoneNumber.value'
import { type Password } from '@/valueObjects/string/password/password.value'
import { type Address } from './valueObjects/address/Address.value'
import { type BirthDate } from './valueObjects/birthDate/BirthDate.value'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type Role } from '@/valueObjects/enum/Role/Role.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type PrimitiveName } from './valueObjects/name/name.primitive'
import { type PrimitiveLastName } from './valueObjects/lastName/LastName.primitive'
import { type PrimitiveDNI } from './valueObjects/dni/Dni.primitive'
import { type PrimitiveEmail } from '@/valueObjects/string/email/email.primitive'
import { type PrimitivePhoneNumber } from './valueObjects/phoneNumber/phoneNumber.primitive'
import { type PrimitivePassword } from '@/valueObjects/string/password/password.primitive'
import { type PrimitiveAddress } from './valueObjects/address/Address.primitive'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PrimitiveSex } from '@/valueObjects/enum/Sex/Sex.primitive'
import { type PrimitiveRole } from '@/valueObjects/enum/Role/Role.primitive'
import { type Sex } from '@/valueObjects/enum/Sex/Sex.value'

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
  updatedAt: PastDate
  createdAt: PastDate
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
  birthDate: PrimitivePastDate['pastDate']
  sex: PrimitiveSex['sex']
  updatedAt: PrimitivePastDate['pastDate']
  createdAt: PrimitivePastDate['pastDate']
  deleted: boolean
  role: PrimitiveRole['role']
}

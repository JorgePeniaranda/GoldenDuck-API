import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type DNI } from './valueObjects/dni/Dni.value'
import { type Email } from '@/valueObjects/string/email/email.value'
import { type PhoneNumber } from './valueObjects/phoneNumber/phoneNumber.value'
import { type Password } from '@/valueObjects/string/password/password.value'
import { type BirthDate } from './valueObjects/birthDate/BirthDate.value'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type Role } from '@/valueObjects/enum/Role/Role.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type PrimitiveDNI } from './valueObjects/dni/Dni.primitive'
import { type PrimitiveEmail } from '@/valueObjects/string/email/email.primitive'
import { type PrimitivePhoneNumber } from './valueObjects/phoneNumber/phoneNumber.primitive'
import { type PrimitivePassword } from '@/valueObjects/string/password/password.primitive'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PrimitiveSex } from '@/valueObjects/enum/Sex/Sex.primitive'
import { type PrimitiveRole } from '@/valueObjects/enum/Role/Role.primitive'
import { type Sex } from '@/valueObjects/enum/Sex/Sex.value'
import { type ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { type PrimitiveValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.primitive'
import { type Alphabetic } from '@/valueObjects/string/alphabetic/alphabetic.value'
import { type PrimitiveAlphabetic } from '@/valueObjects/string/alphabetic/alphabetic.primitive'
import { type AlphaNumeric } from '@/valueObjects/string/alphaNumeric/alphaNumeric.value'
import { type PrimitiveAlphaNumeric } from '@/valueObjects/string/alphaNumeric/alphaNumeric.primitive'
import { type ValidString } from '@/valueObjects/string/string/String.value'
import { type PrimitiveValidString } from '@/valueObjects/string/string/string.primitive'

export interface UserEntity {
  id: ID
  name: Alphabetic
  lastName: Alphabetic
  dni: DNI
  email: Email
  phoneNumber: PhoneNumber
  password: Password
  salt: ValidString
  address: AlphaNumeric
  birthDate: BirthDate
  sex: Sex
  updatedAt: PastDate
  createdAt: PastDate
  actived: ValidBoolean
  deleted: ValidBoolean
  role: Role
}

export interface UserPrimitiveEntity {
  id: PrimitiveID['id']
  name: PrimitiveAlphabetic['alphabetic']
  lastName: PrimitiveAlphabetic['alphabetic']
  dni: PrimitiveDNI['dni']
  email: PrimitiveEmail['email']
  phoneNumber: PrimitivePhoneNumber['phoneNumber']
  password: PrimitivePassword['password']
  salt: PrimitiveValidString['string']
  address: PrimitiveAlphaNumeric['alphaNumeric']
  birthDate: PrimitivePastDate['pastDate']
  sex: PrimitiveSex['sex']
  updatedAt: PrimitivePastDate['pastDate']
  createdAt: PrimitivePastDate['pastDate']
  actived: PrimitiveValidBoolean['boolean']
  deleted: PrimitiveValidBoolean['boolean']
  role: PrimitiveRole['role']
}

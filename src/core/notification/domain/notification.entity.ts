import { type UserEntity, type UserPrimitiveEntity } from '@/core/user/domain/user.entity'
import { type PrimitiveValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.primitive'
import { type ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type ValidString } from '@/valueObjects/string/string/String.value'
import { type PrimitiveValidString } from '@/valueObjects/string/string/string.primitive'

export interface NotificationEntity {
  id: ID
  idAccount: UserEntity['id']
  message: ValidString
  read: ValidBoolean
  date: PastDate
}

export interface NotificationPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: UserPrimitiveEntity['id']
  message: PrimitiveValidString['string']
  read: PrimitiveValidBoolean['boolean']
  date: PrimitivePastDate['pastDate']
}

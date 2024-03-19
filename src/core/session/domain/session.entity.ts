import {
  type UserEntity,
  type UserPrimitiveEntity
} from '@/core/user/domain/user.entity'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type ValidString } from '@/valueObjects/string/string/String.value'
import { type PrimitiveValidString } from '@/valueObjects/string/string/string.primitive'

export interface SessionEntity {
  id: ID
  idUser: UserEntity['id']
  ip?: ValidString | null
  userAgent?: ValidString | null
  createdAt: PastDate
}

export interface SessionPrimitiveEntity {
  id: PrimitiveID['id']
  idUser: UserPrimitiveEntity['id']
  ip?: PrimitiveValidString['string'] | null
  userAgent?: PrimitiveValidString['string'] | null
  createdAt: PrimitivePastDate['pastDate']
}

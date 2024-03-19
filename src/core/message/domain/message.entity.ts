import {
  type AccountEntity,
  type AccountPrimitiveEntity
} from '@/core/account/domain/account.entity'
import { type PrimitiveValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.primitive'
import { type ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type ValidString } from '@/valueObjects/string/string/String.value'
import { type PrimitiveValidString } from '@/valueObjects/string/string/string.primitive'

export interface MessageEntity {
  id: ID
  from: AccountEntity['id']
  to: AccountEntity['id']
  message: ValidString
  read: ValidBoolean
  createdAt: PastDate
  deleted: ValidBoolean
}

export interface MessagePrimitiveEntity {
  id: PrimitiveID['id']
  from: AccountPrimitiveEntity['id']
  to: AccountPrimitiveEntity['id']
  message: PrimitiveValidString['string']
  read: boolean
  createdAt: PrimitivePastDate['pastDate']
  deleted: PrimitiveValidBoolean['boolean']
}

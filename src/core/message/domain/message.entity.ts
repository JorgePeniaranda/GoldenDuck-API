import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

export interface MessageEntity {
  id: ID
  from: ID
  to: ID
  message: string
  read: boolean
  date: PastDate
  deleted: boolean
}

export interface MessagePrimitiveEntity {
  id: PrimitiveID['id']
  from: PrimitiveID['id']
  to: PrimitiveID['id']
  message: string
  read: boolean
  date: PrimitivePastDate['pastDate']
  deleted: boolean
}

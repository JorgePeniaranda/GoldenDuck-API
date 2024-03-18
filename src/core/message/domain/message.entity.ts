import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'
import { type PrimitivePastDate } from '@/valueObjects/pastDate/pastDate.primitive'
import { type PastDate } from '@/valueObjects/pastDate/pastDate.value'

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

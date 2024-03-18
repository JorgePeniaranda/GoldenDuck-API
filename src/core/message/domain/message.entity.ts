import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

export interface MessageEntity {
  id: ID
  from: ID
  to: ID
  message: string
  read: boolean
  date: ValidDate
  deleted: boolean
}

export interface MessagePrimitiveEntity {
  id: PrimitiveID['id']
  from: PrimitiveID['id']
  to: PrimitiveID['id']
  message: string
  read: boolean
  date: PrimitiveValidDate['validDate']
  deleted: boolean
}

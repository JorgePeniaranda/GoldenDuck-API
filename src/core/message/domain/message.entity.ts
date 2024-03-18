import { type ValidDate } from '@/valueObjects/date/validDate.value'
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
  id: number
  from: number
  to: number
  message: string
  read: boolean
  date: Date
  deleted: boolean
}

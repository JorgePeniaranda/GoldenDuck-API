import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

export interface NotificationEntity {
  id: ID
  idAccount: ID
  message: string
  read: boolean
  date: ValidDate
}

export interface NotificationPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: PrimitiveID['id']
  message: string
  read: boolean
  date: PrimitiveValidDate['validDate']
}

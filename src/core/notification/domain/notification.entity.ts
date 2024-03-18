import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

export interface NotificationEntity {
  id: ID
  idAccount: ID
  message: string
  read: boolean
  date: PastDate
}

export interface NotificationPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: PrimitiveID['id']
  message: string
  read: boolean
  date: PrimitivePastDate['pastDate']
}

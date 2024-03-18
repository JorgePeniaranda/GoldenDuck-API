import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'
import { type PrimitivePastDate } from '@/valueObjects/pastDate/pastDate.primitive'
import { type PastDate } from '@/valueObjects/pastDate/pastDate.value'

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

import { type ID } from '@/valueObjects/id/id.value'

export interface NotificationEntity {
  id: ID
  idAccount: ID
  message: string
  read: boolean
  date: Date
}

export interface NotificationPrimitiveEntity {
  id: number
  idAccount: number
  message: string
  read: boolean
  date: Date
}

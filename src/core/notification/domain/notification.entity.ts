import { type ID } from '@/valueObjects/id/id.value'

export interface NotificationEntity {
  id: ID
  idAccount: ID
  message: string
  read: boolean
  date: Date
}

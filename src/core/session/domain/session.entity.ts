import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type ID } from '@/valueObjects/id/id.value'

export interface SessionEntity {
  id: ID
  idUser: ID
  ip: string
  userAgent: string
  date: ValidDate
}

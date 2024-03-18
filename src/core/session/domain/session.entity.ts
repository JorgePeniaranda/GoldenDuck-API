import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

export interface SessionEntity {
  id: ID
  idUser: ID
  ip: string
  userAgent: string
  date: ValidDate
}

export interface SessionPrimitiveEntity {
  id: PrimitiveID['id']
  idUser: PrimitiveID['id']
  ip: string
  userAgent: string
  date: PrimitiveValidDate['validDate']
}

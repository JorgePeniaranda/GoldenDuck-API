import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

export interface SessionEntity {
  id: ID
  idUser: ID
  ip: string
  userAgent: string
  date: PastDate
}

export interface SessionPrimitiveEntity {
  id: PrimitiveID['id']
  idUser: PrimitiveID['id']
  ip: string
  userAgent: string
  date: PrimitivePastDate['pastDate']
}

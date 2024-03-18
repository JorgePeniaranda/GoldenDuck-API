import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'
import { type PrimitivePastDate } from '@/valueObjects/pastDate/pastDate.primitive'
import { type PastDate } from '@/valueObjects/pastDate/pastDate.value'

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

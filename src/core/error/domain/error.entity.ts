import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'
import { type PrimitivePastDate } from '@/valueObjects/pastDate/pastDate.primitive'
import { type PastDate } from '@/valueObjects/pastDate/pastDate.value'

export interface ErrorEntity {
  id: ID
  name: string
  message: string
  date: PastDate
  deleted: boolean
}

export interface ErrorPrimitiveEntity {
  id: PrimitiveID['id']
  name: string
  message: string
  date: PrimitivePastDate['pastDate']
  deleted: boolean
}

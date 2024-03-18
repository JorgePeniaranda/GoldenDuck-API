import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

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

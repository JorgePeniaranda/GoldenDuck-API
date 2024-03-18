import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

export interface ErrorEntity {
  id: ID
  name: string
  message: string
  date: ValidDate
  deleted: boolean
}

export interface ErrorPrimitiveEntity {
  id: PrimitiveID['id']
  name: string
  message: string
  date: PrimitiveValidDate['validDate']
  deleted: boolean
}

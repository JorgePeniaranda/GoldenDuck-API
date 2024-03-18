import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

export interface CardEntity {
  id: ID
  idAccount: ID
  number: number
  cvv: number
  expiration: Date
  date: ValidDate
  updatedDate: ValidDate
  deleted: boolean
}

export interface CardPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: PrimitiveID['id']
  number: number
  cvv: number
  expiration: Date
  date: PrimitiveValidDate['validDate']
  updatedDate: PrimitiveValidDate['validDate']
  deleted: boolean
}

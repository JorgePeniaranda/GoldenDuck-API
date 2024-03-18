import { type Balance } from '@/valueObjects/balance/balance.value'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type ID } from '@/valueObjects/id/id.value'

export interface CardEntity {
  id: ID
  idAccount: ID
  number: number
  cvv: Balance
  expiration: ValidDate
  date: ValidDate
  updatedDate: ValidDate
  deleted: boolean
}

export interface CardPrimitiveEntity {
  id: number
  idAccount: number
  number: number
  cvv: Balance
  expiration: ValidDate
  date: ValidDate
  updatedDate: ValidDate
  deleted: boolean
}

import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'
import { type Int } from '@/valueObjects/int/int.value'
import { type PrimitivePastDate } from '@/valueObjects/pastDate/pastDate.primitive'
import { type PastDate } from '@/valueObjects/pastDate/pastDate.value'
import { type PrimitiveValidDate } from '@/valueObjects/validDate/validDate.primitive'
import { type ValidDate } from '@/valueObjects/validDate/validDate.value'

export interface CardEntity {
  id: ID
  idAccount: ID
  number: Int
  cvv: Int
  expiration: ValidDate
  date: PastDate
  updatedDate: PastDate
  deleted: boolean
}

export interface CardPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: PrimitiveID['id']
  number: number
  cvv: number
  expiration: PrimitiveValidDate['validDate']
  date: PrimitivePastDate['pastDate']
  updatedDate: PrimitivePastDate['pastDate']
  deleted: boolean
}

import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveValidDate } from '@/valueObjects/date/ValidDate/ValidDate.primitive'
import { type ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'
import { type CardNumber } from './valueObjects/cardNumber/CardNumber.value'
import { type CVV } from './valueObjects/cvv/cvv.value'
import { type PrimitiveCVV } from './valueObjects/cvv/cvv.primitive'
import { type PrimitiveCardNumber } from './valueObjects/cardNumber/CardNumber.primitive'

export interface CardEntity {
  id: ID
  idAccount: ID
  number: CardNumber
  cvv: CVV
  expiration: ValidDate
  date: PastDate
  updatedDate: PastDate
  deleted: boolean
}

export interface CardPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: PrimitiveID['id']
  number: PrimitiveCardNumber['cardNumber']
  cvv: PrimitiveCVV['cvv']
  expiration: PrimitiveValidDate['validDate']
  date: PrimitivePastDate['pastDate']
  updatedDate: PrimitivePastDate['pastDate']
  deleted: boolean
}

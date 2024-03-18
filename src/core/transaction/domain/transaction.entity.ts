import { type PrimitiveBalance } from '@/valueObjects/balance/balance.primitive'
import { type Balance } from '@/valueObjects/balance/balance.value'
import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

export interface TransactionEntity {
  id: ID
  from: ID
  to: ID
  amount: Balance
  idCategory: ID
  date: ValidDate
}

export interface TransactionPrimitiveEntity {
  id: PrimitiveID['id']
  from: PrimitiveID['id']
  to: PrimitiveID['id']
  amount: PrimitiveBalance['balance']
  idCategory: PrimitiveID['id']
  date: PrimitiveValidDate['validDate']
}

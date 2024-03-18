import { type PrimitiveBalance } from '@/valueObjects/balance/balance.primitive'
import { type Balance } from '@/valueObjects/balance/balance.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'
import { type PrimitivePastDate } from '@/valueObjects/pastDate/pastDate.primitive'
import { type PastDate } from '@/valueObjects/pastDate/pastDate.value'

export interface TransactionEntity {
  id: ID
  from: ID
  to: ID
  amount: Balance
  idCategory: ID
  date: PastDate
}

export interface TransactionPrimitiveEntity {
  id: PrimitiveID['id']
  from: PrimitiveID['id']
  to: PrimitiveID['id']
  amount: PrimitiveBalance['balance']
  idCategory: PrimitiveID['id']
  date: PrimitivePastDate['pastDate']
}

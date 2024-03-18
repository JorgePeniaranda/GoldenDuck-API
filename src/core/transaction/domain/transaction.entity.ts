import { type PrimitiveBalance } from '@/core/account/domain/valueObjects/balance/Balance.primitive'
import { type Balance } from '@/core/account/domain/valueObjects/balance/Balance.value'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

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

import { type PrimitiveBalance } from '@/core/account/domain/valueObjects/balance/Balance.primitive'
import { type Balance } from '@/core/account/domain/valueObjects/balance/Balance.value'
import { type PrimitivePastDate } from '@/valueObjects/date/PastDate/PastDate.primitive'
import { type PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { type ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'
import { type PrimitiveID } from '@/valueObjects/number/ID/ID.primitive'
import { type ID } from '@/valueObjects/number/ID/ID.value'

export interface LoanEntity {
  id: ID
  idAccount: ID
  amount: Balance
  interest: number
  date: PastDate
  dateEnd: ValidDate
}
export interface LoanPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: PrimitiveID['id']
  amount: PrimitiveBalance['balance']
  interest: number
  date: PrimitivePastDate['pastDate']
  dateEnd: PrimitivePastDate['pastDate']
}

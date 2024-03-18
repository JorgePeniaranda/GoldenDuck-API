import { type PrimitiveBalance } from '@/valueObjects/balance/balance.primitive'
import { type Balance } from '@/valueObjects/balance/balance.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'
import { type PrimitivePastDate } from '@/valueObjects/pastDate/pastDate.primitive'
import { type PastDate } from '@/valueObjects/pastDate/pastDate.value'
import { type PrimitiveValidDate } from '@/valueObjects/validDate/validDate.primitive'
import { type ValidDate } from '@/valueObjects/validDate/validDate.value'

export interface InvestmentEntity {
  id: ID
  idAccount: ID
  amount: Balance
  interest: number
  date: PastDate
  dateEnd: ValidDate
}

export interface InvestmentPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: PrimitiveID['id']
  amount: PrimitiveBalance['balance']
  interest: number
  date: PrimitivePastDate['pastDate']
  dateEnd: PrimitiveValidDate['validDate']
}

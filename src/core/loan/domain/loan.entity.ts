import { type PrimitiveBalance } from '@/valueObjects/balance/balance.primitive'
import { type Balance } from '@/valueObjects/balance/balance.value'
import { type PrimitiveValidDate } from '@/valueObjects/date/validDate.primitive'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type PrimitiveID } from '@/valueObjects/id/id.primitive'
import { type ID } from '@/valueObjects/id/id.value'

export interface LoanEntity {
  id: ID
  idAccount: ID
  amount: Balance
  interest: number
  date: ValidDate
  dateEnd: Date
}
export interface LoanPrimitiveEntity {
  id: PrimitiveID['id']
  idAccount: PrimitiveID['id']
  amount: PrimitiveBalance['balance']
  interest: number
  date: PrimitiveValidDate['validDate']
  dateEnd: PrimitiveValidDate['validDate']
}

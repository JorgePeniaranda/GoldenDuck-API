import { type Balance } from '@/valueObjects/balance/balance.value'
import { type ID } from '@/valueObjects/id/id.value'

export interface InvestmentEntity {
  id: ID
  idAccount: ID
  amount: Balance
  interest: number
  date: Date
  dateEnd: Date
}

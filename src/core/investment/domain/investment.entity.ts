import { type Balance } from '@/valueObjects/balance/balance.value'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type ID } from '@/valueObjects/id/id.value'

export interface InvestmentEntity {
  id: ID
  idAccount: ID
  amount: Balance
  interest: number
  date: ValidDate
  dateEnd: Date
}

export interface InvestmentPrimitiveEntity {
  id: number
  idAccount: number
  amount: Balance
  interest: number
  date: Date
  dateEnd: Date
}

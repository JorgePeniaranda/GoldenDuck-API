import { type Balance } from '@/valueObjects/balance/balance.value'
import { type ValidDate } from '@/valueObjects/date/validDate.value'
import { type ID } from '@/valueObjects/id/id.value'

export interface TransactionEntity {
  id: ID
  from: ID
  to: ID
  amount: Balance
  idCategory: ID
  date: ValidDate
}

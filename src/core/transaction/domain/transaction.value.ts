import {
  type TransactionPrimitiveEntity,
  type TransactionEntity
} from './transaction.entity'
import { ID } from '@/valueObjects/id/id.value'
import { Balance } from '@/valueObjects/balance/balance.value'
import { PastDate } from '@/valueObjects/pastDate/pastDate.value'

export class Transaction implements TransactionEntity {
  readonly id: TransactionEntity['id']
  readonly from: TransactionEntity['from']
  readonly to: TransactionEntity['to']
  readonly amount: TransactionEntity['amount']
  readonly idCategory: TransactionEntity['idCategory']
  readonly date: TransactionEntity['date']

  constructor (transaction: TransactionEntity) {
    this.id = transaction.id
    this.from = transaction.from
    this.to = transaction.to
    this.amount = transaction.amount
    this.idCategory = transaction.idCategory
    this.date = transaction.date
  }

  public create (transaction: TransactionPrimitiveEntity): Transaction {
    return new Transaction({
      id: new ID(transaction.id),
      from: new ID(transaction.from),
      to: new ID(transaction.to),
      amount: new Balance(transaction.amount),
      idCategory: new ID(transaction.idCategory),
      date: new PastDate(transaction.date)
    })
  }

  public toJSON (): TransactionPrimitiveEntity {
    return {
      id: this.id.value(),
      from: this.from.value(),
      to: this.to.value(),
      amount: this.amount.value(),
      idCategory: this.idCategory.value(),
      date: this.date.value()
    }
  }
}

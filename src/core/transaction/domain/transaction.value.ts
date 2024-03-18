import { type TransactionEntity } from './transaction.entity'

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

  public toJSON (): TransactionEntity {
    return {
      id: this.id,
      from: this.from,
      to: this.to,
      amount: this.amount,
      idCategory: this.idCategory,
      date: this.date
    }
  }
}

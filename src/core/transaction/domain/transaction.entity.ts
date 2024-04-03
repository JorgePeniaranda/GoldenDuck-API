import { type TransactionPrimitive } from './transaction.primitive'

export class Transaction implements TransactionPrimitive {
  public id: TransactionPrimitive['id']
  public from: TransactionPrimitive['from']
  public to: TransactionPrimitive['to']
  public amount: TransactionPrimitive['amount']
  public idCategory?: TransactionPrimitive['idCategory']
  public createdAt: TransactionPrimitive['createdAt']
  public canceled: TransactionPrimitive['canceled']

  constructor (transaction: TransactionPrimitive) {
    this.id = transaction.id
    this.from = transaction.from
    this.to = transaction.to
    this.amount = transaction.amount
    this.idCategory = transaction.idCategory
    this.createdAt = transaction.createdAt
    this.canceled = transaction.canceled
  }
}

import { type TransactionPrimitive } from './transaction.primitive'

export class Transaction implements TransactionPrimitive {
  public id: TransactionPrimitive['id']
  public idSender: TransactionPrimitive['idSender']
  public idReceiver: TransactionPrimitive['idReceiver']
  public amount: TransactionPrimitive['amount']
  public idCategory?: TransactionPrimitive['idCategory']
  public createdAt: TransactionPrimitive['createdAt']
  public canceled: TransactionPrimitive['canceled']

  constructor (transaction: TransactionPrimitive) {
    this.id = transaction.id
    this.idSender = transaction.idSender
    this.idReceiver = transaction.idReceiver
    this.amount = transaction.amount
    this.idCategory = transaction.idCategory
    this.createdAt = transaction.createdAt
    this.canceled = transaction.canceled
  }
}

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

  public static create ({
    idSender,
    idReceiver,
    amount
  }: {
    idSender: TransactionPrimitive['idSender']
    idReceiver: TransactionPrimitive['idReceiver']
    amount: TransactionPrimitive['amount']
  }): Transaction {
    return new Transaction({
      id: 0,
      idSender,
      idReceiver,
      amount,
      idCategory: null,
      createdAt: new Date(),
      canceled: false
    })
  }

  public toJSON (): TransactionPrimitive {
    return {
      id: this.id,
      idSender: this.idSender,
      idReceiver: this.idReceiver,
      amount: this.amount,
      idCategory: this.idCategory,
      createdAt: this.createdAt,
      canceled: this.canceled
    }
  }
}

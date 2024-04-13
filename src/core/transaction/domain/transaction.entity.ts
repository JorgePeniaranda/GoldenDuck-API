import { type TransactionPrimitive } from './transaction.primitive'

export class Transaction implements TransactionPrimitive {
  readonly #id: TransactionPrimitive['id']
  readonly #idSender: TransactionPrimitive['idSender']
  readonly #idReceiver: TransactionPrimitive['idReceiver']
  readonly #amount: TransactionPrimitive['amount']
  idCategory?: TransactionPrimitive['idCategory']
  readonly #createdAt: TransactionPrimitive['createdAt']
  canceled: TransactionPrimitive['canceled']

  constructor (transaction: TransactionPrimitive) {
    this.#id = transaction.id
    this.#idSender = transaction.idSender
    this.#idReceiver = transaction.idReceiver
    this.#amount = transaction.amount
    this.idCategory = transaction.idCategory
    this.#createdAt = transaction.createdAt
    this.canceled = transaction.canceled
  }

  get id (): TransactionPrimitive['id'] {
    return this.#id
  }

  get idSender (): TransactionPrimitive['idSender'] {
    return this.#idSender
  }

  get idReceiver (): TransactionPrimitive['idReceiver'] {
    return this.#idReceiver
  }

  get amount (): TransactionPrimitive['amount'] {
    return this.#amount
  }

  get createdAt (): TransactionPrimitive['createdAt'] {
    return this.#createdAt
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

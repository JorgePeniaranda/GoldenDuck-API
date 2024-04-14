import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type TransactionPrimitive } from './transaction.primitive'

@ObjectType()
export class Transaction implements TransactionPrimitive {
  readonly #id: TransactionPrimitive['id']

  readonly #idSender: TransactionPrimitive['idSender']

  readonly #idReceiver: TransactionPrimitive['idReceiver']

  readonly #amount: TransactionPrimitive['amount']

  @Field(() => Number)
    idCategory?: TransactionPrimitive['idCategory']

  readonly #createdAt: TransactionPrimitive['createdAt']

  @Field(() => Boolean)
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

  @Field(() => ID)
  get id (): TransactionPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  get idSender (): TransactionPrimitive['idSender'] {
    return this.#idSender
  }

  @Field(() => Number)
  get idReceiver (): TransactionPrimitive['idReceiver'] {
    return this.#idReceiver
  }

  @Field(() => BigInt)
  get amount (): TransactionPrimitive['amount'] {
    return this.#amount
  }

  @Field(() => Date)
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

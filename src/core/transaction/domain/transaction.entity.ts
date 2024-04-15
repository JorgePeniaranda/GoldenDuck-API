import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type TransactionPrimitive } from './transaction.primitive'

@ObjectType()
export class Transaction implements TransactionPrimitive {
  readonly #id: TransactionPrimitive['id']
  readonly #idSender: TransactionPrimitive['idSender']
  readonly #idReceiver: TransactionPrimitive['idReceiver']
  readonly #amount: TransactionPrimitive['amount']
  #idCategory?: TransactionPrimitive['idCategory']
  readonly #createdAt: TransactionPrimitive['createdAt']
  #canceled: TransactionPrimitive['canceled']

  constructor (transaction: TransactionPrimitive) {
    this.#id = transaction.id
    this.#idSender = transaction.idSender
    this.#idReceiver = transaction.idReceiver
    this.#amount = transaction.amount
    this.#idCategory = transaction.idCategory
    this.#createdAt = transaction.createdAt
    this.#canceled = transaction.canceled
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
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

  @Field(() => String)
  get amount (): TransactionPrimitive['amount'] {
    return this.#amount
  }

  @Field(() => Number)
  get idCategory (): TransactionPrimitive['idCategory'] {
    return this.#idCategory
  }

  set idCategory (value: TransactionPrimitive['idCategory']) {
    this.#idCategory = value
  }

  @Field(() => Date)
  get createdAt (): TransactionPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  get canceled (): TransactionPrimitive['canceled'] {
    return this.#canceled
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public cancel (): void {
    this.#canceled = true
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

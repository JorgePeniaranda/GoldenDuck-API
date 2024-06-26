import { Account } from '@/core/account/domain/account.entity'
import { Category } from '@/core/category/domain/category.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type TransactionPrimitive } from './transaction.primitive'
import { Expose } from 'class-transformer'

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

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => Account)
  readonly Sender: Account

  @Field(() => Account)
  readonly Receiver: Account

  @Field(() => Category, { nullable: true })
  readonly category: Category

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): TransactionPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  @Expose()
  public get idSender (): TransactionPrimitive['idSender'] {
    return this.#idSender
  }

  @Field(() => Number)
  @Expose()
  public get idReceiver (): TransactionPrimitive['idReceiver'] {
    return this.#idReceiver
  }

  @Field(() => String)
  @Expose()
  public get amount (): TransactionPrimitive['amount'] {
    return this.#amount
  }

  @Field(() => Number, { nullable: true })
  @Expose()
  public get idCategory (): TransactionPrimitive['idCategory'] {
    return this.#idCategory
  }

  public set idCategory (value: TransactionPrimitive['idCategory']) {
    this.#idCategory = value
  }

  @Field(() => Date)
  @Expose()
  public get createdAt (): TransactionPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  @Expose()
  public get canceled (): TransactionPrimitive['canceled'] {
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

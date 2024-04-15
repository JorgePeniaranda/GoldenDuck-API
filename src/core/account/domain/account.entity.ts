import { Card } from '@/core/card/domain/card.entity'
import { Investment } from '@/core/investment/domain/investment.entity'
import { Loan } from '@/core/loan/domain/loan.entity'
import { Transaction } from '@/core/transaction/domain/transaction.entity'
import { User } from '@/core/user/domain/user.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { AccountPrimitive } from './account.primitive'

const optionalProperties = ['id', 'balance', 'updatedAt', 'createdAt', 'deleted'] as const

@ObjectType()
export class Account implements AccountPrimitive {
  readonly #id: AccountPrimitive['id']
  readonly #idUser: AccountPrimitive['idUser']
  #balance: AccountPrimitive['balance']
  #updatedAt: AccountPrimitive['updatedAt']
  readonly #createdAt: AccountPrimitive['createdAt']
  #deleted: AccountPrimitive['deleted']

  constructor (account: AccountPrimitive) {
    this.#id = account.id
    this.#idUser = account.idUser
    this.#balance = account.balance
    this.#updatedAt = account.updatedAt
    this.#createdAt = account.createdAt
    this.#deleted = account.deleted
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => User, { nullable: false })
  readonly user: User

  @Field(() => [Card], { nullable: true })
  readonly cards: Card[]

  @Field(() => [Transaction], { nullable: true })
  readonly transactionsSend: Transaction[]

  @Field(() => [Transaction], { nullable: true })
  readonly transactionsReceived: Transaction[]

  @Field(() => [Loan], { nullable: true })
  readonly loans: Loan[]

  @Field(() => [Investment], { nullable: true })
  readonly investments: Investment[]

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => Number)
  public get id (): AccountPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  public get idUser (): AccountPrimitive['idUser'] {
    return this.#idUser
  }

  @Field(() => String)
  public get balance (): AccountPrimitive['balance'] {
    return this.#balance
  }

  @Field(() => Boolean)
  public get deleted (): AccountPrimitive['deleted'] {
    return this.#deleted
  }

  @Field(() => Date)
  public get createdAt (): AccountPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Date)
  public get updatedAt (): AccountPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public incrementBalance (amount: AccountPrimitive['balance']): void {
    this.#balance += amount
    this.#updateUpdatedAt()
  }

  public decrementBalance (amount: AccountPrimitive['balance']): void {
    this.#balance -= amount
    this.#updateUpdatedAt()
  }

  public delete (): void {
    this.#deleted = true
    this.#updateUpdatedAt()
  }

  public toJSON (): AccountPrimitive {
    return {
      id: this.id,
      idUser: this.idUser,
      balance: this.balance,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      deleted: this.deleted
    }
  }

  public static create (
    data: Pick<Partial<AccountPrimitive>, (typeof optionalProperties)[number]> &
    Omit<AccountPrimitive, (typeof optionalProperties)[number]>
  ): Account {
    return new Account({
      id: 0,
      idUser: data.idUser,
      balance: 0n,
      updatedAt: new Date(),
      createdAt: new Date(),
      deleted: false
    })
  }
}

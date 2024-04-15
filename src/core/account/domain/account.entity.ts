import { Field } from '@nestjs/graphql'
import { type AccountPrimitive } from './account.primitive'

const optionalProperties = ['id', 'balance', 'updatedAt', 'createdAt', 'deleted'] as const

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

  public set updatedAt (value: AccountPrimitive['updatedAt']) {
    this.#updatedAt = value
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public incrementBalance (amount: AccountPrimitive['balance']): void {
    this.#balance += amount
  }

  public decrementBalance (amount: AccountPrimitive['balance']): void {
    this.#balance -= amount
  }

  public delete (): void {
    this.#deleted = true
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

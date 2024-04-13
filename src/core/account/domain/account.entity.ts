import { type AccountPrimitive } from './account.primitive'

const optionalProperties = ['id', 'balance', 'updatedAt', 'createdAt', 'deleted'] as const

export class Account implements AccountPrimitive {
  readonly #id: AccountPrimitive['id']
  readonly #idUser: AccountPrimitive['idUser']
  #balance: AccountPrimitive['balance']
  public updatedAt: AccountPrimitive['updatedAt']
  readonly #createdAt: AccountPrimitive['createdAt']
  public deleted: AccountPrimitive['deleted']

  constructor (account: AccountPrimitive) {
    this.#id = account.id
    this.#idUser = account.idUser
    this.#balance = account.balance
    this.updatedAt = account.updatedAt
    this.#createdAt = account.createdAt
    this.deleted = account.deleted
  }

  public get id (): AccountPrimitive['id'] {
    return this.#id
  }

  public get idUser (): AccountPrimitive['idUser'] {
    return this.#idUser
  }

  public get balance (): AccountPrimitive['balance'] {
    return this.#balance
  }

  public get createdAt (): AccountPrimitive['createdAt'] {
    return this.#createdAt
  }

  public incrementBalance (amount: AccountPrimitive['balance']): void {
    this.#balance += amount
  }

  public decrementBalance (amount: AccountPrimitive['balance']): void {
    this.#balance -= amount
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

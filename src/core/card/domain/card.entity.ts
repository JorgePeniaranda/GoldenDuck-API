import { Account } from '@/core/account/domain/account.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type CardPrimitive } from './card.primitive'
import { Exclude, Expose } from 'class-transformer'

@ObjectType()
export class Card implements CardPrimitive {
  readonly #id: CardPrimitive['id']
  readonly #idAccount: CardPrimitive['idAccount']
  readonly #number: CardPrimitive['number']
  readonly #cvv: CardPrimitive['cvv']
  readonly #expiration: CardPrimitive['expiration']
  #updatedAt: CardPrimitive['updatedAt']
  readonly #createdAt: CardPrimitive['createdAt']
  #deleted: CardPrimitive['deleted']

  constructor (card: CardPrimitive) {
    this.#id = card.id
    this.#idAccount = card.idAccount
    this.#number = card.number
    this.#cvv = card.cvv
    this.#expiration = card.expiration
    this.#updatedAt = card.updatedAt
    this.#createdAt = card.createdAt
    this.#deleted = card.deleted
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => Account)
  readonly account: Account

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): CardPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  @Expose()
  public get idAccount (): CardPrimitive['idAccount'] {
    return this.#idAccount
  }

  @Field(() => Number)
  @Expose()
  public get number (): CardPrimitive['number'] {
    return this.#number
  }

  @Field(() => Number)
  @Exclude({ toPlainOnly: true })
  public get cvv (): CardPrimitive['cvv'] {
    return this.#cvv
  }

  @Field(() => Date)
  @Expose()
  public get expiration (): CardPrimitive['expiration'] {
    return this.#expiration
  }

  @Field(() => Date)
  @Expose()
  public get updatedAt (): CardPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  @Field(() => Date)
  @Expose()
  public get createdAt (): CardPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  @Expose()
  public get deleted (): CardPrimitive['deleted'] {
    return this.#deleted
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public delete (): void {
    this.#deleted = true
    this.#updateUpdatedAt()
  }

  public static create ({
    idAccount,
    number,
    cvv,
    expiration
  }: {
    idAccount: CardPrimitive['idAccount']
    number: CardPrimitive['number']
    cvv: CardPrimitive['cvv']
    expiration: CardPrimitive['expiration']
  }): Card {
    return new Card({
      id: 0,
      idAccount,
      number,
      cvv,
      expiration,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    })
  }

  public toJSON (): CardPrimitive {
    return {
      id: this.id,
      idAccount: this.idAccount,
      number: this.number,
      cvv: this.cvv,
      expiration: this.expiration,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deleted: this.deleted
    }
  }
}

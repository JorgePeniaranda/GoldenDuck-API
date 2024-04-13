import { type CardPrimitive } from './card.primitive'

export class Card implements CardPrimitive {
  readonly #id: CardPrimitive['id']
  readonly #idAccount: CardPrimitive['idAccount']
  readonly #number: CardPrimitive['number']
  readonly #cvv: CardPrimitive['cvv']
  readonly #expiration: CardPrimitive['expiration']
  updatedAt: CardPrimitive['updatedAt']
  readonly #createdAt: CardPrimitive['createdAt']
  deleted: CardPrimitive['deleted']

  constructor (card: CardPrimitive) {
    this.#id = card.id
    this.#idAccount = card.idAccount
    this.#number = card.number
    this.#cvv = card.cvv
    this.#expiration = card.expiration
    this.#createdAt = card.createdAt
    this.updatedAt = card.updatedAt
    this.deleted = card.deleted
  }

  get id (): CardPrimitive['id'] {
    return this.#id
  }

  get idAccount (): CardPrimitive['idAccount'] {
    return this.#idAccount
  }

  get number (): CardPrimitive['number'] {
    return this.#number
  }

  get cvv (): CardPrimitive['cvv'] {
    return this.#cvv
  }

  get expiration (): CardPrimitive['expiration'] {
    return this.#expiration
  }

  get createdAt (): CardPrimitive['createdAt'] {
    return this.#createdAt
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

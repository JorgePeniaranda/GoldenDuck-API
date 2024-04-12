import { type CardPrimitive } from './card.primitive'

export class Card implements CardPrimitive {
  id: CardPrimitive['id']
  idAccount: CardPrimitive['idAccount']
  number: CardPrimitive['number']
  cvv: CardPrimitive['cvv']
  expiration: CardPrimitive['expiration']
  createdAt: CardPrimitive['createdAt']
  updatedAt: CardPrimitive['updatedAt']
  deleted: CardPrimitive['deleted']

  constructor (card: CardPrimitive) {
    this.id = card.id
    this.idAccount = card.idAccount
    this.number = card.number
    this.cvv = card.cvv
    this.expiration = card.expiration
    this.createdAt = card.createdAt
    this.updatedAt = card.updatedAt
    this.deleted = card.deleted
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

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
}

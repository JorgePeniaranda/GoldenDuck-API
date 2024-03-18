import { ID } from '@/valueObjects/id/id.value'
import { type CardPrimitiveEntity, type CardEntity } from './card.entity'
import { ValidDate } from '@/valueObjects/date/validDate.value'

export class Card implements CardEntity {
  readonly id: CardEntity['id']
  readonly idAccount: CardEntity['idAccount']
  readonly number: CardEntity['number']
  readonly cvv: CardEntity['cvv']
  readonly expiration: CardEntity['expiration']
  readonly date: CardEntity['date']
  readonly updatedDate: CardEntity['updatedDate']
  readonly deleted: CardEntity['deleted']

  constructor (card: CardEntity) {
    this.id = card.id
    this.idAccount = card.idAccount
    this.number = card.number
    this.cvv = card.cvv
    this.expiration = card.expiration
    this.date = card.date
    this.updatedDate = card.updatedDate
    this.deleted = card.deleted
  }

  public create (card: CardPrimitiveEntity): Card {
    return new Card({
      id: new ID(card.id),
      idAccount: new ID(card.idAccount),
      number: card.number,
      cvv: card.cvv,
      expiration: card.expiration,
      date: new ValidDate(card.date),
      updatedDate: new ValidDate(card.updatedDate),
      deleted: card.deleted
    })
  }

  public toJSON (): CardPrimitiveEntity {
    return {
      id: this.id.value(),
      idAccount: this.idAccount.value(),
      number: this.number,
      cvv: this.cvv,
      expiration: this.expiration,
      date: this.date.value(),
      updatedDate: this.updatedDate.value(),
      deleted: this.deleted
    }
  }
}

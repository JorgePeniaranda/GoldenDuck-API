import { ID } from '@/valueObjects/id/id.value'
import { type CardPrimitiveEntity, type CardEntity } from './card.entity'
import { Int } from '@/valueObjects/int/int.value'
import { PastDate } from '@/valueObjects/pastDate/pastDate.value'
import { ValidDate } from '@/valueObjects/validDate/validDate.value'

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
      number: new Int(card.number),
      cvv: new Int(card.cvv),
      expiration: new ValidDate(card.expiration),
      date: new PastDate(card.date),
      updatedDate: new PastDate(card.updatedDate),
      deleted: card.deleted
    })
  }

  public toJSON (): CardPrimitiveEntity {
    return {
      id: this.id.value(),
      idAccount: this.idAccount.value(),
      number: this.number.value(),
      cvv: this.cvv.value(),
      expiration: this.expiration.value(),
      date: this.date.value(),
      updatedDate: this.updatedDate.value(),
      deleted: this.deleted
    }
  }
}

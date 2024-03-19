import { ID } from '@/valueObjects/number/ID/ID.value'
import { type CardPrimitiveEntity, type CardEntity } from './card.entity'
import { ValidDate } from '@/valueObjects/date/ValidDate/ValidDate.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { CardNumber } from './valueObjects/cardNumber/CardNumber.value'
import { CVV } from './valueObjects/cvv/cvv.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'

const ObjectName = 'Card'

export class Card implements CardEntity {
  readonly id: CardEntity['id']
  readonly idAccount: CardEntity['idAccount']
  readonly number: CardEntity['number']
  readonly cvv: CardEntity['cvv']
  readonly expiration: CardEntity['expiration']
  readonly createdAt: CardEntity['createdAt']
  readonly updatedDate: CardEntity['updatedDate']
  readonly deleted: CardEntity['deleted']

  constructor (card: CardEntity) {
    this.id = card.id
    this.idAccount = card.idAccount
    this.number = card.number
    this.cvv = card.cvv
    this.expiration = card.expiration
    this.createdAt = card.createdAt
    this.updatedDate = card.updatedDate
    this.deleted = card.deleted
  }

  public static create (card: CardPrimitiveEntity): Card {
    return new Card({
      id: new ID(card.id, `${ObjectName} -> ID`),
      idAccount: new ID(card.idAccount, `${ObjectName} -> IDAccount`),
      number: new CardNumber(card.number, `${ObjectName} -> Number`),
      cvv: new CVV(card.cvv, `${ObjectName} -> CVV`),
      expiration: new ValidDate(card.expiration, `${ObjectName} -> Expiration`),
      createdAt: new PastDate(card.createdAt, `${ObjectName} -> Date`),
      updatedDate: new PastDate(card.updatedDate, `${ObjectName} -> UpdatedDate`),
      deleted: new ValidBoolean(card.deleted, `${ObjectName} -> Deleted`)
    })
  }

  public toJSON (): CardPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      number: this.number.value,
      cvv: this.cvv.value,
      expiration: this.expiration.value,
      createdAt: this.createdAt.value,
      updatedDate: this.updatedDate.value,
      deleted: this.deleted.value
    }
  }
}

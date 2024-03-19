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
  readonly updatedAt: CardEntity['updatedAt']
  readonly deleted: CardEntity['deleted']

  constructor (card: CardPrimitiveEntity) {
    this.id = new ID(card.id, `${ObjectName} -> ID`)
    this.idAccount = new ID(card.idAccount, `${ObjectName} -> IDAccount`)
    this.number = new CardNumber(card.number, `${ObjectName} -> Number`)
    this.cvv = new CVV(card.cvv, `${ObjectName} -> CVV`)
    this.expiration = new ValidDate(
      card.expiration,
      `${ObjectName} -> Expiration`
    )
    this.createdAt = new PastDate(card.createdAt, `${ObjectName} -> Date`)
    this.updatedAt = new PastDate(
      card.updatedAt,
      `${ObjectName} -> UpdatedDate`
    )
    this.deleted = new ValidBoolean(card.deleted, `${ObjectName} -> Deleted`)
  }

  public toJSON (): CardPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      number: this.number.value,
      cvv: this.cvv.value,
      expiration: this.expiration.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deleted: this.deleted.value
    }
  }
}

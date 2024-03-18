import { ID } from '@/valueObjects/number/ID/ID.value'
import {
  type AccountPrimitiveEntity,
  type AccountEntity
} from './account.entity'
import { Balance } from './valueObjects/balance/Balance.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { URL } from '@/valueObjects/string/url/url.value'

export class Account implements AccountEntity {
  public id: AccountEntity['id']
  public idUser: AccountEntity['idUser']
  public balance: AccountEntity['balance']
  public imgUrl: AccountEntity['imgUrl']
  public updatedAt: AccountEntity['updatedAt']
  public createdAt: AccountEntity['createdAt']
  public deleted: AccountEntity['deleted']

  constructor (account: AccountEntity) {
    this.id = account.id
    this.idUser = account.idUser
    this.balance = account.balance
    this.imgUrl = account.imgUrl
    this.updatedAt = account.updatedAt
    this.createdAt = account.createdAt
    this.deleted = account.deleted
  }

  public static create (user: AccountPrimitiveEntity): Account {
    const createdUser = new Account({
      id: new ID(user.id),
      idUser: new ID(user.id),
      balance: new Balance(user.balance),
      imgUrl:
        user.imgUrl === null || user.imgUrl === undefined
          ? null
          : new URL(user.imgUrl),
      updatedAt: new PastDate(user.updatedAt),
      createdAt: new PastDate(user.createdAt),
      deleted: user.deleted
    })

    return createdUser
  }

  public toJSON (): AccountPrimitiveEntity {
    return {
      id: this.id.value,
      idUser: this.idUser.value,
      balance: this.balance.value,
      imgUrl: this.imgUrl?.value,
      updatedAt: this.updatedAt.value,
      createdAt: this.createdAt.value,
      deleted: this.deleted
    }
  }
}

import { type AccountPrimitive } from './account.primitive'

export class Account implements AccountPrimitive {
  public readonly id: AccountPrimitive['id']
  public readonly idUser: AccountPrimitive['idUser']
  public balance: AccountPrimitive['balance']
  public imgUrl: AccountPrimitive['imgUrl'] // mover a user
  public updatedAt: AccountPrimitive['updatedAt']
  public readonly createdAt: AccountPrimitive['createdAt']
  public deleted: AccountPrimitive['deleted']

  constructor (account: AccountPrimitive) {
    this.id = account.id
    this.idUser = account.idUser
    this.balance = account.balance
    this.imgUrl = account.imgUrl
    this.updatedAt = account.updatedAt
    this.createdAt = account.createdAt
    this.deleted = account.deleted
  }
}

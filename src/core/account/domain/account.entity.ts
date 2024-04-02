import { type AccountPrimitive } from './account.primitive'

export class Account {
  id: AccountPrimitive['id']
  idUser: AccountPrimitive['idUser']
  balance: AccountPrimitive['balance']
  imgUrl: AccountPrimitive['imgUrl'] // mover a user
  updatedAt: AccountPrimitive['updatedAt']
  createdAt: AccountPrimitive['createdAt']
  deleted: AccountPrimitive['deleted']

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

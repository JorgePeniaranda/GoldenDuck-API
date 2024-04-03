import { type Card } from '@prisma/client'

export interface CardPrimitive {
  id: Card['id']
  idAccount: Card['idAccount']
  number: Card['number']
  cvv: Card['cvv']
  expiration: Card['expiration']
  createdAt: Card['createdAt']
  updatedAt: Card['updatedAt']
  deleted: Card['deleted']
}

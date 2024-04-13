import { type Card } from '@prisma/client'

export interface CardPrimitive {
  readonly id: Card['id']
  readonly idAccount: Card['idAccount']
  readonly number: Card['number']
  readonly cvv: Card['cvv']
  readonly expiration: Card['expiration']
  updatedAt: Card['updatedAt']
  readonly createdAt: Card['createdAt']
  deleted: Card['deleted']
}

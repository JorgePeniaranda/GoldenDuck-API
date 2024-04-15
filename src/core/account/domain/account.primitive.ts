import { type Account } from '@prisma/client'

export interface AccountPrimitive {
  readonly id: Account['id']
  readonly idUser: Account['idUser']
  balance: Account['balance']
  updatedAt: Account['updatedAt']
  readonly createdAt: Account['createdAt']
  deleted: Account['deleted']
}

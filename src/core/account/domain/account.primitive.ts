import { type Account } from '@prisma/client'

export interface AccountPrimitive {
  id: Account['id']
  idUser: Account['idUser']
  balance: Account['balance']
  updatedAt: Account['updatedAt']
  createdAt: Account['createdAt']
  deleted: Account['deleted']
}

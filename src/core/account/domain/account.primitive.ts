import { type Account } from '@prisma/client'

export interface AccountPrimitive {
  id: Account['id']
  idUser: Account['idUser']
  balance: Account['balance']
  imgUrl?: Account['imgUrl']
  updatedAt: Account['updatedAt']
  createdAt: Account['createdAt']
  deleted: Account['deleted']
}

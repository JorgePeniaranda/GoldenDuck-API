import { type Transaction } from '@prisma/client'

export interface TransactionPrimitive {
  id: Transaction['id']
  idSender: Transaction['idSender']
  idReceiver: Transaction['idReceiver']
  amount: Transaction['amount']
  idCategory?: Transaction['idCategory']
  createdAt: Transaction['createdAt']
  canceled: Transaction['canceled']
}

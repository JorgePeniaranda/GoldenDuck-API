import { type Transaction } from '@prisma/client'

export interface TransactionPrimitive {
  id: Transaction['id']
  from: Transaction['from']
  to: Transaction['to']
  amount: Transaction['amount']
  idCategory?: Transaction['idCategory']
  createdAt: Transaction['createdAt']
  canceled: Transaction['canceled']
}

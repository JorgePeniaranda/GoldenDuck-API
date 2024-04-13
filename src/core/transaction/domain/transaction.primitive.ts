import { type Transaction } from '@prisma/client'

export interface TransactionPrimitive {
  readonly id: Transaction['id']
  readonly idSender: Transaction['idSender']
  readonly idReceiver: Transaction['idReceiver']
  readonly amount: Transaction['amount']
  idCategory?: Transaction['idCategory']
  readonly createdAt: Transaction['createdAt']
  canceled: Transaction['canceled']
}

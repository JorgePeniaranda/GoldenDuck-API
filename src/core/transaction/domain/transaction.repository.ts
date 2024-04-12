import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type Transaction } from './transaction.entity'
import { type TransactionPrimitive } from './transaction.primitive'

export interface TransactionRepository {
  create: (data: Transaction) => Promise<Transaction>
  findAll: (idAccount: AccountPrimitive['id']) => Promise<Transaction[]>
  findOne: (
    idSender: TransactionPrimitive['idSender'],
    index: number
  ) => Promise<Transaction | null>
  findOneAsSender: (
    idSender: TransactionPrimitive['idSender'],
    index: number
  ) => Promise<Transaction | null>
  findOneAsReceiver: (
    idSender: TransactionPrimitive['idSender'],
    index: number
  ) => Promise<Transaction | null>
  findByID: (id: TransactionPrimitive['id']) => Promise<Transaction | null>
  delete: (id: Transaction) => Promise<Transaction>
}

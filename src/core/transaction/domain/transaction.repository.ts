import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type CreateTransactionDTO } from './dto/create-transaction'
import { type Transaction } from './transaction.entity'
import { type TransactionPrimitive } from './transaction.primitive'

export interface TransactionRepository {
  create: (account: CreateTransactionDTO) => Promise<Transaction>
  getAll: (id: AccountPrimitive['id']) => Promise<Transaction[] | null>
  find: (id: TransactionPrimitive['id']) => Promise<Transaction | null>
  delete: (id: TransactionPrimitive['id']) => Promise<void>
}

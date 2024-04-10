import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type CreateTransactionDTO } from './dto/create-transaction'
import { type Transaction } from './transaction.entity'
import { type TransactionPrimitive } from './transaction.primitive'

export interface TransactionRepository {
  create: (data: CreateTransactionDTO) => Promise<Transaction>
  findAll: (id: AccountPrimitive['id']) => Promise<Transaction[] | null>
  findOne: (id: TransactionPrimitive['id']) => Promise<Transaction | null>
  delete: (id: TransactionPrimitive['id']) => Promise<void>
}

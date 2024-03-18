import { type TransactionEntity } from './transaction.entity'
import { type Transaction } from './transaction.value'

export interface TransactionRepository {
  createTransaction: (transaction: Transaction) => Promise<Transaction>
  getAllTransaction: () => Promise<Transaction[]>
  revertTransaction: (id: TransactionEntity['id']) => Promise<Transaction>
  findTransaction: ({
    id
  }: {
    id?: TransactionEntity['id']
  }) => Promise<Transaction | null>
}

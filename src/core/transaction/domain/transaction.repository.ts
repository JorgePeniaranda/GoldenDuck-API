import { type TransactionEntity } from './transaction.entity'
import { type Transaction } from './transaction.value'

export interface TransactionRepository {
  createTransaction: ({
    from,
    to,
    amount,
    idCategory
  }: {
    from: TransactionEntity['from']
    to: TransactionEntity['to']
    amount: TransactionEntity['amount']
    idCategory: TransactionEntity['idCategory']
  }) => Promise<Transaction>
  getAllTransaction: (
    idAccount?: TransactionEntity['from'] | TransactionEntity['to'],
  ) => Promise<Transaction[] | null>
  findTransaction: ({
    id
  }: {
    id?: TransactionEntity['id']
  }) => Promise<Transaction | null>
  revertTransaction: (id: TransactionEntity['id']) => Promise<void>
}

import { type Transaction } from './transaction.entity'
import { type TransactionPrimitive } from './transaction.primitive'

export interface TransactionRepository {
  create: (data: Transaction) => Promise<Transaction>
  findAll: ({
    idAccount
  }: {
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver']
  }) => Promise<Transaction[]>
  findOne: ({
    idAccount,
    index
  }: {
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver']
    index: number
  }) => Promise<Transaction | null>
  findOneAsSender: ({
    idSender,
    index
  }: {
    idSender: TransactionPrimitive['idSender']
    index: number
  }) => Promise<Transaction | null>
  findOneAsReceiver: ({
    idReceiver,
    index
  }: {
    idReceiver: TransactionPrimitive['idReceiver']
    index: number
  }) => Promise<Transaction | null>
  findByID: (id: TransactionPrimitive['id']) => Promise<Transaction | null>
  delete: (id: Transaction) => Promise<Transaction>
}

import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type TransactionPrimitive } from '@/core/transaction/domain/transaction.primitive'

export interface ICreateAccountEvent {
  idUser: AccountPrimitive['idUser']
}

export interface ITransactionEvent {
  idSender: TransactionPrimitive['idSender']
  idReceiver: TransactionPrimitive['idReceiver']
  amount: TransactionPrimitive['amount']
}

export interface IChangeBalanceEvent {
  id: AccountPrimitive['id']
  amount: AccountPrimitive['balance']
}

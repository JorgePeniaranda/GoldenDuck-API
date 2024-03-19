import { RequestError } from '@/helpers/customErrors'
import { ErrorsDictionary } from '@/messages/errors'
import { type TransactionEntity } from '../domain/transaction.entity'
import { type TransactionRepository } from '../domain/transaction.repository'
import { type Transaction } from '../domain/transaction.value'

export class TransactionUseCase {
  constructor (private readonly transactionRepository: TransactionRepository) {}

  public async createTransaction ({
    from,
    to,
    amount,
    idCategory
  }: {
    from: TransactionEntity['from']
    to: TransactionEntity['to']
    amount: TransactionEntity['amount']
    idCategory: TransactionEntity['idCategory']
  }): Promise<Transaction> {
    const createdTransaction =
      await this.transactionRepository.createTransaction({
        from,
        to,
        amount,
        idCategory
      })

    return createdTransaction
  }

  public async getAllTransaction (
    idAccount?: TransactionEntity['from'] | TransactionEntity['to']
  ): Promise<Transaction[] | null> {
    const transactions =
      await this.transactionRepository.getAllTransaction(idAccount)

    return transactions
  }

  public async findTransaction (searchParams: {
    id?: TransactionEntity['id']
  }): Promise<Transaction | null> {
    if (searchParams.id === undefined) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const transaction =
      await this.transactionRepository.findTransaction(searchParams)

    return transaction
  }

  public async revertTransaction (id: TransactionEntity['id']): Promise<void> {
    await this.transactionRepository.revertTransaction(id)
  }
}

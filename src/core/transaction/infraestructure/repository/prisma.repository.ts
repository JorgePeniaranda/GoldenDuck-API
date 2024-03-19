import { prisma } from '@/libs/prisma'
import { type TransactionEntity } from '../../domain/transaction.entity'
import { Transaction } from '../../domain/transaction.value'
import { type TransactionRepository } from '../../domain/transaction.repository'

export class PrismaRepository implements TransactionRepository {
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
    const createdTransaction = await prisma.transaction.create({
      data: {
        from: from.value,
        to: to.value,
        amount: amount.value,
        idCategory: idCategory?.value
      }
    })

    return new Transaction(createdTransaction)
  }

  public async getAllTransaction (
    idAccount?: TransactionEntity['from'] | TransactionEntity['to']
  ): Promise<Transaction[] | null> {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ from: idAccount?.value }, { to: idAccount?.value }]
      }
    })

    return transactions.map((transaction) => new Transaction(transaction))
  }

  public async findTransaction ({
    id
  }: {
    id?: TransactionEntity['id']
  }): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: id?.value
      }
    })

    return transaction === null ? null : new Transaction(transaction)
  }

  public async revertTransaction (id: TransactionEntity['id']): Promise<void> {
    await prisma.transaction.update({
      where: {
        id: id.value
      },
      data: {
        canceled: true
      }
    })
  }
}

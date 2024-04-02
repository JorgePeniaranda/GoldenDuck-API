import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/core/shared/prisma.repository'
import { Injectable } from '@nestjs/common'
import { type CreateTransactionDTO } from '../domain/dto/create-transaction'
import { Transaction } from '../domain/transaction.entity'
import { type TransactionPrimitive } from '../domain/transaction.primitive'
import { type TransactionRepository } from '../domain/transaction.repository'

@Injectable()
export class TransactionRepositoryPrismaMySQL implements TransactionRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateTransactionDTO): Promise<Transaction> {
    const newTransaction = await this.prisma.transaction.create({
      data
    })

    return new Transaction(newTransaction)
  }

  public async getAll (id: AccountPrimitive['id']): Promise<Transaction[] | null> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [
          { from: id },
          { to: id }
        ]
      }
    })

    return transactions.map(transaction => new Transaction(transaction))
  }

  public async find (id: TransactionPrimitive['id']): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id
      }
    })

    return transaction !== null ? new Transaction(transaction) : null
  }

  public async delete (id: TransactionPrimitive['id']): Promise<void> {
    await this.prisma.transaction.delete({
      where: {
        id
      }
    })
  }
}

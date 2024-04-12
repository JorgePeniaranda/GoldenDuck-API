import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Transaction } from '../domain/transaction.entity'
import { type TransactionPrimitive } from '../domain/transaction.primitive'
import { type TransactionRepository } from '../domain/transaction.repository'

@Injectable()
export class TransactionRepositoryPrismaMySQL implements TransactionRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: Transaction): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: data.toJSON()
    })

    return new Transaction(transaction)
  }

  public async findAll (id: AccountPrimitive['id']): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [{ idSender: id }, { idReceiver: id }]
      }
    })

    return transactions.map(transaction => new Transaction(transaction))
  }

  public async findOne (
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        OR: [{ idSender: idAccount }, { idReceiver: idAccount }]
      },
      skip: index,
      take: 1
    })

    return transaction[0] !== undefined ? new Transaction(transaction[0]) : null
  }

  public async findOneAsSender (
    idSender: TransactionPrimitive['idSender'],
    index: number
  ): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        idSender
      },
      skip: index,
      take: 1
    })

    return transaction[0] !== undefined ? new Transaction(transaction[0]) : null
  }

  public async findOneAsReceiver (
    idReceiver: TransactionPrimitive['idReceiver'],
    index: number
  ): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        idReceiver
      },
      skip: index,
      take: 1
    })

    return transaction[0] !== undefined ? new Transaction(transaction[0]) : null
  }

  public async findByID (id: TransactionPrimitive['id']): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id
      }
    })

    return transaction !== null ? new Transaction(transaction) : null
  }

  public async delete (data: Transaction): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      where: {
        id: data.id
      },
      data: {
        canceled: true
      }
    })

    return new Transaction(transaction)
  }
}

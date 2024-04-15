import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Transaction } from '../domain/transaction.entity'
import { type TransactionPrimitive } from '../domain/transaction.primitive'
import { type TransactionRepository } from '../domain/transaction.repository'

@Injectable()
export class TransactionRepositoryPrismaMySQL implements TransactionRepository {
  constructor (private readonly prisma: PrismaService) {}

  /* ---------- create ---------- */ // MARK: create
  public async create (data: Transaction): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Transaction(transaction)
  }

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({
    idAccount
  }: {
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver']
  }): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        OR: [{ idSender: idAccount }, { idReceiver: idAccount }],
        canceled: false
      }
    })

    return transactions.map(transaction => new Transaction(transaction))
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idAccount,
    index
  }: {
    idAccount: TransactionPrimitive['idSender'] | TransactionPrimitive['idReceiver']
    index: number
  }): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        OR: [{ idSender: idAccount }, { idReceiver: idAccount }],
        canceled: false
      },
      skip: index,
      take: 1
    })

    return transaction[0] !== undefined ? new Transaction(transaction[0]) : null
  }

  /* ---------- findOneAsSender ---------- */ // MARK: findOneAsSender
  public async findOneAsSender ({
    idSender,
    index
  }: {
    idSender: TransactionPrimitive['idSender']
    index: number
  }): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        idSender,
        canceled: false
      },
      skip: index,
      take: 1
    })

    return transaction[0] !== undefined ? new Transaction(transaction[0]) : null
  }

  /* ---------- findOneAsReceiver ---------- */ // MARK: findOneAsReceiver
  public async findOneAsReceiver ({
    idReceiver,
    index
  }: {
    idReceiver: TransactionPrimitive['idReceiver']
    index: number
  }): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        idReceiver,
        canceled: false
      },
      skip: index,
      take: 1
    })

    return transaction[0] !== undefined ? new Transaction(transaction[0]) : null
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID (id: TransactionPrimitive['id']): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
        canceled: false
      }
    })

    return transaction !== null ? new Transaction(transaction) : null
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete (data: Transaction): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      where: {
        ...data.toJSON(),
        canceled: false
      },
      data: {
        canceled: true
      }
    })

    return new Transaction(transaction)
  }
}

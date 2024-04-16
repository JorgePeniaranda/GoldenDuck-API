import { faker } from '@faker-js/faker'
import { type PrismaClient, type Transaction } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaTransaction implements PrismaWithoutID<Transaction> {
  readonly idSender: Transaction['idSender']
  readonly idReceiver: Transaction['idReceiver']
  readonly amount: Transaction['amount']
  readonly idCategory: number | Transaction['idCategory']
  readonly updatedAt: Transaction['updatedAt']
  readonly createdAt: Transaction['createdAt']
  readonly canceled: Transaction['canceled']

  constructor(transaction: PrismaWithoutID<Transaction>) {
    this.idSender = transaction.idSender
    this.idReceiver = transaction.idReceiver
    this.amount = transaction.amount
    this.idCategory = transaction.idCategory
    this.updatedAt = transaction.updatedAt
    this.createdAt = transaction.createdAt
    this.canceled = transaction.canceled
  }

  public static generate({
    idSender,
    idReceiver,
    idCategory
  }: {
    idSender: Transaction['idSender']
    idReceiver: Transaction['idReceiver']
    idCategory: Transaction['idCategory']
  }): PrismaTransaction {
    const createdAt = faker.date.past()
    const canceled = faker.datatype.boolean({
      probability: PrismaParams.SESSION_ACTIVE_PROBABILITY
    })
    const updatedAt = canceled
      ? faker.date.between({
          from: createdAt,
          to: new Date()
        })
      : createdAt

    return new PrismaTransaction({
      idSender,
      idReceiver,
      amount: faker.number.bigInt({
        min: PrismaParams.MIN_TRANSACTION_AMOUNT,
        max: PrismaParams.MAX_TRANSACTION_AMOUNT
      }),
      idCategory,
      updatedAt,
      createdAt,
      canceled
    })
  }

  public static async insert({
    prisma,
    idSender,
    idReceiver,
    amount
  }: {
    prisma: PrismaClient
    idSender: Transaction['idSender']
    idReceiver: Transaction['idReceiver']
    amount: number
  }): Promise<PrismaTransaction[]> {
    const transactions = [] as PrismaTransaction[]
    for (let i = 0; i < amount; i++) {
      transactions.push(
        PrismaTransaction.generate({
          idSender,
          idReceiver,
          idCategory: null
        })
      )
    }

    await prisma.transaction.createMany({
      data: transactions
    })

    return transactions
  }
}

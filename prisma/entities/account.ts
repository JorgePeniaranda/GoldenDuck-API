import { faker } from '@faker-js/faker'
import { type Account, type PrismaClient } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaAccount implements PrismaWithoutID<Account> {
  readonly idUser: Account['idUser']
  readonly balance: Account['balance']
  readonly createdAt: Account['createdAt']
  readonly updatedAt: Account['updatedAt']
  readonly deleted: Account['deleted']

  constructor(account: PrismaWithoutID<Account>) {
    this.idUser = account.idUser
    this.balance = account.balance
    this.createdAt = account.createdAt
    this.updatedAt = account.updatedAt
    this.deleted = account.deleted
  }

  public static generate({ idUser }: { idUser: Account['idUser'] }): PrismaAccount {
    const createdAt = faker.date.past()
    const deleted = faker.datatype.boolean({ probability: PrismaParams.DELETED_PROBABILITY })
    const updatedAt = faker.date.between({
      from: createdAt,
      to: new Date()
    })

    return new PrismaAccount({
      idUser,
      balance: faker.number.bigInt({
        min: PrismaParams.MIN_BALANCE,
        max: PrismaParams.MAX_BALANCE
      }),
      createdAt,
      updatedAt,
      deleted
    })
  }

  public static async insert({
    prisma,
    idUser,
    amount
  }: {
    prisma: PrismaClient
    idUser: Account['idUser']
    amount: number
  }): Promise<Account[]> {
    const accounts = [] as Account[]
    for (let i = 0; i < amount; i++) {
      accounts.push(
        await prisma.account.create({
          data: PrismaAccount.generate({ idUser })
        })
      )
    }

    return accounts
  }
}

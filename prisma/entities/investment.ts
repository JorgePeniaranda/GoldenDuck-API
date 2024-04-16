import { faker } from '@faker-js/faker'
import { type Investment, type PrismaClient } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaInvestment implements PrismaWithoutID<Investment> {
  readonly idAccount: Investment['idAccount']
  readonly amount: Investment['amount']
  readonly interest: Investment['interest']
  readonly dateEnd: Investment['dateEnd']
  readonly updatedAt: Investment['updatedAt']
  readonly createdAt: Investment['createdAt']
  readonly canceled: Investment['canceled']

  constructor(investment: PrismaWithoutID<Investment>) {
    this.idAccount = investment.idAccount
    this.amount = investment.amount
    this.interest = investment.interest
    this.dateEnd = investment.dateEnd
    this.updatedAt = investment.updatedAt
    this.createdAt = investment.createdAt
    this.canceled = investment.canceled
  }

  public static generate({ idAccount }: { idAccount: Investment['idAccount'] }): PrismaInvestment {
    const createdAt = faker.date.past()
    const canceled = faker.datatype.boolean({ probability: PrismaParams.DELETED_PROBABILITY })
    const updatedAt = canceled
      ? faker.date.between({
          from: createdAt,
          to: new Date()
        })
      : createdAt

    return new PrismaInvestment({
      idAccount,
      amount: faker.number.bigInt({
        min: PrismaParams.MIN_INVESTMENT_AMOUNT,
        max: PrismaParams.MAX_INVESTMENT_AMOUNT
      }),
      interest: faker.number.float({
        min: PrismaParams.MIN_INVESTMENT_INTEREST,
        max: PrismaParams.MAX_INVESTMENT_INTEREST
      }),
      dateEnd: faker.date.future(),
      updatedAt,
      createdAt,
      canceled
    })
  }

  public static async insert({
    prisma,
    idAccount,
    amount
  }: {
    prisma: PrismaClient
    idAccount: Investment['idAccount']
    amount: number
  }): Promise<PrismaInvestment[]> {
    const investments = [] as PrismaInvestment[]
    for (let i = 0; i < amount; i++) {
      investments.push(PrismaInvestment.generate({ idAccount }))
    }

    await prisma.investment.createMany({
      data: investments
    })

    return investments
  }
}

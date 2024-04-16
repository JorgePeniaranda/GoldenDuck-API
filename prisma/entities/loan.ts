import { faker } from '@faker-js/faker'
import { type Loan, type PrismaClient } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaLoan implements PrismaWithoutID<Loan> {
  readonly idAccount: Loan['idAccount']
  readonly amount: Loan['amount']
  readonly interest: Loan['interest']
  readonly dateEnd: Loan['dateEnd']
  readonly updatedAt: Loan['updatedAt']
  readonly createdAt: Loan['createdAt']
  readonly canceled: Loan['canceled']

  constructor(loan: PrismaWithoutID<Loan>) {
    this.idAccount = loan.idAccount
    this.amount = loan.amount
    this.interest = loan.interest
    this.dateEnd = loan.dateEnd
    this.updatedAt = loan.updatedAt
    this.createdAt = loan.createdAt
    this.canceled = loan.canceled
  }

  public static generate({ idAccount }: { idAccount: Loan['idAccount'] }): PrismaLoan {
    const createdAt = faker.date.past()
    const canceled = faker.datatype.boolean({ probability: PrismaParams.DELETED_PROBABILITY })
    const updatedAt = canceled
      ? faker.date.between({
          from: createdAt,
          to: new Date()
        })
      : createdAt

    return new PrismaLoan({
      idAccount,
      amount: faker.number.bigInt({
        min: PrismaParams.MIN_LOAN_AMOUNT,
        max: PrismaParams.MAX_LOAN_AMOUNT
      }),
      interest: faker.number.float({
        min: PrismaParams.MIN_LOAN_INTEREST,
        max: PrismaParams.MAX_LOAN_INTEREST
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
    idAccount: Loan['idAccount']
    amount: number
  }): Promise<PrismaLoan[]> {
    const loans = [] as PrismaLoan[]
    for (let i = 0; i < amount; i++) {
      loans.push(PrismaLoan.generate({ idAccount }))
    }

    await prisma.loan.createMany({
      data: loans
    })

    return loans
  }
}

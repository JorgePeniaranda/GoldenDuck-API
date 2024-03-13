import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newLoan = async (idAccount: number, amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const id = await prisma.loan.create({
      data: {
        idAccount,
        amount: faker.number.int({
          min: 0,
          max: 100000
        }),
        interest: faker.number.float({
          min: 1.3,
          max: 10
        }),
        dateEnd: faker.date.future()
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}
import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newInvestment = async (idAccount: number, amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past()

    const id = await prisma.investment.create({
      data: {
        idAccount,
        amount: faker.number.int(),
        interest: faker.number.int({
          min: 0,
          max: 100000
        }),
        date: randomDate,
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

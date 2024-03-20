import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newLoan = async (
  idAccount: number,
  amount: number
): Promise<number[]> => {
  const listID = [] as number[]
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past()

    const { id } = await prisma.loan.create({
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
        dateEnd: faker.date.future(),
        updatedAt: randomDate,
        createdAt: randomDate
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}

import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newTransaction = async (
  idUser: number,
  amount: number,
): Promise<Array<number>> => {
  const listID = [] as number[]
  for (let i = 0; i < amount; i++) {
    const { id } = await prisma.transaction.create({
      data: {
        from: idUser,
        to: idUser,
        amount: faker.number.int({
          min: 0,
          max: 100000,
        }),
      },
      select: {
        id: true,
      },
    })

    listID.push(id)
  }

  return listID
}

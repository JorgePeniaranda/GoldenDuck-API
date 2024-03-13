import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newTransaction = async (idUser: number, amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const id = await prisma.transaction.create({
      data: {
        from: idUser,
        to: idUser,
        amount: faker.number.int()
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}

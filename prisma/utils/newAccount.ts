import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newAccount = async (idUser: number, amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const id = await prisma.account.create({
      data: {
        idUser,
        imgUrl: faker.image.url(),
        balance: faker.number.int({
          min: 0,
          max: 1000000
        })
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}

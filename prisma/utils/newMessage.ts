import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newMessage = async (idAccount: number, amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const id = await prisma.message.create({
      data: {
        from: idAccount,
        to: idAccount,
        message: faker.lorem.text()
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}

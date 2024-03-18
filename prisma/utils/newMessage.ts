import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newMessage = async (
  idAccount: number,
  amount: number
): Promise<number[]> => {
  const listID = [] as number[]
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past()

    const { id } = await prisma.message.create({
      data: {
        from: idAccount,
        to: idAccount,
        message: faker.lorem.text(),
        date: randomDate,
        updatedAt: randomDate
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}

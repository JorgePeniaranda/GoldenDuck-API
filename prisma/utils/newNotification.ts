import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newNotification = async (
  idAccount: number,
  amount: number
): Promise<number[]> => {
  const listID = [] as number[]
  for (let i = 0; i < amount; i++) {
    const { id } = await prisma.notification.create({
      data: {
        idAccount,
        message: faker.lorem.text(),
        createdAt: faker.date.past()
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}

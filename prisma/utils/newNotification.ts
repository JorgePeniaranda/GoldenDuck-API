import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newNotification = async (idAccount: number, amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const id = await prisma.notification.create({
      data: {
        idAccount,
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
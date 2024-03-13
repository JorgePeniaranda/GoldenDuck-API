import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newSession = async (idUser: number, amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const id = await prisma.session.create({
      data: {
        idUser,
        ip: faker.internet.ip(),
        userAgent: faker.internet.userAgent()
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}

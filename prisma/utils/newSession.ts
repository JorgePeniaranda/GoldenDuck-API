import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newSession = async (
  idUser: number,
  amount: number
): Promise<number[]> => {
  const listID = [] as number[]
  for (let i = 0; i < amount; i++) {
    const randomDate = faker.date.past()

    const { id } = await prisma.session.create({
      data: {
        idUser,
        ip: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
        location: faker.location.direction(),
        deviceType: faker.internet.mac(),
        token: faker.string.uuid(),
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

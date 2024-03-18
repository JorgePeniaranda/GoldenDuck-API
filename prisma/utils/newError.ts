import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newError = async (amount: number): Promise<number[]> => {
  const listID = [] as number[]
  for (let i = 0; i < amount; i++) {
    const { id } = await prisma.error.create({
      data: {
        name: faker.lorem.word(),
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

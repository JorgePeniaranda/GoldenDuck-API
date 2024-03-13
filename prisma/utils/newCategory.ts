import { faker } from '@faker-js/faker'
import { prisma } from '../../src/libs/prisma'

export const newCategory = async (amount: number): Promise<Array<{ id: number }>> => {
  const listID = []
  for (let i = 0; i < amount; i++) {
    const id = await prisma.category.create({
      data: {
        name: faker.string.uuid()
      },
      select: {
        id: true
      }
    })

    listID.push(id)
  }

  return listID
}

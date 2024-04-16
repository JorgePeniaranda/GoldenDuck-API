import { faker } from '@faker-js/faker'
import { type Category, type PrismaClient } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaCategory implements PrismaWithoutID<Category> {
  readonly name: Category['name']
  readonly createdAt: Category['createdAt']
  readonly updatedAt: Category['updatedAt']
  readonly deleted: Category['deleted']

  constructor(category: PrismaWithoutID<Category>) {
    this.name = category.name
    this.createdAt = category.createdAt
    this.updatedAt = category.updatedAt
    this.deleted = category.deleted
  }

  public static generate(): PrismaCategory {
    const createdAt = faker.date.past()
    const deleted = faker.datatype.boolean({ probability: PrismaParams.DELETED_PROBABILITY })
    const updatedAt = deleted
      ? faker.date.between({
          from: createdAt,
          to: new Date()
        })
      : createdAt

    return new PrismaCategory({
      name: faker.string.uuid(),
      createdAt,
      updatedAt,
      deleted
    })
  }

  public static async insert({
    prisma,
    amount
  }: {
    prisma: PrismaClient
    amount: number
  }): Promise<PrismaCategory[]> {
    const categories = [] as PrismaCategory[]
    for (let i = 0; i < amount; i++) {
      categories.push(PrismaCategory.generate())
    }

    await prisma.category.createMany({
      data: categories
    })

    return categories
  }
}

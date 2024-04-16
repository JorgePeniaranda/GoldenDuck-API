import { faker } from '@faker-js/faker'
import { type Error, type PrismaClient } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaError implements PrismaWithoutID<Error> {
  readonly name: Error['name']
  readonly message: Error['message']
  readonly stack: Error['stack']
  readonly createdAt: Error['createdAt']
  readonly updatedAt: Error['updatedAt']
  readonly deleted: Error['deleted']

  constructor(error: PrismaWithoutID<Error>) {
    this.name = error.name
    this.message = error.message
    this.stack = error.stack
    this.createdAt = error.createdAt
    this.updatedAt = error.updatedAt
    this.deleted = error.deleted
  }

  public static generate(): PrismaError {
    const createdAt = faker.date.past()
    const deleted = faker.datatype.boolean({ probability: PrismaParams.DELETED_PROBABILITY })
    const updatedAt = deleted
      ? faker.date.between({
          from: createdAt,
          to: new Date()
        })
      : createdAt

    return new PrismaError({
      name: faker.lorem.word(5),
      message: faker.lorem.words(15),
      stack: faker.lorem.words(30),
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
  }): Promise<PrismaError[]> {
    const errors = [] as PrismaError[]
    for (let i = 0; i < amount; i++) {
      errors.push(PrismaError.generate())
    }

    await prisma.error.createMany({
      data: errors
    })

    return errors
  }
}

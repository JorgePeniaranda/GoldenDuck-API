import { faker } from '@faker-js/faker'
import { type Activity, type PrismaClient } from '@prisma/client'
import { type PrismaWithoutID } from '../PrismaParams'

export class PrismaActivity implements PrismaWithoutID<Activity> {
  readonly idUser: Activity['idUser']
  readonly action: Activity['action']
  readonly details: Activity['details']
  readonly createdAt: Activity['createdAt']

  constructor(activity: PrismaWithoutID<Activity>) {
    this.idUser = activity.idUser
    this.action = activity.action
    this.details = activity.details
    this.createdAt = activity.createdAt
  }

  public static generate({ idUser }: { idUser: Activity['idUser'] }): PrismaActivity {
    const createdAt = faker.date.past()

    return new PrismaActivity({
      idUser,
      action: faker.internet.httpMethod(),
      details: faker.lorem.text(),
      createdAt
    })
  }

  public static async insert({
    prisma,
    idUser,
    amount
  }: {
    prisma: PrismaClient
    idUser: Activity['idUser']
    amount: number
  }): Promise<PrismaActivity[]> {
    const activities = [] as PrismaActivity[]
    for (let i = 0; i < amount; i++) {
      activities.push(PrismaActivity.generate({ idUser }))
    }

    await prisma.activity.createMany({
      data: activities
    })

    return activities
  }
}

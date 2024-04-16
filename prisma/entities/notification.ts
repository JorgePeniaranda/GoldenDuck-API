import { faker } from '@faker-js/faker'
import { type Notification, type PrismaClient } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaNotification implements PrismaWithoutID<Notification> {
  readonly idUser: Notification['idUser']
  readonly message: Notification['message']
  readonly read: Notification['read']
  readonly updatedAt: Notification['updatedAt']
  readonly createdAt: Notification['createdAt']

  constructor(message: PrismaWithoutID<Notification>) {
    this.idUser = message.idUser
    this.message = message.message
    this.read = message.read
    this.updatedAt = message.updatedAt
    this.createdAt = message.createdAt
  }

  public static generate({ idUser }: { idUser: Notification['idUser'] }): PrismaNotification {
    const createdAt = faker.date.past()
    const read = faker.datatype.boolean({ probability: PrismaParams.MESSAGE_READ_PROBABILITY })
    const updatedAt = faker.date.between({
      from: createdAt,
      to: new Date()
    })

    return new PrismaNotification({
      idUser,
      message: faker.lorem.words(15),
      read,
      updatedAt,
      createdAt
    })
  }

  public static async insert({
    prisma,
    idUser,
    amount
  }: {
    prisma: PrismaClient
    idUser: Notification['idUser']
    amount: number
  }): Promise<PrismaNotification[]> {
    const notifications = [] as PrismaNotification[]
    for (let i = 0; i < amount; i++) {
      notifications.push(PrismaNotification.generate({ idUser }))
    }

    await prisma.notification.createMany({
      data: notifications
    })

    return notifications
  }
}

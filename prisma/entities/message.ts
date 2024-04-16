import { faker } from '@faker-js/faker'
import { type Message, type PrismaClient } from '@prisma/client'
import { PrismaParams, type PrismaWithoutID } from '../PrismaParams'

export class PrismaMessage implements PrismaWithoutID<Message> {
  readonly idSender: Message['idSender']
  readonly idReceiver: Message['idReceiver']
  readonly message: Message['message']
  readonly read: Message['read']
  readonly updatedAt: Message['updatedAt']
  readonly createdAt: Message['createdAt']
  readonly deleted: Message['deleted']

  constructor(message: PrismaWithoutID<Message>) {
    this.idSender = message.idSender
    this.idReceiver = message.idReceiver
    this.message = message.message
    this.read = message.read
    this.updatedAt = message.updatedAt
    this.createdAt = message.createdAt
    this.deleted = message.deleted
  }

  public static generate({
    idSender,
    idReceiver
  }: {
    idSender: Message['idSender']
    idReceiver: Message['idReceiver']
  }): PrismaMessage {
    const createdAt = faker.date.past()
    const read = faker.datatype.boolean({ probability: PrismaParams.MESSAGE_READ_PROBABILITY })
    const deleted = faker.datatype.boolean({ probability: PrismaParams.DELETED_PROBABILITY })
    const updatedAt = faker.date.between({
      from: createdAt,
      to: new Date()
    })

    return new PrismaMessage({
      idSender,
      idReceiver,
      message: faker.lorem.words(15),
      read,
      updatedAt,
      createdAt,
      deleted
    })
  }

  public static async insert({
    prisma,
    idSender,
    idReceiver,
    amount
  }: {
    prisma: PrismaClient
    idSender: Message['idSender']
    idReceiver: Message['idReceiver']
    amount: number
  }): Promise<PrismaMessage[]> {
    const messages = [] as PrismaMessage[]
    for (let i = 0; i < amount; i++) {
      messages.push(PrismaMessage.generate({ idSender, idReceiver }))
    }

    await prisma.message.createMany({
      data: messages
    })

    return messages
  }
}

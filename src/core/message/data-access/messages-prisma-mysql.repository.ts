import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Message } from '../domain/messages.entity'
import { type MessagePrimitive } from '../domain/messages.primitive'
import { type MessageRepository } from '../domain/messages.repository'

@Injectable()
export class MessageRepositoryPrismaMySQL implements MessageRepository {
  constructor (private readonly prisma: PrismaService) {}
  public async create (data: Message): Promise<Message> {
    const newMessage = await this.prisma.message.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Message(newMessage)
  }

  public async findAll ({ idUser }: { idUser: AccountPrimitive['idUser'] }): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [{ idSender: idUser }, { idReceiver: idUser }]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return messages.map(message => new Message(message))
  }

  public async findOne ({
    idUser,
    idTarget,
    index
  }: {
    idUser: number
    idTarget: number
    index: number
  }): Promise<Message | null> {
    const messages = await this.prisma.message.findMany({
      where: {
        AND: [
          {
            OR: [{ idSender: idUser }, { idReceiver: idUser }]
          },
          {
            OR: [{ idSender: idTarget }, { idReceiver: idTarget }]
          }
        ]
      },
      skip: index,
      take: 1,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return messages[0] === undefined ? null : new Message(messages[0])
  }

  public async findByID ({ id }: { id: MessagePrimitive['id'] }): Promise<Message | null> {
    const message = await this.prisma.message.findUnique({
      where: {
        id
      }
    })

    return message === null ? null : new Message(message)
  }

  public async findHistory ({
    idUser
  }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  }): Promise<Message[]> {
    const contacts = await this.prisma.message.groupBy({
      by: ['idSender', 'idReceiver'],
      where: {
        OR: [{ idSender: idUser }, { idReceiver: idUser }]
      }
    })

    let lastMessageWithContacts: Message[] = []
    for await (const contact of contacts) {
      const message = await this.prisma.message.findFirst({
        where: {
          AND: [
            {
              OR: [{ idSender: contact.idSender }, { idReceiver: contact.idSender }]
            },
            {
              OR: [{ idSender: contact.idReceiver }, { idReceiver: contact.idReceiver }]
            }
          ]
        }
      })

      if (message !== null) {
        lastMessageWithContacts.push(new Message(message))
      }
    }

    lastMessageWithContacts = lastMessageWithContacts.sort((a, b) => {
      if (a !== null && b !== null) {
        return b.createdAt.getTime() - a.createdAt.getTime()
      }

      return 0
    })

    return lastMessageWithContacts
  }

  public async findChat ({
    idUser,
    idTarget
  }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  }): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: {
        AND: [
          {
            OR: [{ idSender: idUser }, { idReceiver: idUser }]
          },
          {
            OR: [{ idSender: idTarget }, { idReceiver: idTarget }]
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return messages.map(message => new Message(message))
  }

  public async update (data: Message): Promise<Message | null> {
    const updatedMessage = await this.prisma.message.update({
      where: {
        id: data.id
      },
      data: data.toJSON()
    })

    return updatedMessage !== null ? new Message(updatedMessage) : null
  }

  public async delete (data: Message): Promise<void> {
    await this.prisma.message.update({
      where: {
        id: data.id
      },
      data: {
        deleted: true
      }
    })
  }
}

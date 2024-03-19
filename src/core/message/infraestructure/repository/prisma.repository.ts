import { prisma } from '@/libs/prisma'
import { type MessageEntity } from '../../domain/message.entity'
import { type MessageRepository } from '../../domain/message.repository'
import { Message } from '../../domain/message.value'

export class PrismaRepository implements MessageRepository {
  public async createMessage ({
    from,
    to,
    message
  }: {
    from: MessageEntity['from']
    to: MessageEntity['to']
    message: MessageEntity['message']
  }): Promise<Message> {
    const createdMessage = await prisma.message.create({
      data: {
        from: from.value,
        to: to.value,
        message: message.value
      }
    })

    return new Message(createdMessage)
  }

  public async findMessage ({
    id
  }: {
    id?: MessageEntity['id']
  }): Promise<Message | null> {
    const message = await prisma.message.findFirst({
      where: {
        id: id?.value
      }
    })

    return message === null ? null : new Message(message)
  }

  public async updateMessage (
    { id, message }: { id: MessageEntity['id'], message: MessageEntity['message'] }
  ): Promise<Message> {
    const updatedMessage = await prisma.message.update({
      where: {
        id: id.value
      },
      data: {
        updatedAt: new Date(),
        message: message.value
      }
    })

    return new Message(updatedMessage)
  }

  public async getAllConversations (
    idAccount?: MessageEntity['to']
  ): Promise<Message[] | null> {
    const messages = await prisma.message.findMany({
      where: {
        to: idAccount?.value
      }
    })

    return messages.map((message) => new Message(message))
  }

  public async getConversationWith (
    idAccount?: MessageEntity['from']
  ): Promise<Message[] | null> {
    const messages = await prisma.message.findMany({
      where: {
        from: idAccount?.value
      }
    })

    return messages.map((message) => new Message(message))
  }

  public async deleteMessage (
    id: MessageEntity['id']
  ): Promise<void> {
    await prisma.message.update({
      where: {
        id: id.value
      },
      data: {
        updatedAt: new Date(),
        deleted: true
      }
    })
  }
}

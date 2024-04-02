import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/core/shared/prisma.repository'
import { Injectable } from '@nestjs/common'
import { type CreateMessageDTO } from '../domain/dto/create-transaction'
import { type UpdateMessageDTO } from '../domain/dto/update-transaction'
import { Message } from '../domain/messages.entity'
import { type MessagePrimitive } from '../domain/messages.primitive'
import { type MessageRepository } from '../domain/messages.repository'

@Injectable()
export class MessageRepositoryPrismaMySQL implements MessageRepository {
  constructor (private readonly prisma: PrismaService) {}
  public async create (data: CreateMessageDTO): Promise<Message> {
    const newMessage = await this.prisma.message.create({
      data
    })

    return new Message(newMessage)
  }

  public async getAll (id: AccountPrimitive['id']): Promise<Message[] | null> {
    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          { from: id },
          { to: id }
        ]
      }
    })

    return messages.map(message => new Message(message))
  }

  public async find (id: MessagePrimitive['id']): Promise<Message | null> {
    const message = await this.prisma.message.findUnique({
      where: {
        id
      }
    })

    return message !== null ? new Message(message) : null
  }

  public async update (id: MessagePrimitive['id'], data: UpdateMessageDTO): Promise<Message | null> {
    const updatedMessage = await this.prisma.message.update({
      where: {
        id
      },
      data: {
        read: data.read
      }
    })

    return updatedMessage !== null ? new Message(updatedMessage) : null
  }

  public async delete (id: MessagePrimitive['id']): Promise<void> {
    await this.prisma.transaction.delete({
      where: {
        id
      }
    })
  }
}

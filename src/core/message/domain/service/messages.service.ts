import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { Inject, Injectable } from '@nestjs/common'
import { type CreateMessageDTO } from '../dto/create-transaction'
import { type UpdateMessageDTO } from '../dto/update-transaction'
import { type Message } from '../messages.entity'
import { type MessagePrimitive } from '../messages.primitive'
import { MessageRepository } from '../messages.repository'

@Injectable()
export class MessageService {
  constructor (@Inject('MessageRepository') private readonly transactionRepository: MessageRepository) {}

  public async create (data: CreateMessageDTO): Promise<Message> {
    return await this.transactionRepository.create(data)
  }

  public async getAll (id: AccountPrimitive['id']): Promise<Message[] | null> {
    return await this.transactionRepository.getAll(id)
  }

  public async find (id: MessagePrimitive['id']): Promise<Message | null> {
    return await this.transactionRepository.find(id)
  }

  public async update (id: MessagePrimitive['id'], data: UpdateMessageDTO): Promise<Message | null> {
    return await this.transactionRepository.update(id, data)
  }

  public async delete (id: MessagePrimitive['id']): Promise<void> {
    await this.transactionRepository.delete(id)
  }
}

import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type CreateMessageDTO } from './dto/create-transaction'
import { type UpdateMessageDTO } from './dto/update-transaction'
import { type Message } from './messages.entity'
import { type MessagePrimitive } from './messages.primitive'

export interface MessageRepository {
  create: (data: CreateMessageDTO) => Promise<Message>
  findAll: (id: AccountPrimitive['id']) => Promise<Message[] | null>
  findOne: (id: MessagePrimitive['id']) => Promise<Message | null>
  update: (id: MessagePrimitive['id'], message: UpdateMessageDTO) => Promise<Message | null>
  delete: (id: MessagePrimitive['id']) => Promise<void>
}

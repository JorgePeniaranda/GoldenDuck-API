import { type Message } from '@prisma/client'

export interface MessagePrimitive {
  readonly id: Message['id']
  readonly idSender: Message['idSender']
  readonly idReceiver: Message['idReceiver']
  message: Message['message']
  read: Message['read']
  updatedAt: Message['updatedAt']
  readonly createdAt: Message['createdAt']
  deleted: Message['deleted']
}

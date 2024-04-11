import { type Message } from '@prisma/client'

export interface MessagePrimitive {
  id: Message['id']
  idSender: Message['idSender']
  idReceiver: Message['idReceiver']
  message: Message['message']
  read: Message['read']
  updatedAt: Message['updatedAt']
  createdAt: Message['createdAt']
  deleted: Message['deleted']
}

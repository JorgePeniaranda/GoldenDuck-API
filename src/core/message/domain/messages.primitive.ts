import { type Message } from '@prisma/client'

export interface MessagePrimitive {
  id: Message['id']
  from: Message['from']
  to: Message['to']
  message: Message['message']
  read: Message['read']
  updatedAt: Message['updatedAt']
  createdAt: Message['createdAt']
  deleted: Message['deleted']
}

import { type Message } from './messages.entity'
import { type MessagePrimitive } from './messages.primitive'

export interface MessageRepository {
  create: (data: Message) => Promise<Message>
  findAll: ({ idUser }: { idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver'] }) => Promise<Message[]>
  findByID: ({ id }: { id: MessagePrimitive['id'] }) => Promise<Message | null>
  findOne: ({ idUser, idTarget, index }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    index: number
  }) => Promise<Message | null>
  findChat: ({ idUser, idTarget }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  }) => Promise<Message[]>
  findHistory: ({ idUser }: { idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver'] }) => Promise<Message[]>
  update: (data: Message) => Promise<Message | null>
  delete: (data: Message) => Promise<void>
}

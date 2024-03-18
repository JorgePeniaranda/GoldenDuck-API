import { type MessageEntity } from './message.entity'
import { type Message } from './message.value'

export interface MessageRepository {
  createMessage: (message: Message) => Promise<Message>
  updateMessage: (message: Message) => Promise<Message>
  deleteMessage: (id: MessageEntity['id']) => Promise<void>
  findMessage: ({ id }: { id?: MessageEntity['id'] }) => Promise<Message | null>
}

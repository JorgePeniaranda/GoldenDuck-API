import { type MessageEntity } from './message.entity'
import { type Message } from './message.value'

export interface MessageRepository {
  createMessage: ({
    from,
    to,
    message
  }: {
    from: MessageEntity['from']
    to: MessageEntity['to']
    message: MessageEntity['message']
  }) => Promise<Message>
  findMessage: ({ id }: { id?: MessageEntity['id'] }) => Promise<Message | null>
  getAllConversations: (
    idAccount?: MessageEntity['to'],
  ) => Promise<Message[] | null>
  getConversationWith: (
    idAccount?: MessageEntity['from'],
  ) => Promise<Message[] | null>
  updateMessage: ({
    id,
    message
  }: {
    id: MessageEntity['id']
    message: MessageEntity['message']
  }) => Promise<Message>
  deleteMessage: (id: MessageEntity['id']) => Promise<void>
}

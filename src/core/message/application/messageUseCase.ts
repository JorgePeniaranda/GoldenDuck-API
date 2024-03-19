import { RequestError } from '@/helpers/customErrors'
import { ErrorsDictionary } from '@/messages/errors'
import { type MessageRepository } from '../domain/message.repository'
import { type MessageEntity } from '../domain/message.entity'
import { type Message } from '../domain/message.value'

export class MessageUseCase {
  constructor (private readonly messageRepository: MessageRepository) {}

  public async createMessage ({
    from,
    to,
    message
  }: {
    from: MessageEntity['from']
    to: MessageEntity['to']
    message: MessageEntity['message']
  }): Promise<Message> {
    const createdMessage = await this.messageRepository.createMessage({
      from,
      to,
      message
    })

    return createdMessage
  }

  public async findMessage (searchParams: {
    id?: MessageEntity['id']
  }): Promise<Message | null> {
    if (searchParams.id === undefined) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const message = await this.messageRepository.findMessage(searchParams)

    return message
  }

  public async getAllConversations (
    idAccount?: MessageEntity['from']
  ): Promise<Message[] | null> {
    const messages = await this.messageRepository.getAllConversations(idAccount)

    return messages
  }

  public async getConversationWith (
    idAccount?: MessageEntity['to']
  ): Promise<Message[] | null> {
    const messages = await this.messageRepository.getConversationWith(idAccount)

    return messages
  }

  public async deleteMessage (id: MessageEntity['id']): Promise<void> {
    await this.messageRepository.deleteMessage(id)
  }
}

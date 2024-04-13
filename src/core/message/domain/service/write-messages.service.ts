import { MessageErrorsMessages } from '@/messages/error/message'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { NotFoundError } from 'rxjs'
import { type CreateMessageDTO } from '../dto/create-message'
import { type UpdateMessageDTO } from '../dto/update-message'
import { Message } from '../messages.entity'
import { type MessagePrimitive } from '../messages.primitive'
import { MessageRepository } from '../messages.repository'

/*
 *  TO-DO:
 *   - Implement socket.io to send messages in real time
 */

@Injectable()
export class WriteMessageService {
  constructor (
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepository
  ) {}

  public async create ({
    idSender,
    idTarget,
    data
  }: {
    idSender: MessagePrimitive['idSender']
    idTarget: MessagePrimitive['idReceiver']
    data: CreateMessageDTO
  }): Promise<Message> {
    const message = Message.create({
      idSender,
      idReceiver: idTarget,
      message: data.message
    })

    return await this.messageRepository.create(message)

    // TO-DO: send notification to account
  }

  public async update ({
    idUser,
    idTarget,
    index,
    data
  }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    index: number
    data: UpdateMessageDTO
  }): Promise<Message | null> {
    const message = await this.messageRepository.findOne({
      idUser,
      idTarget,
      index
    })

    if (message === null) {
      throw new NotFoundException(MessageErrorsMessages.NotFound)
    }

    message.message = data.message

    return await this.messageRepository.update(message)
  }

  public async read ({
    idUser,
    idTarget,
    index
  }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    index: number
  }): Promise<void> {
    const message = await this.messageRepository.findOne({
      idUser,
      idTarget,
      index
    })

    if (message === null) {
      throw new NotFoundException(MessageErrorsMessages.NotFound)
    }

    message.read = true

    await this.messageRepository.update(message)
  }

  public async delete ({
    idUser,
    idTarget,
    index
  }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    index: number
  }): Promise<void> {
    const message = await this.messageRepository.findOne({ idUser, idTarget, index })

    if (message === null) {
      throw new NotFoundError(MessageErrorsMessages.NotFound)
    }

    await this.messageRepository.delete(message)
  }
}

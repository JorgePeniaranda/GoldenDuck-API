import { EntitiesName } from '@/constants/entities'
import { EventsMap } from '@/constants/events'
import { Messages } from '@/messages'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { NotFoundError } from 'rxjs'
import { type CreateMessageDTO } from '../dto/create-message'
import { type UpdateMessageDTO } from '../dto/update-message'
import { Message } from '../message.entity'
import { type MessagePrimitive } from '../message.primitive'
import { MessageRepository } from '../message.repository'

/*
 *  TO-DO:
 *   - Implement socket.io to send messages in real time
 */

@Injectable()
export class WriteMessageService {
  constructor (
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  /* ---------- create ---------- */ // MARK: create
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

    this.eventEmitter.emit(EventsMap.MESSAGE_CREATED, message.toJSON())

    return await this.messageRepository.create(message)
  }

  /* ---------- update ---------- */ // MARK: update
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.MESSAGE))
    }

    message.message = data.message

    return await this.messageRepository.update(message)
  }

  /* ---------- read ---------- */ // MARK: read
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
      throw new NotFoundException(Messages.error.NotFound(EntitiesName.MESSAGE))
    }

    message.markAsRead()

    await this.messageRepository.update(message)
  }

  /* ---------- delete ---------- */ // MARK: delete
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
      throw new NotFoundError(Messages.error.NotFound(EntitiesName.MESSAGE))
    }

    await this.messageRepository.delete(message)
  }
}

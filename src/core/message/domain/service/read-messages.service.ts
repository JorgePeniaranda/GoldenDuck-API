import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { ReadUserService } from '@/core/user/domain/service/read-user.service'
import { UserErrorsMessages } from '@/messages/error/user'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { type Message } from '../message.entity'
import { type MessagePrimitive } from '../message.primitive'
import { MessageRepository } from '../message.repository'

/*
 *  TO-DO:
 *   - Implement socket.io to send messages in real time
 */

@Injectable()
export class ReadMessageService {
  constructor (
    @Inject('MessageRepository')
    private readonly messageRepository: MessageRepository,
    private readonly readUserService: ReadUserService
  ) {}

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({ idUser }: { idUser: AccountPrimitive['idUser'] }): Promise<Message[]> {
    return await this.messageRepository.findAll({ idUser })
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID ({ id }: { id: MessagePrimitive['id'] }): Promise<Message | null> {
    return await this.messageRepository.findByID({
      id
    })
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idUser,
    idTarget,
    index
  }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    index: number
  }): Promise<Message | null> {
    const user = await this.readUserService.findByID({ id: idUser })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    const target = await this.readUserService.findByID({ id: idTarget })

    if (target === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return await this.messageRepository.findOne({
      idUser: user.id,
      idTarget: target.id,
      index
    })
  }

  /* ---------- findHistory ---------- */ // MARK: findHistory
  public async findHistory ({
    idUser
  }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  }): Promise<Message[]> {
    return await this.messageRepository.findHistory({
      idUser
    })
  }

  /* ---------- findChat ---------- */ // MARK: findChat
  public async findChat ({
    idUser,
    idTarget
  }: {
    idUser: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
    idTarget: MessagePrimitive['idSender'] | MessagePrimitive['idReceiver']
  }): Promise<Message[]> {
    const user = await this.readUserService.findByID({ id: idUser })

    if (user === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    const target = await this.readUserService.findByID({ id: idTarget })

    if (target === null) {
      throw new NotFoundException(UserErrorsMessages.NotFound)
    }

    return await this.messageRepository.findChat({
      idUser: user.id,
      idTarget: target.id
    })
  }
}

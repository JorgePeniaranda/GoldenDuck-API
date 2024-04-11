import { EventsMap } from '@/constants/events'
import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type TransactionPrimitive } from '@/core/transaction/domain/transaction.primitive'
import { NotificationErrorsMessages } from '@/messages/error/notification'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Notification } from '../notification.entity'
import { type NotificationPrimitive } from '../notification.primitive'
import { NotificationRepository } from '../notification.repository'

@Injectable()
export class NotificationService {
  constructor (
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository
  ) {}

  @OnEvent(EventsMap.CREATE_NOTIFICATION)
  public async create (idAccount: NotificationPrimitive['idUser'], message: NotificationPrimitive['message']): Promise<Notification> {
    const notification = Notification.create(idAccount, message)

    console.log('NUEVA NOTIFICACION PARA ' + idAccount) // TEST: remove this line

    return await this.notificationRepository.create(notification)

    // TO-DO: send notification to account device
  }

  public async findAll (id: AccountPrimitive['id']): Promise<Notification[] | null> {
    return await this.notificationRepository.findAll(id)
  }

  public async findOne (id: TransactionPrimitive['id']): Promise<Notification | null> {
    return await this.notificationRepository.findOne(id)
  }

  public async delete (id: TransactionPrimitive['id']): Promise<void> {
    const notification = await this.notificationRepository.findOne(id)

    if (notification === null) {
      throw new NotFoundException(NotificationErrorsMessages.NotFound)
    }

    await this.notificationRepository.delete(notification)

    // TO-DO: remove notification from account device
  }
}

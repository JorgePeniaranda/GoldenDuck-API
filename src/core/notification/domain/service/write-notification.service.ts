import { EventsMap } from '@/constants/events'
import { NotificationErrorsMessages } from '@/messages/error/notification'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Notification } from '../notification.entity'
import { type NotificationPrimitive } from '../notification.primitive'
import { NotificationRepository } from '../notification.repository'

@Injectable()
export class WriteNotificationService {
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

  public async delete (idUser: NotificationPrimitive['idUser'], index: number): Promise<void> {
    const notification = await this.notificationRepository.findOne(idUser, index)

    if (notification === null) {
      throw new NotFoundException(NotificationErrorsMessages.NotFound)
    }

    await this.notificationRepository.delete(notification)

    // TO-DO: remove notification from account device
  }
}

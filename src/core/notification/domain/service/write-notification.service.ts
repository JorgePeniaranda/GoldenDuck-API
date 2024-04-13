import { EventsMap } from '@/constants/events'
import { NotificationErrorsMessages } from '@/messages/error/notification'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { Notification } from '../notification.entity'
import { type NotificationPrimitive } from '../notification.primitive'
import { NotificationRepository } from '../notification.repository'

@Injectable()
export class WriteNotificationService {
  constructor (
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository, private readonly eventEmitter: EventEmitter2
  ) {}

  @OnEvent(EventsMap.CREATE_NOTIFICATION)
  public async create ({
    idUser,
    message
  }: {
    idUser: NotificationPrimitive['idUser']
    message: NotificationPrimitive['message']
  }): Promise<Notification> {
    const notification = Notification.create({ idUser, message })

    this.eventEmitter.emit(EventsMap.NOTIFICATION_CREATED, notification.toJSON())

    return await this.notificationRepository.create(notification)
  }

  public async delete ({
    idUser,
    index
  }: {
    idUser: NotificationPrimitive['idUser']
    index: number
  }): Promise<void> {
    const notification = await this.notificationRepository.findOne({ idUser, index })

    if (notification === null) {
      throw new NotFoundException(NotificationErrorsMessages.NotFound)
    }

    await this.notificationRepository.delete(notification)

    this.eventEmitter.emit(EventsMap.NOTIFICATION_READED, notification.toJSON())
  }
}

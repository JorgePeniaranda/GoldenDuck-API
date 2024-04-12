import { Inject, Injectable } from '@nestjs/common'
import { type Notification } from '../notification.entity'
import { type NotificationPrimitive } from '../notification.primitive'
import { NotificationRepository } from '../notification.repository'

@Injectable()
export class ReadNotificationService {
  constructor (
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository
  ) {}

  public async findAll ({
    idUser
  }: {
    idUser: NotificationPrimitive['idUser']
  }): Promise<Notification[]> {
    return await this.notificationRepository.findAll({ idUser })
  }

  public async findOne ({
    idUser,
    index
  }: {
    idUser: NotificationPrimitive['idUser']
    index: number
  }): Promise<Notification | null> {
    return await this.notificationRepository.findOne({ idUser, index })
  }

  public async findByID ({ id }: { id: NotificationPrimitive['id'] }): Promise<Notification | null> {
    return await this.notificationRepository.findByID({ id })
  }
}

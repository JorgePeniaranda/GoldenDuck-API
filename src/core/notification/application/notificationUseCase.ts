import { RequestError } from '@/helpers/customErrors'
import { ErrorsDictionary } from '@/messages/errors'
import { type NotificationEntity } from '../domain/notification.entity'
import { type NotificationRepository } from '../domain/notification.repository'
import { type Notification } from '../domain/notification.value'

export class NotificationUseCase {
  constructor (private readonly messageRepository: NotificationRepository) {}

  public async createNotification ({
    idAccount,
    message
  }: {
    idAccount: NotificationEntity['idAccount']
    message: NotificationEntity['message']
  }): Promise<Notification> {
    const createdNotification = await this.messageRepository.createNotification({
      idAccount,
      message
    })

    return createdNotification
  }

  public async getAllNotification (idAccount: NotificationEntity['idAccount']): Promise<Notification[] | null> {
    const allNotifications = await this.messageRepository.getAllNotification(idAccount)

    return allNotifications
  }

  public async findNotification (searchParams: {
    id?: NotificationEntity['id']
  }): Promise<Notification | null> {
    if (searchParams.id === undefined) {
      throw new RequestError(ErrorsDictionary.NoParams)
    }

    const message =
      await this.messageRepository.findNotification(searchParams)

    return message
  }

  public async readNotification (id: NotificationEntity['id']): Promise<void> {
    await this.messageRepository.readNotification(id)
  }
}

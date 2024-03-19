import { prisma } from '@/libs/prisma'
import { type NotificationRepository } from '../../domain/notification.repository'
import { type NotificationEntity } from '../../domain/notification.entity'
import { Notification } from '../../domain/notification.value'

export class PrismaRepository implements NotificationRepository {
  public async createNotification ({
    idAccount,
    message
  }: {
    idAccount: NotificationEntity['idAccount']
    message: NotificationEntity['message']
  }): Promise<Notification> {
    const createdNotification = await prisma.notification.create({
      data: {
        idAccount: idAccount.value,
        message: message.value
      }
    })

    return new Notification(createdNotification)
  }

  public async getAllNotification (
    idAccount: NotificationEntity['idAccount']
  ): Promise<Notification[] | null> {
    const notifications = await prisma.notification.findMany({
      where: {
        idAccount: idAccount.value
      }
    })

    return notifications.map((notification) => new Notification(notification))
  }

  public async findNotification ({
    id
  }: {
    id?: NotificationEntity['id']
  }): Promise<Notification | null> {
    const notification = await prisma.notification.findFirst({
      where: {
        id: id?.value
      }
    })

    return notification === null ? null : new Notification(notification)
  }

  public async readNotification (id: NotificationEntity['id']): Promise<void> {
    await prisma.notification.update({
      where: {
        id: id.value
      },
      data: {
        updatedAt: new Date(),
        read: true
      }
    })
  }
}

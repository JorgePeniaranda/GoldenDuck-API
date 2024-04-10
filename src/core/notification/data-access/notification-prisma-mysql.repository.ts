import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { type CreateNotificationDTO } from '../domain/dto/create-notification'
import { Notification } from '../domain/notification.entity'
import { type NotificationPrimitive } from '../domain/notification.primitive'
import { type NotificationRepository } from '../domain/notification.repository'

@Injectable()
export class NotificationRepositoryPrismaMySQL
implements NotificationRepository {
  constructor (private readonly prisma: PrismaService) {}

  public async create (data: CreateNotificationDTO): Promise<Notification> {
    const newNotification = await this.prisma.notification.create({
      data
    })

    return new Notification(newNotification)
  }

  public async findAll (
    idAccount: AccountPrimitive['id']
  ): Promise<Notification[] | null> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        idAccount
      }
    })

    return notifications.map(notification => new Notification(notification))
  }

  public async findOne (
    id: NotificationPrimitive['id']
  ): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id
      }
    })

    return notification !== null ? new Notification(notification) : null
  }

  public async delete (id: NotificationPrimitive['id']): Promise<void> {
    await this.prisma.transaction.delete({
      where: {
        id
      }
    })
  }
}

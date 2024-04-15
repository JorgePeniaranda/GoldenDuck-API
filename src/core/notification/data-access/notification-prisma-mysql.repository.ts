import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import { Notification } from '../domain/notification.entity'
import { type NotificationPrimitive } from '../domain/notification.primitive'
import { type NotificationRepository } from '../domain/notification.repository'

@Injectable()
export class NotificationRepositoryPrismaMySQL implements NotificationRepository {
  constructor (private readonly prisma: PrismaService) {}

  /* ---------- create ---------- */ // MARK: create
  public async create (data: Notification): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        ...data.toJSON(),
        id: undefined
      }
    })

    return new Notification(notification)
  }

  /* ---------- findAll ---------- */ // MARK: findAll
  public async findAll ({
    idUser
  }: {
    idUser: AccountPrimitive['idUser']
  }): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        idUser,
        read: false
      }
    })

    return notifications.map(notification => new Notification(notification))
  }

  /* ---------- findOne ---------- */ // MARK: findOne
  public async findOne ({
    idUser,
    index
  }: {
    idUser: AccountPrimitive['idUser']
    index: number
  }): Promise<Notification | null> {
    const notification = await this.prisma.notification.findMany({
      where: {
        idUser,
        read: false
      },
      skip: index,
      take: 1
    })

    return notification[0] !== undefined ? new Notification(notification[0]) : null
  }

  /* ---------- findByID ---------- */ // MARK: findByID
  public async findByID ({ id }: { id: NotificationPrimitive['id'] }): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
        read: false
      }
    })

    return notification !== null ? new Notification(notification) : null
  }

  /* ---------- delete ---------- */ // MARK: delete
  public async delete (data: Notification): Promise<void> {
    await this.prisma.notification.update({
      where: {
        ...data.toJSON(),
        read: false
      },
      data: {
        read: true
      }
    })
  }
}

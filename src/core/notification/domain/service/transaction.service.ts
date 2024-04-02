import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type TransactionPrimitive } from '@/core/transaction/domain/transaction.primitive'
import { Inject, Injectable } from '@nestjs/common'
import { type CreateNotificationDTO } from '../dto/create-notification'
import { type Notification } from '../notification.entity'
import { NotificationRepository } from '../notification.repository'

@Injectable()
export class NotificationService {
  constructor (@Inject('NotificationRepository') private readonly notificationRepository: NotificationRepository) {}

  public async create (data: CreateNotificationDTO): Promise<Notification> {
    return await this.notificationRepository.create(data)
  }

  public async getAll (id: AccountPrimitive['id']): Promise<Notification[] | null> {
    return await this.notificationRepository.getAll(id)
  }

  public async find (id: TransactionPrimitive['id']): Promise<Notification | null> {
    return await this.notificationRepository.find(id)
  }

  public async delete (id: TransactionPrimitive['id']): Promise<void> {
    await this.notificationRepository.delete(id)
  }
}

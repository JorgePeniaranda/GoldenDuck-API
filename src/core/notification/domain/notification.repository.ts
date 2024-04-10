import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type CreateNotificationDTO } from './dto/create-notification'
import { type Notification } from './notification.entity'
import { type NotificationPrimitive } from './notification.primitive'

export interface NotificationRepository {
  create: (data: CreateNotificationDTO) => Promise<Notification>
  findAll: (id: AccountPrimitive['id']) => Promise<Notification[] | null>
  findOne: (id: NotificationPrimitive['id']) => Promise<Notification | null>
  delete: (id: NotificationPrimitive['id']) => Promise<void>
}

import { type AccountPrimitive } from '@/core/account/domain/account.primitive'
import { type Notification } from './notification.entity'
import { type NotificationPrimitive } from './notification.primitive'

export interface NotificationRepository {
  create: (idAccount: Notification) => Promise<Notification>
  findAll: (id: AccountPrimitive['id']) => Promise<Notification[] | null>
  findOne: (id: NotificationPrimitive['id']) => Promise<Notification | null>
  delete: (id: Notification) => Promise<void>
}

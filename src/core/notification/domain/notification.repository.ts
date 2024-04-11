import { type Notification } from './notification.entity'
import { type NotificationPrimitive } from './notification.primitive'

export interface NotificationRepository {
  create: (idAccount: Notification) => Promise<Notification>
  findAll: (id: NotificationPrimitive['idUser']) => Promise<Notification[]>
  findOne: (idUser: NotificationPrimitive['idUser'], index: number) => Promise<Notification | null>
  findByID: (id: NotificationPrimitive['id']) => Promise<Notification | null>
  delete: (id: Notification) => Promise<void>
}

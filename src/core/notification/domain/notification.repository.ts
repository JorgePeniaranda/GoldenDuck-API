import { type Notification } from './notification.entity'
import { type NotificationPrimitive } from './notification.primitive'

export interface NotificationRepository {
  create: (data: Notification) => Promise<Notification>
  findAll: ({ idUser }: { idUser: NotificationPrimitive['idUser'] }) => Promise<Notification[]>
  findOne: ({ idUser, index }: { idUser: NotificationPrimitive['idUser'], index: number }) => Promise<Notification | null>
  findByID: ({ id }: { id: NotificationPrimitive['id'] }) => Promise<Notification | null>
  delete: (data: Notification) => Promise<void>
}

import { type NotificationEntity } from './notification.entity'
import { type Notification } from './notification.value'

export interface NotificationRepository {
  createNotification: ({
    idAccount,
    message
  }: {
    idAccount: NotificationEntity['idAccount']
    message: NotificationEntity['message']
  }) => Promise<Notification>
  getAllNotification: (
    idAccount: NotificationEntity['idAccount'],
  ) => Promise<Notification[] | null>
  findNotification: ({
    id
  }: {
    id?: NotificationEntity['id']
  }) => Promise<Notification | null>
  readNotification: (id: NotificationEntity['id']) => Promise<void>
}

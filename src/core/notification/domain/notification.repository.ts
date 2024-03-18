import { type NotificationEntity } from './notification.entity'

export interface NotificationRepository {
  createNotification: (notification: Notification) => Promise<Notification>
  getAllNotification: () => Promise<Notification[]>
  readNotification: (id: NotificationEntity['id']) => Promise<Notification>
  findNotification: ({
    id
  }: {
    id?: NotificationEntity['id']
  }) => Promise<Notification | null>
}

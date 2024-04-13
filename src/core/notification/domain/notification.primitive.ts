import { type Notification } from '@prisma/client'

export interface NotificationPrimitive {
  readonly id: Notification['id']
  readonly idUser: Notification['idUser']
  readonly message: Notification['message']
  read: Notification['read']
  updatedAt: Notification['updatedAt']
  readonly createdAt: Notification['createdAt']
}

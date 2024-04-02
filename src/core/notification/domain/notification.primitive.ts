import { type Notification } from '@prisma/client'

export interface NotificationPrimitive {
  id: Notification['id']
  idAccount: Notification['idAccount']
  message: Notification['message']
  read: Notification['read']
  updatedAt: Notification['updatedAt']
  createdAt: Notification['createdAt']
}

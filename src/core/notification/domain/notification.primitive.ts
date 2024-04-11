import { type Notification } from '@prisma/client'

export interface NotificationPrimitive {
  id: Notification['id']
  idUser: Notification['idUser']
  message: Notification['message']
  read: Notification['read']
  updatedAt: Notification['updatedAt']
  createdAt: Notification['createdAt']
}

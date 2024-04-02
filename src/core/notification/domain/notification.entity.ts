import { type NotificationPrimitive } from './notification.primitive'

export class Notification implements NotificationPrimitive {
  public id: NotificationPrimitive['id']
  public idAccount: NotificationPrimitive['idAccount']
  public message: NotificationPrimitive['message']
  public read: NotificationPrimitive['read']
  public updatedAt: NotificationPrimitive['updatedAt']
  public createdAt: NotificationPrimitive['createdAt']

  constructor (notification: Notification) {
    this.id = notification.id
    this.idAccount = notification.idAccount
    this.message = notification.message
    this.read = notification.read
    this.updatedAt = notification.updatedAt
    this.createdAt = notification.createdAt
  }
}

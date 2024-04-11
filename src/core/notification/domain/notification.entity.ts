import { type NotificationPrimitive } from './notification.primitive'

export class Notification implements NotificationPrimitive {
  public id: NotificationPrimitive['id']
  public idAccount: NotificationPrimitive['idAccount']
  public message: NotificationPrimitive['message']
  public read: NotificationPrimitive['read']
  public updatedAt: NotificationPrimitive['updatedAt']
  public createdAt: NotificationPrimitive['createdAt']

  constructor (notification: NotificationPrimitive) {
    this.id = notification.id
    this.idAccount = notification.idAccount
    this.message = notification.message
    this.read = notification.read
    this.updatedAt = notification.updatedAt
    this.createdAt = notification.createdAt
  }

  public static create (idAccount: NotificationPrimitive['idAccount'], message: NotificationPrimitive['message']): Notification {
    return new Notification({
      id: 0,
      idAccount,
      message,
      read: false,
      updatedAt: new Date(),
      createdAt: new Date()
    })
  }

  public toJSON (): NotificationPrimitive {
    return {
      id: this.id,
      idAccount: this.idAccount,
      message: this.message,
      read: this.read,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt
    }
  }
}

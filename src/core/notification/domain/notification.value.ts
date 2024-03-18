import { type NotificationPrimitiveEntity, type NotificationEntity } from './notification.entity'

export class Notification implements NotificationEntity {
  id: NotificationEntity['id']
  idAccount: NotificationEntity['idAccount']
  message: NotificationEntity['message']
  read: NotificationEntity['read']
  date: NotificationEntity['date']

  constructor (notification: NotificationEntity) {
    this.id = notification.id
    this.idAccount = notification.idAccount
    this.message = notification.message
    this.read = notification.read
    this.date = notification.date
  }

  public toJSON (): NotificationPrimitiveEntity {
    return {
      id: this.id.value(),
      idAccount: this.idAccount.value(),
      message: this.message,
      read: this.read,
      date: this.date
    }
  }
}

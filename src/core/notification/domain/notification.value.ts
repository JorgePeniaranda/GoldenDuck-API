import { ID } from '@/valueObjects/id/id.value'
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

  public create (notification: NotificationPrimitiveEntity): Notification {
    return new Notification({
      id: new ID(notification.id),
      idAccount: new ID(notification.idAccount),
      message: notification.message,
      read: notification.read,
      date: notification.date
    })
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

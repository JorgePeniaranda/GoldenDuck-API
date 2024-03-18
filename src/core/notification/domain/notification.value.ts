import {
  type NotificationPrimitiveEntity,
  type NotificationEntity
} from './notification.entity'
import { ValidString } from '@/valueObjects/string/string/String.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ID } from '@/valueObjects/number/ID/ID.value'

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
      message: new ValidString(notification.message),
      read: new ValidBoolean(notification.read),
      date: new PastDate(notification.date)
    })
  }

  public toJSON (): NotificationPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      message: this.message.value,
      read: this.read.value,
      date: this.date.value
    }
  }
}

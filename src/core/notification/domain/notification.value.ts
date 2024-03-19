import {
  type NotificationPrimitiveEntity,
  type NotificationEntity
} from './notification.entity'
import { ValidString } from '@/valueObjects/string/string/String.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ID } from '@/valueObjects/number/ID/ID.value'

const ObjectName = 'Notification'

export class Notification implements NotificationEntity {
  id: NotificationEntity['id']
  idAccount: NotificationEntity['idAccount']
  message: NotificationEntity['message']
  read: NotificationEntity['read']
  createdAt: NotificationEntity['createdAt']

  constructor (notification: NotificationEntity) {
    this.id = notification.id
    this.idAccount = notification.idAccount
    this.message = notification.message
    this.read = notification.read
    this.createdAt = notification.createdAt
  }

  public create (notification: NotificationPrimitiveEntity): Notification {
    return new Notification({
      id: new ID(notification.id, `${ObjectName} -> ID`),
      idAccount: new ID(notification.idAccount, `${ObjectName} -> IDAccount`),
      message: new ValidString(notification.message, `${ObjectName} -> Message`),
      read: new ValidBoolean(notification.read, `${ObjectName} -> Read`),
      createdAt: new PastDate(notification.createdAt, `${ObjectName} -> Date`)
    })
  }

  public toJSON (): NotificationPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      message: this.message.value,
      read: this.read.value,
      createdAt: this.createdAt.value
    }
  }
}

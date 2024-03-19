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
  updatedAt: NotificationEntity['updatedAt']
  createdAt: NotificationEntity['createdAt']

  constructor (notification: NotificationPrimitiveEntity) {
    this.id = new ID(notification.id, `${ObjectName} -> ID`)
    this.idAccount = new ID(
      notification.idAccount,
      `${ObjectName} -> IDAccount`
    )
    this.message = new ValidString(
      notification.message,
      `${ObjectName} -> Message`
    )
    this.read = new ValidBoolean(notification.read, `${ObjectName} -> Read`)
    this.createdAt = new PastDate(
      notification.createdAt,
      `${ObjectName} -> CreatedAt`
    )
    this.updatedAt = new PastDate(
      notification.updatedAt,
      `${ObjectName} -> UpdatedAt`
    )
  }

  public toJSON (): NotificationPrimitiveEntity {
    return {
      id: this.id.value,
      idAccount: this.idAccount.value,
      message: this.message.value,
      read: this.read.value,
      updatedAt: this.updatedAt.value,
      createdAt: this.createdAt.value
    }
  }
}

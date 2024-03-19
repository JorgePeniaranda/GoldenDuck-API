import { ID } from '@/valueObjects/number/ID/ID.value'
import {
  type MessagePrimitiveEntity,
  type MessageEntity
} from './message.entity'
import { PastDate } from '@/valueObjects/date/PastDate/PastDate.value'
import { ValidString } from '@/valueObjects/string/string/String.value'
import { ValidBoolean } from '@/valueObjects/boolean/validBoolean/Boolean.value'

const ObjectName = 'Message'

export class Message implements MessageEntity {
  readonly id: MessageEntity['id']
  readonly from: MessageEntity['from']
  readonly to: MessageEntity['to']
  readonly message: MessageEntity['message']
  readonly read: MessageEntity['read']
  readonly createdAt: MessageEntity['createdAt']
  readonly deleted: MessageEntity['deleted']

  constructor (message: MessagePrimitiveEntity) {
    this.id = new ID(message.id, `${ObjectName} -> ID`)
    this.from = new ID(message.from, `${ObjectName} -> From`)
    this.to = new ID(message.to, `${ObjectName} -> To`)
    this.message = new ValidString(message.message, `${ObjectName} -> Message`)
    this.read = new ValidBoolean(message.read, `${ObjectName} -> Read`)
    this.createdAt = new PastDate(message.createdAt, `${ObjectName} -> CreatedAt`)
    this.deleted = new ValidBoolean(message.deleted, `${ObjectName} -> Deleted`)
  }

  public toJSON (): MessagePrimitiveEntity {
    return {
      id: this.id.value,
      from: this.from.value,
      to: this.to.value,
      message: this.message.value,
      read: this.read.value,
      createdAt: this.createdAt.value,
      deleted: this.deleted.value
    }
  }
}

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

  constructor (message: MessageEntity) {
    this.id = message.id
    this.from = message.from
    this.to = message.to
    this.message = message.message
    this.read = message.read
    this.createdAt = message.createdAt
    this.deleted = message.deleted
  }

  public create (message: MessagePrimitiveEntity): Message {
    return new Message({
      id: new ID(message.id, `${ObjectName} -> ID`),
      from: new ID(message.from, `${ObjectName} -> From`),
      to: new ID(message.to, `${ObjectName} -> To`),
      message: new ValidString(message.message, `${ObjectName} -> Message`),
      read: new ValidBoolean(message.read, `${ObjectName} -> Read`),
      createdAt: new PastDate(message.createdAt, `${ObjectName} -> Date`),
      deleted: new ValidBoolean(message.deleted, `${ObjectName} -> Deleted`)
    })
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

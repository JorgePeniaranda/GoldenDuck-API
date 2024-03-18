import { type MessagePrimitiveEntity, type MessageEntity } from './message.entity'

export class Message implements MessageEntity {
  readonly id: MessageEntity['id']
  readonly from: MessageEntity['from']
  readonly to: MessageEntity['to']
  readonly message: MessageEntity['message']
  readonly read: MessageEntity['read']
  readonly date: MessageEntity['date']
  readonly deleted: MessageEntity['deleted']

  constructor (message: MessageEntity) {
    this.id = message.id
    this.from = message.from
    this.to = message.to
    this.message = message.message
    this.read = message.read
    this.date = message.date
    this.deleted = message.deleted
  }

  public toJSON (): MessagePrimitiveEntity {
    return {
      id: this.id.value(),
      from: this.from.value(),
      to: this.to.value(),
      message: this.message,
      read: this.read,
      date: this.date.value(),
      deleted: this.deleted
    }
  }
}

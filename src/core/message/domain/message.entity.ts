import { type MessagePrimitive } from './message.primitive'

export class Message implements MessagePrimitive {
  readonly #id: MessagePrimitive['id']
  readonly #idSender: MessagePrimitive['idSender']
  readonly #idReceiver: MessagePrimitive['idReceiver']
  message: MessagePrimitive['message']
  read: MessagePrimitive['read']
  updatedAt: MessagePrimitive['updatedAt']
  readonly #createdAt: MessagePrimitive['createdAt']
  deleted: MessagePrimitive['deleted']

  constructor (props: MessagePrimitive) {
    this.#id = props.id
    this.#idSender = props.idSender
    this.#idReceiver = props.idReceiver
    this.message = props.message
    this.read = props.read
    this.updatedAt = props.updatedAt
    this.#createdAt = props.createdAt
    this.deleted = props.deleted
  }

  get id (): MessagePrimitive['id'] {
    return this.#id
  }

  get idSender (): MessagePrimitive['idSender'] {
    return this.#idSender
  }

  get idReceiver (): MessagePrimitive['idReceiver'] {
    return this.#idReceiver
  }

  get createdAt (): MessagePrimitive['createdAt'] {
    return this.#createdAt
  }

  public static create ({
    idSender,
    idReceiver,
    message
  }: {
    idSender: MessagePrimitive['idSender']
    idReceiver: MessagePrimitive['idReceiver']
    message: MessagePrimitive['message']
  }): Message {
    return new Message({
      id: 0,
      idSender,
      idReceiver,
      message,
      read: false,
      updatedAt: new Date(),
      createdAt: new Date(),
      deleted: false
    })
  }

  public toJSON (): MessagePrimitive {
    return {
      id: this.id,
      idSender: this.idSender,
      idReceiver: this.idReceiver,
      message: this.message,
      read: this.read,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      deleted: this.deleted
    }
  }
}

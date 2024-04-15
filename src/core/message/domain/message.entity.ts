import { Field, ID } from '@nestjs/graphql'
import { type MessagePrimitive } from './message.primitive'

export class Message implements MessagePrimitive {
  readonly #id: MessagePrimitive['id']
  readonly #idSender: MessagePrimitive['idSender']
  readonly #idReceiver: MessagePrimitive['idReceiver']
  #message: MessagePrimitive['message']
  #read: MessagePrimitive['read']
  #updatedAt: MessagePrimitive['updatedAt']
  readonly #createdAt: MessagePrimitive['createdAt']
  #deleted: MessagePrimitive['deleted']

  constructor (props: MessagePrimitive) {
    this.#id = props.id
    this.#idSender = props.idSender
    this.#idReceiver = props.idReceiver
    this.#message = props.message
    this.#read = props.read
    this.#updatedAt = props.updatedAt
    this.#createdAt = props.createdAt
    this.#deleted = props.deleted
  }

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  public get id (): MessagePrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  public get idSender (): MessagePrimitive['idSender'] {
    return this.#idSender
  }

  @Field(() => Number)
  public get idReceiver (): MessagePrimitive['idReceiver'] {
    return this.#idReceiver
  }

  @Field(() => String)
  public get message (): MessagePrimitive['message'] {
    return this.#message
  }

  public set message (value: MessagePrimitive['message']) {
    this.#message = value
    this.#updateUpdatedAt()
  }

  @Field(() => Boolean)
  public get read (): MessagePrimitive['read'] {
    return this.#read
  }

  @Field(() => Date)
  public get updatedAt (): MessagePrimitive['updatedAt'] {
    return this.#updatedAt
  }

  @Field(() => Date)
  public get createdAt (): MessagePrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  public get deleted (): MessagePrimitive['deleted'] {
    return this.#deleted
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public markAsRead (): void {
    this.#read = true
    this.#updateUpdatedAt()
  }

  public deleteMessage (): void {
    this.#deleted = true
    this.#updateUpdatedAt()
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

import { Field, ID } from '@nestjs/graphql'
import { type NotificationPrimitive } from './notification.primitive'

export class Notification implements NotificationPrimitive {
  readonly #id: NotificationPrimitive['id']
  readonly #idUser: NotificationPrimitive['idUser']
  readonly #message: NotificationPrimitive['message']
  @Field(() => Boolean)
  readonly read: NotificationPrimitive['read']

  @Field(() => Date)
  readonly updatedAt: NotificationPrimitive['updatedAt']

  readonly #createdAt: NotificationPrimitive['createdAt']

  constructor (notification: NotificationPrimitive) {
    this.#id = notification.id
    this.#idUser = notification.idUser
    this.#message = notification.message
    this.read = notification.read
    this.updatedAt = notification.updatedAt
    this.#createdAt = notification.createdAt
  }

  @Field(() => ID)
  get id (): NotificationPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  get idUser (): NotificationPrimitive['idUser'] {
    return this.#idUser
  }

  @Field(() => String)
  get message (): NotificationPrimitive['message'] {
    return this.#message
  }

  @Field(() => Date)
  get createdAt (): NotificationPrimitive['createdAt'] {
    return this.#createdAt
  }

  public static create ({
    idUser,
    message
  }: {
    idUser: NotificationPrimitive['idUser']
    message: NotificationPrimitive['message']
  }): Notification {
    return new Notification({
      id: 0,
      idUser,
      message,
      read: false,
      updatedAt: new Date(),
      createdAt: new Date()
    })
  }

  public toJSON (): NotificationPrimitive {
    return {
      id: this.id,
      idUser: this.idUser,
      message: this.message,
      read: this.read,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt
    }
  }
}

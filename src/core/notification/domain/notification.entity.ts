import { User } from '@/core/user/domain/user.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type NotificationPrimitive } from './notification.primitive'
import { Expose } from 'class-transformer'

@ObjectType()
export class Notification implements NotificationPrimitive {
  readonly #id: NotificationPrimitive['id']
  readonly #idUser: NotificationPrimitive['idUser']
  readonly #message: NotificationPrimitive['message']
  #read: NotificationPrimitive['read']
  #updatedAt: NotificationPrimitive['updatedAt']
  readonly #createdAt: NotificationPrimitive['createdAt']

  constructor (notification: NotificationPrimitive) {
    this.#id = notification.id
    this.#idUser = notification.idUser
    this.#message = notification.message
    this.#read = notification.read
    this.#updatedAt = notification.updatedAt
    this.#createdAt = notification.createdAt
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => User)
  readonly user: User

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): NotificationPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  @Expose()
  public get idUser (): NotificationPrimitive['idUser'] {
    return this.#idUser
  }

  @Field(() => String)
  @Expose()
  public get message (): NotificationPrimitive['message'] {
    return this.#message
  }

  @Field(() => Boolean)
  @Expose()
  public get read (): NotificationPrimitive['read'] {
    return this.#read
  }

  @Field(() => Date)
  @Expose()
  public get updatedAt (): NotificationPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  @Field(() => Date)
  @Expose()
  public get createdAt (): NotificationPrimitive['createdAt'] {
    return this.#createdAt
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public markAsRead (): void {
    this.#read = true
    this.#updateUpdatedAt()
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

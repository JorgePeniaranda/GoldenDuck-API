import { Field, ID } from '@nestjs/graphql'
import { type SessionPrimitive } from './session.primitive'

export class Session implements SessionPrimitive {
  readonly #id: SessionPrimitive['id']
  readonly #idUser: SessionPrimitive['idUser']
  readonly #ip: SessionPrimitive['ip']
  readonly #userAgent: SessionPrimitive['userAgent']
  readonly #location: SessionPrimitive['location']
  readonly #deviceType: SessionPrimitive['deviceType']
  readonly #token: SessionPrimitive['token']
  @Field(() => Boolean)
    active: SessionPrimitive['active']

  @Field(() => Date)
    logoutAt: SessionPrimitive['logoutAt']

  readonly #createdAt: SessionPrimitive['createdAt']

  constructor (transaction: SessionPrimitive) {
    this.#id = transaction.id
    this.#idUser = transaction.idUser
    this.#ip = transaction.ip
    this.#userAgent = transaction.userAgent
    this.#location = transaction.location
    this.#deviceType = transaction.deviceType
    this.#token = transaction.token
    this.active = transaction.active
    this.logoutAt = transaction.logoutAt
    this.#createdAt = transaction.createdAt
  }

  @Field(() => ID)
  get id (): SessionPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  get idUser (): SessionPrimitive['idUser'] {
    return this.#idUser
  }

  @Field(() => String)
  get ip (): SessionPrimitive['ip'] {
    return this.#ip
  }

  @Field(() => String)
  get userAgent (): SessionPrimitive['userAgent'] {
    return this.#userAgent
  }

  @Field(() => String)
  get location (): SessionPrimitive['location'] {
    return this.#location
  }

  @Field(() => String)
  get deviceType (): SessionPrimitive['deviceType'] {
    return this.#deviceType
  }

  @Field(() => String)
  get token (): SessionPrimitive['token'] {
    return this.#token
  }

  @Field(() => Date)
  get createdAt (): SessionPrimitive['createdAt'] {
    return this.#createdAt
  }

  public static create ({
    idUser,
    ip,
    userAgent,
    location,
    deviceType,
    token
  }: {
    idUser: SessionPrimitive['idUser']
    ip?: SessionPrimitive['ip']
    userAgent?: SessionPrimitive['userAgent']
    location?: SessionPrimitive['location']
    deviceType?: SessionPrimitive['deviceType']
    token: SessionPrimitive['token']
  }): Session {
    return new Session({
      id: 0,
      idUser,
      ip,
      userAgent,
      location,
      deviceType,
      token,
      active: true,
      logoutAt: null,
      createdAt: new Date()
    })
  }

  public toJSON (): SessionPrimitive {
    return {
      id: this.id,
      idUser: this.idUser,
      ip: this.ip,
      userAgent: this.userAgent,
      location: this.location,
      deviceType: this.deviceType,
      token: this.token,
      active: this.active,
      logoutAt: this.logoutAt,
      createdAt: this.createdAt
    }
  }
}

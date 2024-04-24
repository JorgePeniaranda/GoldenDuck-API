import { User } from '@/core/user/domain/user.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { type SessionPrimitive } from './session.primitive'
import { Expose } from 'class-transformer'

@ObjectType()
export class Session implements SessionPrimitive {
  readonly #id: SessionPrimitive['id']
  readonly #idUser: SessionPrimitive['idUser']
  readonly #ip: SessionPrimitive['ip']
  readonly #userAgent: SessionPrimitive['userAgent']
  readonly #location: SessionPrimitive['location']
  readonly #deviceType: SessionPrimitive['deviceType']
  readonly #token: SessionPrimitive['token']
  #active: SessionPrimitive['active']
  #logoutAt: SessionPrimitive['logoutAt']
  readonly #createdAt: SessionPrimitive['createdAt']

  constructor (transaction: SessionPrimitive) {
    this.#id = transaction.id
    this.#idUser = transaction.idUser
    this.#ip = transaction.ip
    this.#userAgent = transaction.userAgent
    this.#location = transaction.location
    this.#deviceType = transaction.deviceType
    this.#token = transaction.token
    this.#active = transaction.active
    this.#logoutAt = transaction.logoutAt
    this.#createdAt = transaction.createdAt
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => User)
  readonly user: User

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): SessionPrimitive['id'] {
    return this.#id
  }

  @Field(() => Number)
  @Expose()
  public get idUser (): SessionPrimitive['idUser'] {
    return this.#idUser
  }

  @Field(() => String, { nullable: true })
  @Expose()
  public get ip (): SessionPrimitive['ip'] {
    return this.#ip
  }

  @Field(() => String, { nullable: true })
  @Expose()
  public get userAgent (): SessionPrimitive['userAgent'] {
    return this.#userAgent
  }

  @Field(() => String, { nullable: true })
  @Expose()
  public get location (): SessionPrimitive['location'] {
    return this.#location
  }

  @Field(() => String, { nullable: true })
  @Expose()
  public get deviceType (): SessionPrimitive['deviceType'] {
    return this.#deviceType
  }

  @Field(() => String)
  @Expose()
  public get token (): SessionPrimitive['token'] {
    return this.#token
  }

  @Field(() => Boolean)
  @Expose()
  public get active (): SessionPrimitive['active'] {
    return this.#active
  }

  @Field(() => Date, { nullable: true })
  @Expose()
  public get logoutAt (): SessionPrimitive['logoutAt'] {
    return this.#logoutAt
  }

  @Field(() => Date)
  @Expose()
  public get createdAt (): SessionPrimitive['createdAt'] {
    return this.#createdAt
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  public logout (): void {
    this.#active = false
    this.#logoutAt = new Date()
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

import { Account } from '@/core/account/domain/account.entity'
import { Message } from '@/core/message/domain/message.entity'
import { Notification } from '@/core/notification/domain/notification.entity'
import { Session } from '@/core/session/domain/session.entity'
import { Password } from '@/value-objects/password'
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql'
import { UserRoles, type UserPrimitive } from './user.primitive'
import { Exclude, Expose } from 'class-transformer'

@ObjectType()
export class User implements UserPrimitive {
  readonly #id: UserPrimitive['id']
  #name: UserPrimitive['name']
  #lastName: UserPrimitive['lastName']
  readonly #dni: UserPrimitive['dni']
  #email: UserPrimitive['email']
  #phoneNumber: UserPrimitive['phoneNumber']
  readonly #password: Password
  #address: UserPrimitive['address']
  readonly #birthDate: UserPrimitive['birthDate']
  readonly #sex: UserPrimitive['sex']
  #imgUrl: UserPrimitive['imgUrl']
  #updatedAt: UserPrimitive['updatedAt']
  readonly #createdAt: UserPrimitive['createdAt']
  #actived: UserPrimitive['actived']
  #deleted: UserPrimitive['deleted']
  #role: UserPrimitive['role']

  constructor (user: UserPrimitive) {
    this.#id = user.id
    this.#name = user.name
    this.#lastName = user.lastName
    this.#dni = user.dni
    this.#email = user.email
    this.#phoneNumber = user.phoneNumber
    this.#password = new Password(user.password, user.salt)
    this.#address = user.address
    this.#birthDate = user.birthDate
    this.#sex = user.sex
    this.#imgUrl = user.imgUrl
    this.#updatedAt = user.updatedAt
    this.#createdAt = user.createdAt
    this.#actived = user.actived
    this.#deleted = user.deleted
    this.#role = user.role
  }

  /* -------------------- RELATIONS -------------------- */ // MARK: RELATIONS
  @Field(() => [Account])
  readonly accounts: Account

  @Field(() => [Session], { nullable: true })
  readonly sessions: Session[]

  @Field(() => [Notification], { nullable: true })
  readonly notifications: Notification[]

  @Field(() => [Message], { nullable: true })
  readonly messagesSend: Message[]

  @Field(() => [Message], { nullable: true })
  readonly messagesReceived: Message[]

  /* -------------------- GETTER / SETTER -------------------- */ // MARK: GETTER / SETTER
  @Field(() => ID)
  @Expose()
  public get id (): UserPrimitive['id'] {
    return this.#id
  }

  @Field(() => String)
  @Expose()
  public get name (): UserPrimitive['name'] {
    return this.#name
  }

  public set name (name: UserPrimitive['name']) {
    this.#name = name
    this.#updateUpdatedAt()
  }

  @Field(() => String)
  @Expose()
  public get lastName (): UserPrimitive['lastName'] {
    return this.#lastName
  }

  public set lastName (lastName: UserPrimitive['lastName']) {
    this.#lastName = lastName
    this.#updateUpdatedAt()
  }

  @Field(() => String)
  @Expose()
  public get dni (): UserPrimitive['dni'] {
    return this.#dni
  }

  @Field(() => String)
  @Expose()
  public get email (): UserPrimitive['email'] {
    return this.#email
  }

  public set email (email: UserPrimitive['email']) {
    this.#email = email
    this.#updateUpdatedAt()
  }

  @Field(() => Number)
  @Expose()
  public get phoneNumber (): UserPrimitive['phoneNumber'] {
    return this.#phoneNumber
  }

  public set phoneNumber (phoneNumber: UserPrimitive['phoneNumber']) {
    this.#phoneNumber = phoneNumber
    this.#updateUpdatedAt()
  }

  @HideField()
  @Exclude({ toPlainOnly: true })
  public get password (): UserPrimitive['password'] {
    return this.#password.value
  }

  public set password (password: string) {
    this.#password.value = password
    this.#updateUpdatedAt()
  }

  @HideField()
  @Exclude()
  public get salt (): UserPrimitive['salt'] {
    return this.#password.salt
  }

  @Field(() => String)
  @Expose()
  public get address (): UserPrimitive['address'] {
    return this.#address
  }

  public set address (address: UserPrimitive['address']) {
    this.#address = address
    this.#updateUpdatedAt()
  }

  @Field(() => Date)
  @Expose()
  public get birthDate (): UserPrimitive['birthDate'] {
    return this.#birthDate
  }

  @Field(() => String)
  @Expose()
  public get sex (): UserPrimitive['sex'] {
    return this.#sex
  }

  @Field(() => String, { nullable: true })
  @Expose()
  public get imgUrl (): UserPrimitive['imgUrl'] {
    return this.#imgUrl
  }

  public set imgUrl (imgUrl: UserPrimitive['imgUrl']) {
    this.#imgUrl = imgUrl
    this.#updateUpdatedAt()
  }

  @Field(() => Date)
  @Expose()
  public get updatedAt (): UserPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  @Field(() => Date)
  @Expose()
  public get createdAt (): UserPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  @Expose()
  public get actived (): UserPrimitive['actived'] {
    return this.#actived
  }

  @Field(() => Boolean)
  @Expose()
  public get deleted (): UserPrimitive['deleted'] {
    return this.#deleted
  }

  @Field(() => String)
  @Expose()
  public get role (): UserPrimitive['role'] {
    return this.#role
  }

  public set role (role: UserPrimitive['role']) {
    this.#role = role
    this.#updateUpdatedAt()
  }

  /* -------------------- METHODS -------------------- */ // MARK: METHODS
  #updateUpdatedAt (): void {
    this.#updatedAt = new Date()
  }

  public activate (): void {
    this.#actived = true
    this.#updateUpdatedAt()
  }

  public delete (): void {
    this.#deleted = true
    this.#updateUpdatedAt()
  }

  public comparePassword (password: string): boolean {
    return this.#password.compare(password)
  }

  public static create ({
    name,
    lastName,
    dni,
    email,
    phoneNumber,
    password: userPassword,
    address,
    birthDate,
    sex,
    imgUrl
  }: {
    name: UserPrimitive['name']
    lastName: UserPrimitive['lastName']
    dni: UserPrimitive['dni']
    email: UserPrimitive['email']
    password: UserPrimitive['password']
    phoneNumber: UserPrimitive['phoneNumber']
    address: UserPrimitive['address']
    birthDate: UserPrimitive['birthDate']
    sex: UserPrimitive['sex']
    imgUrl?: UserPrimitive['imgUrl']
  }): User {
    const password = Password.create(userPassword)

    return new User({
      id: 0,
      name,
      lastName,
      dni,
      email,
      phoneNumber,
      password: password.value,
      salt: password.salt,
      address,
      birthDate,
      sex,
      imgUrl,
      updatedAt: new Date(),
      createdAt: new Date(),
      actived: false,
      deleted: false,
      role: UserRoles.USER
    })
  }

  public toJSON (): UserPrimitive {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      dni: this.dni,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      salt: this.salt,
      address: this.address,
      birthDate: this.birthDate,
      sex: this.sex,
      imgUrl: this.imgUrl,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      actived: this.actived,
      deleted: this.deleted,
      role: this.role
    }
  }
}

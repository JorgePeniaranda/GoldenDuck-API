import { Password } from '@/value-objects/password'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UserRoles, type UserPrimitive } from './user.primitive'

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

  // #region GETTER / SETTER
  @Field(() => ID)
  get id (): UserPrimitive['id'] {
    return this.#id
  }

  @Field(() => String)
  get name (): UserPrimitive['name'] {
    return this.#name
  }

  set name (name: UserPrimitive['name']) {
    this.#name = name
  }

  @Field(() => String)
  get lastName (): UserPrimitive['lastName'] {
    return this.#lastName
  }

  set lastName (lastName: UserPrimitive['lastName']) {
    this.#lastName = lastName
  }

  @Field(() => String)
  get dni (): UserPrimitive['dni'] {
    return this.#dni
  }

  @Field(() => String)
  get email (): UserPrimitive['email'] {
    return this.#email
  }

  set email (email: UserPrimitive['email']) {
    this.#email = email
  }

  @Field(() => Number)
  get phoneNumber (): UserPrimitive['phoneNumber'] {
    return this.#phoneNumber
  }

  set phoneNumber (phoneNumber: UserPrimitive['phoneNumber']) {
    this.#phoneNumber = phoneNumber
  }

  get password (): UserPrimitive['password'] {
    return this.#password.value
  }

  set password (password: string) {
    this.#password.value = password
  }

  get salt (): UserPrimitive['salt'] {
    return this.#password.salt
  }

  @Field(() => String)
  get address (): UserPrimitive['address'] {
    return this.#address
  }

  set address (address: UserPrimitive['address']) {
    this.#address = address
  }

  @Field(() => Date)
  get birthDate (): UserPrimitive['birthDate'] {
    return this.#birthDate
  }

  @Field(() => String)
  get sex (): UserPrimitive['sex'] {
    return this.#sex
  }

  @Field(() => String)
  get imgUrl (): UserPrimitive['imgUrl'] {
    return this.#imgUrl
  }

  set imgUrl (imgUrl: UserPrimitive['imgUrl']) {
    this.#imgUrl = imgUrl
  }

  @Field(() => Date)
  get updatedAt (): UserPrimitive['updatedAt'] {
    return this.#updatedAt
  }

  set updatedAt (updatedAt: UserPrimitive['updatedAt']) {
    this.#updatedAt = updatedAt
  }

  @Field(() => Date)
  get createdAt (): UserPrimitive['createdAt'] {
    return this.#createdAt
  }

  @Field(() => Boolean)
  get actived (): UserPrimitive['actived'] {
    return this.#actived
  }

  @Field(() => Boolean)
  get deleted (): UserPrimitive['deleted'] {
    return this.#deleted
  }

  @Field(() => String)
  get role (): UserPrimitive['role'] {
    return this.#role
  }

  set role (role: UserPrimitive['role']) {
    this.#role = role
  }

  /**
   * --------------------> MARK:ASDA
   **/
  public activate (): void {
    this.#actived = true
  }

  public delete (): void {
    this.#deleted = true
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
      salt: this.#password.salt,
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

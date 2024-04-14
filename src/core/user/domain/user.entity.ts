import { Password } from '@/value-objects/password'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { UserRoles, type UserPrimitive } from './user.primitive'

@ObjectType()
export class User implements UserPrimitive {
  @Field(() => ID)
    id: UserPrimitive['id']

  @Field(() => String)
    name: UserPrimitive['name']

  @Field(() => String)
    lastName: UserPrimitive['lastName']

  readonly #dni: UserPrimitive['dni']

  @Field(() => String)
    email: UserPrimitive['email']

  @Field(() => Number)
    phoneNumber: UserPrimitive['phoneNumber']

  readonly #password: Password

  @Field(() => String)
    address: UserPrimitive['address']

  readonly #birthDate: UserPrimitive['birthDate']

  readonly #sex: UserPrimitive['sex']

  @Field(() => String)
    imgUrl: UserPrimitive['imgUrl']

  @Field(() => Date)
    updatedAt: UserPrimitive['updatedAt']

  readonly #createdAt: UserPrimitive['createdAt']

  @Field(() => Boolean)
    actived: UserPrimitive['actived']

  @Field(() => Boolean)
    deleted: UserPrimitive['deleted']

  @Field(() => String)
    role: UserPrimitive['role']

  constructor (user: UserPrimitive) {
    this.id = user.id
    this.name = user.name
    this.lastName = user.lastName
    this.#dni = user.dni
    this.email = user.email
    this.phoneNumber = user.phoneNumber
    this.#password = new Password(user.password, user.salt)
    this.address = user.address
    this.#birthDate = user.birthDate
    this.#sex = user.sex
    this.imgUrl = user.imgUrl
    this.updatedAt = user.updatedAt
    this.#createdAt = user.createdAt
    this.actived = user.actived
    this.deleted = user.deleted
    this.role = user.role
  }

  @Field(() => String)
  get dni (): UserPrimitive['dni'] {
    return this.#dni
  }

  @Field(() => Date)
  get birthDate (): UserPrimitive['birthDate'] {
    return this.#birthDate
  }

  @Field(() => String)
  get sex (): UserPrimitive['sex'] {
    return this.#sex
  }

  @Field(() => Date)
  get createdAt (): UserPrimitive['createdAt'] {
    return this.#createdAt
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

  public comparePassword (password: string): boolean {
    return this.#password.compare(password)
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
}

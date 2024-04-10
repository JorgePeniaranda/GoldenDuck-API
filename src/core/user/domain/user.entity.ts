import { Password } from '@/value-objects/password'
import { UserRoles, type UserPrimitive } from './user.primitive'

const optionalProperties = ['id', 'updatedAt', 'createdAt', 'actived', 'deleted', 'role'] as const

export class User implements UserPrimitive {
  readonly #id: UserPrimitive['id']
  name: UserPrimitive['name']
  lastName: UserPrimitive['lastName']
  readonly #dni: UserPrimitive['dni']
  email: UserPrimitive['email']
  phoneNumber: UserPrimitive['phoneNumber']
  readonly #password: Password
  address: UserPrimitive['address']
  readonly #birthDate: UserPrimitive['birthDate']
  readonly #sex: UserPrimitive['sex']
  readonly #updatedAt: UserPrimitive['updatedAt']
  readonly #createdAt: UserPrimitive['createdAt']
  actived: UserPrimitive['actived']
  deleted: UserPrimitive['deleted']
  role: UserPrimitive['role']

  constructor (user: UserPrimitive) {
    this.#id = user.id
    this.name = user.name
    this.lastName = user.lastName
    this.#dni = user.dni
    this.email = user.email
    this.phoneNumber = user.phoneNumber
    this.#password = new Password(user.password)
    this.address = user.address
    this.#birthDate = user.birthDate
    this.#sex = user.sex
    this.#updatedAt = user.updatedAt
    this.#createdAt = user.createdAt
    this.actived = user.actived
    this.deleted = user.deleted
    this.role = user.role
  }

  get id (): UserPrimitive['id'] {
    return this.#id
  }

  get dni (): UserPrimitive['dni'] {
    return this.#dni
  }

  get birthDate (): UserPrimitive['birthDate'] {
    return this.#birthDate
  }

  get sex (): UserPrimitive['sex'] {
    return this.#sex
  }

  get updatedAt (): UserPrimitive['updatedAt'] {
    return this.#updatedAt
  }

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

  comparePassword (password: string): boolean {
    return this.#password.compare(password)
  }

  toJSON (): UserPrimitive {
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
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      actived: this.actived,
      deleted: this.deleted,
      role: this.role
    }
  }

  static create (
    data: Pick<Partial<UserPrimitive>, (typeof optionalProperties)[number]> &
    Omit<UserPrimitive, (typeof optionalProperties)[number]>
  ): User {
    const password = new Password(data.password)

    return new User({
      id: 0, // TO-DO: generate id
      name: data.name,
      lastName: data.lastName,
      dni: data.dni,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: password.value,
      salt: password.salt,
      address: data.address,
      birthDate: data.birthDate,
      sex: data.sex,
      updatedAt: new Date(),
      createdAt: new Date(),
      actived: false,
      deleted: false,
      role: UserRoles.USER
    })
  }
}

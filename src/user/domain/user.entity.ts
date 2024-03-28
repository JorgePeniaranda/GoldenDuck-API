import { type UserPrimitive } from './user.primitive'

export class User implements UserPrimitive {
  readonly id: UserPrimitive['id']
  name: UserPrimitive['name']
  lastName: UserPrimitive['lastName']
  readonly dni: UserPrimitive['dni']
  email: UserPrimitive['email']
  phoneNumber: UserPrimitive['phoneNumber']
  password: UserPrimitive['password']
  salt: UserPrimitive['salt']
  address: UserPrimitive['address']
  readonly birthDate: UserPrimitive['birthDate']
  readonly sex: UserPrimitive['sex']
  readonly updatedAt: UserPrimitive['updatedAt']
  readonly createdAt: UserPrimitive['createdAt']
  actived: UserPrimitive['actived']
  deleted: UserPrimitive['deleted']
  role: UserPrimitive['role']

  constructor (user: UserPrimitive) {
    this.id = user.id
    this.name = user.name
    this.lastName = user.lastName
    this.dni = user.dni
    this.email = user.email
    this.phoneNumber = user.phoneNumber
    this.password = user.password
    this.salt = user.salt
    this.address = user.address
    this.birthDate = user.birthDate
    this.sex = user.sex
    this.updatedAt = user.updatedAt
    this.createdAt = user.createdAt
    this.actived = user.actived
    this.deleted = user.deleted
    this.role = user.role
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
      salt: this.salt,
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
}
